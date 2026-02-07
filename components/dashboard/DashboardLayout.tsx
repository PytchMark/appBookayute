import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  Sparkles, 
  Users, 
  Target, 
  BarChart3, 
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../lib/store';
import { isSupabaseConfigured } from '../../lib/supabase';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

interface DashboardLayoutProps {
  title: string;
  subtitle: string;
  navItems: NavItem[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, subtitle, navItems }) => {
  const { user, logout, supabaseConfigured } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/#/login';
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-900">
          <h1 className="text-xl font-black tracking-tighter">
            BOOK-A-<span className="text-brand-red">YUTE</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 mt-1 font-bold">
            {subtitle}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20'
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-zinc-900 space-y-4">
          {!supabaseConfigured && (
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-[9px] uppercase tracking-wider text-yellow-500 font-bold">Demo Mode</span>
            </div>
          )}
          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-zinc-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.full_name || 'User'}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-red-900/50 text-zinc-400 hover:text-red-400 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-900 px-8 py-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black uppercase tracking-tighter"
          >
            {title}
          </motion.h1>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

// Talent Dashboard Navigation Items
export const talentNavItems: NavItem[] = [
  { to: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Overview', end: true },
  { to: '/dashboard/requests', icon: <MessageSquare className="w-4 h-4" />, label: 'Requests' },
  { to: '/dashboard/profile', icon: <User className="w-4 h-4" />, label: 'Profile' },
  { to: '/dashboard/studio', icon: <Sparkles className="w-4 h-4" />, label: 'AI Studio' },
];

// Admin Dashboard Navigation Items
export const adminNavItems: NavItem[] = [
  { to: '/admin', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Overview', end: true },
  { to: '/admin/talents', icon: <Users className="w-4 h-4" />, label: 'Talents' },
  { to: '/admin/leads', icon: <Target className="w-4 h-4" />, label: 'Leads' },
  { to: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" />, label: 'Analytics' },
];
