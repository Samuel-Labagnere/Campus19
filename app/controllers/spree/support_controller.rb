module Spree
  class SupportController < Spree::StoreController
    def index
      @prenom = params[:prenom]
      @nom = params[:nom]
      @email = params[:email]
      @sujet = params[:sujet]
      @message = params[:message]
    end
  end
end