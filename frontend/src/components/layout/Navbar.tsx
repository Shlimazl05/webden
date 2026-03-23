

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
    return <nav className="w-full h-[100px] bg-[#0f172a]  shadow-sm" />;
  }

  return (
    <nav className="w-full h-[100px] px-[50px] bg-slate-950/95 backdrop-blur-md border-b border-slate-800  flex items-center justify-between shadow-2xl sticky top-0 z-50">

      {/* 1. Branding / Logo Section */}
      <div className="flex-shrink-0 w-[180px]">
        <Link href="/" className="inline-flex items-center hover:scale-105 transition-transform duration-300">
          <div className="w-[60px] h-[60px] bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)] overflow-hidden border border-white/20">
            <div className="text-[10px] font-black text-center text-slate-900 leading-tight tracking-tighter uppercase">
              Stellar<br />Lights
            </div>
          </div>
        </Link>
      </div>

      {/* 2. Global Search Interface - Đã chỉnh màu icon và chữ đồng bộ với giỏ hàng */}
      <div className="flex-1 max-w-[700px] mx-4">
        <div className="relative group">
          <input
            type="text"
            spellCheck="false"
            placeholder="Tìm kiếm đèn nội thất..."
            className="w-full h-[50px] pl-6 pr-16 rounded-full border border-slate-700 outline-none bg-slate-900/50 text-lg text-white font-medium laceholder:text-white/40 
             antialiased tracking-wide font-sans transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-slate-300  transition-colors">
            <Search size={18} strokeWidth={2.5} className="cursor-pointer hover:scale-110" />
            <div className="w-[1px] h-4 bg-slate-700" />
            <Camera size={18} strokeWidth={2.5} className="cursor-pointer hover:scale-110" />
          </div>
        </div>
      </div>

      {/* 3. Navigation Links & Account Management */}
      <div className="flex items-center gap-6 text-slate-200 font-bold text-sm flex-shrink-0 justify-end w-[420px]">

        {/* Conditional Link: Cart (Amber Theme) */}
        {!isCartPage && (
          <Link
            href={isLoggedIn ? "/cart" : "/login"}
            className="p-2 transition-all group/cart flex items-center justify-center relative"
            title="Giỏ hàng"
          >
            <ShoppingCart
              size={22}
              strokeWidth={2}
              className="text-slate-300 group-hover/cart:text-amber-400 transition-colors duration-300"
            />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-slate-900">
              0
            </span>
          </Link>
        )}

        {/* User Account Popover Trigger */}
        <div className="relative group flex items-center py-4 cursor-pointer">
          {isLoggedIn && user && (
            <span className="mr-3 text-slate-300 font-medium hidden lg:inline-block">
              Chào, <span className="text-amber-400">{user.name.split(' ').slice(-1)[0]}</span>
            </span>
          )}

          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-amber-400 group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all">
            <User size={20} strokeWidth={2} />
          </div>

          {/* Account Dropdown Menu Layer */}
          <div className="absolute top-full right-0 pt-2 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50">
            <div className="min-w-max bg-slate-900 text-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 overflow-hidden">

              {isLoggedIn && user ? (
                /* Authenticated State View */
                <div className="w-[260px] flex flex-col">
                  {/* Dropdown Header */}
                  <div className="px-6 py-5 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-800">
                    <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">Thành viên Stellar</p>
                    <p className="text-base font-bold text-white truncate">{user.name}</p>
                  </div>

                  {/* Menu Options Group */}
                  <div className="p-2">
                    <Link href="/profile" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700/50 rounded-lg text-amber-400">
                          <UserCircle size={18} />
                        </div>
                        <span className="font-medium text-sm text-slate-300 group-hover/item:text-white transition-colors">Thông tin cá nhân</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-600 group-hover/item:text-amber-400 group-hover/item:translate-x-1 transition-all" />
                    </Link>

                    <Link href="/orders" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700/50 rounded-lg text-amber-400">
                          <Package size={18} />
                        </div>
                        <span className="font-medium text-sm text-slate-300 group-hover/item:text-white transition-colors">Đơn hàng của tôi</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-600 group-hover/item:text-amber-400 group-hover/item:translate-x-1 transition-all" />
                    </Link>
                  </div>

                  {/* Destructive Action: Logout */}
                  <button
                    onClick={logout}
                    className="w-full mt-1 border-t border-slate-800 px-6 py-4 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-bold text-left"
                  >
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <LogOut size={16} />
                    </div>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                /* Guest State View */
                <div className="flex items-center gap-5 px-6 py-4 bg-slate-900 whitespace-nowrap">
                  <Link href="/login" className="text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors">
                    Đăng nhập
                  </Link>
                  <div className="w-[1px] h-4 bg-slate-700" />
                  <Link href="/register" className="text-sm font-bold text-white hover:text-amber-200 transition-colors">
                    Đăng ký
                  </Link>
                </div>
              )}

              {/* Layout Triangle Indicator */}
              <div className="absolute -top-1 right-4 w-3 h-3 bg-slate-900 rotate-45 border-l border-t border-slate-800 shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

