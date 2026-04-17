import React from 'react';
import { PieChart as PieChartIcon, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
    '#6366f1', // Indigo (Xanh tím)
    '#10b981', // Emerald (Xanh lá)
    '#f59e0b', // Amber (Vàng cam)
    '#ef4444', // Rose (Đỏ hồng)
    '#06b6d4', // Cyan (Xanh thiên thanh)
    '#8b5cf6', // Violet (Tím)
    '#f97316', // Orange (Cam)
    '#ec4899', // Pink (Hồng)
    '#84cc16', // Lime (Xanh chanh)
    '#64748b', // Slate (Xám xanh)
];

interface CategoryPieChartProps {
    data: any[];
    loading: boolean;
}

export const CategoryPieChart = ({ data, loading }: CategoryPieChartProps) => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 relative">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <PieChartIcon size={20} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">
                    Tỷ trọng danh mục
                </h3>
            </div>

            <div className="h-[300px] w-full flex items-center justify-center">
                {loading ? (
                    <Loader2 className="animate-spin text-amber-600" size={40} />
                ) : data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: any) => [
                                    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value),
                                    "Doanh thu"
                                ]}
                            />
                            <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-slate-400">Chưa có dữ liệu danh mục</p>
                )}
            </div>
        </div>
    );
};