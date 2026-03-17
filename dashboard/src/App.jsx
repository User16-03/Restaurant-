import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import AdminLayout from './layouts/AdminLayout';
import AdminHome from './admin/AdminHome';
import AdminMenu from './admin/AdminMenu';
import AdminReservations from './admin/AdminReservations';
import AdminUsers from './admin/AdminUsers';
import AdminMessages from './admin/AdminMessages';
import AdminInfo from './admin/AdminInfo';

import UserLayout from './layouts/UserLayout';
import UserHome from './user/UserHome';
import UserBookings from './user/UserBookings';
import UserProfile from './user/UserProfile';

import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Root Redirect - Default to Login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Admin Dashboard */}
                    <Route path="/admin" element={
                        <ProtectedRoute role="admin">
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<AdminHome />} />
                        <Route path="menu" element={<AdminMenu />} />
                        <Route path="reservations" element={<AdminReservations />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="messages" element={<AdminMessages />} />
                        <Route path="info" element={<AdminInfo />} />
                    </Route>

                    {/* User Dashboard */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <UserLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<UserHome />} />
                        <Route path="bookings" element={<UserBookings />} />
                        <Route path="profile" element={<UserProfile />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
