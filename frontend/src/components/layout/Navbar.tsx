

"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/auth.hooks';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  User,
  LogOut, 
  Search, 
  Camera,
  ChevronRight,
  UserCircle
} from 'lucide-react';

const Navbar = () => {
  const { user, isLoggedIn, isLoaded, logout } = useAuth();
  const pathname = usePathname();

  /**
   * Xác định trang hiện tại để xử lý ẩn/hiện các thành phần giao diện
   */
  const isCartPage = pathname === '/cart';

  // Tránh hiện tượng nhảy giao diện khi dữ liệu phiên đăng nhập chưa được tải từ storage
  if (!isLoaded) {
    return <nav className="w-full h-[100px] bg-gradient-to-r from-[#D6E4FF] to-[#FDE2FF] rounded-b-[30px] shadow-sm" />;
  }

  return (
    <nav className="w-full h-[100px] px-[50px] bg-gradient-to-r from-[#D6E4FF] to-[#FDE2FF] rounded-b-[30px] flex items-center justify-between shadow-md sticky top-0 z-50">
      
      {/* 1. Branding / Logo Section */}
      <div className="flex-shrink-0 w-[180px]">
        <Link href="/" className="inline-flex items-center hover:scale-105 transition-transform duration-300">
          <div className="w-[60px] h-[60px] bg-white rounded-full border-2 border-white flex items-center justify-center shadow-lg overflow-hidden">
            <div className="text-[10px] font-black text-center text-indigo-600 leading-tight tracking-tighter uppercase">
              Stellar<br/>Lights
            </div>
          </div>
        </Link>
      </div>

      {/* 2. Global Search Interface - Centered Layout */}
      <div className="flex-1 max-w-[500px] mx-4">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Bạn đang tìm sản phẩm gì?..."
            className="w-full h-[42px] pl-6 pr-16 rounded-full border-2 border-transparent outline-none bg-white text-sm text-indigo-900 font-medium placeholder:text-slate-400 shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-indigo-900 group-focus-within:text-indigo-600 transition-colors">
            {/* Tăng strokeWidth để icon sắc nét hơn trên nền sáng */}
            <Search size={18} strokeWidth={3} className="cursor-pointer hover:scale-110" />
            <div className="w-[1px] h-4 bg-slate-200" />
            <Camera size={18} strokeWidth={3} className="cursor-pointer hover:scale-110" />
          </div>
        </div>
      </div>

      {/* 3. Navigation Links & Account Management */}
      <div className="flex items-center gap-6 text-[#001529] font-bold text-sm flex-shrink-0 justify-end w-[420px]">
        

        
        {/* Conditional Link: Cart (Amber Theme) - Ẩn khi đang đứng tại trang giỏ hàng */}
          {!isCartPage && (
            <Link 
              href={isLoggedIn ? "/cart" : "/login"} 
              className="p-2 transition-all group/cart flex items-center justify-center"
              title="Giỏ hàng"
            >
              <ShoppingCart 
                size={20} 
                strokeWidth={3} // Độ đậm đồng bộ với icon Tìm kiếm/Máy ảnh
                className="text-indigo-900 group-hover/cart:text-amber-600 transition-colors duration-300" 
              />
            </Link>
          )}

        {/* User Account Popover Trigger */}
        <div className="relative group flex items-center py-4 cursor-pointer">
          {isLoggedIn && user && (
            <span className="mr-3 text-indigo-900 font-extrabold hidden lg:inline-block">
              Chào, {user.name.split(' ').slice(-1)[0]}
            </span>
          )}

          <div className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center text-indigo-400 group-hover:text-indigo-600 group-hover:shadow-md transition-all shadow-sm">
            <User size={20} strokeWidth={2.5} />
          </div>

          {/* Account Dropdown Menu Layer */}
          <div className="absolute top-full right-0 pt-2 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50">
            <div className="min-w-max bg-white text-slate-700 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden">
              
              {isLoggedIn && user ? (
                /* Authenticated State View */
                <div className="w-[260px] flex flex-col">
                  {/* Dropdown Header with Contextual Branding */}
                  <div className="px-6 py-5 bg-gradient-to-br from-indigo-50 to-pink-50 border-b border-slate-50">
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Tài khoản quản lý</p>
                    <p className="text-base font-black text-indigo-900 truncate">{user.name}</p>
                  </div>

                  {/* Menu Options Group */}
                  <div className="p-2">
                    <Link href="/profile" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                          <UserCircle size={18} />
                        </div>
                        <span className="font-bold text-sm text-slate-600 group-hover/item:text-indigo-700">Thông tin cá nhân</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover/item:text-indigo-400 group-hover/item:translate-x-1 transition-all" />
                    </Link>

                    <Link href="/orders" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-pink-50 transition-colors group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                          <Package size={18} />
                        </div>
                        <span className="font-bold text-sm text-slate-600 group-hover/item:text-pink-700">Đơn hàng của tôi</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover/item:text-pink-400 group-hover/item:translate-x-1 transition-all" />
                    </Link>
                  </div>

                  {/* Destructive Action: Logout */}
                  <button 
                    onClick={logout}
                    className="w-full mt-1 border-t border-slate-50 px-6 py-4 flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors text-sm font-bold text-left"
                  >
                    <div className="p-2 bg-red-50 rounded-lg">
                      <LogOut size={16} />
                    </div>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                /* Guest State View */
                <div className="flex items-center gap-5 px-6 py-4 bg-white whitespace-nowrap">
                  <Link href="/login" className="text-sm font-bold text-indigo-600 hover:scale-110 transition-transform">
                    Đăng nhập
                  </Link>
                  <div className="w-[1px] h-4 bg-slate-200" />
                  <Link href="/register" className="text-sm font-bold text-pink-500 hover:scale-110 transition-transform">
                    Đăng ký
                  </Link>
                </div>
              )}
              
              {/* Layout Triangle Indicator */}
              <div className="absolute -top-1 right-4 w-3 h-3 bg-white rotate-45 border-l border-t border-slate-100 shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;