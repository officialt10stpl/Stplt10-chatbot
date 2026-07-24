import { motion } from 'framer-motion';

export default function Teams() {
  const teams = [
    { name: "Punjab Lions", image: "/team1.jpeg" },
    { name: "Rajasthan Shoorma's", image: "/team2.jpeg" },
    { name: "Gujrat Falcons", image: "/team3.jpeg" },
    { name: "Hyderabad Hawks", image: "/team4.jpeg" },
    { name: "Lucknow Nawabs", image: "/team5.jpeg" },
    { name: "Chennai Sharks", image: "/team6.jpeg" },
    { name: "Bengaluru Warriors", image: "/team7.jpeg" },
    { name: "Kolkata Thunders", image: "/team8.jpeg" },
    { name: "Mumbai Mavericks", image: "/team9.jpeg" },
    { name: "Delhi Dynamos", image: "/team10.jpeg" }
  ];

  return (
    <div className="pt-32 md:pt-40 min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 italic tracking-wider text-white">
          THE <span className="text-yellow-500">FRANCHISES</span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {teams.map((team, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center text-center"
            >
              {/* लोगो कंटेनर */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full bg-black border-2 border-white/10 
                          transition-all duration-500 
                          group-hover:scale-110 group-hover:border-yellow-500/50 
                          group-hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.5)] overflow-hidden flex items-center justify-center"
              >
                <img 
                  src={team.image} 
                  alt={team.name} 
                  className="w-full h-full object-cover rounded-full 
                             transition-transform duration-500 group-hover:rotate-3" 
                />
                
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                              bg-yellow-500/20 blur-xl transition-opacity duration-500"></div>
              </div>
              
              <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                {team.name}
              </h3>
              <p className="text-yellow-500/70 text-xs uppercase tracking-widest mt-1.5 
                            bg-yellow-500/5 px-3 py-1 rounded-full border border-yellow-500/10">
                Owner TBA
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}