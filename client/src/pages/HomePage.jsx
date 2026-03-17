import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaUtensils, FaArrowRight, FaStar, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm';
import CountUp from '../components/CountUp';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [animate, setAnimate] = useState(true);
    const [activeTab, setActiveTab] = useState('breakfast');
    const [specialItems, setSpecialItems] = useState([]);

    useEffect(() => {
        const fetchSpecialItems = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/menu');
                setSpecialItems(data.slice(0, 4)); // Get first 4 for display
            } catch (error) {
                console.error('Error fetching special items:', error);
            }
        };
        fetchSpecialItems();
    }, []);

    const menuData = {
        breakfast: [
            { name: "Vegetable Platter", price: "$32.00", img: "https://images.pexels.com/photos/5966430/pexels-photo-5966430.jpeg", desc: "Welcome to Mereda, where culinary excellence meets..." },
            { name: "Pan-Seared Scallops", price: "$42.00", img: "https://images.pexels.com/photos/30133542/pexels-photo-30133542.jpeg", desc: "Fresh sea scallops seared to golden perfection..." },
            { name: "Braised Short Ribs", price: "$19.00", img: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg", desc: "Slow-cooked ribs with a rich balsamic glaze..." },
            { name: "Mushroom Risotto", price: "$30.00", img: "/menu/mushroom_risotto_dish_png_1770268264608.png", desc: "Creamy arborio rice with seasonal forest mushrooms..." },
            { name: "Eggs Benedict", price: "$24.00", img: "https://images.pexels.com/photos/33240983/pexels-photo-33240983.jpeg", desc: "Poached eggs on English muffins with hollandaise..." },
            { name: "Avocado Toast", price: "$18.00", img: "https://images.pexels.com/photos/8743877/pexels-photo-8743877.jpeg", desc: "Sourdough bread topped with fresh smashed avocado..." },
            { name: "Berry Pancake", price: "$20.00", img: "https://images.pexels.com/photos/5061245/pexels-photo-5061245.jpeg", desc: "Fluffy pancakes served with fresh seasonal berries..." },
            { name: "Fruit Bowl", price: "$15.00", img: "https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg", desc: "A selection of fresh tropical and garden fruits..." }
        ],
        lunch: [
            { name: "Grilled Beef Steak", price: "$45.00", img: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg", desc: "Prime cut beef grilled to your liking with herb butter..." },
            { name: "Grilled Chicken", price: "$28.00", img: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg", desc: "Tender chicken breast with roasted root vegetables..." },
            { name: "Classic Caesar", price: "$18.00", img: "https://images.pexels.com/photos/8743877/pexels-photo-8743877.jpeg", desc: "Crisp romaine, parmesan shavings, and house dressing..." },
            { name: "Tomato Basil Soup", price: "$12.00", img: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg", desc: "Rich and creamy roasted tomato soup with fresh basil..." },
            { name: "Salmon Fillet", price: "$32.00", img: "https://images.pexels.com/photos/30133542/pexels-photo-30133542.jpeg", desc: "Pan-seared salmon with lemon butter sauce..." },
            { name: "Club Sandwich", price: "$22.00", img: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg", desc: "Triple-layered sandwich with roasted turkey and bacon..." },
            { name: "Quinoa Salad", price: "$19.00", img: "https://images.pexels.com/photos/8743877/pexels-photo-8743877.jpeg", desc: "Healthy quinoa with cucumber, tomato and feta cheese..." },
            { name: "Beef Burger", price: "$25.00", img: "https://images.pexels.com/photos/12325123/pexels-photo-12325123.jpeg", desc: "Gourmet beef patty with melted cheddar and pickles..." }
        ],
        dinner: [
            { name: "Lobster Tail", price: "$55.00", img: "https://images.unsplash.com/photo-1559742811-824289511f48?q=80&w=200&auto=format&fit=crop", desc: "Butter-poached Atlantic lobster tail with micro-greens..." },
            { name: "Truffle Pasta", price: "$38.00", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=200&auto=format&fit=crop", desc: "Handmade tagliatelle with black truffle and parmesan..." },
            { name: "Roasted Lamb", price: "$48.00", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200&auto=format&fit=crop", desc: "Herb-crusted lamb rack with red wine reduction..." },
            { name: "Seared Ahi Tuna", price: "$40.00", img: "https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?q=80&w=200&auto=format&fit=crop", desc: "Sesame-crusted tuna with ginger-soy glaze..." },
            { name: "Duck Confit", price: "$42.00", img: "https://images.unsplash.com/photo-1514516313570-c33fca67fbc7?q=80&w=200&auto=format&fit=crop", desc: "Crispy duck leg with orange reduction and mash..." },
            { name: "Ribeye Steak", price: "$52.00", img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=200&auto=format&fit=crop", desc: "28-day aged ribeye steak with asparagus..." },
            { name: "Scallop Risotto", price: "$44.00", img: "https://images.unsplash.com/photo-1473093221145-be113b341670?q=80&w=200&auto=format&fit=crop", desc: "Creamy risotto topped with seared jumbo scallops..." },
            { name: "Venison Loin", price: "$50.00", img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=200&auto=format&fit=crop", desc: "Seared venison loin with juniper berry glaze..." }
        ]
    };

    const slides = [
        {
            id: 1,
            image: "https://images.pexels.com/photos/32754750/pexels-photo-32754750.jpeg", // Pasta Image
            subtitle: "WELCOME TO GUSTO",
            title: <>AMAZING TASTY <br /> FOOD COOKED BY <br /> POPULAR CHEF</>,
            time: "S: 18:00 - 02:00"
        },
        {
            id: 2,
            image: "https://images.pexels.com/photos/12325123/pexels-photo-12325123.jpeg", // Burger Image
            subtitle: "DELICIOUS & FRESH",
            title: <>FEEL THE REAL <br /> TASTE OF BEST <br /> BURGER IN TOWN</>,
            time: "M: 10:00 - 22:00"
        }
    ];

    const handleNext = () => {
        setAnimate(false);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setAnimate(true);
        }, 50);
    };

    const handlePrev = () => {
        setAnimate(false);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setAnimate(true);
        }, 50);
    };

    // Specific logic for user request: Left -> Image 1 (Pasta), Right -> Image 2 (Burger) 
    // If we assume strict index mapping based on buttons:
    const showPasta = () => {
        if (currentSlide !== 0) {
            setAnimate(false);
            setTimeout(() => { setCurrentSlide(0); setAnimate(true); }, 50);
        }
    };

    const showBurger = () => {
        if (currentSlide !== 1) {
            setAnimate(false);
            setTimeout(() => { setCurrentSlide(1); setAnimate(true); }, 50);
        }
    };

    return (
        <div className="homepage">

            {/* 1. Hero Section (Split Layout) */}
            <section className="container-fluid p-0">
                <div className="row g-0">
                    {/* Left Side: Content */}
                    <div className="col-lg-6 text-white position-relative d-flex align-items-center overflow-hidden hero-content-column" style={{ minHeight: '500px', backgroundColor: 'var(--secondary-color)' }}>
                        {/* Background Pattern */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("https://www.transparenttextures.com/patterns/food.png")',
                            opacity: 0.05,
                            pointerEvents: 'none'
                        }}></div>



                        {/* Animated Text Container */}
                        <div key={`text-${currentSlide}`} className={`p-5 ms-md-5 ps-md-5 position-relative z-1 ${animate ? 'animate-fade-bottom-top' : ''}`}>
                            <div className="d-flex align-items-center mb-3">
                                <span className="text-uppercase letter-spacing-2 small fw-bold text-white">{slides[currentSlide].subtitle}</span>
                                <div className="bg-secondary ms-3" style={{ height: '1px', width: '60px' }}></div>
                            </div>
                            <h1 className="display-2 fw-bold mb-4 text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem' }}>
                                {slides[currentSlide].title}
                            </h1>
                            <Link to="/services" className="btn btn-primary rounded-0 px-4 py-3 fw-bold mt-2">VIEW FULL MENU</Link>
                        </div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="col-lg-6 position-relative overflow-hidden p-0">
                        <div key={`img-${currentSlide}`} className={`h-100 w-100 hero-img-column ${animate ? 'animate-fade-top-bottom' : ''}`} style={{
                            background: `url("${slides[currentSlide].image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '400px'
                        }}></div>

                        {/* Navigation Arrows */}
                        <div className="position-absolute bottom-0 start-0 d-flex bg-white">
                            {/* Left Button -> Shows Pasta (Slide 0) */}
                            <button
                                onClick={showPasta}
                                className={`btn rounded-0 p-3 d-flex align-items-center justify-content-center border-0 slide-btn ${currentSlide === 0 ? 'btn-primary' : 'btn-light text-dark hover-primary-bg'}`}
                                style={{ width: '70px', height: '70px', transition: 'all 0.3s ease' }}
                            >
                                <FaArrowLeft size={20} />
                            </button>
                            {/* Right Button -> Shows Burger (Slide 1) */}
                            <button
                                onClick={showBurger}
                                className={`btn rounded-0 p-3 d-flex align-items-center justify-content-center border-0 slide-btn ${currentSlide === 1 ? 'btn-primary' : 'btn-light text-dark hover-primary-bg'}`}
                                style={{ width: '70px', height: '70px', transition: 'all 0.3s ease' }}
                            >
                                <FaArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. About Company Section */}
            <section className="section-padding bg-black">
                <div className="container">
                    <div className="row g-0 align-items-center">
                        {/* Column 1: Text Content */}
                        <div className="col-lg-4 p-5">
                            <span className="section-label">ABOUT COMPANY</span>
                            <h2 className="display-4 mb-4 text-white" style={{ fontWeight: 500, lineHeight: 1.2 }}>WE SERVE QUALITY & <br /> BALANCED FOOD</h2>
                            <p className="text-light mb-5">
                                Lorem ipsum dolor sit amet consectetur adipiscing tus euismod eget, arcu nam feren ames aliquam gravida praesent susci nibh faucibus magnis condimentum nulla. Ante parturient iaculis orci curae sapien feugiat conubia litora vivamus sociis auctor vestibulum
                            </p>
                            <Link to="/services" className="btn btn-primary rounded-0 px-4 py-3 fw-bold">DISCOVER MENUS</Link>
                        </div>

                        {/* Column 2: Stats (Vertical List) */}
                        <div className="col-lg-3 d-flex flex-column h-100 p-0">
                            <div className="about-stat-box bg-black border-bottom-0" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h2 className="display-2 text-outline mb-0" style={{ fontWeight: 300, color: '#fff' }}>
                                    <CountUp end={120} duration={2000} />
                                </h2>
                                <small className="fw-bold text-white text-uppercase letter-spacing-1">AWARDS WON</small>
                            </div>
                            <div className="about-stat-box bg-black border-bottom-0" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h2 className="display-2 text-outline mb-0" style={{ fontWeight: 300, color: '#fff' }}>
                                    <CountUp end={68} duration={2000} />
                                </h2>
                                <small className="fw-bold text-white text-uppercase letter-spacing-1">LOCATION STORE</small>
                            </div>
                            <div className="about-stat-box bg-black" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h2 className="display-2 text-outline mb-0" style={{ fontWeight: 300, color: '#fff' }}>
                                    <CountUp end={222} duration={2000} />
                                </h2>
                                <small className="fw-bold text-white text-uppercase letter-spacing-1">FOOD SPECIALIST</small>
                            </div>
                        </div>

                        {/* Column 3: Image */}
                        <div className="col-lg-5">
                            <div className="h-100 w-100" style={{ minHeight: '500px' }}>
                                <img src="https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg" className="w-100 h-100 object-fit-cover" alt="About Dining" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Special Food Items (Dark Section) */}
            <section className="section-padding bg-black">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-label text-primary">FOOD MENUS</span>
                        <h2 className="display-4 fw-bold text-white mb-4">OUR SPECIAL FOOD ITEMS</h2>
                    </div>

                    <div className="row g-4">
                        {specialItems.length > 0 ? specialItems.map(item => (
                            <div key={item._id} className="col-lg-3 col-md-6">
                                <div className="card h-100 border-0 rounded-0 shadow-sm bg-black" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div className="overflow-hidden position-relative" style={{ height: '250px' }}>
                                        <img src={item.image} className="w-100 h-100 object-fit-cover hover-scale" alt={item.name} />
                                    </div>
                                    <div className="card-body p-4 text-center">
                                        <h5 className="fw-bold mb-2 text-white">{item.name}</h5>
                                        <h5 className="text-primary fw-bold mb-3">{item.price}</h5>
                                        <p className="small text-light mb-4 text-truncate-2">
                                            {item.description}
                                        </p>
                                        <Link to="/menus" className="btn btn-primary rounded-0 px-4 py-2 small fw-bold" style={{ fontSize: '12px', letterSpacing: '1px' }}>ORDER HERE</Link>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            /* Fallback items if empty */
                            [
                                { name: 'Grilled Cheese Burger', price: '$39.00', image: 'https://images.pexels.com/photos/12325123/pexels-photo-12325123.jpeg', description: 'Gourmet beef patty with melted cheddar...' },
                                { name: 'Paneer Tikka Crispy', price: '$28.00', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop', description: 'Crispy paneer cubes with spicy marinade...' },
                                { name: 'Honey Glazed Salmon', price: '$19.00', image: 'https://images.pexels.com/photos/30133542/pexels-photo-30133542.jpeg', description: 'Fresh Atlantic salmon with honey glaze...' },
                                { name: 'Mandarin Quinoa Salad', price: '$24.00', image: 'https://images.pexels.com/photos/8743877/pexels-photo-8743877.jpeg', description: 'Healthy quinoa with mandarin slices...' }
                            ].map((item, idx) => (
                                <div key={idx} className="col-lg-3 col-md-6">
                                    <div className="card h-100 border-0 rounded-0 bg-black" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div className="overflow-hidden position-relative" style={{ height: '250px' }}>
                                            <img src={item.image} className="w-100 h-100 object-fit-cover hover-scale" alt={item.name} />
                                        </div>
                                        <div className="card-body p-4 text-center">
                                            <h5 className="fw-bold mb-2 text-white">{item.name}</h5>
                                            <h5 className="text-primary fw-bold mb-3">{item.price}</h5>
                                            <p className="small text-light mb-4 text-truncate-2">
                                                Welcome to Mereda, where culinary excellence meets exceptional service. Our...
                                            </p>
                                            <a href="#" className="btn btn-primary rounded-0 px-4 py-2 small fw-bold" style={{ fontSize: '12px', letterSpacing: '1px' }}>ORDER HERE</a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* 5. FAQ Section (Moved Up) */}
            <section className="section-padding faq-section bg-black">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Left Column: Image */}
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="position-relative">
                                <img src="https://images.pexels.com/photos/8629100/pexels-photo-8629100.jpeg" className="chef-img" alt="Professional Chef" />
                            </div>
                        </div>

                        {/* Right Column: FAQ Content */}
                        <div className="col-lg-7 ps-lg-5">
                            <div className="faq-content">
                                <span className="section-label">WHY CHOOSE US!</span>
                                <h2 className="display-4 fw-bold mb-5 faq-title text-uppercase text-white">RESONABLE PRICED <br /> RESTAURANT</h2>

                                <div className="accordion custom-accordion" id="faqAccordion">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true">
                                                What Are Your Operating Hours?
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                Lorem ipsum dolor sit amet consectetur adipiscing elit, dictum faucibus bibendum est eget imperdiet, vel venenatis inceptos vivamus torquent pellentesque. Turpis non dapibus pulvinar consequat suscipit himenaeos nam,
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false">
                                                Do You Offer Vegetarian and Vegan Options?
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                Yes, we have a wide range of vegetarian and vegan options available in our daily menu. Our chefs are also happy to accommodate specific dietary requirements upon request.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false">
                                                Can I Make a Reservation?
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                Absolutely! You can make a reservation through our website's reservation page or by calling our restaurant directly. We recommend booking in advance for weekends.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Gallery Section (Moved Up) */}
            <section className="section-padding bg-black pt-5">
                <div className="container-fluid px-4">
                    <div className="row g-2">
                        {/* Col 1: Tall */}
                        <div className="col-lg-3">
                            <div className="gallery-item gallery-tall">
                                <img src="https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg" className="w-100 h-100 object-fit-cover" alt="Dining Experience" />
                                <div className="gallery-overlay">
                                    <FaStar />
                                </div>
                            </div>
                        </div>

                        {/* Col 2: Two Squares */}
                        <div className="col-lg-3">
                            <div className="d-flex flex-column gap-2">
                                <div className="gallery-item gallery-square">
                                    <img src="https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg" className="w-100 h-100 object-fit-cover" alt="Grilled Steak" />
                                    <div className="gallery-overlay">
                                        <FaStar />
                                    </div>
                                </div>
                                <div className="gallery-item gallery-square">
                                    <img src="https://images.pexels.com/photos/32754750/pexels-photo-32754750.jpeg" className="w-100 h-100 object-fit-cover" alt="Special Pasta" />
                                    <div className="gallery-overlay">
                                        <FaStar />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Col 3: Two Squares */}
                        <div className="col-lg-3">
                            <div className="d-flex flex-column gap-2">
                                <div className="gallery-item gallery-square">
                                    <img src="https://images.pexels.com/photos/33240983/pexels-photo-33240983.jpeg" className="w-100 h-100 object-fit-cover" alt="Delicious Pizza" />
                                    <div className="gallery-overlay">
                                        <FaStar />
                                    </div>
                                </div>
                                <div className="gallery-item gallery-square">
                                    <img src="https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg" className="w-100 h-100 object-fit-cover" alt="Restaurant Interior" />
                                    <div className="gallery-overlay">
                                        <FaStar />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Col 4: Tall */}
                        <div className="col-lg-3">
                            <div className="gallery-item gallery-tall">
                                <img src="https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg" className="w-100 h-100 object-fit-cover" alt="Dining Hall" />
                                <div className="gallery-overlay">
                                    <FaStar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Main Food Dishes */}
            <section className="section-padding menu-dark-section bg-black">
                <div className="container position-relative z-1">
                    <div className="text-center mb-5">
                        <span className="section-label" style={{ color: 'var(--primary-color)' }}>OUR MENUS</span>
                        <h2 className="display-4 fw-bold text-white mb-0" style={{ fontFamily: 'var(--font-heading)' }}>MAIN FOOD DISHES</h2>
                    </div>

                    <div className="row mt-5 position-relative">
                        {/* Vertical Divider Overlay */}
                        <div className="menu-vertical-divider"></div>

                        {/* Left Column */}
                        <div className="col-lg-6 pe-lg-5">
                            <div className="text-start mb-4">
                                <div className="menu-category-header">
                                    <h4 className="menu-category-title">BREAKFAST MENU</h4>
                                </div>
                            </div>

                            {[
                                { name: "Vegetable Platter", price: "$32.00", img: "/menu/vegetable_platter_dish_png_1770268214729.png" },
                                { name: "Pan-Seared Scallops", price: "$42.00", img: "/menu/pan_seared_scallops_dish_png_1770268229822.png" },
                                { name: "Braised Short Ribs", price: "$19.00", img: "/menu/braised_short_ribs_dish_png_1770268246576.png" },
                                { name: "Mushroom Risotto", price: "$30.00", img: "/menu/mushroom_risotto_dish_png_1770268264608.png" }
                            ].map((item, idx) => (
                                <div key={idx} className="menu-item-v2 d-flex align-items-center">
                                    <div className="menu-img-wrapper me-3">
                                        <img src={item.img} className="w-100 h-100 object-fit-cover" alt={item.name} />
                                    </div>
                                    <div className="menu-item-content">
                                        <div className="menu-item-title-row">
                                            <h5 className="menu-item-title-v2">{item.name}</h5>
                                            <div className="menu-item-dots"></div>
                                            <span className="menu-item-price-v2">{item.price}</span>
                                        </div>
                                        <p className="menu-item-desc">Welcome to Mereda, where culinary excellence meets...</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="col-lg-6 ps-lg-5 mt-5 mt-lg-0">
                            <div className="text-start mb-4">
                                <div className="menu-category-header">
                                    <h4 className="menu-category-title">BREAKFAST MENU</h4>
                                </div>
                            </div>

                            {[
                                { name: "Mushroom Risotto", price: "$30.00", img: "/menu/mushroom_risotto_dish_png_1770268264608.png" },
                                { name: "Braised Short Ribs", price: "$19.00", img: "/menu/braised_short_ribs_dish_png_1770268246576.png" },
                                { name: "Pan-Seared Scallops", price: "$42.00", img: "/menu/pan_seared_scallops_dish_png_1770268229822.png" },
                                { name: "Vegetable Platter", price: "$32.00", img: "/menu/vegetable_platter_dish_png_1770268214729.png" }
                            ].map((item, idx) => (
                                <div key={idx} className="menu-item-v2 d-flex align-items-center">
                                    <div className="menu-img-wrapper me-3">
                                        <img src={item.img} className="w-100 h-100 object-fit-cover" alt={item.name} />
                                    </div>
                                    <div className="menu-item-content">
                                        <div className="menu-item-title-row">
                                            <h5 className="menu-item-title-v2">{item.name}</h5>
                                            <div className="menu-item-dots"></div>
                                            <span className="menu-item-price-v2">{item.price}</span>
                                        </div>
                                        <p className="menu-item-desc">Welcome to Mereda, where culinary excellence meets...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Team Members Section (Moved Down) */}
            <section className="section-padding team-section bg-black">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="sub-title text-primary">TEAM MEMBERS</span>
                        <h2 className="display-4 fw-bold">MEET OUR PROFESSIONALS</h2>
                    </div>

                    <div className="row g-4">
                        {/* Member 1 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="team-card card h-100 rounded-0">
                                <div className="team-img-container">
                                    <div className="team-plus-btn">+</div>
                                    <img src="https://images.pexels.com/photos/8629100/pexels-photo-8629100.jpeg" className="w-100 h-100 object-fit-cover" alt="Edward Robert" />
                                </div>
                                <div className="card-body p-4">
                                    <h4 className="team-name">Edward Robert</h4>
                                    <p className="team-role mb-3 text-uppercase">Senior Chef</p>
                                    <p className="team-desc mb-0">
                                        Connubia Morbi vivamus tempus integer imperdiet nets connubia augur protium, lingid nails
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Member 2 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="team-card card h-100 rounded-0">
                                <div className="team-img-container">
                                    <div className="team-plus-btn">+</div>
                                    <img src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg" className="w-100 h-100 object-fit-cover" alt="Markus Daniel" />
                                </div>
                                <div className="card-body p-4">
                                    <h4 className="team-name">Markus Daniel</h4>
                                    <p className="team-role mb-3 text-uppercase">Senior Chef</p>
                                    <p className="team-desc mb-0">
                                        Connubia Morbi vivamus tempus integer imperdiet nets connubia augur protium, lingid nails
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Member 3 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="team-card card h-100 rounded-0">
                                <div className="team-img-container">
                                    <div className="team-plus-btn">+</div>
                                    <img src="https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg" className="w-100 h-100 object-fit-cover" alt="Thomas Samuel" />
                                </div>
                                <div className="card-body p-4">
                                    <h4 className="team-name">Thomas Samuel</h4>
                                    <p className="team-role mb-3 text-uppercase">Senior Chef</p>
                                    <p className="team-desc mb-0">
                                        Connubia Morbi vivamus tempus integer imperdiet nets connubia augur protium, lingid nails
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Video Parallax Section (Refined Design) */}
            <section className="video-section-v2" style={{
                background: 'fixed url("https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg") no-repeat center center/cover'
            }}>
                <div className="video-overlay-v2"></div>
                <div className="position-relative z-1 container text-center d-flex flex-column align-items-center">
                    <div className="video-play-btn-wrapper">
                        <div className="video-play-btn-outer"></div>
                        <div className="video-play-btn-inner">
                            <FaPlay className="ms-1" />
                        </div>
                    </div>

                    <h2 className="video-title-v2 text-uppercase">
                        TASTE & FEEL THE SPIRIT OF SEA. <br /> QUALITY OF MICHELIN
                    </h2>

                    <Link to="/about" className="btn btn-book-table rounded-0">
                        BOOK A TABLE
                    </Link>
                </div>
            </section>

            {/* 8. Book A Table (Form Refinement) */}
            <section className="reservation-section-v2 section-padding position-relative overflow-hidden" style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg") no-repeat center center/cover'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="reservation-card-v2 position-relative bg-black p-5" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                {/* Floating Icon */}
                                <div className="reservation-icon-floating">
                                    <div className="reservation-icon-inner">
                                        <img src="https://img.icons8.com/ios/50/ff6b1b/calendar--v1.png" alt="Calendar Icon" />
                                    </div>
                                </div>

                                <div className="text-center mb-5 pt-4">
                                    <h2 className="display-5 fw-bold reservation-title">BOOK A TABLE</h2>
                                </div>
                                <ReservationForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Recent Blog Posts (Refined Design) */}
            <section className="section-padding blog-section-v2 bg-black">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="sub-title text-primary" style={{ border: 'none' }}>WHY CHOOSE US?</span>
                        <h2 className="display-4 fw-bold mb-0 text-uppercase text-white" style={{ fontFamily: 'var(--font-heading)' }}>OUR RECENT BLOG POSTS</h2>
                    </div>
                    <div className="row g-4">
                        {[
                            {
                                id: 1,
                                date: "22 AUG, 2024",
                                author: "GUSTO",
                                title: "Restaurants with the Best Private Dining Rooms...",
                                img: "https://images.pexels.com/photos/33240983/pexels-photo-33240983.jpeg"
                            },
                            {
                                id: 2,
                                date: "24 AUG, 2024",
                                author: "GUSTO",
                                title: "Enthusiast's Handbook From Manicures to Nail Health",
                                img: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg"
                            },
                            {
                                id: 3,
                                date: "24 AUG, 2024",
                                author: "GUSTO",
                                title: "Dive into Gusto's Signature Dishes and Culinary",
                                img: "https://images.pexels.com/photos/5966430/pexels-photo-5966430.jpeg"
                            }
                        ].map(post => (
                            <div key={post.id} className="col-lg-4 col-md-6">
                                <div className="blog-card-v2 card h-100 bg-black border-0">
                                    <div className="blog-img-wrapper">
                                        <img src={post.img} className="w-100 h-100 object-fit-cover" alt={post.title} />
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="blog-metadata text-uppercase">
                                            <span>{post.date}</span>
                                            <span>BY {post.author}</span>
                                        </div>
                                        <h5 className="mb-4">
                                            <a href="#" className="blog-title-link">{post.title}</a>
                                        </h5>
                                        <a href="#" className="btn btn-read-details text-uppercase">
                                            READ DETAILS <FaArrowRight />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default HomePage;
