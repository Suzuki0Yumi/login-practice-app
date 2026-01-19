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
        @study_records = current_user.study_records.order(study_date: :desc)
    end

    private

    def study_record_params
        params.require(:study_record).permit(:study_date, :study_time, :study_hours, :study_minutes, :content, :concentration_level)
    end
end
