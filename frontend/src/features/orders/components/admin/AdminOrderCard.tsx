

// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Clock, User, Phone, MapPin, Package, Truck, 
//   CreditCard, ChevronDown, Coins, ShoppingBag, 
//   Receipt, CheckCircle2, XCircle, PackageCheck,
//   StickyNote, Hash,AlertCircle
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
//           <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Tổng tiền</span>
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
//                     <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
//                       <Phone size={18} strokeWidth={2.5} className="text-emerald-500 mt-1 flex-shrink-0" />
//                       <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Số điện thoại</p>
//                         <p className="text-[16px] font-black text-slate-900 tracking-wide">{order.phone}</p>
//                       </div>
//                     </div>
//                     <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
//                       <MapPin size={18} strokeWidth={2.5} className="text-rose-500 mt-1 flex-shrink-0" />
//                       <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Địa chỉ nhận hàng</p>
//                         <p className="text-[15px] font-bold text-slate-700 leading-snug">{order.address}</p>
//                       </div>
//                     </div>
//                 </div>
//              </div>

//              <div className="space-y-6">
//                 <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
//                   <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
//                   <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                     Ghi chú từ khách
//                   </h4>
//                 </div>
//                 <div className="p-6 bg-amber-50/30 rounded-[2rem] border border-amber-100/50 min-h-[120px] relative flex items-start gap-3">
//                    <StickyNote size={20} strokeWidth={2.5} className="text-amber-500 mt-0.5 flex-shrink-0" />
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
//                       <div className="flex justify-between items-center text-[12px] font-bold text-slate-400  tracking-tight">
//                         <div className="flex items-center gap-2">
//                            <Coins size={14} strokeWidth={2.5} className="text-amber-500" />
//                            <span>Tiền hàng</span>
//                         </div>
//                         <span className="text-slate-700 font-black">{order.totalAmount?.toLocaleString()}đ</span>
//                       </div>
//                       <div className="flex justify-between items-center text-[12px] font-bold text-slate-400  tracking-tight">
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



// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Clock, User, Phone, MapPin, Package, Truck, 
//   CreditCard, ChevronDown, Coins, ShoppingBag, 
//   Receipt, CheckCircle2, XCircle, PackageCheck,
//   StickyNote, Hash, AlertCircle
// } from 'lucide-react';
// import { OrderStatusBadge } from '../OrderStatusBadge';
// import { IOrder, OrderStatus } from '../../order.types';
// import { OrderStatusTimeline } from '../OrderStatusTimeline'; 

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
      
//       {/* HEADER SECTION */}
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
          
//           {/* CỘT TRẠNG THÁI (ĐÃ ĐƯA VỀ CHUẨN) */}
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

//       {/* INFO BAR SECTION */}
//       <div className="px-8 py-4 bg-slate-50/80 border-y border-slate-100 flex justify-between items-center">
//         <div className="flex items-center gap-12">
//            <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
//                 <User size={16} strokeWidth={2.5} className="text-indigo-500" />
//               </div>
//               <span className="text-slate-700 font-bold text-[15px]">{order.recipientName}</span>
//            </div>

//            {/* PHẦN THANH TOÁN (ĐÃ TÍCH HỢP TRẠNG THÁI SEPAY) */}
//            <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
//                 <CreditCard size={16} strokeWidth={2.5} className="text-emerald-500" />
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-slate-700 font-bold text-[15px] uppercase leading-none mb-0.5">
//                   {order.paymentMethod}
//                 </span>
//                 {order.paymentMethod === 'SePay' && (
//                   <div className="flex items-center gap-1">
//                     {order.paymentStatus === 'Paid' ? (
//                       <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter flex items-center gap-0.5">
//                         <CheckCircle2 size={10} strokeWidth={3} /> Đã đủ tiền
//                       </span>
//                     ) : order.paymentStatus === 'Partially_Paid' ? (
//                       <span className="text-[10px] font-black text-amber-500 uppercase tracking-tighter flex items-center gap-0.5">
//                         <AlertCircle size={10} strokeWidth={3} /> Thiếu tiền
//                       </span>
//                     ) : (
//                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-0.5">
//                         <Clock size={10} strokeWidth={3} /> Chờ tiền về
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div>
//            </div>
//         </div>

//         <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-indigo-50 shadow-sm">
//           <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Tổng tiền</span>
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
//                     <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
//                       <Phone size={18} strokeWidth={2.5} className="text-emerald-500 mt-1 flex-shrink-0" />
//                       <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Số điện thoại</p>
//                         <p className="text-[16px] font-black text-slate-900 tracking-wide">{order.phone}</p>
//                       </div>
//                     </div>
//                     <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
//                       <MapPin size={18} strokeWidth={2.5} className="text-rose-500 mt-1 flex-shrink-0" />
//                       <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Địa chỉ nhận hàng</p>
//                         <p className="text-[15px] font-bold text-slate-700 leading-snug">{order.address}</p>
//                       </div>
//                     </div>
//                 </div>
//              </div>

//              <div className="space-y-6">
//                 <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
//                   <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
//                   <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                     Ghi chú từ khách
//                   </h4>
//                 </div>
//                 <div className="p-6 bg-amber-50/30 rounded-[2rem] border border-amber-100/50 min-h-[120px] relative flex items-start gap-3">
//                    <StickyNote size={20} strokeWidth={2.5} className="text-amber-500 mt-0.5 flex-shrink-0" />
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
//                           {item.unitPrice?.toLocaleString()}đ
//                         </td>
//                         <td className="px-8 py-6 text-right font-black text-slate-900 text-[16px]">
//                           {(item.quantity * item.unitPrice)?.toLocaleString()}đ
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
                
