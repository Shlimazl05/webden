// "use client";
// import React, { useState, useEffect } from 'react';
// import {
//     Clock, ShoppingBag, ChevronDown, CreditCard,
//     Timer, Hash, AlertCircle, XCircle
// } from 'lucide-react';
// import { OrderStatusBadge } from '../OrderStatusBadge';
// import { IOrder } from '../../order.types';
// import { OrderStatusTimeline } from '../OrderStatusTimeline';

// // Import các component con bạn đã có
// import { OrderDeliveryInfo } from '../OrderDeliveryInfo';
// import { OrderItemsTable } from '../OrderItemsTable';
// import { OrderPriceSummary } from '../OrderPriceSummary';

// interface Props {
//     order: IOrder;
//     onCancel: (id: string) => void;
//     onPay: (order: IOrder) => void;
// }

// export const ClientOrderCard = ({ order, onCancel, onPay }: Props) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [formattedDate, setFormattedDate] = useState("");
//     const [timeLeft, setTimeLeft] = useState("");

//     useEffect(() => {
//         const dateSource = order.orderDate || order.createdAt;
//         if (dateSource) {
//             const date = new Date(dateSource);
//             setFormattedDate(
//                 `${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${date.toLocaleDateString('vi-VN')}`
//             );

//             // Tính thời gian hết hạn thanh toán (nếu là đơn Pending)
//             if (order.paymentMethod === 'SePay' && order.status === 'Pending' && order.paymentStatus !== 'Paid') {
//                 const updateTimer = () => {
//                     const dateSource = order.orderDate || order.createdAt;
//                     // SỬA TẠI ĐÂY: Đổi từ 24h thành 10 phút (10 * 60 * 1000 ms)
//                     const deadline = new Date(dateSource).getTime() + 10 * 60 * 1000;
//                     const diff = deadline - Date.now();

//                     if (diff > 0) {
//                         const m = Math.floor(diff / (1000 * 60));
//                         const s = Math.floor((diff % (1000 * 60)) / 1000);
//                         // Hiển thị dạng Phút : Giây cho chuyên nghiệp
//                         setTimeLeft(`${m}p ${s}s`);
//                     } else {
//                         setTimeLeft("Đã hết hạn");
//                     }
//                 };

//                 updateTimer();
//                 const interval = setInterval(updateTimer, 1000); // Cập nhật mỗi giây để thấy giây nhảy
//                 return () => clearInterval(interval);
//             }
//         }
//     }, [order.status, order.paymentStatus, order.paymentMethod, order.createdAt]);
//     return (
//         <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-5 transition-all hover:shadow-md group">

//             {/* 1. HEADER SECTION (Thông tin chung) */}
//             <div
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="px-6 py-5 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors"
//             >
//                 <div className="flex items-center gap-6">
//                     <div className="flex flex-col gap-1">
//                         <div className="flex items-center gap-2 text-indigo-600">
//                             <ShoppingBag size={18} strokeWidth={3} />
//                             <span className="text-md font-black uppercase">#{order.orderCode}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-slate-400 font-bold">
//                             <Clock size={12} strokeWidth={2.5} className="text-sky-500" />
//                             <span className="text-[11px]">{formattedDate || "---"}</span>
//                         </div>
//                     </div>
//                     <div className="hidden sm:block h-8 w-[1px] bg-slate-100" />
//                     <OrderStatusBadge status={order.status} />
//                 </div>



//                 <div className="flex items-center gap-4">
//                     {order.paymentMethod === 'SePay' && order.status === 'Pending' && order.paymentStatus !== 'Paid' && (
//                         <button
//                             onClick={(e) => { e.stopPropagation(); onPay(order); }}
//                             className="px-4 py-2 rounded-xl  bg-indigo-600 text-white text-[10px] font-black uppercase hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
//                         >
//                             <CreditCard size={14} strokeWidth={2.5} /> THANH TOÁN
//                         </button>
//                     )}

