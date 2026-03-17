const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create a contact message
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const contactMessage = new ContactMessage({
            name,
            email,
            message,
        });

        const createdMessage = await contactMessage.save();
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(400).json({ message: 'Error sending message', error });
    }
});

// @desc    Get all messages
// @route   GET /api/contact
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
    try {
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);

        if (message) {
            await message.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message' });
    }
});

module.exports = router;
