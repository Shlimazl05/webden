
// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Hash, Clock, User, Phone, MapPin, StickyNote, 
//   Package, Truck, CreditCard, ChevronDown, 
//   Trash2, ShoppingBag, CircleDollarSign, Receipt
// } from 'lucide-react';
// import { OrderStatusBadge } from '../OrderStatusBadge';
// import { IOrder } from '../../order.types';

// interface Props {
//   order: IOrder;
//   onUpdateStatus: (id: string, status: any) => void;
// }

// export const AdminOrderCard = ({ order, onUpdateStatus }: Props) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [formattedDate, setFormattedDate] = useState("");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
    
//     // LOGIC SỬA LỖI: Kiểm tra tất cả các trường thời gian có thể có trong DB
//     // Theo ảnh bạn gửi, bạn có trường 'updatedAt'
//     const dateSource = order.orderDate || order.createdAt || (order as any).updatedAt;
    
//     if (dateSource) {
//       const date = new Date(dateSource);
      
//       if (!isNaN(date.getTime())) {
//         const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
//         const dateStr = date.toLocaleDateString('vi-VN');
//         setFormattedDate(`${timeStr} - ${dateStr}`);
//       } else {
//         setFormattedDate("Chưa cập nhật");
//       }
//     } else {
//       setFormattedDate("Chưa cập nhật");
//     }
//   }, [order.createdAt, order.orderDate, (order as any).updatedAt]);

//   return (
//     <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-5 transition-all hover:shadow-md">
      
//       {/* --- PHẦN 1: DÒNG TIÊU ĐỀ (LUÔN HIỆN) --- */}
//       <div 
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="px-8 py-5 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors"
//       >
//         <div className="flex items-center gap-6">
//           {/* Thêm Icon trước mã đơn hàng */}
//           <div className="flex items-center gap-2 text-indigo-600">
//             <ShoppingBag size={18} strokeWidth={3} />
//             <span className="text-[16px] font-black tracking-tight uppercase">#{order.orderCode}</span>
//           </div>
          
//           <div className="flex items-center gap-2 text-slate-600">
//             <Clock size={16} strokeWidth={2.5} className="text-sky-500" />
//             <span className="text-[14px] font-bold">
//               {/* CHỈ HIỂN THỊ KHI ĐÃ MOUNT XONG Ở CLIENT ĐỂ HẾT LỖI GẠCH ĐỎ */}
//               {mounted ? formattedDate : ""}
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <OrderStatusBadge status={order.status} />
//           <div className={`p-1.5 rounded-full transition-all ${isExpanded ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-400"}`}>
//             <ChevronDown size={20} strokeWidth={3} />
//           </div>
//         </div>
//       </div>

//       {/* --- PHẦN 2: THANH TỔNG QUAN NHANH --- */}
//       <div className="px-8 py-4 bg-slate-50/50 border-y border-slate-100 flex justify-between items-center">
//         <div className="flex items-center gap-10">
//            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-[15px]">
//               <User size={18} strokeWidth={2.5} className="text-indigo-500" />
//               {order.recipientName}
//            </div>
//            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-[15px]">
//               <CreditCard size={18} strokeWidth={2.5} className="text-emerald-500" />
//               {order.paymentMethod}
//            </div>
//         </div>

//         {/* Chỉnh tiền hàng to và rõ hơn */}
//         <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
//           <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Tổng tiền:</span>
//           <span className="text-[22px] font-black text-rose-600 tracking-tighter leading-none">
//             {order.finalAmount?.toLocaleString()}đ
//           </span>
//         </div>
//       </div>

//       {/* --- PHẦN 3: CHI TIẾT MỞ RỘNG --- */}
//       {isExpanded && (
//         <div className="p-8 bg-white animate-in slide-in-from-top-2 duration-300">
//           <div className="grid grid-cols-12 gap-12">
            
//             {/* Cột trái: Giao nhận & Ghi chú */}
//             <div className="col-span-12 lg:col-span-4 space-y-7">
//                <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
//                   <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
//                   <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Thông tin giao hàng</h4>
//                </div>
               
//                <div className="space-y-5">
//                  {/* Sửa căn lề Icon SĐT */}
//                  <div className="flex items-start gap-3">
//                     <div className="mt-1 flex-shrink-0">
//                       <Phone size={18} strokeWidth={2.5} className="text-emerald-500" />
//                     </div>
//                     <div>
//                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-tight mb-0.5">Số điện thoại</p>
//                       <p className="text-[15px] font-black text-slate-900">{order.phone}</p>
//                     </div>
//                  </div>
                 
//                  {/* Sửa căn lề Icon Địa chỉ */}
//                  <div className="flex items-start gap-3">
//                     <div className="mt-1 flex-shrink-0">
//                       <MapPin size={18} strokeWidth={2.5} className="text-rose-500" />
//                     </div>
//                     <div>
//                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-tight mb-0.5">Địa chỉ nhận hàng</p>
//                       <p className="text-[15px] font-black text-slate-900 leading-snug">{order.address}</p>
//                     </div>
//                  </div>

