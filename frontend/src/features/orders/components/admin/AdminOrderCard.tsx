


// "use client";
// import React, { useState, useEffect } from 'react';
// import {
//   Clock, User, ShoppingBag, ChevronDown, CreditCard,
//   Timer, Hash, CheckCircle2, Truck,
//   PackageCheck, XCircle
// } from 'lucide-react';
// import { OrderStatusBadge } from '../OrderStatusBadge';
// import { IOrder, OrderStatus } from '../../order.types';
// import { OrderStatusTimeline } from '../OrderStatusTimeline';

// import { OrderDeliveryInfo } from '../OrderDeliveryInfo';
// import { OrderItemsTable } from '../OrderItemsTable';
// import { OrderPriceSummary } from '../OrderPriceSummary';

// interface Props {
//   order: IOrder;
//   onUpdateStatus: (id: string, status: OrderStatus) => void;
// }

// export const AdminOrderCard = ({ order, onUpdateStatus }: Props) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [formattedDate, setFormattedDate] = useState("");
//   const [timeLeft, setTimeLeft] = useState("");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const dateSource = order.orderDate || order.createdAt;

//     // CHỈ TÍNH THỜI HẠN CHO SEPAY ĐANG CHỜ THANH TOÁN
//     if (dateSource && order.paymentMethod === 'SePay' && order.status === 'Pending' && order.paymentStatus !== 'Paid') {
//       const updateTimer = () => {
//         const deadline = new Date(dateSource).getTime() + 10 * 60 * 1000; // 10 phút
//         const now = Date.now();
//         const diff = deadline - now;

//         if (diff > 0) {
//           const m = Math.floor(diff / (1000 * 60));
//           const s = Math.floor((diff % (1000 * 60)) / 1000);
//           setTimeLeft(`${m}p ${s}s`);
//         } else {
//           setTimeLeft("expired");
//         }
//       };
//       updateTimer();
//       const interval = setInterval(updateTimer, 1000);
//       return () => clearInterval(interval);
//     } else {
//       setTimeLeft("");
//     }
//   }, [order.createdAt, order.status, order.paymentStatus, order.paymentMethod, order.orderDate]);

//   useEffect(() => {
//     const dateSource = order.orderDate || order.createdAt;
//     if (dateSource) {
//       const date = new Date(dateSource);
//       setFormattedDate(`${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${date.toLocaleDateString('vi-VN')}`);
//     }
//   }, [order.createdAt, order.orderDate]);

//   const renderActionButtons = () => {
//     const btnBase = "h-10 px-5 flex items-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm";
//     return (
//       <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
//         {order.status === 'Pending' && (
//           <button onClick={() => onUpdateStatus(order._id, 'Processing')} className={`${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 shadow-md`}>
//             <CheckCircle2 size={16} strokeWidth={2.5} /> Xác nhận đơn
//           </button>
//         )}
//         {order.status === 'Processing' && (
//           <button onClick={() => onUpdateStatus(order._id, 'Shipping')} className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700 shadow-md`}>
//             <Truck size={16} strokeWidth={2.5} /> Giao hàng
//           </button>
//         )}
//         {order.status === 'Shipping' && (
//           <button onClick={() => onUpdateStatus(order._id, 'Completed')} className={`${btnBase} bg-emerald-600 text-white hover:bg-emerald-700 shadow-md`}>
//             <PackageCheck size={16} strokeWidth={2.5} /> Hoàn thành
//           </button>
//         )}
//         {['Pending', 'Processing', 'Shipping'].includes(order.status) && (
//           <button onClick={() => onUpdateStatus(order._id, 'Cancelled')} className={`${btnBase} bg-white text-rose-500 border border-rose-100 hover:bg-rose-50`}>
//             <XCircle size={16} strokeWidth={2.5} /> Hủy đơn
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-6 transition-all hover:shadow-md group font-sans">

//       {/* 1. HEADER SECTION */}
//       <div onClick={() => setIsExpanded(!isExpanded)} className="px-8 py-6 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors">
//         <div className="flex items-center gap-8">
//           <div className="flex flex-col gap-1">
//             <div className="flex items-center gap-2 text-indigo-600">
//               <ShoppingBag size={20} strokeWidth={3} />
//               <span className="text-lg font-black uppercase">#{order.orderCode}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-400 font-bold">
//               <Clock size={14} strokeWidth={2.5} className="text-sky-500" />
//               <span className="text-[12px] font-medium">{mounted ? formattedDate : "---"}</span>
//             </div>
//           </div>
//           <div className="hidden lg:block h-10 w-[1px] bg-slate-100" />
//           <div className="hidden lg:flex flex-col gap-1">
//             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Hash size={12} strokeWidth={3} className="text-indigo-400" /> Trạng thái</span>
//             <OrderStatusBadge status={order.status} />
//           </div>
//         </div>
//         <div className="flex items-center gap-6">
//           <div className="hidden sm:block">{renderActionButtons()}</div>
//           <div className={`p-2 rounded-full transition-all ${isExpanded ? "bg-indigo-50 text-indigo-600 rotate-180" : "bg-slate-50 text-slate-300"}`}>
//             <ChevronDown size={20} strokeWidth={3} />
//           </div>
//         </div>
//       </div>

