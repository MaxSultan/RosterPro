class Api::MessagesController < ApplicationController
    require 'twilio-ruby'

    def send_message
        @twilio_number =  '+18607859178'
        account_sid = 'ACe9c2b1446c76dc3e8e1e388848c518da' 
        auth_token = '25e46a83a1353af6e608be449933e3d0' 
        @client = Twilio::REST::Client.new(account_sid, auth_token)
        message = @client.messages.create(
            body: params[:message_body],
            from: @twilio_number,
            to: params[:to]
        )
        render json: message 
    end 

    def get_conversation
        @twilio_number =  '+18607859178'
        account_sid = 'ACe9c2b1446c76dc3e8e1e388848c518da' 
        auth_token = '25e46a83a1353af6e608be449933e3d0' 
        @client = Twilio::REST::Client.new(account_sid, auth_token)
        conversation = []
        @client.messages.list(
            to: params[:phone_number],
            from: @twilio_number).each do |message|
                conversation.push({body: message.body, time: message.date_sent, from: message.from})
            end 
        @client.messages.list(
            to: @twilio_number,
            from: params[:phone_number]).each do |message|
                conversation.push({body: message.body, time: message.date_sent, from: message.from})
            end
        render json: conversation
    end 

    # private 
    # def set_client
    #     account_sid = 'ACe9c2b1446c76dc3e8e1e388848c518da' 
    #     auth_token = '25e46a83a1353af6e608be449933e3d0' 
    #     @client = Twilio::REST::Client.new(account_sid, auth_token)
    # end 

    # def set_twilio_number
    #     @twilio_number =  '+18607859178'
    # end 
end
