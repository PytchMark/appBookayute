import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, Clock, Calendar, Sparkles, Loader2 } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import { useState } from 'react';
import { aiService } from '../../lib/ai';

const recentBookings = [
  { talent: 'DJ Phantom', client: 'Sumfest Org', status: 'Negotiating', date: 'Jan 15' },
  { talent: 'Blaze Rebel', client: 'Google UK', status: 'New Request', date: 'Jan 14' },
  { talent: 'MC Hype', client: 'RBC Royal Bank', status: 'Booked', date: 'Jan 12' },
];

const AdminOverview: React.FC = () => {
  const [insights, setInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  const handleGenerateInsights = async () => {
    setLoadingInsights(true);
    try {
      const response = await aiService.generateWeeklyInsights();
      if (response.success && response.data) {
        setInsights(response.data);
      }
    } catch (error) {
      setInsights('Failed to generate insights');
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Talents"
          value="12"
          icon={Users}
          color="blue"
          trend={{ value: 2, positive: true }}
        />
        <StatCard
          title="Pending Review"
          value="3"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Active Leads"
          value="23"
          icon={Target}
          color="red"
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="Bookings This Month"
          value="8"
          icon={Calendar}
          color="green"
          trend={{ value: 33, positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Active Booking Pipeline</h3>
            <a href="#/admin/leads" className="text-brand-red text-[10px] font-bold uppercase tracking-wider hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-900">
                  <th className="pb-4 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Talent</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Client</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Status</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {recentBookings.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-4 font-bold text-sm">{row.talent}</td>
                    <td className="py-4 text-zinc-400 text-sm">{row.client}</td>
                    <td className="py-4">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                        row.status === 'Booked' ? 'bg-green-900/30 text-green-400' :
                        row.status === 'Negotiating' ? 'bg-red-900/30 text-brand-red' :
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-zinc-500 text-sm">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Talent Pipeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
        >
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Talent Pipeline</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 text-sm">Pending Review</span>
              <span className="bg-brand-red w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 text-sm">Approved Artists</span>
              <span className="text-zinc-500 text-sm">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 text-sm">Featured</span>
              <span className="text-zinc-500 text-sm">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 text-sm">Inactive</span>
              <span className="text-zinc-500 text-sm">2</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-zinc-900">
            <a href="#/admin/talents" className="text-brand-red text-xs font-bold uppercase tracking-wider hover:underline">Manage Talents →</a>
          </div>
        </motion.div>
      </div>

      {/* AI Weekly Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-brand-red/10 to-transparent border border-brand-red/30 rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <h3 className="font-bold">AI Weekly Insights</h3>
              <p className="text-zinc-500 text-xs">AI-powered analysis and recommendations</p>
            </div>
          </div>
          <button
            onClick={handleGenerateInsights}
            disabled={loadingInsights}
            className="bg-brand-red text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loadingInsights ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate Insights</>
            )}
          </button>
        </div>
        {insights ? (
          <div className="bg-black/30 rounded-xl p-6 whitespace-pre-wrap text-sm text-zinc-300">
            {insights}
          </div>
        ) : (
          <div className="bg-black/30 rounded-xl p-6 text-center text-zinc-500">
            Click "Generate Insights" to get AI-powered analysis of your agency's performance
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminOverview;
