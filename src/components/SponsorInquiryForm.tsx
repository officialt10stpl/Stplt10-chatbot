import { motion } from 'framer-motion';

export default function SponsorInquiryForm() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-0 p-8 bg-[#111] border border-[#222] rounded-xl shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-yellow-500 text-2xl">👑</div>
        <h2 className="text-2xl font-bold text-yellow-500 tracking-wide uppercase">SPONSOR INQUIRY FORM</h2>
      </div>
      <p className="text-gray-400 text-sm mb-8">Fields marked * are required</p>

      <form className="space-y-6">
        {/* Brand Name */}
        <div>
          <label className="text-[10px] uppercase text-gray-500 font-bold block mb-2">SPONSOR / BRAND NAME *</label>
          <input type="text" placeholder="e.g. Acme Sportswear Pvt. Ltd." className="w-full bg-black border border-[#333] p-4 rounded-lg focus:border-yellow-500 outline-none transition-all text-white" required />
        </div>

        {/* Contact & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] uppercase text-gray-500 font-bold block mb-2">CONTACT NUMBER *</label>
            <input type="text" placeholder="+91 98XXXXXXXX" className="w-full bg-black border border-[#333] p-4 rounded-lg focus:border-yellow-500 outline-none transition-all text-white" required />
          </div>
          <div>
            <label className="text-[10px] uppercase text-gray-500 font-bold block mb-2">EMAIL ADDRESS *</label>
            <input type="email" placeholder="brand@company.com" className="w-full bg-black border border-[#333] p-4 rounded-lg focus:border-yellow-500 outline-none transition-all text-white" required />
          </div>
        </div>

        {/* Category & Budget Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] uppercase text-gray-500 font-bold block mb-2">SPONSOR CATEGORY (OPTIONAL)</label>
            <select className="w-full bg-black border border-[#333] p-4 rounded-lg focus:border-yellow-500 outline-none transition-all text-gray-400">
              <option>Select category</option>
              <option>Title Sponsor</option>
              <option>Powered By Sponsor</option>
              <option>Co-Powered By Sponsor</option>
              <option>Equipment Sponsor</option>
              <option>Associate Sponsor</option>
              <option>Food & Beverage Partner</option>
              <option>Media Partner</option>
              <option>Stay Partner</option>
              <option>Digital Partner</option>
              <option>Medical Partner</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase text-gray-500 font-bold block mb-2">SPONSORSHIP BUDGET (OPTIONAL)</label>
            <select className="w-full bg-black border border-[#333] p-4 rounded-lg focus:border-yellow-500 outline-none transition-all text-gray-400">
              <option>Select budget range</option>
              <option>₹1 Lakh - ₹3 Lakh</option>
              <option>₹3 Lakh - ₹5 Lakh</option>
              <option>₹5 Lakh - ₹7 Lakh</option>
              <option>₹7 Lakh - ₹10 Lakh</option>
              <option>₹10 Lakh - ₹15 Lakh</option>
              <option>₹15 Lakh - ₹20 Lakh</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-[10px] uppercase text-gray-500 font-bold block mb-2">ADDITIONAL NOTES (OPTIONAL)</label>
          <textarea rows={3} placeholder="Tell us about your brand and sponsorship goals..." className="w-full bg-black border border-[#333] p-4 rounded-lg focus:border-yellow-500 outline-none transition-all text-white"></textarea>
        </div>

        {/* Submit Button */}
        <button className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-lg transition-all uppercase tracking-widest">
          SUBMIT SPONSOR INQUIRY
        </button>
      </form>
      
      <p className="text-center text-[10px] text-gray-600 mt-6">
        By submitting, you agree to be contacted by the STPL T10 sponsorship team.
      </p>
    </motion.div>
  );
}