//                  {/* Ghi chú */}
//                  <div className="flex items-start gap-3 p-5 bg-amber-50/50 rounded-3xl border border-amber-100">
//                     <div className="mt-1 flex-shrink-0">
//                       <StickyNote size={18} strokeWidth={2.5} className="text-amber-500" />
//                     </div>
//                     <div>
//                       <p className="text-[11px] font-black text-amber-600 uppercase tracking-tight mb-1">Ghi chú từ khách</p>
//                       <p className="text-[14px] font-bold text-slate-700 italic leading-relaxed">
//                         {order.note || "Không có yêu cầu đặc biệt."}
//                       </p>
//                     </div>
//                  </div>
//                </div>
//             </div>

//             {/* Cột phải: Sản phẩm & Tài chính */}
//             <div className="col-span-12 lg:col-span-8 space-y-5">
//                <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
//                   <Package size={18} strokeWidth={2.5} className="text-indigo-600" />
//                   <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Danh sách sản phẩm</h4>
//                </div>
               
//                <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm">
//                   <table className="w-full text-left">
//                     <thead className="bg-slate-50">
//                       <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
//                         <th className="p-5 pl-8">Sản phẩm</th>
//                         <th className="p-5 text-center">Số lượng</th>
//                         <th className="p-5 text-right pr-8">Đơn giá</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-50">
//                       {order.orderDetails?.map((item: any, idx: number) => (
//                         <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
//                           <td className="p-5 pl-8 flex items-center gap-4">
//                             <div className="w-14 h-14 rounded-2xl border border-slate-100 overflow-hidden bg-white flex-shrink-0 shadow-sm p-1">
//                               <img src={item.productId?.imageUrl || "/img/placeholder.svg"} className="w-full h-full object-cover rounded-xl" alt="p" />
//                             </div>
//                             <div>
//                               <p className="text-[14px] font-black text-slate-900 uppercase leading-tight">{item.productId?.productName}</p>
//                               <p className="text-[10px] font-bold text-indigo-500 uppercase mt-1 tracking-widest">SKU: {item.productId?.productCode}</p>
//                             </div>
//                           </td>
//                           <td className="p-5 text-center text-slate-900 font-black text-sm">x{item.quantity}</td>
//                           <td className="p-5 text-right pr-8 font-black text-slate-900 text-[15px]">{item.unitPrice.toLocaleString()}đ</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
                  
//                   {/* Footer tài chính trong detail */}
//                   <div className="p-8 bg-slate-50/80 border-t border-slate-100 space-y-3">
//                      <div className="flex justify-between items-center text-[12px] font-bold text-slate-600 uppercase">
//                         <span>Tiền hàng thực tế</span>
//                         <span className="font-black text-slate-900">{order.totalAmount?.toLocaleString()}đ</span>
//                      </div>
//                      <div className="flex justify-between items-center text-[12px] font-bold text-slate-600 uppercase">
//                         <div className="flex items-center gap-2">
//                            <Truck size={16} className="text-sky-500" strokeWidth={2.5} /> 
//                            Phí vận chuyển
//                         </div>
//                         <span className="font-black text-slate-900">{order.shippingFee?.toLocaleString()}đ</span>
//                      </div>
//                      <div className="pt-4 border-t-2 border-slate-200 flex justify-between items-center">
//                         <div className="flex items-center gap-2 text-[13px] font-black text-slate-950 uppercase tracking-widest">
//                           <Receipt size={20} className="text-rose-600" strokeWidth={3} /> 
//                           Khách thanh toán
//                         </div>
//                         <span className="text-3xl font-black text-rose-600 tracking-tighter">
//                            {order.finalAmount?.toLocaleString()}đ
//                         </span>
//                      </div>
//                   </div>
//                </div>
//             </div>
//           </div>

//           {/* NÚT THAO TÁC TRẠNG THÁI */}
//           <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end items-center gap-4">
             
             
//              {order.status === 'Pending' && (
//                <button onClick={() => onUpdateStatus(order._id, 'Processing')} className="h-12 px-10 bg-indigo-600 text-white rounded-xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">Xác nhận đơn hàng</button>
//              )}
//              {order.status === 'Processing' && (
//                <button onClick={() => onUpdateStatus(order._id, 'Shipping')} className="h-12 px-10 bg-blue-600 text-white rounded-xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-blue-100 transition-all">Chuẩn bị giao hàng</button>
//              )}
//              {order.status === 'Shipping' && (
//                <button onClick={() => onUpdateStatus(order._id, 'Completed')} className="h-12 px-10 bg-emerald-600 text-white rounded-xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-emerald-100 transition-all">Hoàn tất đơn hàng</button>
//              )}
//              {order.status !== 'Completed' && order.status !== 'Cancelled' && (
//                <button onClick={() => onUpdateStatus(order._id, 'Cancelled')} className="h-12 px-8 bg-white text-rose-500 border border-rose-100 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-50 transition-all">Hủy đơn</button>
//              )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Clock, User, Phone, MapPin, Package, Truck, 
//   CreditCard, ChevronDown, Coins, ShoppingBag, 
//   Receipt, CheckCircle2, XCircle, PackageCheck,
//   ChevronRight, ArrowRight,
//   StickyNote
// } from 'lucide-react';
// import { OrderStatusBadge } from '../OrderStatusBadge';
// import { IOrder, OrderStatus } from '../../order.types';

