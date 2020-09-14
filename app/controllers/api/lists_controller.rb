class Api::ListsController < ApplicationController
    before_action :set_list, only: [:show, :update, :destroy]
    
    def index
        @lists = List.all 
        render json: @lists
    end 
    
    def create 
        @list = List.create(list_params)
        if @list.save
            render json: @list
        else
            render json: {errors: @list.errors, status: 422}
        end
    end 

    def show
        render json: @list
    end 

    def update
        if @list.update(list_params)
            render json: @list
        else
            render json: {errors: @list.errors, status: 422}
        end 
    end 

    def destroy
        @list.destroy
        render json: @list
    end 

    private 

    def list_params
        params.require(:list).permit(:name, :year)
    end 

    def set_list
        @list = List.find(params[:id])
    end 
end
