const mongoose = require('mongoose');

const restaurantInfoSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    openingHours: {
        lunch: {
            type: String,
            required: true,
        },
        dinner: {
            type: String,
            required: true,
        }
    }
}, {
    timestamps: true,
});

const RestaurantInfo = mongoose.model('RestaurantInfo', restaurantInfoSchema);

module.exports = RestaurantInfo;
