// "use client";

// import React, { useState } from "react";
// import { User, Phone, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"; 
// import Link from "next/link";
// import { registerApi } from "../auth.api"; 
// import { useRouter } from "next/navigation";

// export default function RegisterForm() {
//   const router = useRouter(); 
  
//   // States
//   const [showPass, setShowPass] = useState(false);
//   const [showConfirmPass, setShowConfirmPass] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // QUAN TRỌNG: Quản lý trạng thái đang gửi yêu cầu

//   const [username, setUsername] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!username || !phone || !password || !confirmPassword) {
//         alert("Vui lòng nhập đầy đủ thông tin");
//         return;
//     }
//     if (password !== confirmPassword) {
//         alert("Mật khẩu xác nhận không khớp");
//         return;
//     }

//     try {
//       setIsLoading(true); // Bắt đầu loading
      
//       const response = await registerApi({
//         username,
//         phone,
//         password,
//       });

//       alert(response.message || "Đăng ký thành công!");
//       router.push("/login"); 
      
//     } catch (error: any) {
//       const errorMsg = error.response?.data?.message || "Đăng ký thất bại";
//       alert(errorMsg);
//     } finally {
//       setIsLoading(false); // Kết thúc loading dù thành công hay thất bại
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6ee] via-[#f8f1e7] to-[#efe5d8] px-4">
//       <div className="w-full max-w-md bg-[#fffaf3] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10">
//          <h1 className="text-3xl font-serif text-center text-[#3b2f2f] tracking-widest  uppercase font-black">
//           Đăng ký
//         </h1>
//         <p className="text-center text-sm text-[#7a6a5d] mb-10">Tham gia thế giới ánh sáng nội thất</p>

//         <form className="space-y-8" onSubmit={handleRegister}>
//           {/* Username */}
//           <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
//             <input
//               type="text"
//               placeholder="Tên đăng nhập"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f]"
//               disabled={isLoading} // Disable khi đang loading
//             />
//             <User className="absolute right-0 top-2 w-5 h-5 text-[#9b8b7a]" />
//           </div>

//           {/* Phone */}
//           <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
//             <input
//               type="text"
//               placeholder="Số điện thoại"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f]"
//               disabled={isLoading}
//             />
//             <Phone className="absolute right-0 top-2 w-5 h-5 text-[#9b8b7a]" />
//           </div>

//           {/* Password */}
//           <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
//             <input
//               type={showPass ? "text" : "password"}
//               placeholder="Mật khẩu"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f]"
//               disabled={isLoading}
//             />
//             <button
//               type="button" // QUAN TRỌNG: type="button" để không submit form
//               className="absolute right-0 top-2 cursor-pointer text-[#9b8b7a]"
//               onClick={() => setShowPass(!showPass)}
//             >
//               {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
//             <input
//               type={showConfirmPass ? "text" : "password"}
//               placeholder="Xác nhận mật khẩu"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f]"
//               disabled={isLoading}
//             />
//             <button
//               type="button"
//               className="absolute right-0 top-2 cursor-pointer text-[#9b8b7a]"
//               onClick={() => setShowConfirmPass(!showConfirmPass)}
//             >
//               {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading} // Ngăn bấm nhiều lần
//             className="w-full mt-6 py-3 rounded-xl font-semibold text-white
//                        bg-gradient-to-r from-[#c9a24d] to-[#e6c77b]
//                        hover:from-[#b8943f] hover:to-[#d9b865]
//                        disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
//           >
//             {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Đăng ký"}
//           </button>
//         </form>

//         <div className="mt-8 text-center space-y-4">
//           <p className="text-center mt-6 text-sm text-[#7a6a5d]">
//             Đã có tài khoản?{" "}
//             <Link href="/login" className="font-semibold hover:underline">Đăng nhập</Link>
          
//           </p>

//           <Link   
//             href="/" 
//             className="inline-flex items-center justify-center text-[#7a6a5d] hover:text-[#3b2f2f] text-sm pt-4 border-t border-[#e0d7cd] transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Quay lại trang chủ
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { User, Phone, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"; 
import Link from "next/link";
import { registerApi } from "../auth.api"; 
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // 1. Import toast

export default function RegisterForm() {
  const router = useRouter(); 
  
  // States
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 2. Thay alert bằng toast cho validation
    if (!username || !phone || !password || !confirmPassword) {
        toast.error("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    if (password !== confirmPassword) {
        toast.error("Mật khẩu xác nhận không khớp");
        return;
    }

    try {
      setIsLoading(true); 
      
      const response = await registerApi({
        username,
        phone,
        password,
      });

      // 3. Thông báo thành công chuyên nghiệp
      toast.success(response.message || "Đăng ký thành công! Đang chuyển hướng...");
      
      // 4. Đợi 1.5 giây để người dùng kịp nhìn thông báo rồi mới sang trang Login
      setTimeout(() => {
        router.push("/login"); 
      }, 1500);
      
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Đăng ký thất bại";
      // 5. Thông báo lỗi từ server
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6ee] via-[#f8f1e7] to-[#efe5d8] px-4">
      <div className="w-full max-w-md bg-[#fffaf3] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10">
         <h1 className="text-3xl font-serif text-center text-[#3b2f2f] tracking-widest uppercase font-black">
          Đăng ký
        </h1>
        <p className="text-center text-sm text-[#7a6a5d] mb-10">Tham gia thế giới ánh sáng nội thất</p>

        <form className="space-y-8" onSubmit={handleRegister}>
          {/* Username */}
          <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f] text-sm"
              disabled={isLoading}
            />
            <User className="absolute right-0 top-2 w-5 h-5 text-[#9b8b7a]" />
          </div>

          {/* Phone */}
          <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f] text-sm"
              disabled={isLoading}
            />
            <Phone className="absolute right-0 top-2 w-5 h-5 text-[#9b8b7a]" />
          </div>

          {/* Password */}
          <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f] text-sm"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-0 top-2 cursor-pointer text-[#9b8b7a] hover:text-[#c9a24d]"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f] text-sm"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-0 top-2 cursor-pointer text-[#9b8b7a] hover:text-[#c9a24d]"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3 rounded-xl font-semibold text-white text-sm
                       bg-gradient-to-r from-[#c9a24d] to-[#e6c77b]
                       hover:from-[#b8943f] hover:to-[#d9b865]
                       disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-lg transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Đăng ký ngay"}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-center mt-6 text-sm text-[#7a6a5d]">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-semibold text-[#3b2f2f] hover:underline">Đăng nhập</Link>
          </p>

          <Link   
            href="/" 
            className="inline-flex items-center justify-center text-[#7a6a5d] hover:text-[#3b2f2f] text-sm pt-4 border-t border-[#e0d7cd] transition-colors w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}