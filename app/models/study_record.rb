class StudyRecord < ApplicationRecord
  attr_accessor :study_hours, :study_minutes

  before_validation :convert_time_to_minutes

  belongs_to :user

  validates :study_date, presence: true
  validates :study_time, presence: true, numericality: { greater_than: 0 }
  validates :content, length: { maximum: 1000 }
  validates :concentration_level, inclusion: { in: 1..5 }, allow_nil: true

     def formatted_study_time
        return "0分" if study_time.nil? || study_time <= 0

        hours = study_time / 60
        minutes = study_time % 60

        if hours >0 && minutes > 0
          "#{hours}時間#{minutes}分"
        elsif hours >0
            "#{hours}時間"
        else
            "#{minutes}分"
        end
    end

    private

    def convert_time_to_minutes
      if study_hours.present? || study_minutes.present?
         hours = study_hours.to_i
         minutes = study_minutes.to_i
         self.study_time = (hours * 60)+ minutes
      end
    end
   
end
