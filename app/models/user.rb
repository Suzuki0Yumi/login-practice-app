class User < ApplicationRecord
  authenticates_with_sorcery!
  
  has_many :study_records, dependent: :destroy

  validates :user_name, presence: true, length: { maximum: 30 }
  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 3 },
    if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true,
    if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true,
    if: -> { new_record? || changes[:crypted_password] }

  def current_streak
    return 0 if study_records.empty?

    # 学習記録を日付順に取得(重複を除去)
    dates = study_records.order(study_date: :desc).pluck(:study_date).uniq
    streak = 0
    expected_date = Date.current

    # 今日の記録がない場合は昨日から開始
    unless dates.include?(expected_date)
      expected_date -= 1.day
    end

     # 連続している日数をカウント
    dates.each do |date|
      if date == expected_date
         streak += 1
         expected_date -= 1.day
      else
         break
      end
    end
    streak
 end
end
