module Spree
  class ContactController < Spree::StoreController
    def index
        @prenom = params[:prenom]
        @nom = params[:nom]
        @email = params[:email]
        @message = params[:message]
    end
  end
end