const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const Menu = require('./models/Menu');

const demoDishes = [
    {
        name: "Paneer Tikka Crispy",
        category: "Appetizer",
        price: "$15.00",
        image: "/menu/paneer_tikka.png",
        description: "Fresh cottage cheese cubes marinated in yogurt and traditional spices, grilled in a tandoor for a smoky, crispy finish.",
        rating: 5,
        badge: "Special"
    },
    {
        name: "Classic Butter Chicken",
        category: "Main Course",
        price: "$22.00",
        image: "https://images.pexels.com/photos/8448322/pexels-photo-8448322.jpeg",
        description: "Thick, creamy sauce with tender pieces of tandoori chicken, simmered in a rich tomato and butter gravy.",
        rating: 5,
        badge: "Popular"
    },
    {
        name: "Royal Gulab Jamun",
        category: "Dessert",
        price: "$8.00",
        image: "/menu/royal_gulab_jamun.png",
        description: "Soft, golden-brown milk dumplings soaked in a warm saffron and cardamom infused sugar syrup.",
        rating: 5,
        badge: "Sweet"
    },
    {
        name: "Tandoori Chicken Delight",
        category: "Main Course",
        price: "$18.00",
        image: "/menu/tandoori_chicken.png",
        description: "Succulent chicken leg quarters marinated in a blend of yogurt and house-ground spices, roasted to perfection in a clay oven.",
        rating: 5,
        badge: "Chef Choice"
    },
    {
        name: "Garlic Butter Naan",
        category: "Appetizer",
        price: "$4.00",
        image: "/menu/garlic_naan.png",
        description: "Soft, leavened flatbread brushed with garlic-infused melted butter and fresh cilantro.",
        rating: 5,
        badge: "Fresh"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Clear existing menu items and reservations for a clean demo
        await Menu.deleteMany({});
        
        await Menu.insertMany(demoDishes);
        console.log(`Successfully seeded ${demoDishes.length} demo dishes!`);
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