// interface Props {
//   order: IOrder;
//   onUpdateStatus: (id: string, status: OrderStatus) => void;
// }

// export const AdminOrderCard = ({ order, onUpdateStatus }: Props) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [formattedDate, setFormattedDate] = useState("");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const dateSource = order.orderDate || order.createdAt || (order as any).updatedAt;
//     if (dateSource) {
//       const date = new Date(dateSource);
//       if (!isNaN(date.getTime())) {
//         const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
//         const dateStr = date.toLocaleDateString('vi-VN');
//         setFormattedDate(`${timeStr} - ${dateStr}`);
//       }
//     }
//   }, [order.createdAt, order.orderDate]);

//   // Hàm render nút thao tác chuyên nghiệp
//   const renderActionButtons = () => {
//     const btnBase = "h-10 px-5 flex items-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm";
    
//     return (
//       <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
//         {/* HAPPY PATH: Nút tiến tới trạng thái tiếp theo */}
//         {order.status === 'Pending' && (
//           <button 
//             onClick={() => onUpdateStatus(order._id, 'Processing')} 
//             className={`${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 shadow-md`}
//           >
//             <CheckCircle2 size={16} /> Xác nhận đơn
//           </button>
//         )}
        
//         {order.status === 'Processing' && (
//           <button 
//             onClick={() => onUpdateStatus(order._id, 'Shipping')} 
//             className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 shadow-md`}
//           >
//             <Truck size={16} /> Giao hàng
//           </button>
//         )}
        
//         {order.status === 'Shipping' && (
//           <button 
//             onClick={() => onUpdateStatus(order._id, 'Completed')} 
//             className={`${btnBase} bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200 shadow-md`}
//           >
//             <PackageCheck size={16} /> Hoàn thành
//           </button>
//         )}

//         {/* DANGER PATH: Nút hủy đơn (Chỉ hiện khi chưa hoàn thành/hủy) */}
//         {['Pending', 'Processing', 'Shipping'].includes(order.status) && (
//           <button 
//             onClick={() => onUpdateStatus(order._id, 'Cancelled')} 
//             className={`${btnBase} bg-white text-rose-500 border border-rose-100 hover:bg-rose-50 hover:border-rose-200`}
//           >
//             <XCircle size={16} /> Hủy đơn
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-6 transition-all hover:shadow-xl hover:border-indigo-100/50 group">
      
//       {/* --- PHẦN 1: HEADER (Mã đơn & Nút bấm) --- */}
//       <div 
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="px-8 py-6 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors"
//       >
//         <div className="flex items-center gap-8">
//           <div className="flex flex-col gap-1">
//             <div className="flex items-center gap-2 text-indigo-600">
//               <ShoppingBag size={20} strokeWidth={2.5} />
//               <span className="text-lg font-black tracking-tight uppercase">#{order.orderCode}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-400">
//               <Clock size={14} strokeWidth={2} />
//               <span className="text-[12px] font-medium">{mounted ? formattedDate : "---"}</span>
//             </div>
//           </div>
          
//           <div className="hidden lg:block h-10 w-[1px] bg-slate-100" />
          
//           <div className="hidden lg:flex flex-col gap-1">
//              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái</span>
//              <OrderStatusBadge status={order.status} />
//           </div>
//         </div>

//         <div className="flex items-center gap-6">
//           {/* NÚT THAO TÁC */}
//           <div className="hidden sm:block">
//             {renderActionButtons()}
//           </div>

//           <div className={`p-2 rounded-full transition-all ${isExpanded ? "bg-indigo-50 text-indigo-600 rotate-180" : "bg-slate-50 text-slate-300"}`}>
//             <ChevronDown size={20} strokeWidth={3} />
//           </div>
//         </div>
//       </div>

//       {/* --- PHẦN 2: THANH TỔNG QUAN (Thông tin nhanh) --- */}
//       <div className="px-8 py-4 bg-slate-50/80 border-y border-slate-100 flex justify-between items-center">
//         <div className="flex items-center gap-12">
//            <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
//                 <User size={16} className="text-indigo-500" />
//               </div>
//               <span className="text-slate-700 font-bold text-[15px]">{order.recipientName}</span>
//            </div>
//            <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
//                 <CreditCard size={16} className="text-emerald-500" />
//               </div>
//               <span className="text-slate-700 font-bold text-[15px] uppercase">{order.paymentMethod}</span>
//            </div>
//         </div>

