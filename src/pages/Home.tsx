// 1. Hero Component
function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden pt-20"> 
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Animation के साथ Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 animate-in fade-in duration-1000">
        <h2 className="text-yellow-500 tracking-[0.4em] font-semibold uppercase text-sm md:text-lg mb-4">
          STREET TALENT PREMIER LEAGUE
        </h2>
        <h1 className="text-6xl md:text-9xl font-extrabold text-white leading-tight">
          FROM STREETS<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 animate-pulse">
            TO SPOTLIGHT
          </span>
        </h1>

        <p className="mt-6 text-xl md:text-2xl font-light tracking-[0.2em] uppercase italic">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)]">
            Dream
          </span>
          <span className="text-white/50 mx-4">•</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)]">
            Perform
          </span>
          <span className="text-white/50 mx-4">•</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)]">
            Get Auctioned
          </span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button 
            className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:scale-110 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] cursor-pointer" 
            onClick={() => window.open('/register', '_blank')}
          >
            Register For Trials
          </button>
          <button 
            className="px-8 py-4 border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => window.open('/sponsors?openForm=true', '_blank')}
          >
            Become a Sponsor
          </button>
        </div>
      </div>
    </section>
  );
}

// 2. Main Home Page
export default function Home() {
  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        
        {/* 🌟 Official Chief Mentor Section */}
        <div className="max-w-md mx-auto mb-16 px-4">
          <div className="text-center mb-6">
            <span className="bg-yellow-500/10 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30 uppercase tracking-widest">
              STPL Legend Mentor
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white mt-2 uppercase">
              हमारे ऑफिशियल <span className="text-yellow-500">मेंटर</span>
            </h3>
          </div>

          {/* Single Mentor Card */}
          <div className="bg-white/[0.03] border border-yellow-500/40 p-6 rounded-3xl text-center hover:border-yellow-500 transition shadow-2xl">
            <img 
              src="/images/mentor.jpeg" 
              alt="Dilshan Munaweera" 
              className="w-28 h-28 mx-auto rounded-full object-cover border-2 border-yellow-500 mb-4 shadow-lg"
            />
            <h4 className="text-xl font-black text-white">Dilshan Munaweera</h4>
            <p className="text-sm text-yellow-400 font-mono mt-1 font-bold">Chief Mentor</p>
            <p className="text-xs text-yellow-500/90 font-semibold mt-1">Former Sri Lankan Cricketer</p>
            <p className="text-xs text-gray-400 mt-2">छोटे शहरों और गली के क्रिकेटर्स को नेशनल मंच तक पहुँचाने के लिए मार्गदर्शन।</p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-yellow-500 font-bold tracking-[0.3em] uppercase mb-4 text-sm">The League</h3>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white">Built For Champions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "50+ Trial Cities", d: "Pan-India presence", icon: "📍" },
            { t: "10 Franchise Teams", d: "National squads", icon: "🏆" },
            { t: "Professional Trials", d: "Expert evaluators", icon: "⚡" },
            { t: "Second Chance", d: "Extra opportunity", icon: "🔄" },
            { t: "Player Auction", d: "Live bidding", icon: "💰" },
            { t: "OTT Streaming", d: "Nationwide reach", icon: "📺" },
            { t: "2L+ Audience", d: "Online & offline", icon: "👥" },
            { t: "T10 Format", d: "Fast & explosive", icon: "🏏" },
          ].map((item, i) => (
            <div key={i} className="group relative p-8 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-[2rem] overflow-hidden hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-4xl mb-6">{item.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2">{item.t}</h4>
              <p className="text-gray-400 text-sm font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Road / Journey Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto overflow-hidden">
        <div className="text-center mb-24 px-6">
          <div className="inline-block px-8 py-2 mb-6 border border-yellow-500/30 rounded-full bg-yellow-500/5">
            <span className="text-yellow-500 font-black tracking-[0.5em] uppercase text-sm md:text-base">
              The Road
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Player <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Journey</span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg md:text-2xl font-light leading-relaxed tracking-wide">
              From local trial grounds to the championship stage — 
              <span className="block mt-2 font-semibold text-white">Your STPL Pathway to Glory.</span>
            </p>
          </div>
        </div>

        <div className="relative">
          <svg className="absolute left-1/2 top-0 h-full w-[400px] -translate-x-1/2 hidden md:block stroke-white/10 stroke-[3] fill-none" viewBox="0 0 400 1200">
            <path d="M 200 0 C 400 200, 0 300, 200 400 C 400 500, 0 600, 200 800 C 400 1000, 0 1100, 200 1200" strokeDasharray="10 10" />
          </svg>

          {[
            { n: "01", t: "Registration", d: "Online player registration" },
            { n: "02", t: "Trials in 50+ Cities", d: "Professional evaluation" },
            { n: "03", t: "Second Chance Trial", d: "Extra opportunity" },
            { n: "04", t: "Selected Players", d: "Shortlist announced" },
            { n: "05", t: "Player Auction", d: "Live bidding event" },
            { n: "06", t: "10 Franchise Teams", d: "Squad formation" },
            { n: "07", t: "STPL T10 Season 1", d: "Tournament begins" },
            { n: "08", t: "Championship Final", d: "Crowning the champion" },
          ].map((item, i) => {
            const isRight = i % 2 !== 0;
            return (
              <div key={i} className={`relative flex items-center mb-16 ${isRight ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-0 md:left-1/2 w-8 h-8 md:w-12 md:h-12 bg-black border-4 border-yellow-500 rounded-full -translate-x-4 md:-translate-x-6 z-10 flex items-center justify-center font-bold text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                  {item.n}
                </div>
                <div className={`ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-[40%] p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-500 transition-all duration-300 ${isRight ? 'md:mr-[10%]' : 'md:ml-[10%]'}`}>
                  <h4 className="text-xl font-bold text-white mb-1">{item.t}</h4>
                  <p className="text-gray-400 text-sm">{item.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Powered By Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 md:p-20 backdrop-blur-sm text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Our Sponsors & Partners</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {["SPONSOR 1", "SPONSOR 2", "SPONSOR 3", "SPONSOR 4", "SPONSOR 5", "SPONSOR 6"].map((s, i) => (
              <div key={i} className="group relative h-28 flex items-center justify-center border-b border-white/10 hover:border-yellow-500 transition-colors duration-500">
                <span className="text-white/20 font-bold tracking-widest group-hover:text-white transition-all duration-500">
                  {s}
                </span>
              </div>
            ))}
          </div>

          <button 
            className="px-8 py-4 border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => window.open('/sponsors?openForm=true', '_blank')}
          >
            Become a Sponsor
          </button>
        </div>
      </section>

      {/* Featured Announcement */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          
          <div className="relative bg-[#0B0B0B] border border-white/10 p-12 rounded-[2rem] text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-pulse"></div>

            <h3 className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm mb-4">Featured Announcement</h3>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Trial Registrations Are <br />
              <span className="text-yellow-500">Now OPEN</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Secure your slot for trials in 40+ cities. Limited spots — first come, first considered.
            </p>

            <button 
              onClick={() => window.open('/register', '_blank')} 
              className="px-10 py-5 bg-white text-black font-black rounded-full text-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm mb-4">Help</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "Who can register for STPL T10?", a: "Any Indian player aged 16+ with passion for tennis ball cricket. Registration is open across all 40+ trial cities." },
            { q: "Is there a registration fee?", a: "Yes, there is a nominal processing fee for trials to cover infrastructure and logistics. Details available upon registration." },
            { q: "What is the Second Chance Trial?", a: "An extra opportunity for players who missed the initial selection to showcase their talent again in front of expert evaluators." },
            { q: "How does the auction work?", a: "Selected players enter the auction pool where franchise owners bid for them based on their performance metrics and skill." },
            { q: "Where will matches be streamed?", a: "Matches will be streamed live on major OTT platforms and our official YouTube channel for nationwide reach." }
          ].map((faq, i) => (
            <div key={i} className="group bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-300">
              <details className="p-6 cursor-pointer">
                <summary className="text-lg font-bold text-white flex justify-between items-center outline-none">
                  {faq.q}
                  <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </p>
              </details>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}