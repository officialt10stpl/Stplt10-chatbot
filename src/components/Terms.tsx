import { useState } from 'react';

const termsData = [
  { num: "01", title: "ELIGIBILITY", content: "Participants must satisfy the eligibility criteria communicated by STPL T10. STPL T10 may require participants to provide accurate and valid information and documents for verification. Participants are responsible for ensuring that the information provided by them is true, complete and accurate." },
  { num: "02", title: "REGISTRATION", content: "Registration is subject to submission of required information, payment of applicable fees, verification of eligibility, acceptance of these Terms, and compliance with league rules. Submission of a registration form does not automatically guarantee selection or participation. STPL T10 reserves the right to reject or cancel a registration where eligibility requirements are not met or where information is found to be false, incomplete or misleading." },
  { num: "03", title: "CITY WISE TRIAL CRITERIA", content: "STPL Management will decide the minimum required number of registrations for each city based on ground availability, player participation, management requirements, and operational feasibility. If the required number of registrations is not achieved for any particular city, STPL Management reserves the right to postpone, merge, reschedule, or cancel the trials for that city. Registration by a single player or a limited number of players does not guarantee that trials will be conducted in that city. Players agree that trial arrangements are completely dependent on city-wise registrations and management decisions. No objection or claim shall be accepted regarding non-conducting of trials due to insufficient registrations." },
  { num: "04", title: "TRIAL SCHEDULE & VENUE", content: "STPL Management reserves the right to change the trial date, time, venue, or schedule due to unavoidable circumstances, operational requirements, or any other valid reason. Players will be informed about any major changes through official communication channels." },
  { num: "05", title: "PLAYER SELECTION PROCESS", content: "Registration does not guarantee that a player will be selected for a team, be purchased in an auction, receive a minimum auction price, participate in a match, receive playing time, or receive any prize money. Player selection will be based on performance, skills, fitness, discipline, and the selection criteria decided by STPL Management. The decision of STPL selectors and management regarding player selection will be final." },
  { num: "06", title: "RULES & REGULATIONS", content: "All players must follow STPL rules, trial guidelines, discipline standards, and instructions provided by the management team. STPL Management reserves the right to disqualify any player involved in misconduct, cheating, false information, or violation of rules." },
  { num: "07", title: "MANAGEMENT RIGHTS", content: "STPL Management reserves the right to modify rules, schedules, trial procedures, or any other operational decisions whenever required for the smooth functioning of the league. By completing registration, players confirm that they have read, understood, and accepted all STPL terms and conditions." },
  { num: "08", title: "AUCTION", content: "Where an auction is conducted, it shall be governed by official auction rules communicated by STPL T10. Team owners shall be responsible for complying with auction rules, budgets, player purchase limits, squad requirements, payment obligations, and verification requirements. A successful bid may be considered binding subject to completion of applicable formalities." },
  { num: "09", title: "TEAM OWNER TERMS", content: "Team owners must provide accurate information and comply with all financial and operational obligations communicated by STPL T10. STPL T10 may suspend or terminate participation for material breach, non-payment, fraud, misconduct, or violation of league rules." },
  { num: "10", title: "REGISTRATION FEES AND OTHER PAYMENTS", content: "All fees must be paid through officially authorised payment channels. Participants should not make payments to unauthorised individuals or personal accounts claiming to represent STPL T10. STPL T10 shall not be responsible for payments made to unauthorised persons or unofficial channels." },
  { num: "11", title: "PRIZE MONEY", content: "The announced prize structure for the relevant season shall be communicated through official STPL T10 channels. Unless otherwise officially announced, proposed prize structure includes Champion Team: ₹15,00,000 and Runner-Up Team: ₹10,00,000. Distribution is subject to applicable eligibility, verification, tax deductions, and statutory requirements." },
  { num: "12", title: "MATCH AND TOURNAMENT CHANGES", content: "STPL T10 may reasonably modify match schedules, venues, match timings, teams, tournament format, number of matches, auction schedule, or event dates due to operational requirements, weather, venue availability, security, government directions, or force majeure events." },
  { num: "13", title: "DISQUALIFICATION", content: "STPL T10 may disqualify or remove a participant or team for fraud, cheating, forgery, identity misrepresentation, age or eligibility violations, match manipulation, betting, serious misconduct, abuse, threats, or breach of league rules." },
  { num: "14", title: "CODE OF CONDUCT", content: "Participants must behave professionally and respectfully. Harassment, threats, abusive behaviour, discrimination, violence, intimidation, deliberate damage to property or conduct that harms the reputation or safety of the League may result in disciplinary action." },
  { num: "15", title: "PLAYER AND TEAM RESPONSIBILITIES", content: "All players and teams must follow match and tournament rules, follow instructions of authorised officials, maintain sportsmanship, provide accurate information, cooperate with verification, and comply with applicable laws." },
  { num: "16", title: "MEDIA AND PROMOTIONAL RIGHTS", content: "By participating in STPL T10, participants acknowledge that event-related photographs, videos, interviews, match footage and statistics may be recorded and used for league documentation, promotion, marketing, social media and publicity, subject to applicable law." },
  { num: "17", title: "INTELLECTUAL PROPERTY", content: "The STPL T10 name, logo, trademarks, website content, graphics, videos, designs and other proprietary material are owned by or licensed to STPL T10. No person may reproduce, modify, distribute or commercially exploit such material without prior written permission." },
  { num: "18", title: "WEBSITE USE", content: "Users must not attempt to gain unauthorised access to the website, upload malicious code, misuse registration systems, submit false information, interfere with website operations, or use the website for unlawful purposes." },
  { num: "19", title: "THIRD-PARTY SERVICES", content: "The website may use third-party services including payment gateways, hosting providers, communication platforms and analytics services. Use of such services may be subject to the respective third party's terms and policies." },
  { num: "20", title: "FORCE MAJEURE", content: "STPL T10 shall not be responsible for delay or inability to conduct an event due to circumstances beyond reasonable control, including natural disasters, war, riots, government restrictions, public emergencies, severe weather, or technical failures." },
  { num: "21", title: "LIMITATION OF LIABILITY", content: "To the extent permitted by applicable law, STPL T10 shall not be liable for indirect, incidental or consequential losses arising from participation in the League. Nothing in these Terms shall exclude or limit liability that cannot legally be excluded." },
  { num: "22", title: "INDEMNITY", content: "To the extent permitted by applicable law, a participant may be responsible for losses, claims or expenses arising from their fraud, unlawful conduct, intentional misconduct or material breach of these Terms." },
  { num: "23", title: "DISPUTE RESOLUTION", content: "Participants are encouraged to first contact STPL T10 for resolution of any concern. Where unresolved, it shall be dealt with in accordance with applicable laws of India, subject to appropriate judicial jurisdiction." },
  { num: "24", title: "GRIEVANCE REDRESSAL", content: "For complaints or concerns, contact Grievance Officer, Email: officialt10stpl@gmail.com, Phone/WhatsApp: +91 9198474195. We will make reasonable efforts to acknowledge and address complaints within a reasonable period." },
  { num: "25", title: "CHANGES TO TERMS", content: "STPL T10 may update these Terms from time to time. The latest version published on the official website shall apply to future use and participation, subject to applicable law." },
  { num: "26", title: "SEVERABILITY", content: "If any provision of these Terms is found invalid or unenforceable, the remaining provisions shall continue to remain effective to the extent permitted by law." },
  { num: "27", title: "ENTIRE AGREEMENT", content: "These Terms, together with applicable registration rules, auction rules, privacy policy, refund policy and other official league rules, constitute the terms governing participation in STPL T10." }
];

