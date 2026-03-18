import { useState, useEffect } from "react";
import SongCard from "@/features/repertoire/SongCard";
import SongModal from "@/features/repertoire/SongModal";
import { Plus, Music2, Search } from "lucide-react";

export default function RepertoirePage() {
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = localStorage.getItem("user_role");

  const loadSongs = () => {
    const allSongs = JSON.parse(localStorage.getItem("all_songs")) || [];
    setSongs(allSongs);
  };

  useEffect(() => { loadSongs(); }, []);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Song <span className="text-[#a3e635]">Library</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">KIXY Music Repository</p>
        </div>

        {/* Leader gusa niwe ubona iyi buto */}
        {userRole === "leader" && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#a3e635] text-black px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-xl shadow-[#a3e635]/10"
          >
            <Plus size={18} /> Upload Score
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.length > 0 ? (
          songs.map((song) => <SongCard key={song.id} song={song} />)
        ) : (
          <div className="col-span-full py-20 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-gray-600">
            <Music2 size={48} className="mb-4 opacity-20" />
            <p className="font-black uppercase italic tracking-widest text-sm">No songs in the library yet</p>
          </div>
        )}
      </div>

      <SongModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSongAdded={loadSongs} 
      />
    </div>
  );
}