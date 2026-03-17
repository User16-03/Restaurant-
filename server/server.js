const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/restaurant', require('./routes/restaurantRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
