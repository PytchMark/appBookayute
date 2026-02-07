import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter } from 'lucide-react';
import EmptyState from '../../components/dashboard/EmptyState';

const mockRequests = [
  {
    id: '1',
    event: 'Reggae Sumfest 2025',
    client: 'Sumfest Organization',
    email: 'bookings@sumfest.com',
    eventType: 'Festival',
    eventDate: '2025-07-15',
    status: 'negotiating',
    notes: 'Looking for headline DJ set. Budget: $15,000-20,000',
    createdAt: '2025-01-10',
  },
  {
    id: '2',
    event: 'Corporate Gala - Kingston',
    client: 'RBC Jamaica',
    email: 'events@rbc.jm',
    eventType: 'Corporate Event',
    eventDate: '2025-02-28',
    status: 'contacted',
    notes: 'Annual awards ceremony. VIP crowd.',
    createdAt: '2025-01-12',
  },
  {
    id: '3',
    event: 'Brand Launch Event',
    client: 'Google UK',
    email: 'events@google.co.uk',
    eventType: 'Brand Activation',
    eventDate: '2025-03-10',
    status: 'new',
    notes: 'New product launch. High-energy performance needed.',
    createdAt: '2025-01-15',
  },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-900/30 text-blue-400',
  contacted: 'bg-yellow-900/30 text-yellow-400',
  negotiating: 'bg-red-900/30 text-brand-red',
  booked: 'bg-green-900/30 text-green-400',
  declined: 'bg-zinc-800 text-zinc-500',
};

const statusIcons: Record<string, React.ReactNode> = {
  new: <Clock className="w-4 h-4" />,
  contacted: <CheckCircle className="w-4 h-4" />,
  negotiating: <AlertCircle className="w-4 h-4" />,
  booked: <CheckCircle className="w-4 h-4" />,
  declined: <XCircle className="w-4 h-4" />,
};

const DashboardRequests: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = mockRequests.filter((req) => {
    const matchesFilter = filter === 'all' || req.status === filter;
    const matchesSearch =
      req.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (mockRequests.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No Booking Requests Yet"
        description="When clients submit booking inquiries for your profile, they'll appear here. Share your profile to start receiving requests."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-brand-red outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'new', 'contacted', 'negotiating', 'booked'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                filter === status
                  ? 'bg-brand-red text-white'
                  : 'bg-zinc-900 text-zinc-500 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 hover:border-zinc-800 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${statusColors[request.status]}`}>
                    {statusIcons[request.status]}
                    {request.status}
                  </span>
                  <span className="text-zinc-600 text-[10px] uppercase tracking-wider">{request.eventType}</span>
                </div>
                <h3 className="text-xl font-bold">{request.event}</h3>
                <p className="text-zinc-400 text-sm">{request.client}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{new Date(request.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <p className="text-zinc-500 text-xs mt-1">Event Date</p>
              </div>
            </div>
            {request.notes && (
              <div className="mt-4 pt-4 border-t border-zinc-900">
                <p className="text-zinc-500 text-sm italic">"{request.notes}"</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500">No requests match your criteria</p>
        </div>
      )}
    </div>
  );
};

export default DashboardRequests;
