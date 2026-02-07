import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, CheckCircle, XCircle, Clock, Star, MoreVertical } from 'lucide-react';

const mockTalents = [
  {
    id: '1',
    stageName: 'DJ Phantom',
    email: 'phantom@music.com',
    city: 'Kingston',
    country: 'Jamaica',
    categories: ['DJ'],
    status: 'approved',
    featured: true,
    tier: 'PRO',
    createdAt: '2024-06-15',
  },
  {
    id: '2',
    stageName: 'Blaze Rebel',
    email: 'blaze@poetry.com',
    city: 'London',
    country: 'UK',
    categories: ['Poet'],
    status: 'approved',
    featured: false,
    tier: 'STARTER',
    createdAt: '2024-08-20',
  },
  {
    id: '3',
    stageName: 'The Rhythm Collective',
    email: 'band@rhythm.com',
    city: 'New York',
    country: 'USA',
    categories: ['Band'],
    status: 'approved',
    featured: true,
    tier: 'ELITE',
    createdAt: '2024-09-10',
  },
  {
    id: '4',
    stageName: 'Zara Vibes',
    email: 'zara@vibes.com',
    city: 'Miami',
    country: 'USA',
    categories: ['Singer'],
    status: 'pending',
    featured: false,
    tier: 'FREE',
    createdAt: '2025-01-10',
  },
  {
    id: '5',
    stageName: 'MC Hype',
    email: 'mchype@host.com',
    city: 'Toronto',
    country: 'Canada',
    categories: ['Host'],
    status: 'pending',
    featured: false,
    tier: 'FREE',
    createdAt: '2025-01-12',
  },
];

const statusColors: Record<string, string> = {
  approved: 'bg-green-900/30 text-green-400',
  pending: 'bg-yellow-900/30 text-yellow-400',
  rejected: 'bg-red-900/30 text-red-400',
  draft: 'bg-zinc-800 text-zinc-500',
};

const tierColors: Record<string, string> = {
  FREE: 'bg-zinc-800 text-zinc-400',
  STARTER: 'bg-blue-900/30 text-blue-400',
  PRO: 'bg-purple-900/30 text-purple-400',
  ELITE: 'bg-brand-red/20 text-brand-red',
};

const AdminTalents: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTalents = mockTalents.filter((talent) => {
    const matchesFilter = filter === 'all' || talent.status === filter;
    const matchesSearch =
      talent.stageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = mockTalents.filter(t => t.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search talents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-brand-red outline-none transition-all w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  filter === status
                    ? 'bg-brand-red text-white'
                    : 'bg-zinc-900 text-zinc-500 hover:text-white'
                }`}
              >
                {status}
                {status === 'pending' && pendingCount > 0 && (
                  <span className="bg-yellow-500 text-black w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-brand-red text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all">
          + Invite Talent
        </button>
      </div>

      {/* Talents Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-900">
              <th className="text-left p-6 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Talent</th>
              <th className="text-left p-6 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Category</th>
              <th className="text-left p-6 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Status</th>
              <th className="text-left p-6 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Tier</th>
              <th className="text-left p-6 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Joined</th>
              <th className="text-right p-6 text-[10px] uppercase tracking-widest text-zinc-500 font-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {filteredTalents.map((talent, index) => (
              <motion.tr
                key={talent.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-zinc-900/50 transition-colors"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-800 rounded-lg overflow-hidden">
                      <img
                        src={`https://picsum.photos/seed/${talent.id}/100/100`}
                        alt={talent.stageName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{talent.stageName}</span>
                        {talent.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <span className="text-zinc-500 text-xs">{talent.city}, {talent.country}</span>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-zinc-400 text-sm">{talent.categories.join(', ')}</span>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${statusColors[talent.status]}`}>
                    {talent.status}
                  </span>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${tierColors[talent.tier]}`}>
                    {talent.tier}
                  </span>
                </td>
                <td className="p-6 text-zinc-500 text-sm">
                  {new Date(talent.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {talent.status === 'pending' && (
                      <>
                        <button className="p-2 bg-green-900/30 text-green-400 rounded-lg hover:bg-green-900/50 transition-all">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-all">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700 transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {filteredTalents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">No talents match your criteria</p>
        </div>
      )}
    </div>
  );
};

export default AdminTalents;
