


// "use client";
// import React from 'react';
// import { useAdminAuth } from '@/features/auth/auth.hooks';
// import { useAdminStats } from '@/features/dashboard/admin.hook'; 
// import { StatCard } from '@/features/dashboard/components/StatCard';
// import { 
//   BarChart3, 
//   Box, 
//   Users2, 
//   ClipboardList, 
//   LayoutDashboard, 
//   Trophy,
//   RefreshCcw 
// } from 'lucide-react';

// import { 
//   AdminPageContainer, 
//   AdminPageHeader 
// } from "@/components/layout/AdminPageContainer";
// import { BestSellersList } from '@/features/dashboard/components/BestSellersList';

// export default function DashboardPage() {
//   const { isAuthorized } = useAdminAuth();
//   const { stats, loading } = useAdminStats();
  
//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500">
//       <AdminPageContainer>
        
//         <AdminPageHeader title="BẢN ĐIỀU KHIỂN" />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           <StatCard 
//             label="DOANH THU" 
//             value={stats?.revenue !== undefined ? `${stats.revenue.toLocaleString('vi-VN')} đ` : null} 
//             loading={loading} 
//             colorClass="text-indigo-600" 
//             bgColorClass="bg-indigo-50"
//             icon={<BarChart3 size={20} strokeWidth={2.5} />} 
//           />
//           <StatCard 
//             label="SẢN PHẨM" 
//             value={stats?.products} 
//             loading={loading} 
//             colorClass="text-emerald-600" 
//             bgColorClass="bg-emerald-50"
//             icon={<Box size={20} strokeWidth={2.5} />} 
//           />
//           <StatCard 
//             label="KHÁCH HÀNG" 
//             value={stats?.customers} 
//             loading={loading} 
//             colorClass="text-amber-600" 
//             bgColorClass="bg-amber-50"
//             icon={<Users2 size={20} strokeWidth={2.5} />} 
//           />
//           <StatCard 
//             label="ĐƠN HÀNG" 
//             value={stats?.orders} 
//             loading={loading} 
//             colorClass="text-rose-600" 
//             bgColorClass="bg-rose-50"
//             icon={<ClipboardList size={20} strokeWidth={2.5} />} 
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* cot bieu do */}
//           <div className="lg:col-span-2">
//             <div className="bg-[#f8fafc] border-2 border-dashed border-slate-200 rounded-[2.5rem] h-[450px] flex flex-col items-center justify-center text-center p-6">
//               <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
//                 <LayoutDashboard size={40} className="text-slate-200" strokeWidth={1.5} />
//               </div>
//               <p className="text-slate-400 font-black text-sm uppercase tracking-widest">
//                 Biểu đồ
//               </p>
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm h-[450px] flex flex-col overflow-hidden">
//               <div className="p-6 border-b border-slate-50 flex items-center gap-3">
//                 <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
//                   <Trophy size={20} strokeWidth={2.5} />
//                 </div>
//                 <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">
//                   Sản phẩm bán chạy
//                 </h3>
//               </div>
//               <BestSellersList items={stats?.bestSellers} loading={loading} />
              
//             </div>
//           </div>
//         </div>

//       </AdminPageContainer>
//     </div>
//   );
// }

"use client";
import { useAdminAuth } from '@/features/auth/auth.hooks';
import { useAdminStats } from '@/features/dashboard/admin.hook';
import { AdminPageContainer, AdminPageHeader } from "@/components/layout/AdminPageContainer";

// Import các component đã tách
import { StatsGrid } from '@/features/dashboard/components/StatsGird';
import { RevenueChart } from '@/features/dashboard/components/RevenueChart';
import { CategoryPieChart } from '@/features/dashboard/components/CategoryPieChart';
import { TopProductsChart } from '@/features/dashboard/components/TopProductsChart';

const formatVND = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

export default function DashboardPage() {
  const { isAuthorized } = useAdminAuth();
  const { stats, loading } = useAdminStats();

  if (!isAuthorized) return null;

  // Mapping dữ liệu tại đây để giữ logic tập trung
  const topProductsData = stats?.bestSellers?.map((item: any) => ({
    name: item.name || item.productName || 'Tên sản phẩm',
    revenue: item.revenue || item.totalSales || 0
  })) || [];

  return (
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>
        <AdminPageHeader title="BẢN ĐIỀU KHIỂN" />

        <StatsGrid stats={stats} loading={loading} />

        <div className="flex flex-col gap-8">
          <RevenueChart
            data={stats?.revenueChart || []}
            loading={loading}
            formatVND={formatVND}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <CategoryPieChart
              data={stats?.categoryChart || []}
              loading={loading}
            />
            <TopProductsChart
              data={topProductsData}
              loading={loading}
              formatVND={formatVND}
            />
          </div>
        </div>
      </AdminPageContainer>
    </div>
  );
}