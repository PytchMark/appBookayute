import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Target, Calendar, DollarSign } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue (MTD)"
          value="$48,250"
          icon={DollarSign}
          color="green"
          trend={{ value: 23, positive: true }}
        />
        <StatCard
          title="Conversion Rate"
          value="34%"
          icon={TrendingUp}
          color="blue"
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Avg Booking Value"
          value="$6,031"
          icon={Target}
          color="default"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Active Talents"
          value="12"
          icon={Users}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bookings by Month */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
        >
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Bookings by Month
          </h3>
          <div className="space-y-4">
            {[
              { month: 'Jan', bookings: 8, revenue: 48250 },
              { month: 'Dec', bookings: 6, revenue: 38000 },
              { month: 'Nov', bookings: 5, revenue: 31500 },
              { month: 'Oct', bookings: 7, revenue: 42000 },
              { month: 'Sep', bookings: 4, revenue: 24000 },
            ].map((data, i) => (
              <div key={data.month} className="flex items-center gap-4">
                <span className="w-10 text-zinc-500 text-sm">{data.month}</span>
                <div className="flex-1 h-8 bg-zinc-900 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.bookings / 10) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="h-full bg-brand-red rounded-lg"
                  />
                </div>
                <span className="w-8 text-white font-bold text-sm">{data.bookings}</span>
                <span className="w-20 text-green-400 text-sm text-right">${(data.revenue / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Performing Talents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
        >
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Top Performing Talents
          </h3>
          <div className="space-y-4">
            {[
              { name: 'DJ Phantom', bookings: 12, revenue: 28500, growth: 45 },
              { name: 'The Rhythm Collective', bookings: 8, revenue: 42000, growth: 32 },
              { name: 'Blaze Rebel', bookings: 6, revenue: 15000, growth: 18 },
              { name: 'MC Hype', bookings: 5, revenue: 12500, growth: 25 },
            ].map((talent, i) => (
              <div key={talent.name} className="flex items-center gap-4 p-4 bg-zinc-900 rounded-xl">
                <span className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-sm font-bold text-zinc-400">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-bold">{talent.name}</p>
                  <p className="text-zinc-500 text-xs">{talent.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">${(talent.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-green-400 text-xs">+{talent.growth}%</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
      >
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Bookings by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { category: 'DJ', count: 15, percent: 38 },
            { category: 'Band', count: 10, percent: 25 },
            { category: 'Host', count: 6, percent: 15 },
            { category: 'Poet', count: 4, percent: 10 },
            { category: 'Singer', count: 3, percent: 8 },
            { category: 'Dancer', count: 2, percent: 5 },
          ].map((cat) => (
            <div key={cat.category} className="bg-zinc-900 rounded-xl p-6 text-center">
              <p className="text-3xl font-black text-white mb-2">{cat.count}</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">{cat.category}</p>
              <p className="text-brand-red text-xs font-bold">{cat.percent}%</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Regional Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
      >
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Regional Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { region: 'Jamaica', bookings: 18, revenue: 45000, flag: '🇯🇲' },
            { region: 'United Kingdom', bookings: 12, revenue: 32000, flag: '🇬🇧' },
            { region: 'United States', bookings: 8, revenue: 28000, flag: '🇺🇸' },
          ].map((region) => (
            <div key={region.region} className="p-6 bg-zinc-900 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{region.flag}</span>
                <div>
                  <p className="font-bold">{region.region}</p>
                  <p className="text-zinc-500 text-xs">{region.bookings} bookings</p>
                </div>
              </div>
              <p className="text-2xl font-black text-green-400">${(region.revenue / 1000).toFixed(0)}k</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
