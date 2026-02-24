"use client";
import React from 'react';

const tabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ xác nhận' },
  { id: 'processing', label: 'Đang xử lí' },
  { id: 'shipping', label: 'Đang giao' },
  { id: 'completed', label: 'Hoàn thành' },
  { id: 'cancelled', label: 'Đã hủy' },
];

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
  return (
    <div className="flex items-center gap-8 border-b border-slate-100 mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeTab === tab.id 
              ? "text-yellow-500" 
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {tab.label}
          {/* Thanh gạch chân khi active */}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 animate-in fade-in slide-in-from-left-2" />
          )}
        </button>
      ))}
    </div>
  );
};