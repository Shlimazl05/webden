
"use client";
import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value?: string | number | null;
  loading: boolean;
  icon: ReactNode;
  colorClass: string;
  bgColorClass: string;
}

export const StatCard = ({ label, value, loading, icon, colorClass, bgColorClass }: StatCardProps) => {
  const hasData = value !== null && value !== undefined && value !== "";

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-[160px] flex flex-col justify-between overflow-hidden group">

      {/* HÀNG TRÊN: ICON + NHÃN */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bgColorClass} ${colorClass} rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
          {icon}
        </div>
        <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.15em]">
          {label}
        </p>
      </div>

      {/* HÀNG DƯỚI: GIÁ TRỊ (ĐÃ CHỈNH SANG MÀU ĐEN SLATE-950) */}
      <div className="pl-1">
        {loading ? (
          <div className="h-9 w-28 bg-slate-100 animate-pulse rounded-lg" />
        ) : hasData ? (
          <h2 className="text-3xl font-black tracking-tighter leading-none text-slate-950">
            {value}
          </h2>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-4xl font-black text-slate-300 leading-none tracking-tighter">
              --
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};