import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';

const recentRequests = [
  { id: 1, event: 'Reggae Sumfest', date: 'Oct 12', status: 'Negotiating', client: 'Sumfest Org' },
  { id: 2, event: 'Corporate Gala - Kingston', date: 'Oct 15', status: 'Contacted', client: 'RBC Jamaica' },
  { id: 3, event: 'Brand Launch Event', date: 'Oct 20', status: 'New', client: 'Google UK' },
];

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Bookings"
          value="3"
          icon={Calendar}
          color="red"
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="This Month's Revenue"
          value="$12,450"
          icon={TrendingUp}
          color="green"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Profile Views"
          value="2,847"
          icon={Users}
          color="blue"
          trend={{ value: 23, positive: true }}
        />
        <StatCard
          title="Avg Response Time"
          value="< 4hrs"
          icon={Clock}
          color="default"
        />
      </div>

      {/* Agency Representation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
      >
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Active Representation</h3>
        <div className="flex items-center gap-6 p-6 bg-zinc-900 rounded-xl">
          <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/30 rounded-xl flex items-center justify-center">
            <span className="text-brand-red font-black text-xl">P.A.Y</span>
          </div>
          <div>
            <p className="font-bold text-white uppercase text-sm">Push A Yute Entertainment</p>
            <p className="text-zinc-500 text-xs mt-1">Primary Agent: Marcus Thorne</p>
            <button className="text-brand-red text-xs mt-2 underline hover:no-underline">Contact Representative</button>
          </div>
        </div>
      </motion.div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Recent Booking Requests</h3>
          <a href="#/dashboard/requests" className="text-brand-red text-[10px] font-bold uppercase tracking-wider hover:underline">View All</a>
        </div>
        <div className="space-y-4">
          {recentRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                  {request.status === 'Negotiating' ? (
                    <AlertCircle className="w-5 h-5 text-brand-red" />
                  ) : request.status === 'Contacted' ? (
                    <CheckCircle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{request.event}</p>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{request.client} • {request.date}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg ${
                  request.status === 'Negotiating'
                    ? 'bg-red-900/30 text-brand-red'
                    : request.status === 'Contacted'
                    ? 'bg-yellow-900/30 text-yellow-400'
                    : 'bg-blue-900/30 text-blue-400'
                }`}
              >
                {request.status}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-zinc-600 text-[10px] uppercase tracking-widest font-bold text-center">
          *All negotiations are handled by Push A Yute on your behalf.
        </p>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
