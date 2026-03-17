"use client";
import React from 'react';
import { StatCard } from './StatCard';
import { BarChart3, Box, Users2, ClipboardList } from 'lucide-react';

interface StatsGridProps {
    stats: any;
    loading: boolean;
}

export const StatsGrid = ({ stats, loading }: StatsGridProps) => {
    return (
        /* Giữ nguyên class grid của file gốc để không đổi giao diện */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* 1. DOANH THU */}
            <StatCard
                label="DOANH THU"
                value={stats?.revenue !== undefined ? `${stats.revenue.toLocaleString('vi-VN')} đ` : null}
                loading={loading}
                colorClass="text-indigo-600"
                bgColorClass="bg-indigo-50"
                icon={<BarChart3 size={20} strokeWidth={2.5} />}
            />

            {/* 2. SẢN PHẨM */}
            <StatCard
                label="SẢN PHẨM"
                value={stats?.products}
                loading={loading}
                colorClass="text-emerald-600"
                bgColorClass="bg-emerald-50"
                icon={<Box size={20} strokeWidth={2.5} />}
            />

            {/* 3. KHÁCH HÀNG */}
            <StatCard
                label="KHÁCH HÀNG"
                value={stats?.customers}
                loading={loading}
                colorClass="text-amber-600"
                bgColorClass="bg-amber-50"
                icon={<Users2 size={20} strokeWidth={2.5} />}
            />

            {/* 4. ĐƠN HÀNG */}
            <StatCard
                label="ĐƠN HÀNG"
                value={stats?.orders}
                loading={loading}
                colorClass="text-rose-600"
                bgColorClass="bg-rose-50"
                icon={<ClipboardList size={20} strokeWidth={2.5} />}
            />
        </div>
    );
};