//                 <div className="p-10 bg-slate-50/50 flex justify-end">
//                    <div className="w-full max-w-xs space-y-3">
//                       <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 tracking-tight">
//                         <div className="flex items-center gap-2">
//                            <Coins size={14} strokeWidth={2.5} className="text-amber-500" />
//                            <span>Tiền hàng</span>
//                         </div>
//                         <span className="text-slate-700 font-black">{order.totalAmount?.toLocaleString()}đ</span>
//                       </div>
//                       <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 tracking-tight">
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
//                 <OrderStatusTimeline 
//                   status={order.status} 
//                   statusHistory={order.statusHistory || []} 
//                 />

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
  StickyNote, Hash, AlertCircle
} from 'lucide-react';
import { OrderStatusBadge } from '../OrderStatusBadge';
import { IOrder, OrderStatus } from '../../order.types';
import { OrderStatusTimeline } from '../OrderStatusTimeline'; 

interface Props {
  order: IOrder;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export const AdminOrderCard = ({ order, onUpdateStatus }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [mounted, setMounted] = useState(false);

  // Xử lý format ngày tháng an toàn cho Hydration
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

  // Render các nút bấm thao tác của Admin
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
      
      {/* 1. HEADER: Thông tin chính & Trạng thái đơn */}
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
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Clock size={14} strokeWidth={2.5} className="text-sky-500" />
              <span className="text-[12px] font-medium">{mounted ? formattedDate : "---"}</span>
            </div>
          </div>
          
          <div className="hidden lg:block h-10 w-[1px] bg-slate-100" />
          
          <div className="hidden lg:flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
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

      {/* 2. INFO BAR: Khách hàng, Thanh toán & Tổng tiền */}
      <div className="px-8 py-4 bg-slate-50/80 border-y border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-12">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <User size={16} strokeWidth={2.5} className="text-indigo-500" />
              </div>
              <span className="text-slate-700 font-bold text-[15px]">{order.recipientName}</span>
           </div>

           {/* HIỂN THỊ THANH TOÁN & TRẠNG THÁI TIỀN VỀ (SEPAY) */}
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <CreditCard size={16} strokeWidth={2.5} className="text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-700 font-bold text-[15px] uppercase leading-none mb-0.5">
                  {order.paymentMethod}
                </span>
                
              </div>
           </div>
        </div>

        <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-indigo-50 shadow-sm">
          <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Tổng tiền</span>
          <span className="text-2xl font-black text-rose-600 tracking-tighter leading-none">
            {order.finalAmount?.toLocaleString()}đ
          </span>
        </div>
      </div>

      {/* 3. EXPANDED SECTION: Chi tiết đơn hàng */}
      {isExpanded && (
        <div className="p-8 bg-white animate-in slide-in-from-top-4 duration-300">
          
          {/* Thông tin liên hệ & Ghi chú khách hàng */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
             <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
                  <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                  <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">
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
                  <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">
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

          {/* Bảng danh sách sản phẩm */}
          <div className="space-y-6 pt-10 border-t border-slate-50">
             <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Package size={20} strokeWidth={2.5} className="text-indigo-600" /> Kiện hàng ({order.orderDetails?.length || 0})
             </h4>
             
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
                             <div className="w-20 h-20 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 p-1">
                                <img src={item.productId?.imageUrl} className="w-full h-full object-cover rounded-xl" />
                             </div>
                             <div>
                               <p className="text-[15px] font-bold text-slate-900 line-clamp-1">{item.productId?.productName}</p>
                               <p className="text-[10px] font-black text-slate-400">SKU: {item.productId?.productCode || "N/A"}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center text-slate-700 font-black">
                          <span className="bg-slate-100 px-3 py-1 rounded-lg">x{item.quantity}</span>
                        </td>
                        <td className="px-8 py-6 text-right font-bold text-slate-500">{item.unitPrice?.toLocaleString()}đ</td>
                        <td className="px-8 py-6 text-right font-black text-slate-900">{(item.quantity * item.unitPrice)?.toLocaleString()}đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Tóm tắt tiền tệ */}
                <div className="p-10 bg-slate-50/50 flex justify-end border-b border-slate-100">
                   <div className="w-full max-w-xs space-y-3">
                      <div className="flex justify-between items-center text-[12px] font-bold text-slate-400">
                        <div className="flex items-center gap-2"><Coins size={14} className="text-amber-500" /><span>Tiền hàng</span></div>
                        <span className="text-slate-700 font-black">{order.totalAmount?.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-bold text-slate-400">
                        <div className="flex items-center gap-2"><Truck size={14} className="text-sky-500" /><span>Phí vận chuyển</span></div>
                        <span className="text-slate-700 font-black">+{order.shippingFee?.toLocaleString()}đ</span>
                      </div>
                      <div className="h-[1px] bg-slate-200 my-4" />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2"><Receipt size={18} strokeWidth={3} className="text-rose-600" /><span className="text-[14px] font-black text-slate-900 uppercase">Tổng cộng</span></div>
                        <span className="text-3xl font-black text-rose-600 tracking-tighter">{order.finalAmount?.toLocaleString()}đ</span>
                      </div>
                   </div>
                </div>

                {/* HÀNH TRÌNH ĐƠN HÀNG (SỬ DỤNG COMPONENT TÁCH RỜI) */}
                <div className="bg-white p-10">
                   <OrderStatusTimeline 
                      status={order.status} 
                      statusHistory={order.statusHistory || []} 
                   />
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};