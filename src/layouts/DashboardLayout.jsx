import { useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Megaphone, Calendar, 
  MessageSquare, Bell, Library, LogOut, Music 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("user_token");
  const role = localStorage.getItem("user_role");

  // 1. LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    // Gukoresha window.location.replace nibyo byizewe 100% 
    // kugira ngo Sidebar isibike mu mutwe wa Browser (Hard Refresh)
    window.location.replace("/"); 
  };

  // 2. SECURITY CHECK
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  // Niba nta token, ntukerekane Sidebar na gato, fungura gusa Page iri imbere
  if (!token) return <Outlet />;

  const leaderLinks = [
    { name: "Overview", path: "/dashboard/leader", icon: LayoutDashboard },
    { name: "Manage Members", path: "/dashboard/leader/members", icon: Users },
    { name: "Announcements", path: "/dashboard/leader/news", icon: Megaphone },
    { name: "Schedule", path: "/dashboard/leader/events", icon: Calendar },
  ];

  const memberLinks = [
    { name: "My Dashboard", path: "/dashboard/member", icon: LayoutDashboard },
    { name: "Group Chats", path: "/dashboard/member/chats", icon: MessageSquare },
    { name: "Announcements", path: "/dashboard/member/updates", icon: Bell },
    { name: "Song Library", path: "/dashboard/member/songs", icon: Library },
  ];

  const currentLinks = role === "leader" ? leaderLinks : memberLinks;

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col fixed h-full z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#a3e635] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.2)]">
            <Music className="text-black" size={24} />
          </div>
          <span className="font-black italic text-xl tracking-tighter">KIXY</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="text-[10px] uppercase font-bold text-gray-500 ml-2 mb-4 tracking-widest px-2">
            {role || "User"} Menu
          </p>
          {currentLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20 shadow-[0_0_15px_rgba(163,230,53,0.05)]" 
                    : "text-gray-400 hover:bg-white/5 hover:text-[#a3e635]"
                )}
              >
                <link.icon size={20} className={cn(isActive && "scale-110 transition-transform")} />
                <span className="text-sm font-bold">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-3 px-2 py-2 text-left overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#a3e635] to-green-900 flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Dalvan Eric</p>
              <p className="text-[10px] text-gray-500 capitalize">{role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 min-h-screen bg-black">
        <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-400 italic">
            Choir Management / <span className="text-white capitalize">{role}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400">
              <Bell size={16} />
            </button>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}