import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminMessages = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/contact', config);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/contact/${id}`, config);
            setMessages(messages.filter(msg => msg._id !== id));
        } catch (error) {
            alert('Error deleting message');
        }
    };

    return (
        <div className="admin-messages">
            <div className="row g-4">
                {messages.length > 0 ? messages.map(msg => (
                    <div key={msg._id} className="col-lg-6">
                        <div className="db-card p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="bg-light p-2 rounded-circle">
                                        <FaEnvelope className="text-primary" />
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-0">{msg.name}</h6>
                                        <small className="text-muted">{msg.email} • {new Date(msg.createdAt).toLocaleDateString()}</small>
                                    </div>
                                </div>
                                <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeleteMessage(msg._id)}><FaTrash /></button>
                            </div>
                            <div className="p-3 bg-light rounded-3 small" style={{ lineHeight: '1.6' }}>
                                {msg.message}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-12 text-center py-5">
                        <div className="opacity-25 mb-3"><FaEnvelope size={48} /></div>
                        <h6 className="text-muted">No messages yet.</h6>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMessages;
