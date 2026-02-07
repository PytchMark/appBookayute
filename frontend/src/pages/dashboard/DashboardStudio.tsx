import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  MessageSquare, 
  ListChecks, 
  Mic, 
  Music, 
  Target, 
  Lock,
  Send,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { aiService } from '../../lib/ai';

interface AIModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  comingSoon?: boolean;
}

const modules: AIModule[] = [
  {
    id: 'session-recap',
    title: 'Session Recap Generator',
    description: 'Convert session notes into professional summaries with action items',
    icon: <FileText className="w-6 h-6" />,
    available: true,
  },
  {
    id: 'take-log',
    title: 'AI Take Logger',
    description: 'Transform raw session notes into structured take logs',
    icon: <ListChecks className="w-6 h-6" />,
    available: true,
  },
  {
    id: 'follow-up',
    title: 'Follow-Up Script Generator',
    description: 'Create WhatsApp-ready messages for clients',
    icon: <MessageSquare className="w-6 h-6" />,
    available: true,
  },
  {
    id: 'vocal-cleanup',
    title: 'Vocal Cleanup (Pre-Mix)',
    description: 'AI-powered vocal enhancement and cleanup',
    icon: <Mic className="w-6 h-6" />,
    available: false,
    comingSoon: true,
  },
  {
    id: 'reference-matcher',
    title: 'Reference Matcher',
    description: 'Match your tracks to professional references',
    icon: <Music className="w-6 h-6" />,
    available: false,
    comingSoon: true,
  },
  {
    id: 'performance-coach',
    title: 'Vocal Performance Coach',
    description: 'AI feedback on your vocal performances',
    icon: <Target className="w-6 h-6" />,
    available: false,
    comingSoon: true,
  },
];

const DashboardStudio: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [followUpType, setFollowUpType] = useState('confirmation');
  const [clientName, setClientName] = useState('');
  const [eventType, setEventType] = useState('Corporate Event');

  const handleGenerate = async () => {
    if (!activeModule) return;
    setLoading(true);
    setResult('');

    try {
      let response;
      switch (activeModule) {
        case 'session-recap':
          response = await aiService.generateSessionRecap(input);
          break;
        case 'take-log':
          response = await aiService.generateTakeLog(input);
          break;
        case 'follow-up':
          response = await aiService.generateFollowUp({
            clientName: clientName || 'Client',
            eventType,
            messageType: followUpType,
          });
          break;
        default:
          response = { success: false, error: 'Unknown module' };
      }

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setResult(`Error: ${response.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setResult('Error: Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeModuleData = modules.find(m => m.id === activeModule);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-red/20 to-transparent border border-brand-red/30 rounded-2xl p-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-red/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-brand-red" />
          </div>
          <div>
            <h2 className="text-2xl font-black">AI Studio Suite</h2>
            <p className="text-zinc-400 text-sm">AI-powered tools to enhance your workflow</p>
          </div>
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.button
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => module.available && setActiveModule(module.id)}
            disabled={!module.available}
            className={`relative text-left p-6 rounded-2xl border transition-all ${
              activeModule === module.id
                ? 'bg-brand-red/10 border-brand-red'
                : module.available
                ? 'bg-zinc-950 border-zinc-900 hover:border-zinc-700'
                : 'bg-zinc-950/50 border-zinc-900 opacity-60 cursor-not-allowed'
            }`}
          >
            {module.comingSoon && (
              <span className="absolute top-4 right-4 bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Coming Soon
              </span>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              activeModule === module.id ? 'bg-brand-red text-white' : 'bg-zinc-900 text-zinc-400'
            }`}>
              {module.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{module.title}</h3>
            <p className="text-zinc-500 text-sm">{module.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Active Module Panel */}
      <AnimatePresence mode="wait">
        {activeModule && activeModuleData && (
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-10 h-10 bg-brand-red/20 rounded-lg flex items-center justify-center text-brand-red">
                  {activeModuleData.icon}
                </span>
                {activeModuleData.title}
              </h3>
              <button
                onClick={() => setActiveModule(null)}
                className="text-zinc-500 hover:text-white text-sm"
              >
                Close
              </button>
            </div>

            {/* Input Section */}
            <div className="space-y-4 mb-6">
              {activeModule === 'follow-up' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Client Name</label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g., John Smith"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-brand-red outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Event Type</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-brand-red outline-none transition-all"
                      >
                        <option>Corporate Event</option>
                        <option>Festival</option>
                        <option>Wedding</option>
                        <option>Private Party</option>
                        <option>Brand Activation</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Message Type</label>
                      <select
                        value={followUpType}
                        onChange={(e) => setFollowUpType(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-brand-red outline-none transition-all"
                      >
                        <option value="confirmation">Booking Confirmation</option>
                        <option value="reminder">Event Reminder</option>
                        <option value="delivery">Post-Event / Delivery</option>
                        <option value="followup">General Follow-Up</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">
                    {activeModule === 'session-recap' ? 'Session Notes' : 'Raw Notes / Timestamps'}
                  </label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={activeModule === 'session-recap' 
                      ? 'Enter your session notes here... (e.g., Discussed project timeline, client wants 3 tracks, deadline Feb 15...)'
                      : 'Enter timestamps and notes... (e.g., 00:00 - Setup, 05:00 - First take, good energy...)'
                    }
                    rows={6}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all resize-none"
                  />
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading || (activeModule !== 'follow-up' && !input.trim())}
                className="bg-brand-red text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                ) : (
                  <><Send className="w-4 h-4" /> Generate</>
                )}
              </button>
            </div>

            {/* Result Section */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 rounded-xl p-6 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Generated Output</h4>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                  {result}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardStudio;
