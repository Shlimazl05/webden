import React from 'react';
import { IOrder, OrderStatus } from '../../order.types';
import { ArrowLeft } from 'lucide-react';
import { OrderStatusActions } from './OrderStatusActions';
import { CustomerInfo } from './CustomerInfo';
import { OrderPackageDetails } from './OrderPackageDetails';

interface Props {
    order: IOrder;
    onBack: () => void;
    onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export const AdminOrderDetailView: React.FC<Props> = ({ order, onBack, onUpdateStatus }) => {
    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">

            {/* 1. Header cố định */}
            <div className="p-8 pb-4 flex items-center gap-6 sticky top-0 bg-white z-10 border-b border-slate-50">
                <button onClick={onBack} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 group transition-all">
                    <ArrowLeft size={18} className="text-slate-500 group-hover:text-white" />
                </button>
                <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">
                        Đơn hàng <span className="text-indigo-600 font-black">#{order.orderCode}</span>
                    </h2>
                    <p className="text-[12px] text-slate-400 font-medium">Đặt lúc {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                </div>
            </div>

            {/* 2. Nội dung chính - Xếp chồng dọc */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#fcfcfc]">
                <div className="max-w-4xl mx-auto space-y-6 pb-10">

                    {/* PHẦN 1: TRẠNG THÁI (Lên đầu để xử lý ngay) */}
                    <OrderStatusActions order={order} onUpdateStatus={onUpdateStatus} />

                    {/* PHẦN 2: THÔNG TIN KHÁCH HÀNG */}
                    <CustomerInfo order={order} />

                    {/* PHẦN 3: KIỆN HÀNG & TỔNG TIỀN */}
                    <OrderPackageDetails order={order} />

                </div>
            </div>
        </div>
    );
};