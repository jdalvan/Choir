import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "member" },
  });

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setValue("role", role);
  };

  const onSubmit = (data) => {
    console.log("Login Attempt:", data);
    
    // Simulation ya Login (Tuzabikura muri Database ya Django nyuma)
    localStorage.setItem("user_token", "active_session");
    localStorage.setItem("user_role", data.role);

    // --- IYI NI YO LOGIC WIFUZAGA ---
    // Redirect ishingiye kuri Role (Leader vs Member)
    if (data.role === 'leader') {
      navigate('/dashboard/leader'); 
    } else {
      navigate('/dashboard/member');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 pt-32 bg-[#121212] rounded-2xl border border-white/10 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white italic tracking-tighter">
          SIGN <span className="text-[#a3e635]">IN</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2 capitalize font-medium">As a {currentRole}</p>
      </div>

      {/* Role Switcher */}
      <div className="flex bg-black p-1 rounded-xl mb-8 border border-white/5">
        {["member", "leader"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => handleRoleChange(r)}
            className={cn(
              "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all capitalize",
              currentRole === r ? "bg-[#a3e635] text-black shadow-lg" : "text-gray-500 hover:text-gray-300"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Identifier Field (Email or Phone) */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
            Email or Phone Number
          </label>
          <input 
            {...register("identifier")}
            className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" 
            placeholder="078... cyangwa example@gmail.com" 
          />
          {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Password</label>
            <Link to="/forgot-password" px-0 className="text-[10px] text-[#a3e635] hover:underline">
              Wibagiwe ijambo ry'ibanga?
            </Link>
          </div>
          <input 
            {...register("password")}
            type="password" 
            className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635] transition-all" 
            placeholder="••••••••" 
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full py-7 text-lg font-bold bg-[#a3e635] text-black hover:bg-[#bbf74d] rounded-xl shadow-[0_10px_20px_rgba(163,230,53,0.15)] transition-all active:scale-95"
        >
          Login as {currentRole}
        </Button>
      </form>

      <div className="text-center mt-8 text-sm text-gray-500 font-medium">
        Don't have an account?{" "}
        <Link 
          to="/register" 
          className="text-[#a3e635] font-bold hover:underline hover:text-[#bbf74d] transition-colors"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}