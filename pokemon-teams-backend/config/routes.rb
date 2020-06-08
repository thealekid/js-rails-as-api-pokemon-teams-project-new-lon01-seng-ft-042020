Rails.application.routes.draw do
  resources :trainers, only: :index
  resources :pokemons, only: :delete


  post "trainers/:id/add-pokemon", to: "trainers#add_pokemon"

  delete "pokemons/:id", to: "pokemons#delete"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
