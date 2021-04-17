class Api::MessagesController < ApplicationController
    require 'twilio-ruby'
    before_action :set_twilio_number, :set_client

    def send_message
        message = @client.messages.create(
            body: params[:message_body],
            from: @twilio_number,
            to: params[:to]
        )
        render json: message 
    end 

    def get_conversation
        conversation = []
        @client.messages.list(
            to: params[:phone_number],
            from: @twilio_number
        ).each do |message|
            conversation.push({
                body: message.body, 
                time: message.date_sent.to_time.utc, 
                from: message.from, 
                to: message.to
            })
        end 
        @client.messages.list(
            to: @twilio_number,
            from: params[:phone_number]
        ).each do |message|
            conversation.push({
                body: message.body, 
                time: message.date_sent.to_time.utc, 
                from: message.from, 
                to: message.to
            })
        end
        # ret = conversation.sort_by {|message| message.time} 
        render json: conversation
    end 

    def get_all_messages
        all_messages = []
        messages = @client.messages.list()

        messages.each do |record|
            all_messages.push({
                body: record.body, 
                time: record.date_sent.to_time.utc, 
                from: record.from, 
                to: record.to
            })
        end
        render json: all_messages
    end 

    private 
    def set_client
        account_sid = 'ACe9c2b1446c76dc3e8e1e388848c518da' 
        auth_token = ENV['TWILIO_AUTH_TOKEN']
        @client = Twilio::REST::Client.new(account_sid, auth_token)
    end 

    def set_twilio_number
        @twilio_number =  '+18607859178'
    end 
end
