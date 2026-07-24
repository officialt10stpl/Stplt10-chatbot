import { motion } from 'framer-motion';

import SurendraImg from '../assets/Surendra.jpeg';
import VivekImg from '../assets/Vivek.jpeg';
import PramodImg from '../assets/Pramod.jpeg';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const managementTeam = [
    { name: "Surendra Maurya", role: "Founder & CEO", image: SurendraImg },
    { name: "Vivek Maurya", role: "Head of Technology & Operations", image: VivekImg },
    { name: "Pramod Maurya", role: "Director", image: PramodImg }
  ];

  return (
    <div className="pt-32 min-h-screen bg-[#050505] text-white p-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h3 className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm mb-4">About STPL</h3>
          <h1 className="text-6xl md:text-8xl font-black italic">THE <span className="text-yellow-500">LEGACY</span></h1>
        </motion.div>

        {/* Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div variants={itemVariants} className="group p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-yellow-500/50 transition-all">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-400">Transforming tennis ball cricket into a professional national spectacle where every street talent finds a spotlight.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="group p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-yellow-500/50 transition-all">
            <h2 className="text-2xl font-bold mb-4">The Mission</h2>
            <p className="text-gray-400">Bridging the gap between gullies and glory through organized trials, professional auctions, and elite franchise structure.</p>
          </motion.div>
        </div>

        {/* Animated Team Section */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-4xl font-bold mb-12">League Management</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {managementTeam.map((member, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                className="w-72 p-6 bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10 shadow-xl overflow-hidden"
              >
                {/* यहाँ object-contain कर दिया गया है ताकि बाल या कैप न कटे */}
                <div className="w-32 h-32 rounded-2xl mx-auto mb-6 overflow-hidden border-2 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)] bg-black flex items-center justify-center">
                  <img src={member.image} alt={member.name} className="w-full h-full object-contain object-center" />
                </div>
                <h4 className="font-bold text-lg text-white">{member.name}</h4>
                <p className="text-yellow-500 text-xs mt-2 uppercase tracking-widest font-mono">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}