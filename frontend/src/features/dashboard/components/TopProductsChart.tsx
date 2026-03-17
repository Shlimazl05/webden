import React from 'react';
import { Award, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TopProductsChartProps {
    data: any[];
    loading: boolean;
    formatVND: (value: number) => string;
}

export const TopProductsChart = ({ data, loading, formatVND }: TopProductsChartProps) => {
    return (
        <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-6 relative">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Award size={20} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">
                    Top Đèn bán chạy nhất
                </h3>
            </div>

            <div className="h-[300px] w-full flex items-center justify-center">
                {loading ? (
                    <Loader2 className="animate-spin text-emerald-600" size={40} />
                ) : data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                width={130}
                                tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                            />
                            <Tooltip
                                formatter={(value: any) => [formatVND(Number(value)), "Doanh thu"]}
                                cursor={{ fill: '#f8fafc' }}
                            />
                            <Bar dataKey="revenue" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-slate-400">Chưa có dữ liệu sản phẩm</p>
                )}
            </div>
        </div>
    );
};