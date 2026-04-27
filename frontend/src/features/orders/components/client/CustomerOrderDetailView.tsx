
import React from 'react';
import { IOrder } from '../../order.types';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { CustomerInfo } from '../admin/CustomerInfo';
import { OrderPackageDetails } from '../admin/OrderPackageDetails';
import { OrderStatusTimeline } from '@/features/orders/components/OrderStatusTimeline';

interface Props {
    order: IOrder;
    onBack: () => void;
    onOpenPayment: (order: IOrder) => void;
    onOpenCancel: (id: string) => void;
}

export const CustomerOrderDetailView: React.FC<Props> = ({ order, onBack, onOpenPayment, onOpenCancel }) => {
    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
            {/* 1. Header: Giữ nguyên Tiêu đề, Mã đơn và các Nút bấm quan trọng */}
            <div className="px-4 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer">
                        <ArrowLeft size={18} className="text-slate-500" />
                    </button>
                    <div>
                        <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight leading-none">
                            Chi tiết đơn hàng
                        </h2>
                        <p className="text-indigo-600 font-bold text-sm mt-1.5">
                            #{order.orderCode}
                        </p>
                    </div>
                </div>

                {/* Các nút bấm nằm an toàn trên Header, không bị ảnh hưởng khi xóa phần dưới */}
                <div className="flex items-center gap-3">
                    {order.status === 'Pending' && (
                        <button
                            onClick={() => onOpenCancel(order._id)}
                            className="px-5 py-2.5 text-slate-400 font-black hover:text-rose-500 transition-all text-[12px] uppercase tracking-widest"
                        >
                            Hủy đơn
                        </button>
                    )}

                    {order.paymentMethod === 'SePay' && order.paymentStatus !== 'Paid' && order.status !== 'Cancelled' && (
                        <button
                            onClick={() => onOpenPayment(order)}
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center gap-2 text-[12px] uppercase tracking-widest cursor-pointer active:scale-95 transition-all"
                        >
                            <CreditCard size={16} /> Thanh toán ngay
                        </button>
                    )}
                </div>
            </div>

            {/* 2. Nội dung chính */}
            <div className="flex-1 bg-[#fcfcfc] ">
                <div className="space-y-6">

                    {/* HÀNH TRÌNH ĐƠN HÀNG (Sẽ hiện ngay sau Header) */}

                    <OrderStatusTimeline
                        status={order.status}
                        statusHistory={order.statusHistory || []}
                        createdAt={order.createdAt}
                    />
                    {/* THÔNG TIN KHÁCH HÀNG & KIỆN HÀNG */}
                    <CustomerInfo order={order} />
                    <OrderPackageDetails order={order} isClientView={true} />
                </div>
            </div>
        </div>
    );
};