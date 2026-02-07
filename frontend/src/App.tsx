import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RosterPage from './pages/RosterPage';
import TalentProfilePage from './pages/TalentProfilePage';
import BookingRequestPage from './pages/BookingRequestPage';
import PrivateRosterPage from './pages/PrivateRosterPage';
import LoginPage from './pages/LoginPage';
import TalentDashboardRouter from './pages/dashboard';
import AdminDashboardRouter from './pages/admin';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { useAuthStore } from './lib/store';

// Layout wrapper to conditionally show nav/footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/talent/:slug" element={<TalentProfilePage />} />
          <Route path="/request/:talentId" element={<BookingRequestPage />} />
          <Route path="/r/:rosterSlug" element={<PrivateRosterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<TalentDashboardRouter />} />
          <Route path="/admin/*" element={<AdminDashboardRouter />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
