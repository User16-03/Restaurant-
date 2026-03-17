const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
}, {
    timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
