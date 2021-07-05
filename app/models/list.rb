class List < ApplicationRecord
    has_many :athletes, dependent: :destroy
    has_many :events, dependent: :destroy
end
