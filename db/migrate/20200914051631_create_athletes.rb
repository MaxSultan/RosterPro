class CreateAthletes < ActiveRecord::Migration[6.0]
  def change
    create_table :athletes do |t|
      t.string :first_name
      t.string :last_name
      t.string :weight
      t.string :grade
      t.belongs_to :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
