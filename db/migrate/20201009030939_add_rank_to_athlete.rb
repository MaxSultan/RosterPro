class AddRankToAthlete < ActiveRecord::Migration[6.0]
  def change
    add_column :athletes, :rank, :integer
  end
end
