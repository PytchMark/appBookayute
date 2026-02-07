import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Search, Clock, CheckCircle, XCircle, MessageSquare, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { aiService } from '../../lib/ai';

const mockLeads = [
  {
    id: '1',
    talent: 'DJ Phantom',
    client: 'Sumfest Organization',
    email: 'bookings@sumfest.com',
    phone: '+1 876 555 1234',
    eventType: 'Festival',
    eventDate: '2025-07-15',
    location: 'Montego Bay, Jamaica',
    budget: '$15,000 - $20,000',
    status: 'negotiating',
    notes: 'Looking for headline DJ set for main stage. VIP accommodation required.',
    createdAt: '2025-01-10',
  },
  {
    id: '2',
    talent: 'Blaze Rebel',
    client: 'Google UK',
    email: 'events@google.co.uk',
    phone: '+44 20 7123 4567',
    eventType: 'Brand Activation',
    eventDate: '2025-03-10',
    location: 'London, UK',
    budget: '$8,000 - $12,000',
    status: 'new',
    notes: 'Product launch event. High-energy spoken word performance needed.',
    createdAt: '2025-01-14',
  },
  {
    id: '3',
    talent: 'The Rhythm Collective',
    client: 'RBC Royal Bank',
    email: 'events@rbc.jm',
    phone: '+1 876 555 9876',
    eventType: 'Corporate Event',
    eventDate: '2025-02-28',
    location: 'Kingston, Jamaica',
    budget: '$25,000 - $30,000',
    status: 'booked',
    notes: 'Annual awards ceremony. Full band performance for 3 hours.',
    createdAt: '2025-01-08',
  },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-900/30 text-blue-400',
  contacted: 'bg-yellow-900/30 text-yellow-400',
  negotiating: 'bg-purple-900/30 text-purple-400',
  booked: 'bg-green-900/30 text-green-400',
  declined: 'bg-red-900/30 text-red-400',
  closed: 'bg-zinc-800 text-zinc-500',
};

const AdminLeads: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<typeof mockLeads[0] | null>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [aiFollowUp, setAiFollowUp] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingFollowUp, setLoadingFollowUp] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesFilter = filter === 'all' || lead.status === filter;
    const matchesSearch =
      lead.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.talent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleGenerateSummary = async (lead: typeof mockLeads[0]) => {
    setLoadingSummary(true);
    try {
      const response = await aiService.generateLeadSummary(lead);
      if (response.success && response.data) {
        setAiSummary(response.data);
      }
    } catch (error) {
      setAiSummary('Failed to generate summary');
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleGenerateFollowUp = async (lead: typeof mockLeads[0]) => {
    setLoadingFollowUp(true);
    try {
      const response = await aiService.generateFollowUp({
        clientName: lead.client,
        eventType: lead.eventType,
        messageType: 'followup',
      });
      if (response.success && response.data) {
        setAiFollowUp(response.data);
      }
    } catch (error) {
      setAiFollowUp('Failed to generate follow-up');
    } finally {
      setLoadingFollowUp(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-brand-red outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'new', 'contacted', 'negotiating', 'booked', 'declined'].map((status) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedLead(lead);
                setAiSummary('');
                setAiFollowUp('');
              }}
              className={`bg-zinc-950 border rounded-2xl p-6 cursor-pointer transition-all ${
                selectedLead?.id === lead.id ? 'border-brand-red' : 'border-zinc-900 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${statusColors[lead.status]}`}>
                    {lead.status}
                  </span>
                </div>
                <span className="text-zinc-500 text-xs">{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{lead.client}</h3>
              <p className="text-zinc-400 text-sm mb-3">Requesting: <span className="text-white">{lead.talent}</span></p>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>{lead.eventType}</span>
                <span>•</span>
                <span>{lead.location}</span>
                <span>•</span>
                <span className="text-green-400">{lead.budget}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lead Detail Panel */}
        <div className="space-y-4">
          {selectedLead ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sticky top-24"
              >
                <h3 className="font-bold text-lg mb-4">{selectedLead.client}</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-zinc-500">Contact</span>
                    <p className="text-white">{selectedLead.email}</p>
                    <p className="text-zinc-400">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Event</span>
                    <p className="text-white">{selectedLead.eventType} - {new Date(selectedLead.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-zinc-400">{selectedLead.location}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Budget</span>
                    <p className="text-green-400 font-bold">{selectedLead.budget}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Notes</span>
                    <p className="text-zinc-300 italic">"{selectedLead.notes}"</p>
                  </div>
                </div>

                {/* AI Actions */}
                <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                  <button
                    onClick={() => handleGenerateSummary(selectedLead)}
                    disabled={loadingSummary}
                    className="w-full bg-brand-red/20 text-brand-red px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-red/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loadingSummary ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    AI Lead Analysis
                  </button>
                  <button
                    onClick={() => handleGenerateFollowUp(selectedLead)}
                    disabled={loadingFollowUp}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loadingFollowUp ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                    Generate WhatsApp Follow-Up
                  </button>
                </div>
              </motion.div>

              {/* AI Output */}
              {(aiSummary || aiFollowUp) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6"
                >
                  {aiSummary && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">AI Analysis</h4>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-4 text-sm whitespace-pre-wrap">{aiSummary}</div>
                    </div>
                  )}
                  {aiFollowUp && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">WhatsApp Message</h4>
                        <button
                          onClick={() => handleCopy(aiFollowUp)}
                          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
                        >
                          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 text-sm whitespace-pre-wrap text-green-100">
                        {aiFollowUp}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </>
          ) : (
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 text-center">
              <Target className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm">Select a lead to view details and AI tools</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
