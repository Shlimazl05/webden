// src/components/ui/StatusBadge.tsx
export const StatusBadge = ({ status }: { status: number }) => {
  const isActive = status === 1;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
      isActive 
        ? "bg-green-100 text-green-600" 
        : "bg-red-100 text-red-600"
    }`}>
      {isActive ? "● Hoạt động" : "● Bị chặn"}
    </span>
  );
};



// src/components/ui/StatusBadge.tsx
// Định nghĩa các loại trạng thái có thể có
// type StatusType = number | string;

// interface StatusConfig {
//   label: string;
//   className: string;
// }

// export const StatusBadge = ({ status }: { status: StatusType }) => {
//   // Bảng cấu hình các trạng thái (Dễ dàng thêm mới ở đây)
//   const statusMap: Record<StatusType, StatusConfig> = {
//     // Trạng thái cho User/Category (Dạng số)
//     1: { label: "Hoạt động", className: "bg-emerald-100 text-emerald-600 border-emerald-200" },
//     0: { label: "Bị chặn", className: "bg-rose-100 text-rose-600 border-rose-200" },
    
//     // Trạng thái cho Category (Dạng chữ từ ICategory)
//     'Active': { label: "Hiển thị", className: "bg-emerald-100 text-emerald-600 border-emerald-200" },
//     'Inactive': { label: "Đang ẩn", className: "bg-amber-100 text-amber-600 border-amber-200" },

//     // Thêm các trạng thái khác nếu cần (Ví dụ đơn hàng)
//     'Pending': { label: "Chờ duyệt", className: "bg-blue-100 text-blue-600 border-blue-200" },
//     'Shipped': { label: "Đã giao", className: "bg-purple-100 text-purple-600 border-purple-200" },
//   };

//   // Lấy cấu hình dựa trên status truyền vào, nếu không có thì dùng mặc định
//   const config = statusMap[status] || { 
//     label: "Không xác định", 
//     className: "bg-slate-100 text-slate-600 border-slate-200" 
//   };

//   return (
//     <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${config.className} transition-all`}>
//       ● {config.label}
//     </span>
//   );
// };