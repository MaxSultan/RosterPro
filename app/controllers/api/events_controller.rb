class Api::EventsController < ApplicationController
  before_action :set_list
  before_action :set_list, only: [:show, :update, :destroy]

  def index
    @events = @list.events.all
    render json: @events
  end

  def show
  end

  def create
    @event = Event.create(event_params)
    if @event.save
      render json: @event
    else 
      render json: {errors: @event.errors, status: 422}
    end 
  end

  def update
    if @event.update(event_params)
      render json: @event
    else 
      render json: {errors: @event.errors, status: 422}
    end 
  end

  def destroy
    render json: @event.delete
  end

  private

  def set_list
    @list = List.find(params[:list_id])
  end 

  def set_event
    @event = @list.events.find(params[:id])
  end 

  def event_params
    params.require(:event).permit(:name, :time, :place)
  end
end
