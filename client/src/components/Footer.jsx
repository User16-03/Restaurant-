import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowUp, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="mt-auto">
            {/* CTA Section */}
            <div className="position-relative py-5 d-flex align-items-center" style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '250px'
            }}>
                <div className="container position-relative z-1 text-center text-md-start">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <h2 className="display-5 text-white fw-bold mb-3 mb-md-0" style={{ fontFamily: 'var(--font-heading)' }}>NEED A TABLE FOR RESERVATION</h2>
                        <Link to="/services" className="btn btn-primary rounded-0 px-5 py-3 fw-bold">DISCOVER MENUS</Link>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="text-white pt-5 pb-4 footer-with-bg" style={{ backgroundColor: 'var(--secondary-color)' }}>
                <div className="container pt-4 position-relative z-1">
                    <div className="row g-5">
                        {/* Column 1: Brand */}
                        <div className="col-lg-3 col-md-6">
                            <h2 className="fw-bold mb-4" style={{ letterSpacing: '-1px' }}>GUSTO</h2>
                            <p className="text-secondary mb-4" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
                                Experience the finest global cuisine at Gusto. We are dedicated to providing an unforgettable dining experience with fresh ingredients and exceptional service.
                            </p>
                            <div className="d-flex gap-2">
                                <a href="#" className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center border border-secondary text-secondary social-icon" style={{ width: '40px', height: '40px' }}>
                                    <FaFacebookF size={14} />
                                </a>
                                <a href="#" className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center border border-secondary text-secondary social-icon" style={{ width: '40px', height: '40px' }}>
                                    <FaTwitter size={14} />
                                </a>
                                <a href="#" className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center border border-secondary text-secondary social-icon" style={{ width: '40px', height: '40px' }}>
                                    <FaLinkedinIn size={14} />
                                </a>
                                <a href="#" className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center border border-secondary text-secondary social-icon" style={{ width: '40px', height: '40px' }}>
                                    <FaInstagram size={14} />
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Explore Menu */}
                        <div className="col-lg-3 col-md-6">
                            <h4 className="fw-bold mb-4">Explore Menu</h4>
                            <ul className="list-unstyled text-secondary">
                                {['White Castle', 'Beef Sandwich', 'Cherry Limeade', 'Wendy\'s Frosty', 'Pumpkin Spice'].map((item, index) => (
                                    <li key={index} className="mb-3 d-flex align-items-center">
                                        <FaArrowRight className="me-2 text-white small" size={10} />
                                        <a href="#" className="text-secondary text-decoration-none hover-primary">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Get In Touch */}
                        <div className="col-lg-3 col-md-6">
                            <h4 className="fw-bold mb-4">Get In Touch</h4>
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 pt-1">
                                    <div className="bg-secondary bg-opacity-10 p-2 rounded-circle text-secondary">
                                        <FaMapMarkerAlt />
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-primary mb-1 fw-bold small text-uppercase">Location:</h6>
                                    <span className="text-secondary small">123 Culinary Ave, Food District, New York, NY 10001</span>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 pt-1">
                                    <div className="bg-secondary bg-opacity-10 p-2 rounded-circle text-secondary">
                                        <FaPhoneAlt />
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-primary mb-1 fw-bold small text-uppercase">Phone Number:</h6>
                                    <span className="text-secondary small">+1 (123) 456-7890</span>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 pt-1">
                                    <div className="bg-secondary bg-opacity-10 p-2 rounded-circle text-secondary">
                                        <FaEnvelope />
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-primary mb-1 fw-bold small text-uppercase">Email Address:</h6>
                                    <span className="text-secondary small">hello@gustofood.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Gallery */}
                        <div className="col-lg-3 col-md-6">
                            <h4 className="fw-bold mb-4">Gallery</h4>
                            <div className="row g-2">
                                {[
                                    "https://images.pexels.com/photos/32754750/pexels-photo-32754750.jpeg",
                                    "https://images.pexels.com/photos/12325123/pexels-photo-12325123.jpeg",
                                    "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
                                    "https://images.pexels.com/photos/33240983/pexels-photo-33240983.jpeg",
                                    "https://images.pexels.com/photos/8743877/pexels-photo-8743877.jpeg",
                                    "https://images.pexels.com/photos/30133542/pexels-photo-30133542.jpeg"
                                ].map((url, index) => (
                                    <div key={index} className="col-4">
                                        <div className="footer-gallery-img-wrapper" style={{ height: '70px', overflow: 'hidden' }}>
                                            <img
                                                src={url}
                                                alt="Gallery"
                                                className="img-fluid rounded-1 w-100 h-100 object-fit-cover"
                                                style={{ transition: 'transform 0.3s ease' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="container mt-5">
                    <div className="row align-items-center border-top border-secondary border-opacity-25 pt-4">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="text-secondary small mb-0">&copy; 2024 Gusto. All Rights Reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="d-flex justify-content-center justify-content-md-end gap-4 align-items-center">
                                <a href="#" className="text-secondary text-decoration-none small">Terms of use</a>
                                <a href="#" className="text-secondary text-decoration-none small">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll To Top */}
                <button
                    onClick={scrollToTop}
                    className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-1 p-3 shadow"
                    style={{ zIndex: 100 }}
                >
                    <FaArrowUp />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
