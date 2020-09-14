class List < ApplicationRecord
    has_many :athletes, dependent: :destroy
end
