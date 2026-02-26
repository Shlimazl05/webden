"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, ClipboardList } from 'lucide-react';

/**
 * Sidebar tối giản dành cho trang cá nhân khách hàng
 * Thiết kế dạng Khung (Card) đồng bộ với nội dung chính
 */
export const CustomerSidebar = () => {
  const pathname = usePathname();

  // Danh sách 2 mục duy nhất theo yêu cầu của ní
  const menuItems = [
    {
      label: 'Tài khoản',
      href: '/profile',
      icon: <User size={18} />,
      active: pathname === '/profile'
    },
    {
      label: 'Đơn hàng',
      href: '/profile/orders',
      icon: <ClipboardList size={18} />,
      active: pathname === '/profile/orders'
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col gap-1">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`
            flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300
            ${item.active 
              ? 'bg-indigo-50 text-indigo-600' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}
          `}
        >
          <span className={`${item.active ? 'text-indigo-600' : 'text-slate-400'}`}>
            {item.icon}
          </span>
          {item.label}
        </Link>
      ))}
    </div>
  );
};