class RemoveDynamicVariantsFromSpreeProducts < ActiveRecord::Migration[6.1]
  def change
    remove_column :spree_products, :dynamic_variants, :boolean
  end
end
