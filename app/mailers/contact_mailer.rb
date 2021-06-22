class ContactMailer < ApplicationMailer
    def support_email
        @nom = params[:nom]
        @email = params[:email]
        @sujet = params[:sujet]
        @message = params[:message]

        mail(to: 'ecommerce.campus19@gmail.com', subject: '[SUPPORT] ' + @nom, body: '[' + @sujet + '] ' + @message)
    end
end
