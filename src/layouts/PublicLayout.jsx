import { Outlet, Link } from "react-router-dom";
import { Music, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Events", href: "#events" },
  { name: "Music", href: "#music" },
  { name: "Shows", href: "#shows" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function PublicLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#a3e635]/30">
      {/* --- PUBLIC NAVBAR --- */}
      <nav className="h-20 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-[100] px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#a3e635] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.3)] group-hover:scale-110 transition-transform">
            <Music className="text-black" size={24} />
          </div>
          <span className="font-black italic text-2xl tracking-tighter">KIXY</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-gray-400 hover:text-[#a3e635] transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          
          <Link 
            to="/login" 
            className="bg-white text-black px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-tighter hover:bg-[#a3e635] hover:scale-105 transition-all shadow-lg"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="text-[#a3e635] hover:text-[#86d32d] font-bold text-sm uppercase tracking-wider"
          >
            Join Choir
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black italic hover:text-[#a3e635]"
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)}
            className="bg-[#a3e635] text-black px-10 py-4 rounded-full font-black italic text-xl"
          >
            LOGIN
          </Link>
          <Link 
            to="/register" 
            onClick={() => setIsOpen(false)}
            className="text-[#a3e635] hover:text-[#86d32d]"
          >
            JOIN CHOIR
          </Link>
        </div>
      )}

      {/* --- PAGE CONTENT --- */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer Yoroheje */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-xs font-bold uppercase tracking-[0.2em]">
        &copy; 2026 KIXY CHOIR MANAGEMENT SYSTEM. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}