//         <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-indigo-50 shadow-sm">
//           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tổng tiền</span>
//           <span className="text-2xl font-black text-rose-600 tracking-tighter leading-none">
//             {order.finalAmount?.toLocaleString()}đ
//           </span>
//         </div>
//       </div>

//       {/* --- PHẦN 3: CHI TIẾT MỞ RỘNG --- */}
//       {isExpanded && (
//         <div className="p-8 bg-white animate-in slide-in-from-top-4 duration-300">
          
//           {/* MOBILE ACTIONS (Hiện nút bấm trên mobile khi mở rộng) */}
//           <div className="sm:hidden mb-8 p-4 bg-slate-50 rounded-2xl">
//              <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Thao tác nhanh</p>
//              {renderActionButtons()}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
//              <div className="space-y-6">
//                 <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
//                   <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                     <MapPin size={16} className="text-indigo-600" /> Thông tin giao hàng
//                   </h4>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4">
//                     <div className="bg-slate-50 p-4 rounded-2xl">
//                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Số điện thoại</p>
//                       <p className="text-[16px] font-black text-slate-900 tracking-wide">{order.phone}</p>
//                     </div>
//                     <div className="bg-slate-50 p-4 rounded-2xl">
//                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Địa chỉ nhận hàng</p>
//                       <p className="text-[15px] font-bold text-slate-700 leading-snug">{order.address}</p>
//                     </div>
//                 </div>
//              </div>

//              <div className="space-y-6">
//                 <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
//                   <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                     <StickyNote size={16} className="text-amber-500" /> Ghi chú từ khách
//                   </h4>
//                 </div>
//                 <div className="p-6 bg-amber-50/30 rounded-[2rem] border border-amber-100/50 min-h-[120px] relative">
//                    <p className="text-[14px] font-medium text-slate-600 italic leading-relaxed">
//                       "{order.note || "Khách hàng không để lại lời nhắn."}"
//                    </p>
//                    <div className="absolute bottom-4 right-6 text-amber-200 italic font-black text-4xl opacity-20">”</div>
//                 </div>
//              </div>
//           </div>

//           {/* DANH SÁCH SẢN PHẨM */}
//           <div className="space-y-6 pt-10 border-t border-slate-50">
//              <div className="flex items-center justify-between mb-4">
//                 <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                    <Package size={20} className="text-indigo-600" /> Kiện hàng ({order.orderDetails?.length || 0})
//                 </h4>
//              </div>
             
//              <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                       <th className="px-8 py-5">Sản phẩm</th>
//                       <th className="px-8 py-5 text-center">Số lượng</th>
//                       <th className="px-8 py-5 text-right">Đơn giá</th>
//                       <th className="px-8 py-5 text-right">Tổng</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-50">
//                     {order.orderDetails?.map((item: any, idx: number) => (
//                       <tr key={idx} className="hover:bg-indigo-50/20 transition-colors group/row">
//                         <td className="px-8 py-6">
//                           <div className="flex items-center gap-6">
//                              <div className="w-20 h-20 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 flex-shrink-0 p-1 group-hover/row:border-indigo-200 transition-colors">
//                                 <img 
//                                   src={item.productId?.imageUrl || "/img/placeholder.svg"} 
//                                   className="w-full h-full object-cover rounded-xl" 
//                                   alt="product" 
//                                 />
//                              </div>
//                              <div>
//                                <p className="text-[15px] font-bold text-slate-900 mb-1 group-hover/row:text-indigo-600 transition-colors line-clamp-1">
//                                  {item.productId?.productName}
//                                </p>
//                                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
//                                  SKU: {item.productId?.productCode || "N/A"}
//                                </p>
//                              </div>
//                           </div>
//                         </td>
//                         <td className="px-8 py-6 text-center text-slate-700 font-black text-md">
//                           <span className="bg-slate-100 px-3 py-1 rounded-lg">x{item.quantity}</span>
//                         </td>
//                         <td className="px-8 py-6 text-right font-bold text-slate-500 text-sm">
//                           {item.unitPrice.toLocaleString()}đ
//                         </td>
//                         <td className="px-8 py-6 text-right font-black text-slate-900 text-[16px]">
//                           {(item.quantity * item.unitPrice).toLocaleString()}đ
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
                
