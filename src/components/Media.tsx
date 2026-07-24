import { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Image as ImageIcon, Sparkles, Download } from 'lucide-react';

// पोस्टर्स इम्पोर्ट करें
import poster1 from '../assets/WhatsApp Image 2026-07-20 at 11.34.31 AM.jpeg';
import poster2 from '../assets/WhatsApp Image 2026-07-20 at 11.44.52 AM.jpeg';
import poster3 from '../assets/WhatsApp Image 2026-07-20 at 11.35.48 AM.jpeg';
import poster4 from '../assets/WhatsApp Image 2026-07-20 at 11.35.08 AM.jpeg';

// वीडियो फाइल्स इम्पोर्ट करें
import video1 from '../assets/WhatsApp Video 2026-07-22 at 8.37.21 AM.mp4';
import video2 from '../assets/WhatsApp Video 2026-07-22 at 8.36.22 AM.mp4';
import video3 from '../assets/WhatsApp Video 2026-07-22 at 8.36.02 AM.mp4';

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'posters' | 'videos'>('posters');

  const postersList = [
    { title: "Second Trial Opportunity (₹999 Only)", category: "Special Offer", image: poster1 },
    { title: "Player Registrations Open", category: "Registration", image: poster2 },
    { title: "What is STPL? (Talent Se Pehchaan Tak)", category: "Overview", image: poster3 },
    { title: "Don't Miss This Opportunity", category: "Announcement", image: poster4 },
  ];

  const videosList = [
    { title: "STPL T10 Teaser Reel 1", duration: "0:09", source: video1, link: "https://youtube.com/@t10stpl?si=bEye3j1VM8hZ5mhO" },
    { title: "STPL T10 Teaser Reel 2", duration: "0:09", source: video2, link: "https://youtube.com/@t10stpl?si=bEye3j1VM8hZ5mhO" },
    { title: "STPL T10 Teaser Reel 3", duration: "0:09", source: video3, link: "https://youtube.com/@t10stpl?si=bEye3j1VM8hZ5mhO" },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-4 md:px-10 font-sans relative overflow-hidden">
      
      {/* Background Glow Elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full mb-4 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <Sparkles size={14} /> Official Media Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
            STPL <span className="text-yellow-500">MEDIA GALLERY</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed">
            Explore official promotional posters, trial announcements, teaser videos, and cinematic reels from Street Talent Premier League.
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('posters')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'posters'
                ? 'bg-yellow-500 text-black shadow-[0_0_25px_rgba(234,179,8,0.4)]'
                : 'bg-white/[0.03] text-gray-400 hover:bg-white/[0.08] hover:text-white border border-white/10'
            }`}
          >
            <ImageIcon size={18} /> Promotional Posters ({postersList.length})
          </button>
          
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-yellow-500 text-black shadow-[0_0_25px_rgba(234,179,8,0.4)]'
                : 'bg-white/[0.03] text-gray-400 hover:bg-white/[0.08] hover:text-white border border-white/10'
            }`}
          >
            <Film size={18} /> Teasers & Videos ({videosList.length})
          </button>
        </div>

        {/* Content Section: Posters */}
        {activeTab === 'posters' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {postersList.map((poster, index) => (
              <div key={index} className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden group hover:border-yellow-500/50 transition-all shadow-xl">
                <div className="h-[450px] bg-black/60 relative flex items-center justify-center overflow-hidden border-b border-white/10">
                  <img src={poster.image} alt={poster.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 z-20 bg-yellow-500 text-black font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {poster.category}
                  </span>
                </div>
                
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-yellow-400 transition-colors">{poster.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 font-mono">STPL T10 Official Creative</p>
                  </div>
                  <a 
                    href={poster.image} 
                    download 
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black transition-all"
                    title="Download Poster"
                  >
                    <Download size={18} />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Content Section: Videos / Reels */}
        {activeTab === 'videos' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {videosList.map((video, index) => (
              <div key={index} className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden group hover:border-yellow-500/50 transition-all shadow-xl p-6">
                <div className="h-64 bg-black rounded-2xl relative flex items-center justify-center overflow-hidden border border-white/10 mb-6">
                  <video src={video.source} controls className="w-full h-full object-cover" />
                  <span className="absolute bottom-4 right-4 z-20 bg-black/80 text-yellow-400 font-mono text-xs px-3 py-1 rounded-lg border border-yellow-500/20 pointer-events-none">
                    {video.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white">{video.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">Watch full teaser on official STPL YouTube channel</p>
                  </div>
                  <a 
                    href={video.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold rounded-xl hover:bg-yellow-500 hover:text-black transition-all"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
}