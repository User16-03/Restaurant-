const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { protect, admin } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Create a reservation
// @route   POST /api/reservations
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, phone, date, time, guests } = req.body;
    let userId = null;

    // Check if user is logged in
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        } catch (error) {
            console.error('Token verification failed in reservation');
        }
    }

    try {
        const reservation = new Reservation({
            user: userId,
            name,
            email,
            phone,
            date,
            time,
            guests,
        });

        const createdReservation = await reservation.save();
        res.status(201).json(createdReservation);
    } catch (error) {
        console.error('Reservation creation error:', error);
        console.error('Request body:', req.body);
        res.status(400).json({
            message: 'Error creating reservation',
            error: error.message,
            details: error.errors
        });
    }
});

// @desc    Get logged in user reservations
// @route   GET /api/reservations/my
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your reservations' });
    }
});

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private (Admin)
router.get('/', protect, admin, async (req, res) => {
    try {
        const reservations = await Reservation.find({}).sort({ createdAt: -1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations' });
    }
});

// @desc    Delete a reservation
// @route   DELETE /api/reservations/:id
// @access  Private (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (reservation) {
            await reservation.deleteOne();
            res.json({ message: 'Reservation removed' });
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reservation' });
    }
});

module.exports = router;
