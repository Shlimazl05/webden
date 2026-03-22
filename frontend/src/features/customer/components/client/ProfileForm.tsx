

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