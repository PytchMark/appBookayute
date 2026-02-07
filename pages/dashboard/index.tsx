import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout, { talentNavItems } from '../../components/dashboard/DashboardLayout';
import DashboardOverview from './DashboardOverview';
import DashboardRequests from './DashboardRequests';
import DashboardProfile from './DashboardProfile';
import DashboardStudio from './DashboardStudio';
import { useAuthStore } from '../../lib/store';

const TalentDashboardRouter: React.FC = () => {
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

  // Redirect admins to admin dashboard
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Routes>
      <Route
        element={
          <DashboardLayout
            title="Member Dashboard"
            subtitle="Talent Portal"
            navItems={talentNavItems}
          />
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="requests" element={<DashboardRequests />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route path="studio" element={<DashboardStudio />} />
      </Route>
    </Routes>
  );
};

export default TalentDashboardRouter;
