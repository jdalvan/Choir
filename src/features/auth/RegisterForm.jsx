import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

// 1. Validation Schema Ikomye (Strict Validation)
const signupSchema = z.object({
  firstName: z.string().min(2, "Andika izina neza"),
  lastName: z.string().min(2, "Andika izina rya kabiri neza"),
  email: z.string().email("Email ntanditse neza"),
  phone: z.string().min(10, "Telefone igomba kugira imibare 10"),
  role: z.enum(["member", "leader"]),
  voicePart: z.string().optional(),
  position: z.string().optional(),
  password: z.string().min(8, "Password igomba kugira inyuguti 8"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password ntizihuye",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.role === "member" && !data.voicePart) return false;
  if (data.role === "leader" && !data.position) return false;
  return true;
}, {
  message: "Fill all fields according to your role",
  path: ["role"], 
});

export default function SignupForm() {
  const [currentRole, setCurrentRole] = useState("member");
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "member" },
  });

  // --- IYI NEYO LOGIC USHAKA (LocalStorage DB) ---
  const onSubmit = async (data) => {
    try {
      // 1. Fata abantu bose basanzwe muri LocalStorage
      const existingUsers = JSON.parse(localStorage.getItem("all_users")) || [];

      // 2. Reba niba Email isanzwe irimo
      const userExists = existingUsers.find((u) => u.email === data.email);
      if (userExists) {
        return alert("Iyi Email isanzwe ifite konti! Banza u-loginge.");
      }

      // 3. Ongeraho umuntu mushya muri array (Siba confirmPassword)
      const { confirmPassword, ...userData } = data;
      const updatedUsers = [...existingUsers, userData];
      
      // 4. Bika muri LocalStorage
      localStorage.setItem("all_users", JSON.stringify(updatedUsers));

      // 5. Automatic Login (Tanga Token n'uburenganzira)
      localStorage.setItem("user_token", "kixy_session_" + Date.now()); 
      localStorage.setItem("user_role", data.role);
      
      alert(`Wakoze kwiyandikisha neza nka ${data.role}!`);

      // 6. Redirect bitewe na Role
      if (data.role === "leader") {
        navigate("/dashboard/leader"); 
      } else {
        navigate("/dashboard/member");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Hari ikibazo kije! Ongera ugerageze.");
    }
  };

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    setValue("role", newRole);
    if (newRole === "member") setValue("position", "");
    if (newRole === "leader") setValue("voicePart", "");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 pt-20 bg-[#121212] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
          JOIN <span className="text-[#a3e635]">KIXY</span>
        </h2>
        <p className="text-gray-500 text-xs font-bold uppercase mt-2 tracking-widest">
           {currentRole} registration
        </p>
      </div>

      {/* Role Switcher */}
      <div className="flex bg-black p-1.5 rounded-2xl mb-8 border border-white/5">
        {["member", "leader"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => handleRoleChange(r)}
            className={cn(
              "flex-1 py-3 rounded-xl transition-all capitalize text-sm font-black",
              currentRole === r ? "bg-[#a3e635] text-black shadow-lg" : "text-gray-500 hover:text-gray-300"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Names */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">First Name</label>
            <input {...register("firstName")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" placeholder="Dalvan" />
            {errors.firstName && <p className="text-red-500 text-[10px] ml-1">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Last Name</label>
            <input {...register("lastName")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" placeholder="Eric" />
            {errors.lastName && <p className="text-red-500 text-[10px] ml-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Email</label>
            <input {...register("email")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" placeholder="info@kixy.com" />
            {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Phone</label>
            <input {...register("phone")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" placeholder="078..." />
            {errors.phone && <p className="text-red-500 text-[10px] ml-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Dynamic Part */}
        {currentRole === "member" ? (
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Voice Part (Amajwi)</label>
            <select {...register("voicePart")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] appearance-none cursor-pointer">
              <option value="">Select Voice</option>
              <option value="Soprano">Soprano</option>
              <option value="Alto">Alto</option>
              <option value="Tenor">Tenor</option>
              <option value="Bass">Bass</option>
            </select>
            {errors.voicePart && <p className="text-red-500 text-[10px] ml-1">Gahunda y'amajwi ni ngombwa</p>}
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Leader Position</label>
            <input {...register("position")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" placeholder="e.g. Choir Conductor" />
            {errors.position && <p className="text-red-500 text-[10px] ml-1">Andika inshingano yawe</p>}
          </div>
        )}

        {/* Passwords */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Password</label>
            <input {...register("password")} type="password" className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" />
            {errors.password && <p className="text-red-500 text-[10px] ml-1">{errors.password.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Confirm</label>
            <input {...register("confirmPassword")} type="password" className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" />
            {errors.confirmPassword && <p className="text-red-500 text-[10px] ml-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full py-8 text-xl font-black bg-[#a3e635] text-black hover:bg-[#bbf74d] rounded-2xl shadow-[0_15px_30px_rgba(163,230,53,0.15)] mt-6 transition-all"
        >
          JOIN SYSTEM
        </Button>

        <div className="text-center mt-6 text-sm text-gray-500 font-medium tracking-tight">
          Already have an account?{" "}
          <Link to="/login" className="text-[#a3e635] font-black hover:underline uppercase text-xs ml-1">Sign In</Link>
        </div>
      </form>
    </div>
  );
}