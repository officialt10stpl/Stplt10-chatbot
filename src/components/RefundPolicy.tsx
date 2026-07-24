import { ShieldCheck } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-4 md:px-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <ShieldCheck size={14} /> Official Statutory Policy
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Refund & <span className="text-yellow-500">Cancellation Policy</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm mt-3 font-mono">
            Effective Date: 21/07/2026 &nbsp;|&nbsp; Last Updated: 21/07/2026
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-xl shadow-2xl space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
          
          <p className="text-gray-300 border-b border-white/10 pb-6">
            This Refund & Cancellation Policy applies to payments made for registration, participation, team ownership, auction-related services, and other services associated with <strong className="text-yellow-400">STPL T10 – Street Talent Premier League</strong>.
          </p>

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-yellow-400 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-mono">01</span>
              Registration Fees
            </h2>
            <p>
              Registration fees paid by players or participants are subject to the terms displayed at the time of registration. Once a registration has been successfully submitted and payment has been confirmed, the registration fee shall generally be treated as <strong className="text-white">non-refundable</strong>, except in circumstances expressly mentioned in this policy or where a refund is required under applicable law.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-yellow-400 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-mono">02</span>
              Player Registration and Auction
            </h2>
            <p>Payment of a registration fee does not guarantee:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 text-sm">
              <li>Selection in a team</li>
              <li>Selection in the auction</li>
              <li>A minimum auction price</li>
              <li>A contract with any team</li>
              <li>Match participation or playing time</li>
              <li>Any prize or financial benefit</li>
            </ul>
            <p className="text-xs text-gray-400 pt-2">
              Player selection and auction outcomes depend on applicable STPL T10 rules, team decisions, eligibility, and verification. Non-selection or failure to be purchased in an auction does not create an automatic right to a refund.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-yellow-400 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-mono">03</span>
              League Cancellation or Postponement
            </h2>
            <p>
              In case STPL League or Trials are cancelled or postponed due to any unavoidable circumstances, STPL Management will review the situation and take the final decision regarding refunds.
            </p>
            <p className="text-xs text-gray-400">
              If a refund is approved, the refundable amount will be processed after deducting applicable GST, payment gateway charges, transaction fees, administrative expenses, and other costs incurred by STPL Management. In the event of postponement, STPL T10 may carry forward the registration or payment to the rescheduled event without triggering an automatic refund.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-yellow-400 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-mono">04</span>
              No Refund Policy
            </h2>
            <p>No refund will be provided in the following cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 text-sm">
              <li>Player is unable to attend trials due to personal reasons.</li>
              <li>Player fails to appear on the scheduled trial date.</li>
              <li>Player provides incorrect or incomplete information during registration.</li>
              <li>Player violates STPL rules or is disqualified due to misconduct.</li>
              <li>Player cancels registration voluntarily.</li>
              <li>Any changes in trial schedule, venue, or timing communicated by STPL Management.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-yellow-400 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-mono">05</span>
              Fake Payment & Fraudulent Activities
            </h2>
            <p>
              If any player submits fake payment proof, fake transaction details, or performs any fraudulent activity, the registration will be considered invalid immediately. No refund will be provided in such cases, and STPL Management reserves the right to take appropriate action.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-yellow-400 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-mono">06</span>
              Duplicate or Failed Transactions
            </h2>
            <p>
              If charged more than once due to a technical error, the duplicate amount may be refunded after verification. For failed transactions where money is debited but registration fails, participants should contact support with transaction details.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-yellow-400 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-mono">07</span>
              Refund Processing & Requests
            </h2>
            <p>
              Approved refunds are processed to the original payment method. Refund requests must include full name, registered mobile, email, transaction ID, payment date, amount, and reason.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-yellow-400 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-mono">08</span>
              Final Authority
            </h2>
            <p>
              All refund-related decisions will be made solely by STPL Management and shall be considered final and binding. By making payment and completing registration, players agree to accept this Refund Policy.
            </p>
          </div>

          {/* Contact Box */}
          <div className="bg-black/50 border border-yellow-500/30 p-6 rounded-2xl space-y-2 mt-8">
            <h3 className="text-yellow-400 font-bold uppercase text-xs tracking-widest">Official Support Desk</h3>
            <p className="text-xs text-gray-300">For refund inquiries and assistance, reach out via:</p>
            <p className="text-xs font-mono text-white">Email: officialt10stpl@gmail.com</p>
            <p className="text-xs font-mono text-white">Phone / WhatsApp: +91 9198474195</p>
          </div>

        </div>

      </div>
    </div>
  );
}