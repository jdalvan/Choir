import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Twinjije useLocation
import { Music, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Events", href: "#events" },
  { name: "Music", href: "#music" },
  { name: "Shows", href: "#shows" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];  

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Reba paji umuntu ariho ubu

  // Reba niba umuntu ari kuri paji za Authentication
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const shouldBeSolid = isScrolled || isOpen || isAuthPage;
  const navbarClasses = cn(
    "fixed top-0 w-full z-[100] transition-all duration-300 border-b",
    shouldBeSolid
      ? "bg-black/95 backdrop-blur-xl border-white/10 py-3 shadow-2xl"
      : "bg-transparent border-transparent py-5"
  );
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] transition-all duration-300 border-b",
      // Navbar iba umukara iyo: isScrolled (yamanutse), isOpen (menu ifunguye), cyangwa isAuthPage (kuri login/register)
      (isScrolled || isOpen || isAuthPage) 
        ? "bg-black/95 backdrop-blur-xl border-white/10 py-3 shadow-2xl" 
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-gradient-to-br from-[#6366f1] to-[#a855f7] p-2 rounded-xl shadow-lg">
              <Music className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-white uppercase">KIXY</span>
          </Link>

          {/* 1. DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-[#6366f1] transition-all rounded-full hover:bg-white/5 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* 2. AUTH BUTTONS */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-indigo-400">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#6366f1] text-white font-bold rounded-full px-6 hover:bg-[#4f46e5]">Join Us</Button>
            </Link>
          </div>

          {/* 3. MOBILE CONTROLS */}
          <div className="flex lg:hidden items-center gap-2">
             <Link to="/login" className="p-2 text-gray-400 hover:text-white transition-colors">
                <User size={22}/>
             </Link>
             <button 
               onClick={() => setIsOpen(!isOpen)} 
               className="p-2 text-gray-400 hover:text-white transition-colors"
             >
               {isOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-[600px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
      )}>
        <div className="px-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block p-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#6366f1] hover:bg-white/5 rounded-xl transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6 grid grid-cols-2 gap-4 border-t border-white/5 mt-4">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full border-white/10 text-white">Login</Button>
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-[#6366f1] text-white font-bold">Join Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}