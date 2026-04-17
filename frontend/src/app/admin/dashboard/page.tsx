


// "use client";
// import { useAdminAuth } from '@/features/auth/auth.hooks';
// import { useAdminStats } from '@/features/dashboard/admin.hook';
// import { AdminPageContainer, AdminPageHeader } from "@/components/layout/AdminPageContainer";

// // Import các component đã tách
// import { StatsGrid } from '@/features/dashboard/components/StatsGird';
// import { RevenueChart } from '@/features/dashboard/components/RevenueChart';
// import { CategoryPieChart } from '@/features/dashboard/components/CategoryPieChart';
// import { BestSellersList } from '@/features/dashboard/components/BestSellersList';
// import { Award } from 'lucide-react'; // Import thêm icon cho tiêu đề danh sách

// const formatVND = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

// export default function DashboardPage() {
//   const { isAuthorized } = useAdminAuth();
//   const { stats, loading, range, setRange } = useAdminStats();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500">
//       <AdminPageContainer>

//         {/* 1. Header & Bộ lọc */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <AdminPageHeader title="TỔNG QUAN" />

//           <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
//             <span className="text-[10px] font-black text-slate-400 uppercase pl-3 tracking-wider">Hiển thị:</span>
//             <select
//               value={range}
//               onChange={(e) => setRange(Number(e.target.value))}
//               className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer min-w-[140px]"
//             >
//               <option value={7}>7 ngày qua</option>
//               <option value={30}>30 ngày qua</option>
//               <option value={90}>90 ngày qua</option>
//             </select>
//           </div>
//         </div>

//         {/* 2. Thẻ thống kê */}
//         <StatsGrid stats={stats} loading={loading} />

//         <div className="flex flex-col gap-8">
//           {/* 3. Biểu đồ doanh thu */}
//           <RevenueChart
//             data={stats?.revenueChart || []}
//             loading={loading}
//             formatVND={formatVND}
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
//             {/* 4A. Biểu đồ Tỷ trọng danh mục */}
//             <CategoryPieChart
//               data={stats?.categoryChart || []}
//               loading={loading}
//             />

//             {/* 4B. Danh sách sản phẩm bán chạy (Được bọc trong Card cho đẹp) */}
//             <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-6 flex flex-col h-[400px]">
//               <div className="flex items-center gap-3 mb-4 px-2">
//                 <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
//                   <Award size={20} strokeWidth={2.5} />
//                 </div>
//                 <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">
//                   Top Đèn bán chạy nhất
//                 </h3>
//               </div>

//               <BestSellersList
//                 items={stats?.bestSellers || []} // Truyền prop 'items' thay vì 'data'
//                 loading={loading}
//               />
//             </div>
//           </div>
//         </div>
//       </AdminPageContainer>
//     </div>
//   );
// }


// D:\webden\frontend\src\app\admin\dashboard\page.tsx

"use client";
import { useAdminAuth } from '@/features/auth/auth.hooks';
import { useAdminStats } from '@/features/dashboard/admin.hook';
import { AdminPageContainer, AdminPageHeader } from "@/components/layout/AdminPageContainer";
import { StatsGrid } from '@/features/dashboard/components/StatsGird';
import { RevenueChart } from '@/features/dashboard/components/RevenueChart';
import { CategoryPieChart } from '@/features/dashboard/components/CategoryPieChart';
import { BestSellersList } from '@/features/dashboard/components/BestSellersList';
import { Award } from 'lucide-react';

const formatVND = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

export default function DashboardPage() {
  const { isAuthorized } = useAdminAuth();
  // range hiện tại có thể là '30', 'today', 'all',...
  const { stats, loading, range, setRange } = useAdminStats();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>

        {/* 1. Header & Bộ lọc */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <AdminPageHeader title="TỔNG QUAN" />

          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase pl-3 tracking-wider">Hiển thị:</span>
            <select
              value={range}
              // QUAN TRỌNG: Không dùng Number() ở đây nữa để nhận được giá trị chuỗi 'all', 'today',...
              onChange={(e) => setRange(e.target.value)}
              className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer min-w-[160px]"
            >
              <option value="today">Hôm nay</option>
              <option value="7days">7 ngày qua</option>
              <option value="30">30 ngày qua</option>
              <option value="thisMonth">Tháng này</option>
              <option value="all">Tất cả thời gian</option>
            </select>
          </div>
        </div>

        {/* 2. Thẻ thống kê */}
        <StatsGrid stats={stats} loading={loading} />

        <div className="flex flex-col gap-8">
          {/* 3. Biểu đồ doanh thu */}
          <RevenueChart
            data={stats?.revenueChart || []}
            loading={loading}
            formatVND={formatVND}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* 4A. Biểu đồ Tỷ trọng danh mục */}
            <CategoryPieChart
              data={stats?.categoryChart || []}
              loading={loading}
            />

            {/* 4B. Danh sách sản phẩm bán chạy */}
            <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-6 flex flex-col h-[400px]">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Award size={20} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">
                  Top Đèn bán chạy nhất
                </h3>
              </div>

              <BestSellersList
                items={stats?.bestSellers || []}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </AdminPageContainer>
    </div>
  );
}