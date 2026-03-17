import { Link } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaUtensils, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="about-page">
            {/* 1. Page Header (Hero) */}
            <div className="about-hero d-flex align-items-center" style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                position: 'relative'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-white">
                            <h1 className="display-2 fw-bold mb-0 text-white" style={{ fontFamily: 'var(--font-heading)' }}>About</h1>
                        </div>
                        <div className="col-md-6 text-md-end text-white">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-md-end text-uppercase mb-0 about-hero-breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. About GUSTO Content */}
            <section className="section-padding bg-black">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <span className="section-label" style={{ color: 'var(--primary-color)' }}>ABOUT GUSTO</span>
                            <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>PROVIDE GLOBAL CUISINE AT YOUR FINGERTIPS</h2>
                            <p className="text-white mb-5 px-lg-5" style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.85 }}>
                                At Gusto, we bring the finest flavors from around the world straight to your table. Our passionate chefs craft each dish using the freshest ingredients, blending traditional techniques with modern creativity to deliver an unforgettable dining experience that celebrates global cuisine at its finest.
                            </p>
                            <Link to="/about" className="btn btn-primary rounded-0 px-5 py-3 fw-bold text-uppercase" style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}>BOOK A TABLE</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. About Video Section */}
            <section className="position-relative overflow-hidden" style={{ height: '500px' }}>
                <img src="https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg" className="w-100 h-100 object-fit-cover" alt="Restaurant Interior" />
                <div className="about-video-play-btn">
                    <FaPlay className="ms-1" />
                </div>
            </section>

            {/* 4. Why People Choose Us Section */}
            <section className="section-padding bg-black">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-label" style={{ color: 'var(--primary-color)' }}>WHY CHOICE US?</span>
                        <h2 className="display-4 fw-bold mb-0" style={{ fontFamily: 'var(--font-heading)' }}>WHY PEOPLE CHOOSE US?</h2>
                    </div>

                    <div className="row g-4">
                        {/* Feature 1 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="about-feature-box text-center">
                                <div className="about-feature-icon-circle" style={{ backgroundColor: '#ff6b1b' }}>
                                    <FaUtensils />
                                </div>
                                <h4 className="fw-bold mb-3 text-white">Fresh Authentic Flavors</h4>
                                <p className="small px-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                        Every dish at Gusto is prepared with hand-picked, farm-fresh ingredients to deliver bold, authentic flavors that celebrate culinary traditions from around the globe.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="about-feature-box text-center">
                                <div className="about-feature-icon-circle" style={{ backgroundColor: '#ff6b1b' }}>
                                    <FaStar />
                                </div>
                                <h4 className="fw-bold mb-3 text-white">Inviting Atmosphere</h4>
                                <p className="small px-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    Step into a warm, elegantly designed space that sets the perfect mood for every occasion — from intimate dinners to joyful celebrations with family and friends.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="col-lg-4 col-md-6 mx-auto">
                            <div className="about-feature-box text-center">
                                <div className="about-feature-icon-circle" style={{ backgroundColor: '#ff6b1b' }}>
                                    <FaUtensils />
                                </div>
                                <h4 className="fw-bold mb-3 text-white">Experienced Chefs</h4>
                                <p className="small px-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    Our world-class chefs bring years of expertise and passion to every plate, crafting exquisite dishes that blend innovation with time-honored culinary techniques.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Visit / Reservation Info Cards */}
            <section className="bg-black">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <div className="dark-info-card" style={{ backgroundColor: 'var(--secondary-color)' }}>
                                <span className="card-label">VISIT GUSTO RESTAURANT</span>
                                <h2 className="card-title fw-bold">VISIT GUSTO</h2>
                                <p className="mb-4">
                                    Address: City Name, Road 123, Floor 3, New York<br />
                                    Phone No: +01 123 456 789
                                </p>
                                <div className="bg-primary mx-auto mb-4" style={{ height: '2px', width: '40px' }}></div>
                                <p className="mb-4 text-white fw-bold">OPEN HOURS</p>
                                <p className="mb-5">
                                    Mon - Fri: 10:00 AM - 11:00 PM<br />
                                    Sat - Sun: 10:00 AM - 12:00 PM
                                </p>
                                <Link to="/contact" className="btn btn-primary rounded-0 px-4 py-3 fw-bold" style={{ backgroundColor: '#ff6b1b', border: 'none' }}>GET IN TOUCH</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="dark-info-card" style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <span className="card-label">BOOK A TABLE</span>
                                <h2 className="card-title fw-bold">RESERVATION</h2>
                                <p className="mb-5">
                                    Making a reservation at Gusto is a seamless experience, whether it's for an intimate diner.
                                </p>
                                <div className="bg-primary mx-auto mb-4" style={{ height: '2px', width: '40px' }}></div>
                                <p className="mb-4 text-white fw-bold">BOOKING INFO</p>
                                <p className="mb-5">
                                    Email: contact@gusto.com<br />
                                    Call Us: +01 123 456 789
                                </p>
                                <Link to="/reservation" className="btn btn-primary rounded-0 px-4 py-3 fw-bold" style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}>ONLINE RESERVATION</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Team Members Section */}
            <section className="section-padding team-section bg-black">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-label" style={{ color: 'var(--primary-color)' }}>TEAM MEMBERS</span>
                        <h2 className="display-4 fw-bold" style={{ fontFamily: 'var(--font-heading)' }}>MEET OUR PROFESSIONALS</h2>
                    </div>

                    <div className="row g-4">
                        {/* Member 1 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="team-card card h-100 rounded-0 shadow-sm border-0 bg-dark">
                                <div className="team-img-container">
                                    <div className="team-plus-btn">+</div>
                                    <img src="https://images.pexels.com/photos/8629100/pexels-photo-8629100.jpeg" className="w-100 h-100 object-fit-cover" alt="Edward Robert" />
                                </div>
                                <div className="card-body p-4">
                                    <h4 className="team-name text-white">Edward Robert</h4>
                                    <p className="team-role mb-3 text-uppercase" style={{ color: '#ff6b1b' }}>Executive Chef</p>
                                    <p className="team-desc mb-0 text-white opacity-75">
                                        With over 15 years of experience in Michelin-starred kitchens, Edward leads our team with a passion for seasonal ingredients and innovative global techniques.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Member 2 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="team-card card h-100 rounded-0 shadow-sm border-0 bg-dark">
                                <div className="team-img-container">
                                    <div className="team-plus-btn">+</div>
                                    <img src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg" className="w-100 h-100 object-fit-cover" alt="Markus Daniel" />
                                </div>
                                <div className="card-body p-4">
                                    <h4 className="team-name text-white">Markus Daniel</h4>
                                    <p className="team-role mb-3 text-uppercase" style={{ color: '#ff6b1b' }}>Sous Chef</p>
                                    <p className="team-desc mb-0 text-white opacity-75">
                                        Markus specializes in contemporary plating and bold flavor profiles, bringing a creative touch to every signature dish served at Gusto.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Member 3 */}
                        <div className="col-lg-4 col-md-6 mx-auto">
                            <div className="team-card card h-100 rounded-0 shadow-sm border-0 bg-dark">
                                <div className="team-img-container">
                                    <div className="team-plus-btn">+</div>
                                    <img src="https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg" className="w-100 h-100 object-fit-cover" alt="Thomas Samuel" />
                                </div>
                                <div className="card-body p-4">
                                    <h4 className="team-name text-white">Thomas Samuel</h4>
                                    <p className="team-role mb-3 text-uppercase" style={{ color: '#ff6b1b' }}>Pastry Chef</p>
                                    <p className="team-desc mb-0 text-white opacity-75">
                                        Thomas is a master of dessert artistry, dedicated to crafting sweet finales that are as visually stunning as they are delicious.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
