// "use client";
// import React from 'react';
// import { UserX, UserCheck, Mail, Phone } from 'lucide-react';
// import { ICustomer } from '../customer.types';

// interface Props {
//   customers: ICustomer[] | null;
//   loading: boolean;
//   onStatusChange: (id: string) => void;
// }

// export const CustomerTable = ({ customers, loading, onStatusChange }: Props) => {
//   if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2.5rem]" />;

//   return (
//     <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
//       <table className="w-full text-left">
//         {/* HEADER TÔ NỀN XÁM, CHỮ ĐẬM SẮC NÉT */}
//         <thead className="bg-slate-100 border-b border-slate-200">
//           <tr className="text-[#001529] font-black text-[15px]  tracking-[0.15em]">
//             <th className="p-6">Thông tin </th>
//             <th className="p-6">Liên hệ</th>
//             <th className="p-6 text-center">Đơn hàng</th>
//             <th className="p-6">Tổng chi tiêu</th>
//             <th className="p-6">Trạng thái</th>
//             <th className="p-6 text-center">Thao tác</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-50 font-sans">
//           {customers?.map((item) => (
//             <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
//               <td className="p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-[#FBF7EE] text-[#C5A059] rounded-full flex items-center justify-center font-black text-lg border border-[#EFE7D3]">
//                     {item.name.charAt(0)}
//                   </div>
//                   <div>
//                     <p className="font-black text-[#001529] text-sm uppercase">{item.name}</p>
//                     <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">ID: {item._id}</p>
//                   </div>
//                 </div>
//               </td>
//               <td className="p-6">
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
//                     <Mail size={14} className="text-[#C5A059]" /> {item.email}
//                   </div>
//                   <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
//                     <Phone size={14} className="text-[#C5A059]" /> {item.phone}
//                   </div>
//                 </div>
//               </td>
//               <td className="p-6 text-center">
//                 <span className="text-sm font-black text-[#001529] bg-slate-100 px-3 py-1 rounded-lg">
//                   {item.orderCount}
//                 </span>
//               </td>
//               <td className="p-6">
//                 <p className="text-sm font-black text-emerald-600">
//                   {item.totalSpent.toLocaleString('vi-VN')}đ
//                 </p>
//               </td>
//               <td className="p-6">
//                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
//                   item.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
//                 }`}>
//                   {item.status === 'Active' ? 'Hoạt động' : 'Đã khóa'}
//                 </span>
//               </td>
//               <td className="p-6 text-center">
//                 <button 
//                   onClick={() => onStatusChange(item._id)}
//                   className={`p-2.5 rounded-xl transition-all hover:scale-110 shadow-sm ${
//                     item.status === 'Active' ? "text-red-500 bg-red-50" : "text-emerald-500 bg-emerald-50"
//                   }`}
//                 >
//                   {item.status === 'Active' ? <UserX size={18} strokeWidth={2.5} /> : <UserCheck size={18} strokeWidth={2.5} />}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

"use client";
import React from 'react';
import { UserX, UserCheck, Mail, Phone } from 'lucide-react';
import { ICustomer } from '../customer.types';
import { EmptyState } from '@/components/ui/EmptyState';

interface Props {
  customers: ICustomer[] | null;
  loading: boolean;
  onStatusChange: (id: string) => void;
  onResetPage: () => void;
}

export const CustomerTable = ({ customers, loading, onStatusChange,onResetPage }: Props) => {
  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2.5rem]" />;

  // Trường hợp không tìm thấy khách hàng khi Search
  if (!customers || customers.length === 0) {
    return (
     <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <EmptyState 
          title="Trang này đang trống"
          description="Có vẻ như không có khách hàng nào ở đây. Thử quay lại trang 1 hoặc kiểm tra từ khóa tìm kiếm."
          onBack={onResetPage} // 3. Truyền trực tiếp hàm từ Props vào đây
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr className="text-[#001529] font-black text-[15px] tracking-[0.15em]">
            <th className="p-6">Thông tin</th>
            <th className="p-6">Liên hệ</th>
            <th className="p-6 text-center">Đơn hàng</th>
            <th className="p-6">Tổng chi tiêu</th>
            <th className="p-6">Trạng thái</th>
            <th className="p-6 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 font-sans">
          {customers?.map((item) => {
            // Xử lý tên hiển thị: Ưu tiên name, không có thì dùng username
            const displayName = item.name || item.username || "Khách hàng";
            
            return (
              <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    {/* AVATAR: Lấy chữ cái đầu của tên hiển thị */}
                    <div className="w-11 h-11 bg-[#FBF7EE] text-[#C5A059] rounded-full flex items-center justify-center font-black text-lg border border-[#EFE7D3] shrink-0">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-black text-[#001529] text-sm uppercase truncate max-w-[150px]">
                        {displayName}
                      </p>
                      {/* ID RÚT GỌN: Chỉ lấy 6 ký tự cuối */}
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 tracking-tighter">
                        ID: ...{item._id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                      <Mail size={13} className="text-blue-500" /> 
                      <span className="truncate max-w-[180px]">{item.email || '---'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                      <Phone size={13} className="text-emerald-500" /> {item.phone}
                    </div>
                  </div>
                </td>
                <td className="p-6 text-center">
                  <span className="text-sm font-black text-[#001529] bg-slate-100 px-3 py-1 rounded-lg">
                    {item.orderCount || 0}
                  </span>
                </td>
                <td className="p-6 font-black text-sm text-[#001529]">
                  {item.totalSpent?.toLocaleString('vi-VN') || 0}đ
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 w-fit ${
                    item.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${item.status === 'Active' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                    {item.status === 'Active' ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </td>
                <td className="p-6 text-center">
                  <button 
                    onClick={() => onStatusChange(item._id)}
                    title={item.status === 'Active' ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                    className={`p-2.5 rounded-xl transition-all hover:scale-110 shadow-sm ${
                      item.status === 'Active' 
                        ? "text-red-500 bg-red-50 hover:bg-red-100"      
                        : "text-emerald-500 bg-emerald-50 hover:bg-emerald-100" 
                    }`}
                  >
                    {item.status === 'Active' 
                      ? <UserX size={18} strokeWidth={2.5} /> 
                      : <UserCheck size={18} strokeWidth={2.5} />
                    }
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};