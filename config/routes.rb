Rails.application.routes.draw do

  namespace :api do
    resources :lists do
      resources :athletes
    end
  end 

  namespace :api do
    post '/send_message', to: "messages#send_message"
    get '/conversation', to: "messages#get_conversation"
  end 

  mount_devise_token_auth_for 'User', at: 'api/auth'
end
