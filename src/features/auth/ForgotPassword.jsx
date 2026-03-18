import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MailCheck } from "lucide-react";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address.  Please the real email address"),
});

export default function ForgotPassword() {
  const [isSent, setIsSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data) => {
    console.log("Reset link sent to:", data.email);
    setIsSent(true); // Tugaragaze ubutumwa bw'uko byageze kuri email
  };

  if (isSent) {
    return (
      <div className="max-w-md mx-auto my-20 p-10 bg-[#121212] h-full pt-32 rounded-2xl border border-white/10 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[#a3e635]/10 rounded-full">
            <MailCheck className="w-12 h-12 text-[#a3e635]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
        <p className="text-gray-400 mb-8">
          Please fill your email that are match with it.
        </p>
        <Link to="/login" className="text-[#a3e635] font-bold hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-[#121212] rounded-2xl border border-white/10 shadow-2xl">
      <Link to="/login" className="text-gray-500 hover:text-white flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white italic">RESET <span className="text-[#a3e635]">PASSWORD</span></h2>
        <p className="text-gray-400 mt-2"> Please fill your email that are match with it..</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Email Address</label>
          <input 
            {...register("email")}
            className="w-full p-4 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-[#a3e635]" 
            placeholder="example@gmail.com" 
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full py-7 text-lg font-bold">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}