import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout, { adminNavItems } from '../../components/dashboard/DashboardLayout';
import AdminOverview from './AdminOverview';
import AdminTalents from './AdminTalents';
import AdminLeads from './AdminLeads';
import AdminAnalytics from './AdminAnalytics';
import { useAuthStore } from '../../lib/store';

const AdminDashboardRouter: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect non-admins to talent dashboard
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route
        element={
          <DashboardLayout
            title="Admin Dashboard"
            subtitle="Agency Admin"
            navItems={adminNavItems}
          />
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="talents" element={<AdminTalents />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboardRouter;
