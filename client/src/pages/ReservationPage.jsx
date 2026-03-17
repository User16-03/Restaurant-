import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import ReservationForm from '../components/ReservationForm';

const ReservationPage = () => {
    return (
        <div className="reservation-page">
            {/* 1. Page Header (Hero) */}
            <div className="reservation-hero d-flex align-items-center" style={{
                background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/about-hero-v2.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                position: 'relative'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-white">
                            <h1 className="display-2 fw-bold mb-0 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Reservation</h1>
                        </div>
                        <div className="col-md-6 text-md-end text-white">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-md-end text-uppercase mb-0 about-hero-breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none">GUSTO</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">RESERVATION</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Book A Table Section */}
            <section className="section-padding position-relative overflow-hidden" style={{
                background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg") no-repeat center center/cover'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 position-relative">
                            <div className="reservation-card-v3 text-center bg-black shadow-lg" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                                {/* Floating Icon */}
                                <div className="reservation-icon-top">
                                    <div className="reservation-icon-inner-v3">
                                        <FaCalendarAlt size={30} />
                                    </div>
                                </div>

                                <div className="mb-5 pt-3">
                                    <h2 className="display-5 fw-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>BOOK A TABLE</h2>
                                </div>
                                <ReservationForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* 4. Welcome Section */}
            <section className="section-padding position-relative" style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg") no-repeat center center/cover'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <span className="text-primary text-uppercase fw-bold small mb-2 d-block">WELCOME TO GUSTO</span>
                            <h2 className="display-4 fw-bold mb-4 text-white" style={{ fontFamily: 'var(--font-heading)' }}>WELCOME OUR GUSTO RESTAURANT</h2>
                            <p className="text-light mb-5" style={{ lineHeight: '1.8' }}>
                                The service at Gusto was exceptional. Our server was attentive, knowledgeable, and genuinely friendly, making sure we had everything we needed without being intrusive. It's clear that the staff here takes pride in providing top-notch service.
                            </p>

                            <div className="row g-4 justify-content-center">
                                <div className="col-md-6 text-start">
                                    <div className="welcome-info-box d-flex gap-4 align-items-center mb-4">
                                        <div className="info-icon-box flex-shrink-0">
                                            <FaClock />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1 text-white">Opening Hours</h5>
                                            <p className="small text-white opacity-75 mb-0">Lunch: 12Pm — 3Pm<br />Diner: 7Pm — 2Am (Last Order At 11:30Pm)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 text-start">
                                    <div className="welcome-info-box d-flex gap-4 align-items-center">
                                        <div className="info-icon-box flex-shrink-0">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1 text-white">Visit Our Restaurant</h5>
                                            <p className="small text-white opacity-75 mb-0">Eight avenue 487, NY,<br />T: +92 344 0567899<br />M: fidalgo@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default ReservationPage;