//                     {order.status === 'Pending' && (
//                         <button
//                             onClick={(e) => { e.stopPropagation(); onCancel(order._id); }}
//                             className="px-4 py-2 rounded-xl  bg-rose-50 text-rose-500 text-[10px] font-black uppercase hover:bg-rose-100 transition-all flex items-center gap-2"
//                         >
//                             <XCircle size={14} strokeWidth={2.5} /> Hủy đơn
//                         </button>
//                     )}
//                     <div className={`p-2 rounded-full transition-all ${isExpanded ? "bg-indigo-50 text-indigo-600 rotate-180" : "bg-slate-50 text-slate-300"}`}>
//                         <ChevronDown size={18} strokeWidth={3} />
//                     </div>
//                 </div>
//             </div>



//             {/* 2. SUMMARY BAR (Thiết kế lại theo phương thức thanh toán) */}
//             <div className="px-6 py-3 bg-slate-50/40 border-y border-slate-100 flex justify-between items-center">
//                 <div className="flex items-center gap-6">
//                     <div className="flex items-center gap-2">
//                         <CreditCard size={14} strokeWidth={2.5} className="text-emerald-500" />
//                         <span className="text-slate-600 font-black text-[11px] uppercase tracking-wide">
//                             {order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản (QR)'}
//                         </span>
//                     </div>

//                     {/* HIỂN THỊ CHO SEPAY: Đếm ngược 10p */}
//                     {order.paymentMethod === 'SePay' && order.status === 'Pending' && timeLeft && (
//                         <div className={`flex items-center gap-2 px-3 py-1 rounded-lg font-black text-[10px] uppercase transition-colors ${timeLeft === "expired" ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-600"
//                             }`}>
//                             <Timer size={12} strokeWidth={3} className={timeLeft !== "expired" ? "animate-spin" : ""} />
//                             <span>{timeLeft === "expired" ? "Hết hạn thanh toán" : `Hết hạn sau: ${timeLeft}`}</span>
//                         </div>
//                     )}

//                     {/* HIỂN THỊ CHO COD: Trạng thái tĩnh */}
//                     {order.paymentMethod === 'COD' && order.status === 'Pending' && (
//                         <div className="flex items-center gap-2 bg-sky-50 px-3 py-1 rounded-lg text-sky-600 font-black text-[10px] uppercase tracking-tight">
//                             <Clock size={12} strokeWidth={3} />
//                             <span>Chờ xác nhận & Giao hàng</span>
//                         </div>
//                     )}

//                     {order.paymentStatus === 'Partially_Paid' && (
//                         <div className="flex items-center gap-1.5 text-rose-500 font-black text-[10px] uppercase">
//                             <AlertCircle size={12} strokeWidth={3} /> Thanh toán thiếu
//                         </div>
//                     )}
//                 </div>

//                 <div className="flex items-center gap-3">
//                     <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng tiền</span>
//                     <span className="text-xl font-black text-rose-600 tracking-tighter">
//                         {order.finalAmount?.toLocaleString()}đ
//                     </span>
//                 </div>
//             </div>

//             {/* 3. EXPANDED CONTENT (Giữ nguyên phần chi tiết) */}
//             {isExpanded && (
//                 <div className="p-6 bg-white animate-in slide-in-from-top-2 duration-300">
//                     <OrderDeliveryInfo phone={order.phone} address={order.address} note={order.note} />
//                     <OrderItemsTable details={order.orderDetails || []} />
//                     <OrderPriceSummary
//                         totalAmount={order.totalAmount}
//                         shippingFee={order.shippingFee}
//                         finalAmount={order.finalAmount}
//                     />
//                     <div className="mt-8 pt-8 border-t border-slate-100">
//                         <div className="flex items-center gap-2 mb-6">
//                             <Hash size={14} className="text-indigo-400" strokeWidth={3} />
//                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lịch sử xử lý đơn hàng</h4>
//                         </div>
//                         <OrderStatusTimeline
//                             status={order.status}
//                             statusHistory={order.statusHistory || []}
//                             createdAt={order.createdAt}
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

import React, { useState } from 'react';
import { IOrder } from '@/features/orders/order.types';
import { statusConfig } from '@/features/orders/components/OrderStatus';
import { ChevronDown, ChevronUp, Hash, CreditCard, Timer, XCircle, AlertCircle } from 'lucide-react';
import { useOrderCountdown } from '../../hooks/useOrderCountdown';

