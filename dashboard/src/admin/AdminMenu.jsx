import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaUtensils } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminMenu = () => {
    const { user } = useAuth();
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuForm, setMenuForm] = useState({
        name: '', category: '', price: '', image: '', description: '', badge: ''
    });

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/menu');
            setMenuItems(data);
        } catch (error) {
            console.error('Error fetching menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post('http://localhost:5000/api/menu', menuForm, config);
            setMenuItems([...menuItems, data]);
            setMenuForm({ name: '', category: '', price: '', image: '', description: '', badge: '' });
            alert('Menu item added successfully!');
        } catch (error) {
            alert('Error adding menu item');
        }
    };

    const handleDeleteMenuItem = async (id) => {
        if (!window.confirm('Delete this dish?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/menu/${id}`, config);
            setMenuItems(menuItems.filter(item => item._id !== id));
        } catch (error) {
            alert('Error deleting item');
        }
    };

    return (
        <div className="admin-menu">
            <div className="db-card p-4 mb-4">
                <h5 className="fw-bold mb-4">Add New MenuItem</h5>
                <form onSubmit={handleAddMenuItem}>
                    <div className="row g-3">
                        <div className="col-md-6"><input type="text" className="form-control p-3 bg-light border-0" placeholder="Dish Name" value={menuForm.name} onChange={e => setMenuForm({ ...menuForm, name: e.target.value })} required /></div>
                        <div className="col-md-3"><input type="text" className="form-control p-3 bg-light border-0" placeholder="Category" value={menuForm.category} onChange={e => setMenuForm({ ...menuForm, category: e.target.value })} required /></div>
                        <div className="col-md-3"><input type="text" className="form-control p-3 bg-light border-0" placeholder="Price (e.g. $25)" value={menuForm.price} onChange={e => setMenuForm({ ...menuForm, price: e.target.value })} required /></div>
                        <div className="col-md-6"><input type="text" className="form-control p-3 bg-light border-0" placeholder="Image URL" value={menuForm.image} onChange={e => setMenuForm({ ...menuForm, image: e.target.value })} required /></div>
                        <div className="col-md-6"><input type="text" className="form-control p-3 bg-light border-0" placeholder="Badge (Optional)" value={menuForm.badge} onChange={e => setMenuForm({ ...menuForm, badge: e.target.value })} /></div>
                        <div className="col-12"><textarea className="form-control p-3 bg-light border-0" placeholder="Description" rows="2" value={menuForm.description} onChange={e => setMenuForm({ ...menuForm, description: e.target.value })}></textarea></div>
                        <div className="col-12 text-end"><button className="btn btn-primary px-4 py-3 d-inline-flex align-items-center gap-2 rounded-3"><FaPlus /> Add Dish to Menu</button></div>
                    </div>
                </form>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Existing Menu Items</h5>
                <div className="d-flex gap-2">
                    {Object.entries(menuItems.reduce((acc, item) => {
                        acc[item.category] = (acc[item.category] || 0) + 1;
                        return acc;
                    }, {})).map(([cat, count]) => (
                        <span key={cat} className="badge bg-light text-dark border small">{cat}: {count}</span>
                    ))}
                </div>
            </div>

            <div className="row g-4">
                {menuItems.map(item => (
                    <div key={item._id} className="col-xl-4 col-md-6">
                        <div className="db-card p-0 overflow-hidden h-100">
                            <img src={item.image} alt={item.name} className="w-100" style={{ height: '160px', objectFit: 'cover' }} />
                            <div className="p-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h6 className="fw-bold mb-0">{item.name}</h6>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">{item.price}</span>
                                </div>
                                <div className="small text-muted mb-3">{item.category}</div>
                                <div className="text-end border-top pt-2">
                                    <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeleteMenuItem(item._id)}><FaTrash /> Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminMenu;
