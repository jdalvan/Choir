import { Trash2, Phone, Music } from "lucide-react";

export default function MemberTable({ members }) {
  return (
    <div className="overflow-x-auto bg-[#0a0a0a] rounded-2xl border border-white/5">
      <table className="w-full text-left">
        <thead className="border-b border-white/5 bg-black/50">
          <tr>
            <th className="p-4 text-[10px] uppercase font-black text-gray-500">Name</th>
            <th className="p-4 text-[10px] uppercase font-black text-gray-500">Voice</th>
            <th className="p-4 text-[10px] uppercase font-black text-gray-500">Phone</th>
            <th className="p-4 text-[10px] uppercase font-black text-gray-500 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="p-4 font-bold text-sm uppercase italic">{member.firstName} {member.lastName}</td>
              <td className="p-4 text-[#a3e635] text-[10px] font-black">{member.voicePart}</td>
              <td className="p-4 text-gray-400 text-xs">{member.phone}</td>
              <td className="p-4 text-right">
                <button className="text-red-500/50 hover:text-red-500"><Trash2 size={16}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}