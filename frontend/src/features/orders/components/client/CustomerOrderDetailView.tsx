// features/orders/components/client/CustomerOrderDetailView.tsx
import React from 'react';
import { IOrder } from '../../order.types';
import { ArrowLeft, CreditCard, XCircle, ShieldCheck } from 'lucide-react';
import { CustomerInfo } from '../admin/CustomerInfo'; // Tái sử dụng
import { OrderPackageDetails } from '../admin/OrderPackageDetails'; // Tái sử dụng
import { OrderStatusTimeline } from '@/features/orders/components/OrderStatusTimeline'
interface Props {
    order: IOrder;
    onBack: () => void;
    onOpenPayment: (order: IOrder) => void;
    onOpenCancel: (id: string) => void;
}

export const CustomerOrderDetailView: React.FC<Props> = ({ order, onBack, onOpenPayment, onOpenCancel }) => {
    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
            {/* 1. Header giống Admin nhưng màu sắc nhẹ nhàng hơn */}
            <div className="p-6 pb-4 border-b border-slate-50 flex items-center gap-4 sticky top-0 bg-white z-10">
                <button onClick={onBack} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer">
                    <ArrowLeft size={18} className="text-slate-500" />
                </button>
                <div>
                    <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                        Chi tiết đơn hàng <span className="text-indigo-600">#{order.orderCode}</span>
                    </h2>
                    
                </div>
            </div>

            {/* 2. Nội dung chính */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#fcfcfc] custom-scrollbar">
                <div className="max-w-3xl mx-auto space-y-6 pb-20">

                    {/* KHỐI TRẠNG THÁI & THANH TOÁN (Capsule Style) */}
                    <div className="ui-card rounded-[3rem] p-3 pl-6 flex items-center justify-between shadow-sm bg-white border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                                <ShieldCheck size={22} />
                            </div>
                            <div className="flex flex-col">
                                <span className="ui-label normal-case text-slate-500 font-semibold text-[12px]">Thanh toán</span>
                                <span className={`text-[15px] font-black ${order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                    {order.paymentStatus === 'Paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pr-2">
                            {/* Nút Hủy đơn cho khách (Chỉ khi Pending) */}
                            {order.status === 'Pending' && (
                                <button onClick={() => onOpenCancel(order._id)} className="px-5 py-2.5 text-slate-400 font-bold hover:text-rose-500 transition-all text-[13px]">
                                    Hủy đơn
                                </button>
                            )}

                            {/* Nút Thanh toán QR (Nếu là SePay và chưa trả tiền) */}
                            {order.paymentMethod === 'SePay' && order.paymentStatus !== 'Paid' && order.status !== 'Cancelled' && (
                                <button onClick={() => onOpenPayment(order)} className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-100 flex items-center gap-2 text-sm cursor-pointer active:scale-95">
                                    <CreditCard size={16} /> Thanh toán ngay
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm mt-6">
                        <OrderStatusTimeline
                            status={order.status}
                            statusHistory={order.statusHistory || []}
                            createdAt={order.createdAt}
                        />
                    </div>

                    {/* THÔNG TIN KHÁCH HÀNG (Tái sử dụng) */}
                    <CustomerInfo order={order} />

                    {/* KIỆN HÀNG (Tái sử dụng) */}
                    <OrderPackageDetails order={order} />
                </div>
            </div>
        </div>
    );
};