//                 {/* TỔNG KẾT TÀI CHÍNH */}
//                 <div className="p-10 bg-slate-50/50 flex justify-end">
//                    <div className="w-full max-w-xs space-y-3">
//                       <div className="flex justify-between text-[12px] font-bold text-slate-400 uppercase tracking-tight">
//                         <span>Tiền hàng</span>
//                         <span className="text-slate-700">{order.totalAmount?.toLocaleString()}đ</span>
//                       </div>
//                       <div className="flex justify-between text-[12px] font-bold text-slate-400 uppercase tracking-tight">
//                         <span>Phí vận chuyển</span>
//                         <span className="text-slate-700">+{order.shippingFee?.toLocaleString()}đ</span>
//                       </div>
//                       <div className="h-[1px] bg-slate-200 my-4" />
//                       <div className="flex justify-between items-center">
//                         <span className="text-[14px] font-black text-slate-900 uppercase">Tổng cộng</span>
//                         <span className="text-3xl font-black text-rose-600 tracking-tighter">
//                           {order.finalAmount?.toLocaleString()}đ
//                         </span>
//                       </div>
//                    </div>
//                 </div>
//              </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

"use client";
import React, { useState, useEffect } from 'react';
import { 
  Clock, User, Phone, MapPin, Package, Truck, 
  CreditCard, ChevronDown, Coins, ShoppingBag, 
  Receipt, CheckCircle2, XCircle, PackageCheck,
  StickyNote, Hash
} from 'lucide-react';
import { OrderStatusBadge } from '../OrderStatusBadge';
import { IOrder, OrderStatus } from '../../order.types';

