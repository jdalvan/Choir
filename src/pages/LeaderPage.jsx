import { useState, useEffect } from "react";
import MemberTable from "@/features/members/MemberTable";
import AddMemberModal from "@/features/members/AddMemberModal";
import { UserPlus } from "lucide-react";


export default function LeaderPage() {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadMembers = () => {
    const allUsers = JSON.parse(localStorage.getItem("all_users")) || [];
    setMembers(allUsers.filter(u => u.role === "member"));
  };

  useEffect(() => { loadMembers(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            Member <span className="text-[#a3e635]">Registry</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold">Authorized personnel only</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#a3e635] text-black px-5 py-3 rounded-xl font-black text-xs uppercase flex items-center gap-2"
        >
          <UserPlus size={16} /> Enroll Member
        </button>
      </div>

      <MemberTable members={members} />

      <AddMemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onMemberAdded={loadMembers} 
      />
    </div>
  );
}