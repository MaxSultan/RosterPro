class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :list, null: false, foreign_key: true
      t.string :name
      t.string :place
      t.datetime :time

      t.timestamps
    end
  end
end
