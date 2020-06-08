class TrainersController < ApplicationController

    def index
        @trainers = Trainer.all        
                
        # render json: @users, only: [:id, :name], include: :tweets

        render json: @trainers, only: [:id, :name], include: :pokemons

    end

    def add_pokemon    
        @trainer = Trainer.find(params[:trainerId])
        puts @trainer

        @pokemon = Pokemon.create(
            {
                trainer: @trainer,
                nickname: Faker::Name.first_name,
                species: Faker::Games::Pokemon.name
            }
        )
        
        render json: @pokemon
    end

end
