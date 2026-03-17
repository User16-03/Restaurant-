import { Link } from 'react-router-dom';
import { FaUtensils, FaCoffee, FaWineGlassAlt, FaConciergeBell, FaBirthdayCake, FaCar } from 'react-icons/fa';
import ServiceCard from '../components/ServiceCard';

const ServicesPage = () => {
    const services = [
        {
            id: 1,
            icon: <FaUtensils />,
            title: "Quality Food",
            description: "We serve the best food in town, prepared with fresh ingredients and love."
        },
        {
            id: 2,
            icon: <FaCoffee />,
            title: "Private Event",
            description: "Host your private events with us. We provide the best environment and service."
        },
        {
            id: 3,
            icon: <FaWineGlassAlt />,
            title: "Custom Recipes",
            description: "Our chefs can prepare custom recipes based on your dietary requirements."
        },
        {
            id: 4,
            icon: <FaConciergeBell />,
            title: "Fast Delivery",
            description: "Enjoy our delicious food at the comfort of your home with our fast delivery service."
        },
        {
            id: 5,
            icon: <FaBirthdayCake />,
            title: "Birthday Parties",
            description: "Celebrate your special day with us. We offer special packages for birthday parties."
        },
        {
            id: 6,
            icon: <FaCar />,
            title: "Free Parking",
            description: "We provide ample free parking space for our customers for a hassle-free experience."
        }
    ];

    return (
        <div className="services-page">
            {/* Page Header */}
            <div className="page-header d-flex align-items-center justify-content-center" style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '350px'
            }}>
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bold">Our Services</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center text-uppercase">
                            <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li className="breadcrumb-item text-warning active" aria-current="page">Services</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Services Grid */}
            <section className="section-padding bg-black">
                <div className="container">
                    <div className="row g-4">
                        {services.map(service => (
                            <ServiceCard key={service.id} {...service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Offer */}
            <section className="section-padding bg-black text-center">
                <div className="container">
                    <h5 className="text-warning text-uppercase mb-2">Special Offer</h5>
                    <h2 className="display-5 fw-bold mb-4">Get 20% Off For Your First Visit</h2>
                    <p className="lead text-muted mb-5 col-lg-8 mx-auto">
                        We want to welcome you to our restaurant. Experience the best dining with a special discount on your first order.
                    </p>
                    <Link to="/reservation" className="btn btn-primary rounded-pill px-5 py-3 fs-5 fw-bold">Book Now</Link>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
