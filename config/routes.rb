Rails.application.routes.draw do

  namespace :api do
    resources :lists do
      resources :athletes
    end
  end 
end
