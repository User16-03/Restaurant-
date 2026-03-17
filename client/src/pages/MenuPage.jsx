import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaEye, FaShoppingCart, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const MenuPage = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/menu');
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const filters = ['ALL', ...new Set(menuItems.map(item => item.category))];

    const filteredItems = activeFilter === 'ALL'
        ? menuItems
        : menuItems.filter(item => item.category === activeFilter);

    return (
        <div className="menu-page">
            {/* 1. Page Header (Hero) */}
            <div className="menu-hero d-flex align-items-center" style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                position: 'relative'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-white">
                            <h1 className="display-2 fw-bold mb-0 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Food Menu</h1>
                        </div>
                        <div className="col-md-6 text-md-end text-white">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-md-end text-uppercase mb-0 about-hero-breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none">GUSTO</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">FOOD MENU</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Menu Section with Filters */}
            <section className="section-padding bg-black">
                <div className="container">
                    {/* Filters */}
                    <div className="d-flex justify-content-center flex-wrap gap-3 mb-5 py-4 px-3 rounded-pill bg-black mx-auto" style={{ maxWidth: '800px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {filters.map(filter => (
                            <button
                                key={filter}
                                className={`menu-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Food Grid */}
                    <div className="row g-4">
                        {filteredItems.map(item => (
                            <div key={item.id} className="col-lg-3 col-md-6">
                                <div className="menu-item-card text-center h-100 border-0 bg-transparent">
                                    <div className="position-relative menu-img-container mb-4">
                                        {item.badge && <span className="menu-badge-rect">{item.badge}</span>}
                                        <div className="menu-item-actions-v3">
                                            <button className="menu-btn-square"><FaEye size={14} /></button>
                                            <button className="menu-btn-square"><FaShoppingCart size={14} /></button>
                                        </div>
                                        <div className="plate-shadow">
                                            <img src={item.image} className="item-plate-img" alt={item.name} />
                                        </div>
                                    </div>
                                    <div className="menu-item-info">
                                        <h5 className="menu-item-title-v3">{item.name}</h5>
                                        {item.rating && (
                                            <div className="text-primary mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} size={12} className={i < item.rating ? 'text-primary' : 'text-muted'} />
                                                ))}
                                            </div>
                                        )}
                                        <p className="menu-item-price-v3">{item.price}</p>
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

export default MenuPage;
