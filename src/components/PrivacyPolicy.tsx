import { useState } from 'react';

const privacyData = [
  { num: "01", title: "INFORMATION WE COLLECT", content: "Depending on the service used by you, we may collect full name (Vivek Maurya – 9235111503), mobile number (9235111503), date of birth and age, gender where required, email address, residential or correspondence address, cricket-related information and playing experience, playing role and skill information, photographs, videos and profile information, government-issued identification details where required for verification, bank or payment-related information necessary for refunds or transactions, transaction and payment confirmation details, device, browser and website usage information, IP address and technical information, and information voluntarily submitted through forms, messages or communications. We will collect only such information as is reasonably required for registration, verification, league administration, communication, payment processing, safety, compliance and related legitimate purposes." },
  { num: "02", title: "HOW WE USE YOUR INFORMATION", content: "We may use collected information for player registration and verification, team owner registration and verification, auction and player selection processes, managing league participation, processing registrations and payments, processing eligible refunds, communicating league updates, schedules and announcements, maintaining league records, preventing fraud, cheating, impersonation and misuse, resolving disputes and complaints, meeting applicable legal and regulatory requirements, improving our website and services, and marketing and promotional activities where permitted and/or with appropriate consent." },
  { num: "03", title: "PUBLICITY AND MEDIA", content: "By participating in STPL T10, you acknowledge that photographs, videos, interviews, match footage, player statistics, team information and other event-related content may be used for legitimate league-related publicity, documentation, website, social media and promotional purposes, subject to applicable law and any specific consent requirements." },
  { num: "04", title: "PAYMENT INFORMATION", content: "Payments may be processed through third-party payment gateways or financial service providers. STPL T10 does not intentionally store complete debit card, credit card, UPI PIN, CVV or banking authentication credentials on its own servers. Payment processing may be subject to the privacy policies and terms of the relevant payment service provider." },
  { num: "05", title: "SHARING OF INFORMATION", content: "We may share necessary information with payment gateway providers, technology and hosting service providers, verification and compliance service providers, event and league management partners, professional advisers, auditors or legal advisers, government authorities or law enforcement agencies where legally required, and other service providers where reasonably necessary to operate the league. We do not intend to sell users' personal information to third parties for their independent commercial use." },
  { num: "06", title: "DATA SECURITY", content: "We take reasonable technical and organisational measures to protect personal information against unauthorised access, misuse, alteration, disclosure or destruction. However, no electronic transmission or storage system can be guaranteed to be completely secure. Users acknowledge that information submitted electronically carries inherent risks." },
  { num: "07", title: "DATA RETENTION", content: "We may retain personal information for as long as reasonably necessary to fulfil the purposes for which it was collected, maintain records, resolve disputes, comply with legal obligations and protect our legitimate interests." },
  { num: "08", title: "USER REQUESTS", content: "Subject to applicable law, users may contact us to request correction or update of inaccurate personal information or to raise questions regarding the processing of their personal information. Requests may be sent to Email: officialt10stpl@gmail.com, Phone/WhatsApp: 9235111503 / +91 9198474195. We may require reasonable verification before acting on a request." },
  { num: "09", title: "CHILDREN'S INFORMATION", content: "Participation in STPL T10 may be subject to minimum age and eligibility requirements. Where a participant is a minor, registration and participation must be completed with the involvement and consent of a parent or legal guardian wherever required by applicable law. We do not knowingly seek unnecessary personal information from children." },
  { num: "10", title: "COOKIES", content: "Our website may use cookies or similar technologies to improve functionality, security, analytics and user experience. Users may manage cookies through their browser settings, although disabling certain cookies may affect website functionality." },
  { num: "11", title: "CHANGES TO THIS PRIVACY POLICY", content: "We may update this Privacy Policy from time to time. The updated version will be published on the website with the revised Last Updated date." },
  { num: "12", title: "CONTACT US", content: "For privacy-related questions or requests, please contact STPL T10 – Street Talent Premier League, Organizer: STPL Sports, Address: Dwarkadhish puri colony durga mandir bahraich, Email: officialt10stpl@gmail.com, Phone/WhatsApp: 9235111503 / +91 9198474195." }
];

export default function PrivacyPolicy() {
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
            Legal & Privacy
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
            PRIVACY <span className="text-yellow-500">POLICY</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Effective Date: 21/07/2026 | Last Updated: 21/07/2026
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        </div>

        {/* Introduction Box */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 mb-10 backdrop-blur-xl shadow-2xl">
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Welcome to the official website of <strong className="text-white">STPL T10 – Street Talent Premier League</strong> (<span className="text-yellow-500 font-semibold">"STPL T10", "we", "us", "our"</span>). This Privacy Policy explains how we collect, use, store, protect and process information provided by users, players, team owners, sponsors, visitors and other participants (<span className="text-yellow-500 font-semibold">"User", "you", "your"</span>) while using our website, registration forms, digital platforms and related services.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
            By accessing or using our website or registering for STPL T10, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>

        {/* Accordion / List */}
        <div className="space-y-4">
          {privacyData.map((item, index) => {
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
          <h3 className="text-xl font-black text-yellow-500 mb-3 uppercase tracking-wider">Privacy Questions?</h3>
          <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto">
            For any privacy-related queries or requests, feel free to contact our team.
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
              📞 +919235111503  📞 +919235111503
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}