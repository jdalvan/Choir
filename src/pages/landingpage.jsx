import { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, Calendar, Newspaper, Mail, 
  Instagram, Facebook, Youtube, SkipBack, SkipForward,
  Music, MapPin, ImageIcon, Ticket, Twitter, Ghost, Send 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import choirImg from "@/assets/choir1.jpg"; 
import healingImg from "@/assets/healing.jpeg"; 
import humuraAudio from "@/assets/humura.mp3";

// --- Sub-Component: Music Player ---
function MiniMusicPlayer({ title, artist, audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    const updateProgress = () => {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      if (duration) setProgress((currentTime / duration) * 100);
    };
    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#111111] border border-white/5 p-5 rounded-3xl flex items-center gap-4 group hover:border-[#6366f1]/40 transition-all shadow-xl">
      <button 
        onClick={togglePlay}
        className="w-16 h-16 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform outline-none"
      >
        {isPlaying ? <Pause className="text-white fill-current w-6 h-6" /> : <Play className="text-white fill-current w-6 h-6" />}
      </button>
      <div className="flex-1">
        <h4 className="font-bold text-white text-sm md:text-base">{title}</h4>
        <p className="text-indigo-300/60 text-xs italic">{artist}</p>
        <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#6366f1] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

// --- Social Icon Link Wrapper ---
const SocialLink = ({ icon: Icon, href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] transition-all duration-300 group"
  >
    <Icon size={20} className="group-hover:scale-110 transition-transform" />
  </a>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#6366f1] scroll-smooth">
    
      {/* 1. HERO SECTION */}
      <section id="home" className="relative pt-40 pb-20 lg:pt-60 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#6366f1]/10 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center lg:text-left">
          <h1 className="text-6xl lg:text-[120px] font-black leading-[0.9] tracking-tighter mb-10 uppercase">
            HEAVENLY <br /> <span className="text-[#6366f1]">VOICES.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed mx-auto lg:mx-0">
            KIXY is a premier choral ensemble based in Kigali, Rwanda. We bring spiritual excellence through music.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-5">
            <Button className="h-16 px-10 text-lg font-bold bg-[#6366f1] hover:bg-[#4f46e5] rounded-full">Explore Music</Button>
            <Button variant="outline" className="h-16 px-10 text-lg font-bold border-white/10 bg-white/5 rounded-full">View Gallery</Button>
          </div>
        </div>
      </section>

      {/* 2. MUSIC SECTION */}
      <section id="music" className="py-24 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black italic uppercase mb-12"><Music className="inline mr-3 text-[#6366f1]"/> OUR MUSIC</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <MiniMusicPlayer title="Humura" artist="KIXY Choir" audioSrc={humuraAudio} />
            <MiniMusicPlayer title="Holy Is Your Name" artist="KIXY Live" audioSrc={humuraAudio} />
          </div>
        </div>
      </section>

      {/* 3. SHOWS SECTION */}
      <section id="shows" className="py-24 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black italic uppercase mb-12">WORLD <span className="text-[#6366f1]">TOUR</span></h2>
          <div className="space-y-4">
            {[
              { month: "APR", day: "12", title: "Easter Night Worship", loc: "Kigali Arena, RW", status: "Tickets Available" },
              { month: "JUN", day: "30", title: "KIXY Annual Concert", loc: "Camp Kigali, RW", status: "Coming Soon" }
            ].map((show, i) => (
              <div key={i} className="group flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 bg-[#111111] border border-white/5 rounded-[32px] hover:border-[#6366f1]/40 transition-all duration-300">
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-[#6366f1] transition-all duration-500">
                  <span className="text-xs font-black uppercase text-gray-500 group-hover:text-white/80">{show.month}</span>
                  <span className="text-4xl font-black text-white">{show.day}</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10px] font-bold text-[#6366f1] uppercase tracking-[0.3em] mb-1 block">{show.status}</span>
                  <h3 className="text-2xl font-black group-hover:text-[#6366f1] transition-colors">{show.title}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-gray-500 italic">
                    <MapPin size={14} /> <span>{show.loc}</span>
                  </div>
                </div>
                <Button className={cn("px-10 h-14 rounded-2xl font-black text-sm uppercase transition-all", show.status === "Coming Soon" ? "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed" : "bg-white text-black hover:bg-[#6366f1] hover:text-white")}>
                  <Ticket className="mr-2 w-4 h-4" /> {show.status === "Coming Soon" ? "Notify Me" : "Get Ticket"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EVENTS SECTION (WANTSE IYI!) */}
      <section id="events" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black italic uppercase mb-12">UPCOMING <span className="text-[#6366f1]">EVENTS</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Easter Celebration", date: "12 April", loc: "Kimironko, Kigali", img: choirImg },
              { title: "Worship Night", date: "30 June", loc: "BK Arena", img: healingImg }
            ].map((event, i) => (
              <div key={i} className="group relative h-[450px] rounded-[40px] overflow-hidden border border-white/10">
                <img src={event.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700" alt="Event" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-10 flex flex-col justify-end">
                  <span className="text-[#6366f1] font-black text-sm uppercase tracking-widest mb-2">{event.date}</span>
                  <h3 className="text-4xl font-black mb-4">{event.title}</h3>
                  <p className="flex items-center gap-2 text-gray-300 italic"><MapPin size={18} className="text-[#6366f1]"/> {event.loc}</p>
                  <Button className="mt-6 w-fit bg-white text-black font-black px-8 rounded-full hover:bg-[#6366f1] hover:text-white">Join Event</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black italic uppercase mb-12"><ImageIcon className="inline mr-3 text-[#6366f1]"/> GALLERY</h2>
          <div className="columns-1 md:columns-3 gap-4 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-white/5"><img src={choirImg} className="w-full hover:scale-105 transition-transform duration-500" alt="G" /></div>
            <div className="rounded-3xl overflow-hidden border border-white/5"><img src={healingImg} className="w-full hover:scale-105 transition-transform duration-500" alt="G" /></div>
            <div className="h-64 bg-gradient-to-br from-[#6366f1] to-purple-900 rounded-3xl flex items-center justify-center font-black italic text-2xl">HARMONY</div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT & SOCIALS */}
      <section id="contact" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl font-black italic mb-8 uppercase">Let's <br/> <span className="text-[#6366f1]">Connect.</span></h2>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 mb-10">
              <SocialLink icon={Instagram} href="#" label="Instagram" />
              <SocialLink icon={Facebook} href="#" label="Facebook" />
              <SocialLink icon={Music} href="#" label="TikTok" />
              <SocialLink icon={Youtube} href="#" label="Youtube" />
              <SocialLink icon={Ghost} href="#" label="Snapchat" />
              <SocialLink icon={Twitter} href="#" label="X" />
              <SocialLink icon={Mail} href="mailto:info@kixychoir.com" label="Email" />
            </div>
            <div className="text-2xl font-black text-[#6366f1]">info@kixychoir.com</div>
          </div>
          <form className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
            <input placeholder="Name" className="w-full p-5 bg-black border border-white/10 rounded-2xl outline-none focus:border-[#6366f1]" />
            <textarea placeholder="Message" rows={4} className="w-full p-5 bg-black border border-white/10 rounded-2xl outline-none focus:border-[#6366f1]"></textarea>
            <Button className="w-full py-8 text-xl font-black bg-[#6366f1] rounded-2xl">Send Message</Button>
          </form>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 KIXY CHOIR SYSTEM. ELEVATING HARMONY.</p>
      </footer>
    </div>
  );
}