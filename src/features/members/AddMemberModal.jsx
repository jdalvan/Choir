import { useState } from "react";
import { X, UserPlus, ShieldCheck } from "lucide-react";

export default function AddMemberModal({ isOpen, onClose, onMemberAdded }) {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", voicePart: "Soprano"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Create temporary password (urugero: Kixy2026)
    const generatedPassword = "Kixy" + Math.floor(1000 + Math.random() * 9000);
    
    const newMember = {
      ...formData,
      password: generatedPassword,
      role: "member",
      status: "active"
    };

    // 2. Save to LocalStorage
    const allUsers = JSON.parse(localStorage.getItem("all_users")) || [];
    localStorage.setItem("all_users", JSON.stringify([...allUsers, newMember]));

    // 3. Muhe message yo guha umuririmbyi
    alert(`Member Added Successfully!\n\nGive them these credentials:\nEmail: ${formData.email}\nPassword: ${generatedPassword}`);
    
    onMemberAdded(); // Refresh table
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] w-full max-w-md border border-white/10 rounded-3xl p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white">
          <X size={20} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-black italic text-[#a3e635] flex items-center gap-2 uppercase">
            <UserPlus /> Add Member
          </h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Manual enrollment</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="First Name" required
              className="bg-black border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-[#a3e635]"
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
            <input 
              placeholder="Last Name" required
              className="bg-black border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-[#a3e635]"
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <input 
            type="email" placeholder="Email Address" required
            className="w-full bg-black border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-[#a3e635]"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="Phone" required
              className="bg-black border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-[#a3e635]"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <select 
              className="bg-black border border-white/10 p-3 rounded-xl text-sm outline-none text-gray-400"
              onChange={(e) => setFormData({...formData, voicePart: e.target.value})}
            >
              <option value="Soprano">Soprano</option>
              <option value="Alto">Alto</option>
              <option value="Tenor">Tenor</option>
              <option value="Bass">Bass</option>
            </select>
          </div>

          <button className="w-full bg-[#a3e635] text-black font-black py-4 rounded-xl mt-4 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            <ShieldCheck size={18} /> CREATE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  );
}