//       {/* 2. INFO BAR (Đã cập nhật giống bên khách) */}
//       <div className="px-8 py-4 bg-slate-50/80 border-y border-slate-100 flex justify-between items-center">
//         <div className="flex items-center gap-12">
//           {/* Khách hàng */}
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
//               <User size={16} strokeWidth={2.5} className="text-indigo-500" />
//             </div>
//             <span className="text-slate-700 font-black text-[15px]">{order.recipientName}</span>
//           </div>

//           {/* Phương thức & Đếm ngược */}
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
//               <CreditCard size={16} strokeWidth={2.5} className="text-emerald-500" />
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="text-slate-700 font-black text-[15px] uppercase leading-none">
//                 {order.paymentMethod === 'SePay' ? 'Chuyển khoản (QR)' : order.paymentMethod}
//               </span>

//               {/* TAG ĐẾM NGƯỢC GIỐNG BÊN KHÁCH */}
//               {order.paymentMethod === 'SePay' && order.status === 'Pending' && timeLeft && (
//                 <div className={`flex items-center gap-2 px-3 py-1 rounded-lg font-black text-[10px] uppercase transition-all ${timeLeft === "expired" ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-600"
//                   }`}>
//                   <Timer size={12} strokeWidth={3} className={timeLeft !== "expired" ? "animate-spin" : ""} />
//                   <span>{timeLeft === "expired" ? "Hết hạn" : `Hết hạn sau: ${timeLeft}`}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Tổng tiền */}
//         <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-indigo-50 shadow-sm">
//           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng tiền</span>
//           <span className="text-2xl font-black text-rose-600 tracking-tighter">{order.finalAmount?.toLocaleString()}đ</span>
//         </div>
//       </div>

//       {/* 3. EXPANDED CONTENT */}
//       {isExpanded && (
//         <div className="p-8 bg-white animate-in slide-in-from-top-4 duration-300">
//           <OrderDeliveryInfo phone={order.phone} address={order.address} note={order.note} />
//           <OrderItemsTable details={order.orderDetails || []} />
//           <OrderPriceSummary totalAmount={order.totalAmount} shippingFee={order.shippingFee} finalAmount={order.finalAmount} />
//           <div className="bg-white p-10 border-t border-slate-50 mt-4">
//             <OrderStatusTimeline status={order.status} statusHistory={order.statusHistory || []} createdAt={order.createdAt} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import React from 'react';
import { IOrder, OrderStatus } from '../../order.types';
import { User, Clock, PackageCheck } from 'lucide-react';
import { statusConfig } from '@/features/orders/components/OrderStatus'; // Chứa cấu hình màu sắc đã làm ở bước trước

interface AdminOrderCardProps {
  order: IOrder;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onClick?: () => void;
}

export const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order, onUpdateStatus, onClick }) => {
  const config = statusConfig[order.status] || statusConfig.Pending;
  const StatusIcon = config.icon;

  // Xử lý hiển thị tên sản phẩm
  const firstItem = order.orderDetails[0];
  const firstItemName = typeof firstItem?.productId === 'object'
    ? (firstItem.productId as any).name
    : "Sản phẩm";
  const otherItemsCount = order.orderDetails.length - 1;

  return (
    
    <div 
      onClick={onClick}
      className="bg-white border border-slate-100 rounded-[2rem] p-5 flex items-center justify-between hover:shadow-lg hover:shadow-slate-100 transition-all mb-4 group">
      <div className="flex items-center gap-5 flex-1">
        {/* Icon Trạng thái */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
          <StatusIcon className={`w-7 h-7 ${config.color}`} />
        </div>

        {/* Thông tin chính */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-slate-900 text-lg tracking-tight">#{order.orderCode}</h3>
            <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase ${config.badgeColor}`}>
              {config.label}
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-500 text-sm">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-slate-400" />
              <span className="font-medium text-slate-700">{order.recipientName}</span>
            </div>
            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-5">
              <Clock size={14} className="text-slate-500" />
              <span>{new Date(order.createdAt).toLocaleString('vi-VN')}</span>
            </div>
          </div>

          <p className="text-slate-500 text-sm mt-1 italic">
            {firstItemName} {otherItemsCount > 0 && <span className="text-blue-500 font-semibold">(+{otherItemsCount} món khác)</span>}
          </p>
        </div>
      </div>

      {/* Cột thao tác & Giá tiền */}
      <div className="flex items-center gap-8">
        {/* Nút thao tác nhanh cho Admin */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {order.status === 'Pending' && (
            <button
              onClick={() => onUpdateStatus(order._id, 'Processing')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <PackageCheck size={14} /> XÁC NHẬN
            </button>
          )}
          {/* Bạn có thể thêm các nút khác như Giao hàng, Hoàn tất tại đây */}
        </div>

        <div className="text-right min-w-[120px]">
          <p className="text-[13px] text-slate-500  font-semibold tracking-widest mb-1">Tổng thanh toán</p>
          <p className="text-2xl font-black text-indigo-950">
            {order.finalAmount.toLocaleString('vi-VN')} <span className="text-sm underline">đ</span>
          </p>
        </div>
      </div>
    </div>
  );
};