export default function TermsConditions() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 md:px-10 font-sans selection:bg-yellow-500 selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section with Animation */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-mono tracking-widest uppercase mb-4 inline-block">
            Legal & Guidelines
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
            TERMS & <span className="text-yellow-500">CONDITIONS</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Effective Date: 21/07/2026 | Last Updated: 21/07/2026
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        </div>

        {/* Introduction Box */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 mb-10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-yellow-500/40">
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            These Terms & Conditions (<span className="text-yellow-500 font-semibold">"Terms"</span>) govern access to and participation in <strong className="text-white">STPL T10 – Street Talent Premier League</strong> (<span className="text-yellow-500 font-semibold">"STPL T10", "League", "we", "us", "our"</span>). By accessing the website, registering as a player or team owner, participating in an auction, or joining any activity, you agree to these Terms. If you do not agree, you should not register or participate.
          </p>
        </div>

        {/* Accordion / List of Terms with Hover Effects */}
        <div className="space-y-4">
          {termsData.map((item, index) => {
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

        {/* Contact/Grievance Section Highlight */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/5 border border-yellow-500/30 rounded-3xl p-8 text-center backdrop-blur-xl shadow-xl">
          <h3 className="text-xl font-black text-yellow-500 mb-3 uppercase tracking-wider">Have Questions or Grievances?</h3>
          <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto">
            For complaints, disputes, or official concerns, reach out directly to our Grievance Redressal cell.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:officialt10stpl@gmail.com" 
              className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95"
            >
              ✉ officialt10stpl@gmail.com
            </a>
            <a 
              href="tel:+919198474195" 
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all hover:scale-105 active:scale-105"
            >
              📞 +91 9198474195
              📞 +91 9235111503
              
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}