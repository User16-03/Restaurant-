import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/auth/users', config);
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [user.token]);

    return (
        <div className="admin-users">
            <div className="db-card">
                <div className="db-card-header">
                    <h5 className="fw-bold mb-0">Registered Platform Users</h5>
                    <span className="badge bg-warning text-dark">{users.length} Users</span>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3 border-0">User info</th>
                                <th className="py-3 border-0">Role</th>
                                <th className="py-3 border-0">Joined Date</th>
                                <th className="px-4 py-3 border-0 text-end">Account ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <FaUserCircle className="text-muted opacity-25" size={32} />
                                            <div>
                                                <div className="fw-bold">{u.name}</div>
                                                <div className="small text-muted">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-success'} bg-opacity-10 ${u.role === 'admin' ? 'text-danger' : 'text-success'} rounded-pill px-3 py-2`}>
                                            {u.role?.toUpperCase() || 'USER'}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        {new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <code className="small text-muted">{u._id.substring(0, 8)}...</code>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
