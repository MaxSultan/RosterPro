Rails.application.routes.draw do

  namespace :api do
    resources :lists do
      resources :athletes
      resources :events
    end
  end 

  namespace :api do
    post '/send_message', to: "messages#send_message"
    get '/conversation', to: "messages#get_conversation"
    get '/all_messages', to: "messages#get_all_messages"
  end 

  mount_devise_token_auth_for 'User', at: 'api/auth'
end
