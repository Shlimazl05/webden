


"use client";
import React from 'react';

const tabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'Pending', label: 'Chờ xác nhận' },
  { id: 'Processing', label: 'Đang xử lý' },
  { id: 'Shipping', label: 'Đang giao' },
  { id: 'Completed', label: 'Hoàn thành' },
  { id: 'Cancelled', label: 'Đã hủy' },
];

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
  return (
    <div className="flex items-center gap-2 md:gap-6 border-b border-slate-100 mb-8 overflow-x-auto custom-scrollbar whitespace-nowrap">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 px-2 text-[14px] transition-all relative flex items-center gap-2 group ${
              isActive 
                ? "text-indigo-600 font-black" 
                : "text-slate-400 font-bold hover:text-slate-600"
            }`}
          >
            <span className="uppercase tracking-widest">{tab.label}</span>
            
            {/* Thanh gạch chân khi active: Sắc nét & Indigo */}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-indigo-600 rounded-t-full animate-in fade-in slide-in-from-bottom-1 duration-300" />
            )}
          </button>
        );
      })}
    </div>
  );
};
