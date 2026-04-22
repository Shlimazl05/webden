
"use client";
import React, { useState } from 'react';
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Sidebar cố định */}
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Vùng nội dung bên phải */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded ? "pl-[280px]" : "pl-[80px]"
        }`}
      >
        <AdminHeader />
        
        <main className="flex-1 p-10 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}