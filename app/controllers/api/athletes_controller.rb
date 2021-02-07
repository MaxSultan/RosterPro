class Api::AthletesController < ApplicationController
    before_action :set_list, only: [:index,:create]
    before_action :set_athlete, only: [:show, :update, :destroy]

    def index
        @athletes = @list.athletes
        render json: @athletes
    end 

    def show
    end

    def create
        @athlete = @list.athletes.create(athlete_params)
        if @athlete.save
            render json: @athlete
        else 
            render json: {errors: @athlete.errors, status: 422}
        end 
    end 

    def update
        
        if @athlete.update(athlete_params)
            render json: @athlete
        else 
            render json: {errors: @athlete.errors, status: 422}
        end 
    end 

    def destroy
        render json: @athlete.destroy
    end 

    private

    def set_athlete
        @athlete = Athlete.find(params[:id])
    end 

    def set_list
        @list = List.find(params[:list_id])
    end 

    def athlete_params
        params.require(:athlete).permit(:first_name, :last_name, :grade, :weight, :rank, :phone_number)
    end 
end
