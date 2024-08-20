// src/components/Admin/AdminPanel.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const AdminPanel: React.FC = () => {
    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <nav>
                <ul>
                    <li><Link to="categories"> Categories</Link></li>
                    <li><Link to="books"> Books</Link></li>
                    <li><Link to="authors"> Authors</Link></li>
                </ul>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    );
};
