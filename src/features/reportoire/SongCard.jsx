import { FileText, Download, User, Tag } from "lucide-react";

export default function SongCard({ song }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl hover:border-[#a3e635]/30 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
        <FileText size={80} className="text-[#a3e635]" />
      </div>

      <div className="space-y-4 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest bg-[#a3e635]/10 text-[#a3e635] px-3 py-1 rounded-full border border-[#a3e635]/20">
          {song.category}
        </span>
        
        <h3 className="text-xl font-black italic text-white uppercase tracking-tighter truncate leading-tight">
          {song.title}
        </h3>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase">
            <User size={12} className="text-[#a3e635]" /> {song.composer || "Unknown"}
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-[10px] font-bold uppercase">
            <Tag size={12} /> Added: {song.dateAdded}
          </div>
        </div>

        <a 
          href={song.pdfUrl} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-[#a3e635] hover:text-black py-3 rounded-xl text-xs font-black transition-all mt-4 uppercase italic"
        >
          <Download size={14} /> View Score (PDF)
        </a>
      </div>
    </div>
  );
}