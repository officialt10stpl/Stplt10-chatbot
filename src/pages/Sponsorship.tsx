import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SponsorInquiryForm from '../components/SponsorInquiryForm';

export default function Sponsorship() {
  const [showForm, setShowForm] = useState(false);

  const tiers = [
    { title: "Title Sponsor", desc: "Headline naming partner", status: "SLOT OPEN" },
    { title: "Powered By", desc: "Primary energy partner", status: "SLOT OPEN" },
    { title: "Co-Powered By", desc: "Strategic co-partner", status: "SLOT OPEN" },
    { title: "Associate Sponsors", desc: "League associates", status: "SLOT OPEN" },
    { title: "Official Partners", desc: "Digital, Venue, Equipment", status: "SLOT OPEN" },
  ];

  return (
    <div className="mt-32 min-h-screen bg-[#050505] text-white p-6 md:p-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-5xl font-black mb-6 italic">BRAND <span className="text-yellow-500">POWER</span></h2>
        <p className="text-gray-400 text-lg">Stand with India's most ambitious grassroots-to-spotlight cricket movement.</p>
      </div>

      {/* Tiers Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <div key={index} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/50 transition-all duration-500 hover:bg-white/[0.04]">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">{tier.title}</h3>
            <p className="text-gray-500 mb-6">{tier.desc}</p>
            <div className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-500 font-bold text-sm tracking-widest border border-yellow-500/20">
              {tier.status}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto mt-24 text-center p-12 rounded-[2rem] bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20">
        <h3 className="text-3xl font-black mb-4">Sponsor STPL T10</h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Tap into 2 Lakh+ audience reach, 40+ city activations and pan-India OTT visibility.</p>
        <button 
          onClick={() => setShowForm(true)} 
          className="px-8 py-4 bg-yellow-500 text-black font-black rounded-xl hover:bg-white transition-all hover:scale-105"
        >
          APPLY FOR SPONSORSHIP
        </button>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#050505] rounded-2xl"
            >
              <SponsorInquiryForm />
              {/* Close Button */}
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white hover:text-yellow-500 text-2xl z-10"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}