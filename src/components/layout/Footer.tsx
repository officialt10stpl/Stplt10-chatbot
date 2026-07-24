import { ShieldCheck, FileText, RefreshCcw, BookOpen, MessageCircle, Users } from 'lucide-react';

export default function Footer() {
  // नए टैब में इंटरनल और एक्सटर्नल पेज खोलने का फंक्शन
  const openNewTab = (path: string) => {
    const fullUrl = window.location.origin + path;
    window.open(fullUrl, '_blank');
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-16 pb-12 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-black text-yellow-500 mb-4 tracking-wider">STPL T10</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Street Talent Premier League (STPL T10) provides a professional platform for grassroots cricket talent to shine on the national stage.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm border-l-2 border-yellow-500 pl-3">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><button onClick={() => openNewTab('/')} className="hover:text-yellow-500 transition-colors cursor-pointer text-left">Home</button></li>
            <li><button onClick={() => openNewTab('/about')} className="hover:text-yellow-500 transition-colors cursor-pointer text-left">About Us</button></li>
            <li><button onClick={() => openNewTab('/teams')} className="hover:text-yellow-500 transition-colors cursor-pointer text-left">Teams</button></li>
            <li><button onClick={() => openNewTab('/sponsors')} className="hover:text-yellow-500 transition-colors cursor-pointer text-left">Sponsorship</button></li>
          </ul>
        </div>

        {/* Policies & Hub Section */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm border-l-2 border-yellow-500 pl-3">Policies & Hub</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>
              <button onClick={() => openNewTab('/privacy-policy')} className="flex items-center gap-3 hover:text-yellow-500 transition-all hover:translate-x-1 cursor-pointer w-full text-left">
                <ShieldCheck size={18} className="text-yellow-500 flex-shrink-0" /> Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => openNewTab('/terms')} className="flex items-center gap-3 hover:text-yellow-500 transition-all hover:translate-x-1 cursor-pointer w-full text-left">
                <FileText size={18} className="text-yellow-500 flex-shrink-0" /> Terms & Conditions
              </button>
            </li>
            <li>
              <button onClick={() => openNewTab('/refund-policy')} className="flex items-center gap-3 hover:text-yellow-500 transition-all hover:translate-x-1 cursor-pointer w-full text-left">
                <RefreshCcw size={18} className="text-yellow-500 flex-shrink-0" /> Refund Policy
              </button>
            </li>
            <li>
              <button onClick={() => openNewTab('/team-owner-terms')} className="flex items-center gap-3 hover:text-yellow-500 transition-all hover:translate-x-1 cursor-pointer w-full text-left">
                <FileText size={18} className="text-yellow-500 flex-shrink-0" /> Team Owner Terms
              </button>
            </li>
            <li>
              <button onClick={() => openNewTab('/stpl-book')} className="flex items-center gap-3 hover:text-yellow-500 transition-all hover:translate-x-1 cursor-pointer w-full text-left">
                <BookOpen size={18} className="text-yellow-500 flex-shrink-0" /> STPL Book (Rulebook)
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info & Social Links */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm border-l-2 border-yellow-500 pl-3">Contact & Socials</h4>
          <p className="text-gray-400 text-sm mb-1">Email: officialt10stpl@gmail.com</p>
          <p className="text-gray-400 text-sm mb-4">Phone: +91 9198474195</p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://whatsapp.com/channel/0029VbDUSx94dTnK7byEmp2p" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-green-600 hover:text-white hover:border-green-500 transition-all"
              title="WhatsApp Channel"
            >
              <MessageCircle size={18} />
            </a>

            <a 
              href="https://chat.whatsapp.com/CixC0qGzjhnBXVd45NOBmC?s=cl&p=a&ilr=0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-green-500 hover:text-white hover:border-green-400 transition-all"
              title="WhatsApp Group"
            >
              <Users size={18} />
            </a>

            <a 
              href="https://www.instagram.com/stplt10?igsh=MTExeXJmeW5iZDU4Ng==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-pink-600 hover:text-white hover:border-pink-500 transition-all"
              title="Instagram"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a 
              href="https://youtube.com/@t10stpl?si=bEye3j1VM8hZ5mhO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all"
              title="YouTube Channel"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center text-gray-500 text-xs">
        © 2026 STPL T10 – Street Talent Premier League. All rights reserved.
      </div>
    </footer>
  );
}