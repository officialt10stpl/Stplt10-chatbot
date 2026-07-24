import { useState } from 'react';

const teamOwnerData = [
  { num: "01", title: "TEAM OWNER ELIGIBILITY", content: "Team owners must provide accurate identity and contact information and complete any verification required by STPL T10." },
  { num: "02", title: "AUCTION PARTICIPATION", content: "Only approved team owners or authorised representatives may participate in the official auction." },
  { num: "03", title: "BIDDING", content: "All bids must comply with the official auction rules. A bid submitted during the auction may be treated as final and binding, subject to the official auction rules." },
  { num: "04", title: "PLAYER PURCHASE", content: "A team owner who successfully acquires a player through the auction shall be responsible for fulfilling all applicable financial and administrative obligations communicated by STPL T10." },
  { num: "05", title: "PAYMENT", content: "All payments must be made within the deadline communicated by STPL T10. Failure to make required payments may result in cancellation of the relevant transaction, suspension of auction rights or other action permitted under the league rules." },
  { num: "06", title: "AUCTION INTEGRITY", content: "Team owners must not collude with other team owners; manipulate the auction; submit fraudulent bids; use false identities; engage in deceptive practices; attempt to manipulate player prices through coordinated conduct. STPL T10 may investigate suspicious activity and take appropriate action." },
  { num: "07", title: "TEAM OWNERSHIP", content: "Team ownership rights are subject to approval by STPL T10 and compliance with all applicable rules. Team owners may not transfer or sell their team ownership rights without prior written approval from STPL T10." },
  { num: "08", title: "DISQUALIFICATION", content: "STPL T10 may suspend or disqualify a team owner for fraud, non-payment, misconduct, auction manipulation or material breach of league rules." },
  { num: "09", title: "FINAL AUTHORITY", content: "The official auction rules and decisions of authorised STPL T10 officials shall govern the auction process, subject to applicable law." },
  { num: "10", title: "ACKNOWLEDGEMENT", content: "By participating in the auction, the team owner confirms that they have read and accepted the applicable STPL T10 rules and agree to comply with them." }
];

export default function TeamOwnerTerms() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 md:px-10 font-sans selection:bg-yellow-500 selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-mono tracking-widest uppercase mb-4 inline-block">
            Legal & Auction Guidelines
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
            TEAM OWNER & <span className="text-yellow-500">AUCTION TERMS</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Effective Date: 21/07/2026
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        </div>

        {/* Accordion / List */}
        <div className="space-y-4">
          {teamOwnerData.map((item, index) => {
            const isOpen = activeAccordion === index;
            return (
              <div 
                key={index}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-md ${
                  isOpen 
                    ? 'bg-white/[0.05] border-yellow-500/60 shadow-[0_0_30px_rgba(234,179,8,0.15)]' 
                    : 'bg-white/[0.02] border-white/10 hover:border-yellow-500/30 hover:bg-white/[0.04]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-yellow-500 font-bold text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.num}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold tracking-wide text-white group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-yellow-500 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-yellow-500 text-black border-yellow-500' : 'group-hover:border-yellow-500/50'}`}>
                    ↓
                  </div>
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden px-6 ${
                    isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-2 border-t border-white/10 text-gray-300 text-sm md:text-base leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Highlight Box */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/5 border border-yellow-500/30 rounded-3xl p-8 text-center backdrop-blur-xl shadow-xl">
          <h3 className="text-xl font-black text-yellow-500 mb-3 uppercase tracking-wider">Contact Us</h3>
          <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto">
            STPL T10 – Street Talent Premier League
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:officialt10stpl@gmail.com" 
              className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105"
            >
              ✉ officialt10stpl@gmail.com
            </a>
            <a 
              href="tel:9235111503" 
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all hover:scale-105"
            >
              📞 9235111503 / +919198474195
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}