interface Props {
  order: IOrder;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export const AdminOrderCard = ({ order, onUpdateStatus }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dateSource = order.orderDate || order.createdAt || (order as any).updatedAt;
    if (dateSource) {
      const date = new Date(dateSource);
      if (!isNaN(date.getTime())) {
        const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const dateStr = date.toLocaleDateString('vi-VN');
        setFormattedDate(`${timeStr} - ${dateStr}`);
      }
    }
  }, [order.createdAt, order.orderDate]);

  const renderActionButtons = () => {
    const btnBase = "h-10 px-5 flex items-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm";
    
    return (
      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {order.status === 'Pending' && (
          <button 
            onClick={() => onUpdateStatus(order._id, 'Processing')} 
            className={`${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 shadow-md`}
          >
            <CheckCircle2 size={16} strokeWidth={2.5} /> Xác nhận đơn
          </button>
        )}
        
        {order.status === 'Processing' && (
          <button 
            onClick={() => onUpdateStatus(order._id, 'Shipping')} 
            className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 shadow-md`}
          >
            <Truck size={16} strokeWidth={2.5} /> Giao hàng
          </button>
        )}
        
        {order.status === 'Shipping' && (
          <button 
            onClick={() => onUpdateStatus(order._id, 'Completed')} 
            className={`${btnBase} bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200 shadow-md`}
          >
            <PackageCheck size={16} strokeWidth={2.5} /> Hoàn thành
          </button>
        )}

        {['Pending', 'Processing', 'Shipping'].includes(order.status) && (
          <button 
            onClick={() => onUpdateStatus(order._id, 'Cancelled')} 
            className={`${btnBase} bg-white text-rose-500 border border-rose-100 hover:bg-rose-50 hover:border-rose-200`}
          >
            <XCircle size={16} strokeWidth={2.5} /> Hủy đơn
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-6 transition-all hover:shadow-xl hover:border-indigo-100/50 group">
      
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-8 py-6 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-indigo-600">
              <ShoppingBag size={20} strokeWidth={3} />
              <span className="text-lg font-black tracking-tight uppercase">#{order.orderCode}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-bold">
              <Clock size={14} strokeWidth={2.5} className="text-sky-500" />
              <span className="text-[12px] font-medium">{mounted ? formattedDate : "---"}</span>
            </div>
          </div>
          
          <div className="hidden lg:block h-10 w-[1px] bg-slate-100" />
          
          <div className="hidden lg:flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Hash size={12} strokeWidth={3} className="text-indigo-400" /> Trạng thái
             </span>
             <OrderStatusBadge status={order.status} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            {renderActionButtons()}
          </div>

          <div className={`p-2 rounded-full transition-all ${isExpanded ? "bg-indigo-50 text-indigo-600 rotate-180" : "bg-slate-50 text-slate-300"}`}>
            <ChevronDown size={20} strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="px-8 py-4 bg-slate-50/80 border-y border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-12">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <User size={16} strokeWidth={2.5} className="text-indigo-500" />
              </div>
              <span className="text-slate-700 font-bold text-[15px]">{order.recipientName}</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <CreditCard size={16} strokeWidth={2.5} className="text-emerald-500" />
              </div>
              <span className="text-slate-700 font-bold text-[15px] uppercase">{order.paymentMethod}</span>
           </div>
        </div>

        <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-indigo-50 shadow-sm">
          <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Tổng tiền</span>
          <span className="text-2xl font-black text-rose-600 tracking-tighter leading-none">
            {order.finalAmount?.toLocaleString()}đ
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="p-8 bg-white animate-in slide-in-from-top-4 duration-300">
          
          <div className="sm:hidden mb-8 p-4 bg-slate-50 rounded-2xl">
             <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Thao tác nhanh</p>
             {renderActionButtons()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
             <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
                  <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                  <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    Giao nhận & Liên hệ
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
                      <Phone size={18} strokeWidth={2.5} className="text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Số điện thoại</p>
                        <p className="text-[16px] font-black text-slate-900 tracking-wide">{order.phone}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
                      <MapPin size={18} strokeWidth={2.5} className="text-rose-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Địa chỉ nhận hàng</p>
                        <p className="text-[15px] font-bold text-slate-700 leading-snug">{order.address}</p>
                      </div>
                    </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
                  <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                  <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    Ghi chú từ khách
                  </h4>
                </div>
                <div className="p-6 bg-amber-50/30 rounded-[2rem] border border-amber-100/50 min-h-[120px] relative flex items-start gap-3">
                   <StickyNote size={20} strokeWidth={2.5} className="text-amber-500 mt-0.5 flex-shrink-0" />
                   <p className="text-[14px] font-medium text-slate-600 italic leading-relaxed">
                      "{order.note || "Khách hàng không để lại lời nhắn."}"
                   </p>
                   <div className="absolute bottom-4 right-6 text-amber-200 italic font-black text-4xl opacity-20">”</div>
                </div>
             </div>
          </div>

          <div className="space-y-6 pt-10 border-t border-slate-50">
             <div className="flex items-center justify-between mb-4">
                <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                   <Package size={20} strokeWidth={2.5} className="text-indigo-600" /> Kiện hàng ({order.orderDetails?.length || 0})
                </h4>
             </div>
             
             <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-8 py-5">Sản phẩm</th>
                      <th className="px-8 py-5 text-center">Số lượng</th>
                      <th className="px-8 py-5 text-right">Đơn giá</th>
                      <th className="px-8 py-5 text-right">Tổng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {order.orderDetails?.map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-indigo-50/20 transition-colors group/row">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-6">
                             <div className="w-20 h-20 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 flex-shrink-0 p-1 group-hover/row:border-indigo-200 transition-colors">
                                <img 
                                  src={item.productId?.imageUrl || "/img/placeholder.svg"} 
                                  className="w-full h-full object-cover rounded-xl" 
                                  alt="product" 
                                />
                             </div>
                             <div>
                               <p className="text-[15px] font-bold text-slate-900 mb-1 group-hover/row:text-indigo-600 transition-colors line-clamp-1">
                                 {item.productId?.productName}
                               </p>
                               <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                                 SKU: {item.productId?.productCode || "N/A"}
                               </p>
                             </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center text-slate-700 font-black text-md">
                          <span className="bg-slate-100 px-3 py-1 rounded-lg">x{item.quantity}</span>
                        </td>
                        <td className="px-8 py-6 text-right font-bold text-slate-500 text-sm">
                          {item.unitPrice.toLocaleString()}đ
                        </td>
                        <td className="px-8 py-6 text-right font-black text-slate-900 text-[16px]">
                          {(item.quantity * item.unitPrice).toLocaleString()}đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="p-10 bg-slate-50/50 flex justify-end">
                   <div className="w-full max-w-xs space-y-3">
                      <div className="flex justify-between items-center text-[12px] font-bold text-slate-400  tracking-tight">
                        <div className="flex items-center gap-2">
                           <Coins size={14} strokeWidth={2.5} className="text-amber-500" />
                           <span>Tiền hàng</span>
                        </div>
                        <span className="text-slate-700 font-black">{order.totalAmount?.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-bold text-slate-400  tracking-tight">
                        <div className="flex items-center gap-2">
                           <Truck size={14} strokeWidth={2.5} className="text-sky-500" />
                           <span>Phí vận chuyển</span>
                        </div>
                        <span className="text-slate-700 font-black">+{order.shippingFee?.toLocaleString()}đ</span>
                      </div>
                      <div className="h-[1px] bg-slate-200 my-4" />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <Receipt size={18} strokeWidth={3} className="text-rose-600" />
                           <span className="text-[14px] font-black text-slate-900 uppercase">Tổng cộng</span>
                        </div>
                        <span className="text-3xl font-black text-rose-600 tracking-tighter leading-none">
                          {order.finalAmount?.toLocaleString()}đ
                        </span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Clock, User, Phone, MapPin, Package, Truck, 
//   CreditCard, ChevronDown, Coins, ShoppingBag, 
//   Receipt, CheckCircle2, XCircle, PackageCheck,
//   StickyNote, Hash
// } from 'lucide-react';
// import { OrderStatusBadge } from '../OrderStatusBadge';
// import { IOrder, OrderStatus } from '../../order.types';

// interface Props {
//   order: IOrder;
//   onUpdateStatus: (id: string, status: OrderStatus) => void;
// }

// export const AdminOrderCard = ({ order, onUpdateStatus }: Props) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [formattedDate, setFormattedDate] = useState("");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const dateSource = order.orderDate || order.createdAt || (order as any).updatedAt;
//     if (dateSource) {
//       const date = new Date(dateSource);
//       if (!isNaN(date.getTime())) {
//         const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
//         const dateStr = date.toLocaleDateString('vi-VN');
//         setFormattedDate(`${timeStr} - ${dateStr}`);
//       }
//     }
//   }, [order.createdAt, order.orderDate]);

//   const renderActionButtons = () => {
//     const btnBase = "h-10 px-5 flex items-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm";
    
//     return (
//       <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
//         {order.status === 'Pending' && (
//           <button 
//             onClick={() => onUpdateStatus(order._id, 'Processing')} 
//             className={`${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 shadow-md`}
//           >
//             <CheckCircle2 size={16} strokeWidth={2.5} /> Xác nhận đơn
//           </button>
//         )}
        
//         {order.status === 'Processing' && (
//           <button 
//             onClick={() => onUpdateStatus(order._id, 'Shipping')} 
//             className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 shadow-md`}
//           >
//             <Truck size={16} strokeWidth={2.5} /> Giao hàng
//           </button>
//         )}
        
//         {order.status === 'Shipping' && (
//           <button 
//             onClick={() => onUpdateStatus(order._id, 'Completed')} 
//             className={`${btnBase} bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200 shadow-md`}
//           >
//             <PackageCheck size={16} strokeWidth={2.5} /> Hoàn thành
//           </button>
//         )}

//         {['Pending', 'Processing', 'Shipping'].includes(order.status) && (
//           <button 
//             onClick={() => onUpdateStatus(order._id, 'Cancelled')} 
//             className={`${btnBase} bg-white text-rose-500 border border-rose-100 hover:bg-rose-50 hover:border-rose-200`}
//           >
//             <XCircle size={16} strokeWidth={2.5} /> Hủy đơn
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-6 transition-all hover:shadow-xl hover:border-indigo-100/50 group">
      
//       <div 
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="px-8 py-6 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors"
//       >
//         <div className="flex items-center gap-8">
//           <div className="flex flex-col gap-1">
//             <div className="flex items-center gap-2 text-indigo-600">
//               <ShoppingBag size={20} strokeWidth={3} />
//               <span className="text-lg font-black tracking-tight uppercase">#{order.orderCode}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-400 font-bold">
//               <Clock size={14} strokeWidth={2.5} className="text-sky-500" />
//               <span className="text-[12px] font-medium">{mounted ? formattedDate : "---"}</span>
//             </div>
//           </div>
          
//           <div className="hidden lg:block h-10 w-[1px] bg-slate-100" />
          
//           <div className="hidden lg:flex flex-col gap-1">
//              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
//                 <Hash size={12} strokeWidth={3} className="text-indigo-400" /> Trạng thái
//              </span>
//              <OrderStatusBadge status={order.status} />
//           </div>
//         </div>

//         <div className="flex items-center gap-6">
//           <div className="hidden sm:block">
//             {renderActionButtons()}
//           </div>

//           <div className={`p-2 rounded-full transition-all ${isExpanded ? "bg-indigo-50 text-indigo-600 rotate-180" : "bg-slate-50 text-slate-300"}`}>
//             <ChevronDown size={20} strokeWidth={3} />
//           </div>
//         </div>
//       </div>

//       <div className="px-8 py-4 bg-slate-50/80 border-y border-slate-100 flex justify-between items-center">
//         <div className="flex items-center gap-12">
//            <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
//                 <User size={16} strokeWidth={2.5} className="text-indigo-500" />
//               </div>
//               <span className="text-slate-700 font-bold text-[15px]">{order.recipientName}</span>
//            </div>
//            <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
//                 <CreditCard size={16} strokeWidth={2.5} className="text-emerald-500" />
//               </div>
//               <span className="text-slate-700 font-bold text-[15px] uppercase">{order.paymentMethod}</span>
//            </div>
//         </div>

//         <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-indigo-50 shadow-sm">
//           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tổng tiền</span>
//           <span className="text-2xl font-black text-rose-600 tracking-tighter leading-none">
//             {order.finalAmount?.toLocaleString()}đ
//           </span>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="p-8 bg-white animate-in slide-in-from-top-4 duration-300">
          
//           <div className="sm:hidden mb-8 p-4 bg-slate-50 rounded-2xl">
//              <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Thao tác nhanh</p>
//              {renderActionButtons()}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
//              <div className="space-y-6">
//                 <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
//                   <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
//                   <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                     Giao nhận & Liên hệ
//                   </h4>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4">
//                     <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
//                       <Phone size={18} strokeWidth={2.5} className="text-emerald-500 flex-shrink-0" />
//                       <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Số điện thoại</p>
//                         <p className="text-[16px] font-black text-slate-900 tracking-wide">{order.phone}</p>
//                       </div>
//                     </div>
//                     <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
//                       <MapPin size={18} strokeWidth={2.5} className="text-rose-500 flex-shrink-0" />
//                       <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Địa chỉ nhận hàng</p>
//                         <p className="text-[15px] font-bold text-slate-700 leading-snug">{order.address}</p>
//                       </div>
//                     </div>
//                 </div>
//              </div>

//              <div className="space-y-6">
//                 <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
//                   <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
//                   <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                     Ghi chú từ khách
//                   </h4>
//                 </div>
//                 <div className="p-6 bg-amber-50/30 rounded-[2rem] border border-amber-100/50 min-h-[120px] relative flex items-center gap-3">
//                    <StickyNote size={20} strokeWidth={2.5} className="text-amber-500 flex-shrink-0" />
//                    <p className="text-[14px] font-medium text-slate-600 italic leading-relaxed">
//                       "{order.note || "Khách hàng không để lại lời nhắn."}"
//                    </p>
//                    <div className="absolute bottom-4 right-6 text-amber-200 italic font-black text-4xl opacity-20">”</div>
//                 </div>
//              </div>
//           </div>

//           <div className="space-y-6 pt-10 border-t border-slate-50">
//              <div className="flex items-center justify-between mb-4">
//                 <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                    <Package size={20} strokeWidth={2.5} className="text-indigo-600" /> Kiện hàng ({order.orderDetails?.length || 0})
//                 </h4>
//              </div>
             
//              <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                       <th className="px-8 py-5">Sản phẩm</th>
//                       <th className="px-8 py-5 text-center">Số lượng</th>
//                       <th className="px-8 py-5 text-right">Đơn giá</th>
//                       <th className="px-8 py-5 text-right">Tổng</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-50">
//                     {order.orderDetails?.map((item: any, idx: number) => (
//                       <tr key={idx} className="hover:bg-indigo-50/20 transition-colors group/row">
//                         <td className="px-8 py-6">
//                           <div className="flex items-center gap-6">
//                              <div className="w-20 h-20 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 flex-shrink-0 p-1 group-hover/row:border-indigo-200 transition-colors">
//                                 <img 
//                                   src={item.productId?.imageUrl || "/img/placeholder.svg"} 
//                                   className="w-full h-full object-cover rounded-xl" 
//                                   alt="product" 
//                                 />
//                              </div>
//                              <div>
//                                <p className="text-[15px] font-bold text-slate-900 mb-1 group-hover/row:text-indigo-600 transition-colors line-clamp-1">
//                                  {item.productId?.productName}
//                                </p>
//                                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
//                                  SKU: {item.productId?.productCode || "N/A"}
//                                </p>
//                              </div>
//                           </div>
//                         </td>
//                         <td className="px-8 py-6 text-center text-slate-700 font-black text-md">
//                           <span className="bg-slate-100 px-3 py-1 rounded-lg">x{item.quantity}</span>
//                         </td>
//                         <td className="px-8 py-6 text-right font-bold text-slate-500 text-sm">
//                           {item.unitPrice.toLocaleString()}đ
//                         </td>
//                         <td className="px-8 py-6 text-right font-black text-slate-900 text-[16px]">
//                           {(item.quantity * item.unitPrice).toLocaleString()}đ
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
                
//                 <div className="p-10 bg-slate-50/50 flex justify-end">
//                    <div className="w-full max-w-xs space-y-3">
//                       <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 uppercase tracking-tight">
//                         <div className="flex items-center gap-2">
//                            <Coins size={14} strokeWidth={2.5} className="text-amber-500" />
//                            <span>Tiền hàng</span>
//                         </div>
//                         <span className="text-slate-700 font-black">{order.totalAmount?.toLocaleString()}đ</span>
//                       </div>
//                       <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 uppercase tracking-tight">
//                         <div className="flex items-center gap-2">
//                            <Truck size={14} strokeWidth={2.5} className="text-sky-500" />
//                            <span>Phí vận chuyển</span>
//                         </div>
//                         <span className="text-slate-700 font-black">+{order.shippingFee?.toLocaleString()}đ</span>
//                       </div>
//                       <div className="h-[1px] bg-slate-200 my-4" />
//                       <div className="flex justify-between items-center">
//                         <div className="flex items-center gap-2">
//                            <Receipt size={18} strokeWidth={3} className="text-rose-600" />
//                            <span className="text-[14px] font-black text-slate-900 uppercase">Tổng cộng</span>
//                         </div>
//                         <span className="text-3xl font-black text-rose-600 tracking-tighter leading-none">
//                           {order.finalAmount?.toLocaleString()}đ
//                         </span>
//                       </div>
//                    </div>
//                 </div>
//              </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };