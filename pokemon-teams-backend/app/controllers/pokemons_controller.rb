class PokemonsController < ApplicationController

    def delete
        @pokemon = Pokemon.find(params[:id])
        @pokemon.destroy
        render json: @pokemon
    end



end
