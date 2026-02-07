import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'default';
}

const colorClasses = {
  red: 'bg-red-900/20 border-red-800/30 text-red-400',
  green: 'bg-green-900/20 border-green-800/30 text-green-400',
  blue: 'bg-blue-900/20 border-blue-800/30 text-blue-400',
  yellow: 'bg-yellow-900/20 border-yellow-800/30 text-yellow-400',
  default: 'bg-zinc-900/50 border-zinc-800 text-zinc-400',
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'default',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 hover:border-zinc-800 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              trend.positive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}
          >
            {trend.positive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">{title}</h3>
      <p className="text-3xl font-black tracking-tight">{value}</p>
      {subtitle && <p className="text-xs text-zinc-600 mt-2">{subtitle}</p>}
    </motion.div>
  );
};

export default StatCard;
