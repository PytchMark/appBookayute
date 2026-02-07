import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-zinc-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm max-w-md mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-brand-red text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
