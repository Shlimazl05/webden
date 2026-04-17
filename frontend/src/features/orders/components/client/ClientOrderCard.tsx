

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

    const visibleDetails = isExpanded ? order.orderDetails : order.orderDetails.slice(0, 1);

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
            {order.orderDetails.length > 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                    className="w-full py-3 text-[13px] font-black text-slate-500  tracking-widest flex items-center justify-center gap-1 hover:bg-slate-50 transition-colors border-t border-slate-50"
                >
                    {isExpanded ? <>Thu gọn <ChevronUp size={14} /></> : <>Xem thêm {order.orderDetails.length - 1} sản phẩm <ChevronDown size={14} /></>}
                </button>
            )}

            {/* Footer: Action Buttons & Total */}
            <div className="pt-5 bg-slate-50/30 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                    {order.status === 'Pending' && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onCancel(order._id); }}
                            className="px-4 py-2 rounded-xl  text-rose-500 hover:bg-rose-100 text-[11px] font-black uppercase transition-all flex items-center gap-2"
                        >
                            <XCircle size={14} strokeWidth={2.5} /> Hủy đơn
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