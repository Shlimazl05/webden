

import React from 'react';
import { IOrder, OrderStatus } from '../../order.types';
import { CheckCircle2, Truck, Package, XCircle, Clock } from 'lucide-react';

interface Props {
    order: IOrder;
    onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const statusMap: Record<OrderStatus, { label: string; icon: any; colorClass: string; bgColor: string }> = {
    Pending: { label: 'Chờ xác nhận', icon: Clock, colorClass: 'text-amber-600', bgColor: 'bg-amber-50' },
    Processing: { label: 'Đang xử lý', icon: Package, colorClass: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    Shipping: { label: 'Đang giao hàng', icon: Truck, colorClass: 'text-orange-600', bgColor: 'bg-orange-50' },
    Completed: { label: 'Đã hoàn tất', icon: CheckCircle2, colorClass: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    Cancelled: { label: 'Đã hủy đơn', icon: XCircle, colorClass: 'text-slate-500', bgColor: 'bg-slate-50' },
};

export const OrderStatusActions: React.FC<Props> = ({ order, onUpdateStatus }) => {
    const current = statusMap[order.status] || statusMap.Pending;
    const StatusIcon = current.icon;

    const renderPrimaryAction = () => {
        const baseClass = "px-8 py-3 rounded-full font-bold shadow-lg transition-all text-sm whitespace-nowrap active:scale-95 cursor-pointer";

        switch (order.status) {
            case 'Pending':
                return (
                    <button onClick={() => onUpdateStatus(order._id, 'Processing')}
                        className={`${baseClass} bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700`}>
                        Xác nhận đơn hàng
                    </button>
                );
            case 'Processing':
                return (
                    <button onClick={() => onUpdateStatus(order._id, 'Shipping')}
                        className={`${baseClass} bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700`}>
                        Bắt đầu giao hàng
                    </button>
                );
            case 'Shipping':
                return (
                    <button onClick={() => onUpdateStatus(order._id, 'Completed')}
                        className={`${baseClass} bg-emerald-600 text-white shadow-emerald-100 hover:bg-emerald-700`}>
                        Hoàn tất đơn hàng
                    </button>
                );
            default: return null;
        }
    };

    return (
        /* 1. Sử dụng khung bo tròn cực đại và shadow nhẹ */
        <div className="bg-white border border-slate-100 rounded-[3rem] p-3 pl-6 flex items-center justify-between shadow-sm">

            {/* BÊN TRÁI: ICON VÀ TRẠNG THÁI */}
            <div className="flex items-center gap-5">
                {/* 2. Icon tròn: Dùng viền nhẹ của hệ thống */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-white shadow-sm ${current.bgColor} ${current.colorClass}`}>
                    <StatusIcon size={24} strokeWidth={2.2} />
                </div>

                <div className="flex flex-col justify-center">
                    {/* 3. Sử dụng class ui-label cho nhãn phụ */}
                    <span className="ui-label normal-case mb-1 mb-1.5 text-slate-500 font-semibold text-[12px]">
                        Trạng thái hiện tại
                    </span>
                    {/* 4. Sử dụng class ui-value nhưng tăng cỡ chữ và thêm màu trạng thái */}
                    <span className={`ui-value text-[17px] leading-none `}>
                        {current.label}
                    </span>
                </div>
            </div>

            {/* BÊN PHẢI: CÁC NÚT BẤM */}
            <div className="flex items-center gap-3 pr-2">
                {order.status === 'Pending' && (
                    <button
                        onClick={() => onUpdateStatus(order._id, 'Cancelled')}
                        /* 5. Nút hủy đơn: Bỏ ui-card, dùng border mảnh và font Semibold */
                        className="px-6 py-2.5 border border-rose-100 text-rose-600 font-semibold rounded-full hover:bg-rose-50 transition-all text-sm cursor-pointer"
                    >
                        Hủy đơn
                    </button>
                )}

                {renderPrimaryAction()}
            </div>
        </div>
    );
};