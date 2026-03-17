import { TrendingUp, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RevenueChart = ({ data, loading, formatVND }: any) => (
    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-6 relative">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <TrendingUp size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">Tổng doanh thu</h3>
        </div>
        <div className="h-[350px] w-full flex items-center justify-center">
            {loading ? (
                <Loader2 className="animate-spin text-indigo-600" size={40} />
            ) : data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000000}M`} />
                        <Tooltip formatter={(v: any) => [formatVND(v), "Doanh thu"]} />
                        <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-slate-400">Chưa có dữ liệu</p>
            )}
        </div>
    </div>
);