

import React from 'react';
import { IOrder, OrderStatus } from '../../order.types';
import {
    CheckCircle2,
    Truck,
    Package,
    XCircle,
    Clock
} from 'lucide-react';

interface Props {
    order: IOrder;
    onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const statusMap: Record<OrderStatus, { label: string; icon: any; colorClass: string; bgColor: string }> = {
    Pending: {
        label: 'Chờ xác nhận',
        icon: Clock,
        colorClass: 'text-amber-700',
        bgColor: 'bg-amber-50'
    },
    Processing: {
        label: 'Đang xử lý',
        icon: Package,
        colorClass: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    Shipping: {
        label: 'Đang giao hàng',
        icon: Truck,
        colorClass: 'text-orange-700',
        bgColor: 'bg-orange-50'
    },
    Completed: {
        label: 'Đã hoàn tất',
        icon: CheckCircle2,
        colorClass: 'text-emerald-700',
        bgColor: 'bg-emerald-50'
    },
    Cancelled: {
        label: 'Đã hủy đơn',
        icon: XCircle,
        colorClass: 'text-rose-700',
        bgColor: 'bg-rose-50'
    },
};

export const OrderStatusActions: React.FC<Props> = ({ order, onUpdateStatus }) => {
    const current = statusMap[order.status] || statusMap.Pending;
    const StatusIcon = current.icon;

    // Hàm render nút hành động chính bên phải
    const renderPrimaryAction = () => {
        switch (order.status) {
            case 'Pending':
                return (
                    <button
                        onClick={() => onUpdateStatus(order._id, 'Processing')}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all text-sm whitespace-nowrap"
                    >
                        Xác nhận đơn hàng
                    </button>
                );
            case 'Processing':
                return (
                    <button
                        onClick={() => onUpdateStatus(order._id, 'Shipping')}
                        className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all text-sm whitespace-nowrap"
                    >
                        Bắt đầu giao hàng
                    </button>
                );
            case 'Shipping':
                return (
                    <button
                        onClick={() => onUpdateStatus(order._id, 'Completed')}
                        className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all text-sm whitespace-nowrap"
                    >
                        Hoàn tất đơn hàng
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white border border-slate-100 rounded-[3rem] p-4 pl-6 flex items-center justify-between shadow-sm">

            {/* BÊN TRÁI: ICON VÀ TRẠNG THÁI */}
            <div className="flex items-center gap-5">
                {/* Icon tròn */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border border-amber-100 ${current.bgColor} ${current.colorClass}`}>
                    <StatusIcon size={28} strokeWidth={2.5} />
                </div>

                {/* Text trạng thái */}
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-0.5">
                        Trạng thái hiện tại
                    </span>
                    <span className={`text-lg font-bold tracking-tight `}>
                        {current.label}
                    </span>
                </div>
            </div>

            {/* BÊN PHẢI: CÁC NÚT BẤM */}
            <div className="flex items-center gap-3">
                {/* Nút Hủy (Chỉ hiện khi Pending) */}
                {order.status === 'Pending' && (
                    <button
                        onClick={() => onUpdateStatus(order._id, 'Cancelled')}
                        className="px-6 py-2.5 border border-rose-100 text-rose-600 font-bold rounded-full hover:bg-rose-50 transition-all text-sm"
                    >
                        Hủy đơn
                    </button>
                )}

                {/* Nút hành động chính */}
                {renderPrimaryAction()}
            </div>
        </div>
    );
};

