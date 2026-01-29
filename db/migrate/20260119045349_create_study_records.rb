class CreateStudyRecords < ActiveRecord::Migration[7.2]
  def change
    create_table :study_records do |t|
      t.references :user, null: false, foreign_key: true
      t.date :study_date, null:false
      t.integer :study_time, null: false
      t.text :content
      t.integer :concentration_level
      
      t.timestamps
    end
  end
end
