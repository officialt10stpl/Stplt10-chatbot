import { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  Award, 
  Users, 
  Scale, 
  Lock, 
  Camera, 
  AlertTriangle, 
  Briefcase, 
  FileSpreadsheet, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  UserCheck,
  HeartHandshake
} from 'lucide-react';

interface Chapter {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  icon: any;
  description: string;
  items: string[];
}

const chapters: Chapter[] = [
  {
    id: 1,
    number: "01",
    title: "Organization & Compliance",
    subtitle: "Legal foundation, entity structure, and official credentials.",
    icon: ShieldCheck,
    description: "STPL T10 is legally structured and fully compliant with corporate governance norms to maintain absolute institutional transparency and operational safety.",
    items: [
      "League / Company / Firm / Society Registration Certificate – Official legal status proof under regulatory bodies.",
      "Official Permanent Account Number (PAN) Card – Tax registration and corporate identity compliance.",
      "Authorized League Bank Account Details – Dedicated transparent financial accounts for secure fee processing.",
      "GST Registration Certificate – Compliant commercial tax administration as applicable."
    ]
  },
  {
    id: 2,
    number: "02",
    title: "Player Registration",
    subtitle: "Standard intake and documentation protocols for participants.",
    icon: Users,
    description: "Rigorous verification standards to ensure fair age categorization, identity authentication, and accurate participant records.",
    items: [
      "Standardized Player Registration & Details Form – Capturing accurate personal, contact, and playing role profiles.",
      "Age Proof Verification – Validated via Birth Certificate, School ID, or Government ID ([Aadhaar Redacted]) to maintain fair Junior and Senior category partitions.",
      "High-Resolution Player Passport Photo – Mandatory for official digital ID card generation and player databases.",
      "Verified Emergency Contact Details – Direct family contact lines for on-ground safety and emergency protocols.",
      "Signed Player Declaration Form – Formal acceptance of all league bylaws by the participant."
    ]
  },
  {
    id: 3,
    number: "03",
    title: "Player Agreement & Consent",
    subtitle: "Voluntary participation terms and financial commitments.",
    icon: FileText,
    description: "Clear binding terms protecting the rights of both the participant and the organizing committee during the tournament lifecycle.",
    items: [
      "Explicit player participation and code consent – Voluntarily entering the competition framework.",
      "Registration fee structure – Transparent non-refundable terms covering digital infrastructure and trial logistics.",
      "Trial structure and selection rule acceptance – Agreement to structured merit evaluation.",
      "Binding acceptance of organizer and selector decisions – Finality of committee rulings without dispute.",
      "Injury acknowledgment and safety compliance terms – Releasing management from unforeseen physical liabilities.",
      "Promotional media usage rights agreement – Granting permission for brand marketing and broadcast features."
    ]
  },
  {
    id: 4,
    number: "04",
    title: "Trial & Selection Policy",
    subtitle: "Merit-based framework governing on-ground evaluation.",
    icon: Award,
    description: "A completely transparent, merit-driven evaluation system designed by professional coaches and certified selectors.",
    items: [
      "Transparent trial execution process and ground rules – Uniform guidelines applied across all city venues.",
      "Clear, skill-based selection criteria for judges – Evaluating technique, fitness, temperament, and match awareness.",
      "Roles and accountability of selectors and technical staff – Ensuring impartial shortlisting and grading.",
      "City trial scheduling and slot allocation policy – Organized batch timings distributed via digital dashboards.",
      "Postponement and rescheduling protocols – Safe management of unexpected venue changes or weather disruptions.",
      "Finality clause regarding selection committee decisions – Absolute authority of head judges in final squad formation."
    ]
  },
  {
    id: 5,
    number: "05",
    title: "Parent/Guardian Consent (Junior)",
    subtitle: "Mandatory authorization for participants under 18 years of age.",
    icon: UserCheck,
    description: "To protect minor players and ensure absolute transparency with families, parents or legal guardians must formally approve participation, travel, and medical decisions.",
    items: [
      "Mandatory Parent Approval – Under-18 junior players require verified parental/guardian authorization before trial clearance.",
      "Travel & Venue Safety Consent – Acknowledgment of local transit and ground schedules managed by guardians.",
      "Emergency Medical Authorization – Empowering STPL medical staff to administer immediate first-aid or hospital transport in emergencies.",
      "Waiver Acceptance on Behalf of Minor – Parents agree to all liability limitations and media usage terms for the minor participant."
    ]
  },
  {
    id: 6,
    number: "06",
    title: "Code of Conduct & Discipline",
    subtitle: "Behavioral guidelines, sportsmanship, and anti-harassment rules.",
    icon: HeartHandshake,
    description: "STPL maintains a zero-tolerance policy towards misconduct, verbal abuse, physical altercations, or any form of harassment on or off the field.",
    items: [
      "Sportsmanship Standards – Respectful conduct towards umpires, opponents, coaches, and spectators at all times.",
      "Zero Tolerance on Abuse – Immediate disqualification for fighting, bullying, racial slurs, or abusive language.",
      "Disciplinary Review Panel – Committee setup to investigate complaints and levy penalties, match bans, or permanent expulsion.",
      "Defamation & Public Conduct – Strict prohibition against posting false, malicious, or abusive remarks against STPL management on social media."
    ]
  },
  {
    id: 7,
    number: "07",
    title: "Digital Legal Framework",
    subtitle: "Website and application statutory policies.",
    icon: Scale,
    description: "Comprehensive legal disclaimers safeguarding the STPL digital portal, user interactions, and transaction environments.",
    items: [
      "Comprehensive Terms & Conditions – Binding operational guidelines for all platform visitors and registered players.",
      "User-friendly Privacy Policy – Clear statements on data confidentiality and digital foot-printing.",
      "Strict Refund & Cancellation Guidelines – Clear parameters regarding fee processing and event modifications.",
      "Liability Disclaimer Policy – Institutional protection against third-party links, system downtime, or external disruptions.",
      "Official Contact & Grievance Information – Dedicated communication channels for support, reporting, and dispute resolution."
    ]
  },
  {
    id: 8,
    number: "08",
    title: "Data & Privacy Governance",
    subtitle: "Securing participant information and digital footprints.",
    icon: Lock,
    description: "Strict adherence to data security measures to protect sensitive user information and prevent unauthorized sharing.",
    items: [
      "Explicit player data collection permission – Collecting only necessary operational data with explicit user consent.",
      "Regulated internal data usage rules – Access restricted strictly to verified administrative personnel.",
      "Strict personal information protection standards – Employing secure database protocols (such as [Aadhaar Redacted] and encrypted storage).",
      "Opt-in guidelines for promotional communication – Transparent messaging permissions via WhatsApp and email updates."
    ]
  },
  {
    id: 9,
    number: "09",
    title: "Media & Branding Rights",
    subtitle: "Commercial exploitation of likeness and league assets.",
    icon: Camera,
    description: "Governing the commercial use of match footage, player imagery, digital highlights, and intellectual properties.",
    items: [
      "Player photo and video recording authorization – Unconditional permission to capture match performance and trial moments.",
      "Match highlights and archival broadcasting rights – Ownership of broadcast assets for digital channels and television.",
      "Digital and social media marketing distribution rights – Utilizing player likeness for promotional reels, posters, and announcements.",
      "STPL trademark and branding exclusivity terms – Strict prohibition of unauthorized commercial use of the STPL logo and title."
    ]
  },
  {
    id: 10,
    number: "10",
    title: "Injury & Safety Waiver",
    subtitle: "Risk allocation and emergency medical response.",
    icon: AlertTriangle,
    description: "Comprehensive liability waiver ensuring that physical injury risks inherent in contact sports are assumed by the participant, minimizing organizer liability.",
    items: [
      "Individual health and fitness responsibility clause – The participant affirms they are physically fit and participate entirely at their own risk.",
      "On-ground safety guidelines and protocols – Mandatory adherence to protective gear and safety instructions.",
      "Designated medical emergency response procedure – Basic first-aid availability with immediate transfer protocols to local medical facilities at player expense.",
      "Organizer liability limitations and waivers – STPL management, founders, ground owners, and staff are legally and financially indemnified from any claims arising out of physical injury, accidents, or medical emergencies."
    ]
  },
  {
    id: 11,
    number: "11",
    title: "Commercial & Sponsorships",
    subtitle: "Partner commitments and brand visibility rights.",
    icon: Briefcase,
    description: "Structured agreements governing brand associations, sponsorship deliverables, and financial commitments.",
    items: [
      "Standardized sponsor contract templates – Formalized legal documents outlining partnership terms.",
      "Payment schedules and commercial terms – Strict timelines for financial transactions and sponsorships.",
      "Ground and digital branding allocation rights – Dedicated perimeter boards, jersey placements, and digital banner spots.",
      "Promotional commitment benchmarks – Agreed deliverables across social media, press releases, and match days."
    ]
  },
  {
    id: 12,
    number: "12",
    title: "Staff & Vendor Agreements",
    subtitle: "Operational contracts for tournament execution.",
    icon: FileSpreadsheet,
    description: "Clear legal contracts establishing professional accountability for all on-ground staff, umpires, vendors, and technical partners.",
    items: [
      "Professional Umpire & Match Official Agreements – Code of neutrality, rule enforcement, and match conduct.",
      "Selector & Coach Engagement Contracts – Terms of professional integrity and fair talent evaluation.",
      "Ground Rental & Facilities Agreements – Legal lease and venue utilization terms with ground owners.",
      "Event Management & Security Staff Contracts – Crowd management, safety compliance, and operational duties."
    ]
  },
  {
    id: 13,
    number: "13",
    title: "Refund & Cancellation",
    subtitle: "Financial terms for disrupted fixtures or withdrawals.",
    icon: CheckCircle2,
    description: "Transparent financial policy governing circumstances of event postponement, trial cancellations, or fee adjustments.",
    items: [
      "Registration fee processing and refund exclusions – Fees are utilized for digital infrastructure and trial execution; non-refundable once approved.",
      "Individual trial slot cancellation terms – No refunds for player absence or voluntary withdrawal post-registration.",
      "Tournament postponement protocols – Authority to reschedule fixtures due to unavoidable operational constraints.",
      "Force majeure league cancellation terms – Exemption from financial liability in events of natural disasters, extreme weather, or government restrictions."
    ]
  }
];

