


"use client";
import React from 'react';
import { useAdminAuth } from '@/features/auth/auth.hooks';
import { useAdminStats } from '@/features/dashboard/admin.hook'; 
import { StatCard } from '@/features/dashboard/components/StatCard';
import { 
  BarChart3, 
  Box, 
  Users2, 
  ClipboardList, 
  LayoutDashboard, 
  Trophy,
  RefreshCcw 
} from 'lucide-react';

import { 
  AdminPageContainer, 
  AdminPageHeader 
} from "@/components/layout/AdminPageContainer";

export default function DashboardPage() {
  const { isAuthorized } = useAdminAuth();
  const { stats, loading } = useAdminStats();
  
  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>
        
        <AdminPageHeader title="BẢN ĐIỀU KHIỂN" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            label="DOANH THU" 
            value={stats?.revenue !== undefined ? `${stats.revenue.toLocaleString('vi-VN')} đ` : null} 
            loading={loading} 
            colorClass="text-indigo-600" 
            bgColorClass="bg-indigo-50"
            icon={<BarChart3 size={20} strokeWidth={2.5} />} 
          />
          <StatCard 
            label="SẢN PHẨM" 
            value={stats?.products} 
            loading={loading} 
            colorClass="text-emerald-600" 
            bgColorClass="bg-emerald-50"
            icon={<Box size={20} strokeWidth={2.5} />} 
          />
          <StatCard 
            label="KHÁCH HÀNG" 
            value={stats?.customers} 
            loading={loading} 
            colorClass="text-amber-600" 
            bgColorClass="bg-amber-50"
            icon={<Users2 size={20} strokeWidth={2.5} />} 
          />
          <StatCard 
            label="ĐƠN HÀNG" 
            value={stats?.orders} 
            loading={loading} 
            colorClass="text-rose-600" 
            bgColorClass="bg-rose-50"
            icon={<ClipboardList size={20} strokeWidth={2.5} />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#f8fafc] border-2 border-dashed border-slate-200 rounded-[2.5rem] h-[450px] flex flex-col items-center justify-center text-center p-6">
              <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
                <LayoutDashboard size={40} className="text-slate-200" strokeWidth={1.5} />
              </div>
              <p className="text-slate-400 font-black text-sm uppercase tracking-widest">
                Biểu đồ
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm h-[450px] flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Trophy size={20} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">
                  Sản phẩm bán chạy
                </h3>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <RefreshCcw size={28} className="text-slate-300 animate-spin-slow" strokeWidth={1.5} />
                </div>
                <p className="text-slate-400 font-black text-xs uppercase tracking-[0.15em]">
                  Đang cập nhật dữ liệu...
                </p>
              </div>
            </div>
          </div>
        </div>

      </AdminPageContainer>
    </div>
  );
}