interface ClientOrderCardProps {
    order: IOrder;
    onClick?: (order: IOrder) => void;
    onCancel: (id: string) => void;
    onPay: (order: IOrder) => void;
}

export const ClientOrderCard: React.FC<ClientOrderCardProps> = ({ order, onClick, onCancel, onPay }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const config = statusConfig[order.status] || statusConfig.Pending;

    // Gọi logic từ hook
    const { timeLeft, isExpired } = useOrderCountdown(order);

    const visibleDetails = isExpanded ? order.orderDetails : order.orderDetails.slice(0, 2);

    return (
        <div
            onClick={() => onClick?.(order)}
            className="ui-card p-5 overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99] border border-slate-200"
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-50 bg-slate-50/30">
                <div className="flex items-center gap-2">
                    <Hash size={14} className="text-indigo-500" strokeWidth={3} />
                    <span className="font-bold text-slate-800 text-sm">{order.orderCode}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${config.badgeColor}`}>
                    {config.label}
                </span>
            </div>

            {/* Thanh trạng thái thanh toán & Countdown */}
            {(order.status === 'Pending' || order.paymentStatus === 'Partially_Paid') && (
                <div className="px-5 py-2.5 bg-slate-50/50 border-b border-slate-50 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                        <CreditCard size={13} className="text-emerald-500" />
                        {order.paymentMethod === 'COD' ? 'Thanh toán COD' : 'Chuyển khoản QR'}
                    </div>

                    {order.paymentMethod === 'SePay' && order.status === 'Pending' && timeLeft && (
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${isExpired ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-600"
                            }`}>
                            <Timer size={12} className={!isExpired ? "animate-pulse" : ""} />
                            {isExpired ? "Đã hết hạn" : `Hết hạn sau: ${timeLeft}`}
                        </div>
                    )}

                    {order.paymentStatus === 'Partially_Paid' && (
                        <div className="flex items-center gap-1.5 text-rose-500 font-black text-[10px] uppercase">
                            <AlertCircle size={12} /> Thanh toán thiếu
                        </div>
                    )}
                </div>
            )}

            {/* Danh sách sản phẩm */}
            {/* <div className="px-5"> */}
            {visibleDetails.map((item: any, idx) => (
                <div key={idx} className="flex items-start gap-4 py-5 border-b border-slate-100 last:border-0">
                    <img
                        src={item.productId?.imageUrl}
                        alt="product"
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                            {item.productId?.productName}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 mt-1.5">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                        <p className="ui-currency text-slate-900 text-sm">
                            {(item.unitPrice).toLocaleString()}
                            <span className="currency-symbol">đ</span>
                        </p>
                    </div>
                </div>
            ))}
            {/* </div> */}

            {/* Xem thêm */}
            {order.orderDetails.length > 2 && (
                <button
                    onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                    className="w-full py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-slate-50 transition-colors border-t border-slate-50"
                >
                    {isExpanded ? <>Thu gọn <ChevronUp size={14} /></> : <>Xem thêm {order.orderDetails.length - 2} sản phẩm <ChevronDown size={14} /></>}
                </button>
            )}

            {/* Footer: Action Buttons & Total */}
            <div className="pt-5 bg-slate-50/30 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                    {order.status === 'Pending' && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onCancel(order._id); }}
                            className="px-4 py-2 rounded-xl  text-rose-500 hover:bg-rose-50 text-[11px] font-black uppercase transition-all flex items-center gap-2"
                        >
                            <XCircle size={14} strokeWidth={2.5} /> Hủy
                        </button>
                    )}
                    {order.paymentMethod === 'SePay' && order.status === 'Pending' && !isExpired && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onPay(order); }}
                            className="px-5 py-2.5 rounded-xl  bg-indigo-600 text-white text-[11px] font-black uppercase hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                        >
                            <CreditCard size={14} strokeWidth={2.5} /> Thanh toán
                        </button>
                    )}
                </div>

                <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tight ">Tổng thanh toán</span>
                    <span className="text-xl font-black text-indigo-600 tabular-nums">
                        {order.finalAmount.toLocaleString()}
                        <span className="text-[12px] ml-0.5 underline font-bold">đ</span>
                    </span>
                </div>
            </div>
        </div>
    );
};