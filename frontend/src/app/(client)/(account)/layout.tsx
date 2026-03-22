

"use client";
import React from 'react';

export default function CustomerPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1. Nền ngoài cùng hơi xám nhạt (f8fafc) để làm nổi bật cái khung trắng bo góc
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4 md:px-8">
      <main className="max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-10">
          {children}
        </div>

      </main>
    </div>
  );
}