class Accounts < ActiveRecord::Migration[5.0]
  def change
	create_table :accounts do |table|
		table.string :username
		table.string :password
	end
	# add_foreign_key :accounts, :username
  end
end