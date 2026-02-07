import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Camera, Music, Globe, Instagram, Twitter, Youtube, Link as LinkIcon } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

const DashboardProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    stageName: 'DJ Phantom',
    bio: 'The heavy hitter of Kingston nightlife. Exclusive Push-A-Yute talent.',
    city: 'Kingston',
    country: 'Jamaica',
    categories: ['DJ'],
    genres: ['Dancehall', 'Reggae', 'Hip-Hop'],
    baseRateMin: 5000,
    baseRateMax: 15000,
    instagram: '@djphantom',
    twitter: '@djphantom_jm',
    youtube: '',
    website: 'https://djphantom.com',
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative aspect-[3/1] bg-zinc-900 rounded-2xl overflow-hidden group"
      >
        <img
          src="https://picsum.photos/seed/djphantom/1200/400"
          alt="Profile Header"
          className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <button className="bg-black/80 backdrop-blur-xl px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Change Cover
          </button>
        </div>
        <div className="absolute bottom-6 left-6">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 bg-zinc-800 rounded-2xl border-4 border-black overflow-hidden relative group">
              <img
                src="https://picsum.photos/seed/djp-avatar/200/200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Camera className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black">{profile.stageName}</h2>
              <p className="text-zinc-400 text-sm">{profile.city}, {profile.country}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {!isSupabaseConfigured && (
        <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-4 flex items-center gap-3">
          <span className="text-yellow-500 text-sm">Profile changes are stored locally in demo mode. Connect Supabase to persist changes.</span>
        </div>
      )}

      {/* Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 space-y-6"
      >
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <User className="w-4 h-4" />
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Stage Name</label>
            <input
              type="text"
              value={profile.stageName}
              onChange={(e) => setProfile({ ...profile, stageName: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">City</label>
            <input
              type="text"
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Bio</label>
          <textarea
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all resize-none"
          />
        </div>
      </motion.div>

      {/* Genres & Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 space-y-6"
      >
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <Music className="w-4 h-4" />
          Categories & Genres
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 block mb-3">Categories</label>
            <div className="flex flex-wrap gap-2">
              {['DJ', 'Band', 'Singer', 'Host', 'Poet', 'Dancer'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    const categories = profile.categories.includes(cat)
                      ? profile.categories.filter(c => c !== cat)
                      : [...profile.categories, cat];
                    setProfile({ ...profile, categories });
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    profile.categories.includes(cat)
                      ? 'bg-brand-red text-white'
                      : 'bg-zinc-900 text-zinc-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 block mb-3">Genres</label>
            <div className="flex flex-wrap gap-2">
              {['Dancehall', 'Reggae', 'Hip-Hop', 'R&B', 'Jazz', 'Pop', 'Electronic', 'Afrobeats'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    const genres = profile.genres.includes(genre)
                      ? profile.genres.filter(g => g !== genre)
                      : [...profile.genres, genre];
                    setProfile({ ...profile, genres });
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    profile.genres.includes(genre)
                      ? 'bg-brand-red text-white'
                      : 'bg-zinc-900 text-zinc-500 hover:text-white'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 space-y-6"
      >
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Social & Web
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 flex items-center gap-2">
              <Instagram className="w-3 h-3" /> Instagram
            </label>
            <input
              type="text"
              value={profile.instagram}
              onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
              placeholder="@username"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 flex items-center gap-2">
              <Twitter className="w-3 h-3" /> Twitter
            </label>
            <input
              type="text"
              value={profile.twitter}
              onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
              placeholder="@username"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 flex items-center gap-2">
              <Youtube className="w-3 h-3" /> YouTube
            </label>
            <input
              type="text"
              value={profile.youtube}
              onChange={(e) => setProfile({ ...profile, youtube: e.target.value })}
              placeholder="Channel URL"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 flex items-center gap-2">
              <LinkIcon className="w-3 h-3" /> Website
            </label>
            <input
              type="text"
              value={profile.website}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              placeholder="https://..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-red text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </motion.div>
    </div>
  );
};

export default DashboardProfile;