export default function STPLBook() {
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const activeData = chapters.find(c => c.id === selectedChapter) || chapters[0];
  const IconComponent = activeData.icon;

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-4 md:px-10 font-sans relative overflow-hidden">
      
      {/* Background Glow Design Elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full mb-4 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <Sparkles size={14} /> Official Governance & Rulebook Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
            STPL T10 <span className="text-yellow-500">Master Book</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed">
            Explore the fully described legal checklists, parental consents, code of conduct, and operational guidelines governing the Street Talent Premier League.
          </p>
        </div>

        {/* Main Interactive Layout (Split View: Sidebar + Detailed Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-3xl p-4 backdrop-blur-xl shadow-2xl max-h-[700px] overflow-y-auto custom-scrollbar">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest px-4 py-2 mb-2">
              Table of Contents ({chapters.length} Chapters)
            </div>
            
            <div className="space-y-2">
              {chapters.map((ch) => {
                const isSelected = selectedChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapter(ch.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 text-left cursor-pointer group ${
                      isSelected
                        ? 'bg-yellow-500 text-black font-black shadow-[0_0_25px_rgba(234,179,8,0.3)] translate-x-1'
                        : 'bg-white/[0.02] text-gray-300 hover:bg-white/[0.06] hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${
                        isSelected ? 'bg-black text-yellow-400' : 'bg-white/5 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {ch.number}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold tracking-wide truncate max-w-[200px] md:max-w-[240px]">
                          {ch.title}
                        </h4>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-300 ${isSelected ? 'translate-x-1 text-black' : 'text-gray-500 group-hover:text-yellow-500'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detailed Chapter Display Box */}
          <div className="lg:col-span-7 bg-white/[0.03] border border-yellow-500/30 rounded-3xl p-6 md:p-10 backdrop-blur-2xl shadow-2xl relative">
            
            {/* Top Chapter Meta */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                  <IconComponent size={28} />
                </div>
                <div>
                  <span className="text-xs font-mono text-yellow-500 uppercase tracking-widest font-bold">
                    Chapter {activeData.number}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white mt-0.5">
                    {activeData.title}
                  </h2>
                </div>
              </div>
              <BookOpen className="text-yellow-500/20 hidden md:block" size={48} />
            </div>

            <p className="text-sm text-gray-400 italic mb-4">
              &ldquo;{activeData.subtitle}&rdquo;
            </p>

            {/* Detailed Paragraph Description */}
            <p className="text-sm text-gray-300 mb-8 bg-white/[0.02] border border-white/5 p-4 rounded-2xl leading-relaxed">
              {activeData.description}
            </p>

            {/* Checklist items container with full descriptions */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-yellow-400 mb-3">
                Core Clauses & Detailed Mandates:
              </h4>
              {activeData.items.map((clause, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-yellow-500/40 transition-colors">
                  <div className="mt-0.5 text-yellow-500 font-bold flex-shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {clause}
                  </p>
                </div>
              ))}
            </div>

            {/* Chapter Footer Badge */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>STPL T10 Operational Standard</span>
              <span className="text-yellow-500 font-bold">Verified & Active</span>
            </div>

          </div>

        </div>

        {/* Official Declaration Banner */}
        <div className="mt-16 bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-500/40 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_50px_rgba(234,179,8,0.2)]">
          <div className="w-12 h-12 bg-yellow-500 text-black rounded-2xl flex items-center justify-center mx-auto mb-4 font-black shadow-lg">
            📜
          </div>
          <h3 className="text-xl md:text-2xl font-black text-yellow-400 uppercase tracking-wider mb-4">
            Player Registration Confirmation Declaration
          </h3>
          <blockquote className="text-gray-300 text-sm md:text-base italic max-w-4xl mx-auto leading-relaxed">
            &ldquo;I confirm that I have read and accepted all rules, terms, conditions, policies, and guidelines of Street Talent Premier League (STPL T10). I agree to participate voluntarily and accept the decisions of the STPL organizing committee regarding trials, selection, and league activities.&rdquo;
          </blockquote>
          
          <div className="mt-8 inline-flex items-center gap-2 bg-yellow-500 text-black font-black text-xs uppercase px-8 py-3 rounded-2xl shadow-xl">
            <ShieldCheck size={16} /> STPL T10 Governance Certified
          </div>
        </div>

      </div>
    </div>
  );
}