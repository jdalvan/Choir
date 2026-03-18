import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

// 1. Validation Schema Ikomye
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
  // Logic ihatira Member guhitamo ijwi
  if (data.role === "member" && !data.voicePart) return false;
  // Logic ihatira Leader kwandika umwanya (e.g. Conductor)
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

  const onSubmit = async (data) => {
    // 1. Hano niho hazaza API call ya Django (backend)
    console.log("Registering User:", data);

    // 2. Simulation ya Auth Session
    localStorage.setItem("user_token", "active_session_token"); 
    localStorage.setItem("user_role", data.role);
    
    // 3. Dynamic Redirect
    if (data.role === "leader") {
      navigate("/dashboard/leader"); 
    } else {
      navigate("/dashboard/member");
    }
  };

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    setValue("role", newRole);
    // Gukura ibyari byanditsemo iyo uhinduye role
    if (newRole === "member") setValue("position", "");
    if (newRole === "leader") setValue("voicePart", "");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 pt-32 bg-[#121212] rounded-3xl border border-white/10 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
          JOIN <span className="text-[#a3e635]">KIXY</span>
        </h2>
        <p className="text-gray-500 text-sm font-medium">Create your {currentRole} account</p>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">First Name</label>
            <input {...register("firstName")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" placeholder="Dalvan" />
            {errors.firstName && <p className="text-red-500 text-[10px] ml-1">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Last Name</label>
            <input {...register("lastName")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" placeholder="Eric" />
            {errors.lastName && <p className="text-red-500 text-[10px] ml-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Email</label>
            <input {...register("email")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" placeholder="info@kixy.com" />
            {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Phone Number</label>
            <input {...register("phone")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" placeholder="078..." />
            {errors.phone && <p className="text-red-500 text-[10px] ml-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Dynamic Fields Based on Role */}
        {currentRole === "member" && (
          <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-500">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Voice Part (Amajwi)</label>
            <select {...register("voicePart")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] appearance-none cursor-pointer">
              <option value="">Select your voice</option>
              <option value="Soprano">Soprano</option>
              <option value="Alto">Alto</option>
              <option value="Tenor">Tenor</option>
              <option value="Bass">Bass</option>
            </select>
            {errors.voicePart && <p className="text-red-500 text-[10px] ml-1">Gahunda y'amajwi ni ngombwa</p>}
          </div>
        )}

        {currentRole === "leader" && (
          <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-500">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Leader Position (Inshingano)</label>
            <input {...register("position")} className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" placeholder="e.g. Choir Conductor, President" />
            {errors.position && <p className="text-red-500 text-[10px] ml-1">Andika inshingano yawe mu buyobozi</p>}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Password</label>
            <input {...register("password")} type="password" className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" />
            {errors.password && <p className="text-red-500 text-[10px] ml-1">{errors.password.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Confirm</label>
            <input {...register("confirmPassword")} type="password" className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" />
            {errors.confirmPassword && <p className="text-red-500 text-[10px] ml-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full py-8 text-xl font-black bg-[#a3e635] text-black hover:bg-[#bbf74d] rounded-2xl shadow-[0_15px_30px_rgba(163,230,53,0.2)] mt-6 transition-all active:scale-95"
        >
          JOIN KIXY SYSTEM
        </Button>

        <div className="text-center mt-6 text-sm text-gray-500 font-medium">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-[#a3e635] font-bold hover:underline"
          >
            Sign In Now
          </Link>
        </div>
      </form>
    </div>
  );
}