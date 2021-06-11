# frozen_string_literal: true

module Spree
  class HomeController < Spree::StoreController
    helper 'spree/products'
    respond_to :html

    def index
      @searcher = build_searcher(params.merge(include_images: true))
      @products = @searcher.retrieve_products
      @taxonomies = Spree::Taxonomy.includes(root: :children)

      @selection = Spree::Taxon.find_by(name: "Sélection")

      @selection_searcher = build_searcher(params.merge(taxon: @selection.id, include_images: true))
      @selection_products = @selection_searcher.retrieve_products
    end
  end
end
