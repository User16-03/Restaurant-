const express = require('express');
const router = express.Router();
const RestaurantInfo = require('../models/RestaurantInfo');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Fetch restaurant info
// @route   GET /api/restaurant
// @access  Public
router.get('/', async (req, res) => {
    try {
        const info = await RestaurantInfo.findOne({});
        if (info) {
            res.json(info);
        } else {
            // Return default/empty if not found
            res.json({
                address: '123 Street, New York, USA',
                phone: '+012 345 6789',
                email: 'info@example.com',
                openingHours: {
                    lunch: '11am - 3pm',
                    dinner: '7pm - 11pm'
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update restaurant info
// @route   PUT /api/restaurant
// @access  Private/Admin
router.put('/', protect, admin, async (req, res) => {
    try {
        const { address, phone, email, openingHours } = req.body;
        let info = await RestaurantInfo.findOne({});

        if (info) {
            info.address = address || info.address;
            info.phone = phone || info.phone;
            info.email = email || info.email;
            info.openingHours = openingHours || info.openingHours;

            const updatedInfo = await info.save();
            res.json(updatedInfo);
        } else {
            // Create if doesn't exist
            info = new RestaurantInfo({
                address,
                phone,
                email,
                openingHours
            });
            const createdInfo = await info.save();
            res.status(201).json(createdInfo);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
