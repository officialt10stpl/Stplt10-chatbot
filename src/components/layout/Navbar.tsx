import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../../assets/logo1.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("isPlayerLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isPlayerLoggedIn");
    navigate("/"); 
    window.location.reload(); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[999999] bg-[#0B0B0B] border-b border-white/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img src={Logo} alt="STPL Logo" className="h-10 sm:h-12 w-auto" />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-yellow-500 leading-none">STPL T10</span>
            <span className="text-[9px] sm:text-[10px] text-white tracking-[0.2em] uppercase">Street Talent Premier League</span>
          </div>
        </Link>

        {/* Center Navigation (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-yellow-500 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-500 transition">About</Link>
          <Link to="/trial-cities" className="hover:text-yellow-500 transition">Trial Cities</Link>
          <Link to="/teams" className="hover:text-yellow-500 transition">Teams</Link>
          <Link to="/sponsors" className="hover:text-yellow-500 transition">Sponsors</Link>
          <Link to="/media" className="hover:text-yellow-500 transition">Media</Link>
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout} 
              className="text-sm text-gray-400 hover:text-red-500 transition cursor-pointer bg-transparent border-none"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="text-sm font-bold text-gray-300 hover:text-yellow-400 transition-all duration-300"
            >
              Login
            </Link>
          )}
          
          <Link 
            to="/register" 
            className="px-5 py-2 bg-yellow-500 text-black font-bold rounded-full hover:scale-105 transition text-sm cursor-pointer inline-block text-center"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) - Super High Z-Index so it never hides */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden text-yellow-500 p-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none cursor-pointer relative z-[999999]"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0B0B0B] border-b border-white/30 px-6 py-6 space-y-4 shadow-2xl z-[999999]">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-yellow-500 font-medium text-base py-1">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-yellow-500 font-medium text-base py-1">About</Link>
          <Link to="/trial-cities" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-yellow-500 font-medium text-base py-1">Trial Cities</Link>
          <Link to="/teams" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-yellow-500 font-medium text-base py-1">Teams</Link>
          <Link to="/sponsors" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-yellow-500 font-medium text-base py-1">Sponsors</Link>
          <Link to="/media" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-yellow-500 font-medium text-base py-1">Media</Link>
          
          <div className="pt-4 border-t border-white/15 flex items-center justify-between">
            {isLoggedIn ? (
              <button 
                onClick={() => { setIsOpen(false); handleLogout(); }} 
                className="text-sm text-red-500 font-bold cursor-pointer bg-transparent border-none"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)} 
                className="text-sm font-bold text-gray-300 hover:text-yellow-400"
              >
                Login
              </Link>
            )}
            
            <Link 
              to="/register" 
              onClick={() => setIsOpen(false)} 
              className="px-5 py-2.5 bg-yellow-500 text-black font-bold rounded-full text-sm shadow-md inline-block text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}