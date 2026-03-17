const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find({});
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch single menu item
// @route   GET /api/menu/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const item = await Menu.findById(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const item = await Menu.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.json({ message: 'Item removed' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, category, price, image, description, rating, badge } = req.body;
        const item = new Menu({
            name,
            category,
            price,
            image,
            description,
            rating,
            badge
        });
        const createdItem = await item.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { name, category, price, image, description, rating, badge } = req.body;
        const item = await Menu.findById(req.params.id);

        if (item) {
            item.name = name || item.name;
            item.category = category || item.category;
            item.price = price || item.price;
            item.image = image || item.image;
            item.description = description || item.description;
            item.rating = rating || item.rating;
            item.badge = badge || item.badge;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
