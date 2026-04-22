
"use client";
import React, { useEffect, useState } from 'react'; // Thêm useEffect, useState
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Layers, Users,
  ShoppingBag, ChevronLeft, ChevronRight, FileText,
  Truck, Building2
} from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const AdminSidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const pathname = usePathname();

  // --- ĐOẠN SỬA ĐỂ TRÁNH LỖI HYDRATION ---
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // ---------------------------------------

  const menuItems = [
    { name: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboard, color: 'text-blue-500' },
    { name: 'Sản phẩm', href: '/admin/products', icon: Package, color: 'text-emerald-500' },
    { name: 'Danh mục', href: '/admin/categories', icon: Layers, color: 'text-amber-500' },
    { name: 'Nhà cung cấp', href: '/admin/suppliers', icon: Building2, color: 'text-teal-500' },
    { name: 'Hóa đơn nhập', href: '/admin/incoming-invoices', icon: FileText, color: 'text-indigo-500' },
    { name: 'Khách hàng', href: '/admin/customers', icon: Users, color: 'text-cyan-500' },
    { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag, color: 'text-rose-500' },
    { name: 'Phí ship', href: '/admin/shipping', icon: Truck, color: 'text-orange-500' },
  ];

  // Nếu chưa mounted (đang SSR), trả về một khung trống hoặc null 
  // để tránh lệch mã HTML giữa Server và Client
  if (!mounted) {
    return (
      <aside className={`fixed left-0 top-0 h-screen bg-slate-100 border-r border-slate-200 z-50 ${isExpanded ? "w-[280px]" : "w-[80px]"}`} />
    );
  }

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-slate-100 border-slate-200 transition-all duration-300 z-50 ${isExpanded ? "w-[280px]" : "w-[80px]"}`}>
      {/* Nút đóng/mở Sidebar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-12 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:text-indigo-600 transition-all z-[60]"
      >
        {isExpanded ? <ChevronLeft size={16} strokeWidth={3} /> : <ChevronRight size={16} strokeWidth={3} />}
      </button>

      {/* Logo Area */}
      <div className="p-6 mb-4 flex justify-center">
        <div className={`bg-white border border-slate-200 shadow-sm rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 ${isExpanded ? "w-20 h-20" : "w-12 h-12"}`}>
          <img
            src="/img/logo-webden.png"
            alt="Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/img/logo-webden.png";
            }}
          />
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="px-3 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              // Lưu ý: Đảm bảo không có thẻ <a> lồng bên trong Link ở phiên bản Next.js mới
              className={`flex items-center gap-4 p-4 transition-all duration-200 group relative rounded-2xl ${isActive
                ? "bg-white text-slate-950 shadow-md border border-slate-200/50"
                : "text-slate-600 hover:bg-slate-200/60"
                } ${!isExpanded && "justify-center"}`}
            >
              <item.icon
                size={24}
                strokeWidth={isActive ? 2.8 : 2}
                className={`${item.color} transition-colors`}
              />

              {isExpanded && (
                <span className={`text-[15px] whitespace-nowrap tracking-tight transition-all ${isActive ? "font-black" : "font-bold"
                  }`}>
                  {item.name}
                </span>
              )}

              {!isExpanded && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[12px] font-black rounded-xl  opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-2xl transition-all uppercase tracking-widest">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};