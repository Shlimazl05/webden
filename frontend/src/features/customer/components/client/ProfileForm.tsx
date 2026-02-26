

// "use client";

// import React, { useState } from 'react';
// import { User, Mail, Phone, MapPin, Save, Plus } from 'lucide-react';
// import { useAuth } from '@/features/auth/auth.hooks';
// import { toast } from 'react-hot-toast';

// export const ProfileForm = () => {
//   const { user } = useAuth();
  
//   // Quản lý trạng thái form
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: '', // Ban đầu để trống để hiện nút "Thêm"
//     phone: '0901234567',
//     address: '123 Đường Ánh Sáng, Quận 1, TP.HCM'
//   });

//   // Trạng thái đang gõ email mới
//   const [isAddingEmail, setIsAddingEmail] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Cập nhật thông tin thành công!");
//     setIsAddingEmail(false);
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="border-b border-slate-100 pb-5 mb-10">
//         <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight">Hồ Sơ Của Tôi</h2>
//         <p className="text-sm text-slate-400 mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
//       </div>

//       <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        
//         {/* 1. Họ và tên */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
//           <label className="text-sm font-bold text-slate-500 md:text-right">Họ và tên</label>
//           <div className="md:col-span-3 relative group">
//             <input 
//               type="text" 
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
//               placeholder="Nhập họ và tên"
//             />
//             <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
//           </div>
//         </div>

//         {/* 2. Email - LOGIC THÊM MỚI TẠI ĐÂY */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
//           <label className="text-sm font-bold text-slate-500 md:text-right">Email</label>
//           <div className="md:col-span-3">
//             {formData.email || isAddingEmail ? (
//               // Hiển thị ô nhập khi đã có email hoặc đang nhấn "Thêm"
//               <div className="relative group animate-in fade-in slide-in-from-left-2 duration-300">
//                 <input 
//                   type="email" 
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   className="w-full pl-11 pr-4 py-3 bg-indigo-50/30 border border-indigo-200 rounded-2xl text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
//                   placeholder="example@gmail.com"
//                   autoFocus={isAddingEmail}
//                 />
//                 <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
//               </div>
//             ) : (
//               // Hiển thị nút Thêm khi chưa có dữ liệu
//               <button 
//                 type="button"
//                 onClick={() => setIsAddingEmail(true)}
//                 className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl border border-dashed border-indigo-200 transition-all group"
//               >
//                 <Plus size={16} className="group-hover:rotate-90 transition-transform" />
//                 Thêm địa chỉ Email
//               </button>
//             )}
//           </div>
//         </div>

//         {/* 3. Số điện thoại */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
//           <label className="text-sm font-bold text-slate-500 md:text-right">Số điện thoại</label>
//           <div className="md:col-span-3 relative group">
//             <input 
//               type="text" 
//               value={formData.phone}
//               onChange={(e) => setFormData({...formData, phone: e.target.value})}
//               className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
//             />
//             <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
//           </div>
//         </div>

//         {/* 4. Địa chỉ */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
//           <label className="text-sm font-bold text-slate-500 md:text-right mt-3">Địa chỉ</label>
//           <div className="md:col-span-3 relative group">
//             <textarea 
//               rows={3}
//               value={formData.address}
//               onChange={(e) => setFormData({...formData, address: e.target.value})}
//               className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none"
//               placeholder="Nhập địa chỉ giao hàng của ní"
//             />
//             <MapPin size={18} className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500" />
//           </div>
//         </div>

//         {/* Nút lưu */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
//           <div className="md:col-start-2 md:col-span-3">
//             <button 
//               type="submit"
//               className="px-10 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-3 hover:-translate-y-0.5 active:scale-95"
//             >
//               <Save size={20} strokeWidth={2.5} />
//               LƯU THÔNG TIN HỒ SƠ
//             </button>
//           </div>
//         </div>

//       </form>
//     </div>
//   );
// };

"use client";

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { useAuth } from '@/features/auth/auth.hooks';
import { toast } from 'react-hot-toast';

export const ProfileForm = () => {
  const { user } = useAuth();
  
  // Trạng thái form: Để rỗng ban đầu cho Email và Địa chỉ như yêu cầu
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: '', 
    phone: '0901234567',
    address: '' 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sau này gọi API cập nhật dữ liệu tại đây
    toast.success("Cập nhật hồ sơ thành công!");
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Tiêu đề trang hồ sơ */}
      <div className="border-b border-slate-100 pb-5 mb-10">
        <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight">Hồ Sơ Của Tôi</h2>
        <p className="text-sm text-slate-400 mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        
        {/* 1. HỌ VÀ TÊN */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <label className="text-sm font-bold text-slate-500 md:text-right">Họ và tên</label>
          <div className="md:col-span-3 relative group">
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-[20px] text-sm placeholder:text-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              placeholder="Nhập họ và tên"
            />
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
          </div>
        </div>

        {/* 2. EMAIL (Đã chỉnh đồng bộ với ảnh) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <label className="text-sm font-bold text-slate-500 md:text-right">Email</label>
          <div className="md:col-span-3 relative group">
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-[20px] text-sm placeholder:text-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              placeholder="Nhập địa chỉ Email"
            />
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
          </div>
        </div>

        {/* 3. SỐ ĐIỆN THOẠI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <label className="text-sm font-bold text-slate-500 md:text-right">Số điện thoại</label>
          <div className="md:col-span-3 relative group">
            <input 
              type="text" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-[20px] text-sm placeholder:text-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              placeholder="Nhập số điện thoại"
            />
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
          </div>
        </div>

        {/* 4. ĐỊA CHỈ (Đã chỉnh đồng bộ với ảnh) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <label className="text-sm font-bold text-slate-500 md:text-right">Địa chỉ</label>
          <div className="md:col-span-3 relative group">
            <input 
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-[20px] text-sm placeholder:text-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              placeholder="Nhập địa chỉ giao hàng"
            />
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
          </div>
        </div>

        {/* NÚT LƯU */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          <div className="md:col-start-2 md:col-span-3 text-center md:text-left">
            <button 
              type="submit"
              className="px-10 py-3.5 bg-indigo-600 text-white rounded-[18px] font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-3 active:scale-95 mx-auto md:mx-0"
            >
              <Save size={18} strokeWidth={2.5} />
              Lưu
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};