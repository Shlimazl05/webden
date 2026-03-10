// D:\webden\frontend\src\features\category\components\admin\CategoryStats.tsx
import React from 'react';
import { Layers, Eye, EyeOff } from 'lucide-react';

interface StatsProps {
  total: number;
  active: number;
  hidden: number;
}

export const CategoryStats = ({ total, active, hidden }: StatsProps) => {
  const cards = [
    { label: 'Tổng danh mục', value: total, icon: Layers, color: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-600' },
    { label: 'Đang hiển thị', value: active, icon: Eye, color: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Đang ẩn', value: hidden, icon: EyeOff, color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl ${card.light} flex items-center justify-center`}>
            <card.icon className={card.text} size={28} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{card.label}</p>
            <h3 className="text-2xl font-black text-slate-800">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};