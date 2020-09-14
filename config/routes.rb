Rails.application.routes.draw do

  namespace :api do
    resources :lists
  end 
end
