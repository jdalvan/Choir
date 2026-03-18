import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

// 1. Validation Schema (Email cyangwa Phone ya 10 digits)
const loginSchema = z.object({
  identifier: z.string().refine((val) => {
    const isEmail = z.string().email().safeParse(val).success;
    const isPhone = /^[0-9]{10}$/.test(val); 
    return isEmail || isPhone;
  }, {
    message: "Andika email cyangwa numero ya telefone (imibare 10)",
  }),
  password: z.string().min(1, "Ijambo ry'ibanga rirakenewe"),
  role: z.enum(["member", "leader"]),
});

export default function LoginForm() {
  const [currentRole, setCurrentRole] = useState("member");
  const [authError, setAuthError] = useState(""); // Gufata amakosa ya Login
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "member" },
  });

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setValue("role", role);
    setAuthError(""); // Gusiba error iyo uhinduye role
  };

  const onSubmit = (data) => {
    setAuthError("");
    
    // 1. Fata abantu bose biyandikishije muri LocalStorage
    const allUsers = JSON.parse(localStorage.getItem("all_users")) || [];

    // 2. SHAKA NIBA UYU MUNTU ABAYO (Genzura Email cyangwa Phone)
    const foundUser = allUsers.find((u) => 
      (u.email === data.identifier || u.phone === data.identifier) && u.role === data.role
    );

    if (!foundUser) {
      setAuthError(`Ntabwo wiyandikishije nka ${data.role}! Nyabuneka banza ufungure konti.`);
      return;
    }

    // 3. Niba ahari, genzura niba Password ariyo
    if (foundUser.password === data.password) {
      // Simulation ya Login Session
      localStorage.setItem("user_token", "kixy_session_" + Date.now());
      localStorage.setItem("user_role", foundUser.role);

      // 4. Redirect ishingiye kuri Role (Leader vs Member)
      if (foundUser.role === 'leader') {
        navigate('/dashboard/leader'); 
      } else {
        navigate('/dashboard/member');
      }
    } else {
      setAuthError("Ijambo ry'ibanga (Password) ntabwo ari ryo.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-16 p-8 pt-20 bg-[#121212] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
          SIGN <span className="text-[#a3e635]">IN</span>
        </h2>
        <p className="text-gray-500 text-xs font-bold uppercase mt-2 tracking-widest leading-none">
           Access your {currentRole} portal
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Error Display Area */}
        {authError && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-500 text-[10px] font-bold animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={16} />
            {authError}
          </div>
        )}

        {/* Identifier Field (Email or Phone) */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
            Email or Phone Number
          </label>
          <input 
            {...register("identifier")}
            className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" 
            placeholder="078... cyangwa example@gmail.com" 
          />
          {errors.identifier && <p className="text-red-500 text-[10px] ml-1">{errors.identifier.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-center pr-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Password</label>
            <Link to="/forgot-password" px-0 className="text-[10px] text-[#a3e635] hover:underline font-bold">
              Forgot?
            </Link>
          </div>
          <input 
            {...register("password")}
            type="password" 
            className="w-full p-4 bg-black border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#a3e635] transition-all" 
            placeholder="••••••••" 
          />
          {errors.password && <p className="text-red-500 text-[10px] ml-1">{errors.password.message}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full py-8 text-xl font-black bg-[#a3e635] text-black hover:bg-[#bbf74d] rounded-2xl shadow-[0_15px_30px_rgba(163,230,53,0.15)] mt-4 transition-all active:scale-95"
        >
          LOGIN AS {currentRole.toUpperCase()}
        </Button>
      </form>

      <div className="text-center mt-8 text-sm text-gray-500 font-medium">
        Don't have an account yet?{" "}
        <Link 
          to="/register" 
          className="text-[#a3e635] font-black hover:underline uppercase text-xs ml-1"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}