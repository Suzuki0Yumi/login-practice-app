class StudyRecordsController < ApplicationController

    def new
      @study_record = StudyRecord.new
    end

    def create
      @study_record = current_user.study_records.new(study_record_params)
        
        if @study_record.save
            redirect_to study_records_path, notice: '学習記録を作成しました'
        else
            render :new
        end
    end

    def index
      @date = params[:month] ? Date.strptime(params[:month], "%Y-%m") : Date.today

      @study_records = current_user.study_records
      .where(study_date: @date.beginning_of_month..@date.end_of_month)
      .group_by(&:study_date)
    end

    def list
      @study_records_by_date = current_user.study_records.order(study_date: :desc).group_by(&:study_date)
    end

    def edit
      @study_record = current_user.study_records.find(params[:id])
      @study_record.set_virtual_time
    end

    def update
      @study_record = current_user.study_records.find(params[:id])
       
       if @study_record.update(study_record_params)
           respond_to do |format|
             format.turbo_stream
             format.html { redirect_to list_study_records_path }
           end
        else
           @study_record.set_virtual_time
           render :edit, status: :unprocessable_entity 
        end
    end

    def destroy
      @study_record = current_user.study_records.find(params[:id])
      @study_record.destroy
        redirect_to list_study_records_path, notice: '削除しました'
    end

    private

    def study_record_params
      params.require(:study_record).permit(:study_date, :study_time, :study_hours, :study_minutes, :content, :concentration_level)
    end
end
