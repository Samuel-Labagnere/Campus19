class RemoveSurchargeFromSpreeOptionValues < ActiveRecord::Migration[6.1]
  def change
    remove_column :spree_option_values, :surcharge, :decimal
  end
end
