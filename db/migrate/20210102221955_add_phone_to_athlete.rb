class AddPhoneToAthlete < ActiveRecord::Migration[6.0]
  def change
    add_column :athletes, :phone_number, :string
  end
end
