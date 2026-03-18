import { useState } from "react";
import { X, Music, Link as LinkIcon, Save } from "lucide-react";

export default function SongModal({ isOpen, onClose, onSongAdded }) {
  const [songData, setSongData] = useState({
    title: "", composer: "", category: "Hymn", pdfUrl: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const allSongs = JSON.parse(localStorage.getItem("all_songs")) || [];
    const newSong = { ...songData, id: Date.now(), dateAdded: new Date().toLocaleDateString() };
    
    localStorage.setItem("all_songs", JSON.stringify([...allSongs, newSong]));
    alert("Indirimbo yageze muri Repertoire neza!");
    onSongAdded();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] w-full max-w-md border border-white/10 rounded-3xl p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20}/></button>

        <div className="mb-6">
          <h2 className="text-2xl font-black italic text-[#a3e635] uppercase flex items-center gap-2">
            <Music /> New Song
          </h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Add to Choir Library</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="Song Title (Izina)" required
            className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-[#a3e635]"
            onChange={(e) => setSongData({...songData, title: e.target.value})}
          />
          <input 
            placeholder="Composer (Uwayihimbye)"
            className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-[#a3e635]"
            onChange={(e) => setSongData({...songData, composer: e.target.value})}
          />
          <select 
            className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none text-gray-400"
            onChange={(e) => setSongData({...songData, category: e.target.value})}
          >
            <option value="Hymn">Hymn (Indirimbo isanzwe)</option>
            <option value="Mass">Mass (Misa)</option>
            <option value="Classical">Classical</option>
            <option value="Local">Local Composition</option>
          </select>
          <div className="relative">
            <LinkIcon size={16} className="absolute left-4 top-4 text-gray-500" />
            <input 
              placeholder="PDF URL (Drive Link)" required
              className="w-full bg-black border border-white/10 p-4 pl-12 rounded-xl text-sm outline-none focus:border-[#a3e635]"
              onChange={(e) => setSongData({...songData, pdfUrl: e.target.value})}
            />
          </div>

          <button className="w-full bg-[#a3e635] text-black font-black py-4 rounded-xl mt-4 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#a3e635]/10">
            <Save size={18} /> SAVE TO LIBRARY
          </button>
        </form>
      </div>
    </div>
  );
}