// import { TrendingUp, Loader2 } from 'lucide-react';
// import { AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// export const RevenueChart = ({ data, loading, formatVND }: any) => (
//     <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-6 relative">
//         <div className="flex items-center gap-3 mb-6">
//             <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
//                 <TrendingUp size={20} strokeWidth={2.5} />
//             </div>
//             <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">Tổng doanh thu</h3>
//         </div>
//         <div className="h-[350px] w-full flex items-center justify-center">
//             {loading ? (
//                 <Loader2 className="animate-spin text-indigo-600" size={40} />
//             ) : data.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={data}>
//                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                         <XAxis dataKey="date" axisLine={false} tickLine={false} />
//                         <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000000}M`} />
//                         <Tooltip formatter={(v: any) => [formatVND(v), "Doanh thu"]} />
//                         <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} />
//                     </AreaChart>
//                 </ResponsiveContainer>
//             ) : (
//                 <p className="text-slate-400">Chưa có dữ liệu</p>
//             )}
//         </div>
//     </div>
// );


import { TrendingUp, Loader2 } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export const RevenueChart = ({ data, loading, formatVND }: any) => (
    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-6 relative">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <TrendingUp size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">
                Tổng doanh thu theo thời gian
            </h3>
        </div>

        <div className="h-[350px] w-full flex items-center justify-center">
            {loading ? (
                <Loader2 className="animate-spin text-indigo-600" size={40} />
            ) : data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        {/* 1. Định nghĩa Gradient cho phần đổ bóng phía dưới đường biểu đồ */}
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                        {/* 2. Trục X: Format lại ngày thành dd/mm cho gọn */}
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return `${date.getDate()}/${date.getMonth() + 1}`;
                            }}
                        />

                        {/* 3. Trục Y: Hiển thị đơn vị triệu (M) */}
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickFormatter={(v) => `${v / 1000000}M`}
                        />

                        {/* 4. Tooltip: Tùy chỉnh giao diện bo tròn hiện đại */}
                        <Tooltip
                            contentStyle={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(v: any) => [formatVND(v), "Doanh thu"]}
                        />

                        {/* 5. Vùng biểu đồ chính (Area) */}
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4f46e5"
                            strokeWidth={3} // Làm đường kẻ dày hơn
                            fillOpacity={1}
                            fill="url(#colorRevenue)" // Sử dụng Gradient đã định nghĩa ở trên
                            dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-slate-400">Chưa có dữ liệu doanh thu</p>
            )}
        </div>
    </div>
);