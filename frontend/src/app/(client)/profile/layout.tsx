"use client";

import React from 'react';
import { CustomerSidebar } from '@/features/customer/components/client/CustomerSidebar';

/**
 * Layout dùng chung cho vùng quản lý tài khoản khách hàng
 * Giúp Sidebar cố định bên trái và nội dung thay đổi bên phải
 */
export default function CustomerPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* 1. CỘT TRÁI: Thanh Menu (Sidebar) - Cố định độ rộng */}
        <aside className="w-full md:w-[280px] flex-shrink-0 sticky top-[110px]">
          <CustomerSidebar />
        </aside>

        {/* 2. CỘT PHẢI: Nội dung thay đổi (Profile Form hoặc Order List) */}
        <main className="flex-1 w-full min-w-0 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          {children}
        </main>

      </div>
    </div>
  );
}