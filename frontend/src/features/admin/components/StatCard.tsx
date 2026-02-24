// // src/features/admin/components/StatCard.tsx
// import { ReactNode } from 'react';

// interface StatCardProps {
//   label: string;
//   value?: string;
//   loading: boolean;
//   icon: ReactNode;
//   colorClass: string;   // Ví dụ: text-blue-600
//   bgColorClass: string; // Ví dụ: bg-blue-50
// }

// export const StatCard = ({ label, value, loading, icon, colorClass, bgColorClass }: StatCardProps) => (
//   <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
//     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
//       {label}
//     </p>
    
//     <div className="flex justify-between items-center">
//       {loading ? (
//         <div className="h-10 w-24 bg-slate-100 animate-pulse rounded-lg" />
//       ) : (
//         <h2 className={`text-3xl font-black tracking-tight ${colorClass}`}>
//           {value || "0"}
//         </h2>
//       )}
      
//       {/* Vùng chứa icon: Dùng bgColorClass để nổi bật hơn */}
//       <div className={`w-12 h-12 ${bgColorClass} ${colorClass} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
//         {icon}
//       </div>
//     </div>
//   </div>
// );

// src/features/admin/components/StatCard.tsx
// src/features/admin/components/StatCard.tsx

// import { ReactNode } from 'react';

// interface StatCardProps {
//   label: string;
//   value?: string | number | null;
//   loading: boolean;
//   icon: ReactNode;
//   colorClass: string;
//   bgColorClass: string;
// }

// export const StatCard = ({ label, value, loading, icon, colorClass, bgColorClass }: StatCardProps) => {
//   // Kiểm tra xem thực sự có dữ liệu hay không (tránh lỗi số 0 bị hiểu lầm là không có dữ liệu)
//   const hasData = value !== null && value !== undefined && value !== "";

//   return (
//     <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden h-[160px] flex flex-col justify-between">
//       {/* Label phía trên */}
//       <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
//         {label}
//       </p>
      
//       <div className="flex justify-between items-end">
//         <div className="flex flex-col justify-end">
//           {loading ? (
//             /* 1. TRẠNG THÁI ĐANG TẢI (SKELETON) */
//             <div className="h-10 w-24 bg-slate-100 animate-pulse rounded-xl mb-1" />
//           ) : hasData ? (
//             /* 2. TRẠNG THÁI CÓ DỮ LIỆU (BAO GỒM CẢ SỐ 0) */
//             <h2 className={`text-3xl font-black tracking-tight leading-none ${colorClass}`}>
//               {value}
//             </h2>
//           ) : (
//             /* 3. TRẠNG THÁI CHƯA CÓ DỮ LIỆU */
//             <div className="flex flex-col">
//               <h2 className="text-3xl font-black tracking-tight text-slate-200 leading-none">
//                 --
//               </h2>
//               <span className="text-[9px] text-slate-300 font-bold uppercase mt-2 tracking-tighter">
//                 Chưa có dữ liệu
//               </span>
//             </div>
//           )}
//         </div>
        
//         {/* ICON AREA: Cố định kích thước để không bị mờ và lệch */}
//         <div className={`w-14 h-14 ${bgColorClass} ${colorClass} rounded-[1.25rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// src/features/admin/components/StatCard.tsx
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
    <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all h-[160px] flex flex-col justify-between overflow-hidden group">
      {/* 1. Nhãn: Tăng từ slate-400 lên slate-500 để rõ nét hơn */}
      <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.15em]">
        {label}
      </p>
      
      <div className="flex justify-between items-end">
        <div>
          {loading ? (
            <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-lg" />
          ) : hasData ? (
            <h2 className={`text-3xl font-black tracking-tighter leading-none ${colorClass}`}>
              {value}
            </h2>
          ) : (
            <div className="flex flex-col">
              {/* 2. Dấu --: Tăng độ đậm màu từ slate-200 lên slate-300 */}
              <h2 className="text-4xl font-black text-slate-300 leading-none tracking-tighter">
                --
              </h2>
              {/* 3. Chú thích: Tăng từ bold lên black và màu đậm hơn */}
              <span className="text-[10px] text-slate-500 font-black uppercase mt-2 tracking-tight">
                {/* them chu thich o day */}
              </span>
            </div>
          )}
        </div>
        
        <div className={`w-14 h-14 ${bgColorClass} ${colorClass} rounded-[1.25rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
};