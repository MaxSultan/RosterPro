Rails.application.routes.draw do

  namespace :api do
    resources :lists do
      resources :athletes
    end
  end 

  mount_devise_token_auth_for 'User', at: 'api/auth'
end
