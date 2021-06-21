class ContactMailer < ApplicationMailer
    def contact_email
        @prenom = params[:prenom]
        @nom = params[:nom]
        @email = params[:email]
        @message = params[:message]

        mail(to: 'ecommerce.campus19@gmail.com', subject: '[CONTACT] ' + @prenom + ' ' + @nom, body: @message)
    end
    def support_email
        @prenom = params[:prenom]
        @nom = params[:nom]
        @email = params[:email]
        @sujet = params[:sujet]
        @message = params[:message]

        mail(to: 'ecommerce.campus19@gmail.com', subject: '[CONTACT] ' + @prenom + ' ' + @nom, body: '[' + @sujet + ']' + @message)
    end
end
