# frozen_string_literal: true
# This migration comes from solidus_dynamic_variants (originally 20151026230300)

class AddDynamicVariantsToProducts < ActiveRecord::Migration[4.2]
  def change
    add_column :spree_products, :dynamic_variants, :boolean, default: false
  end
end
