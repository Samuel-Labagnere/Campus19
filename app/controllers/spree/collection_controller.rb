module Spree
  class CollectionController < Spree::StoreController
    def index
      @taxonomies = Spree::Taxonomy.includes(root: :children)
      @collection = Spree::Taxon.find_by(name: "Collections")
    end
  end
end