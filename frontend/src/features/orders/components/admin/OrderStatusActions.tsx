import React from 'react';
import { IOrder, OrderStatus } from '../../order.types';
import { CheckCircle2, Truck, Package, XCircle, ChevronRight } from 'lucide-react';

interface Props {
    order: IOrder;
    onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export const OrderStatusActions: React.FC<Props> = ({ order, onUpdateStatus }) => {
    
    // Logic hiển thị nút bấm dựa trên trạng thái hiện tại
    const renderActions = () => {
        switch (order.status) {
            case 'Pending':
                return (
                    <button onClick={() => onUpdateStatus(order._id, 'Processing')} className="w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <Package size={18} /> Xác nhận đơn hàng
                    </button>
                );
            case 'Processing':
                return (
                    <button onClick={() => onUpdateStatus(order._id, 'Shipping')} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <Truck size={18} /> Bắt đầu giao hàng
                    </button>
                );
            case 'Shipping':
                return (
                    <button onClick={() => onUpdateStatus(order._id, 'Completed')} className="w-full py-3 bg-[var(--color-success)] text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <CheckCircle2 size={18} /> Hoàn tất đơn hàng
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="ui-card rounded-[1.5rem] border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-6">
                <span className="ui-label text-[var(--color-text-muted)]">Trạng thái hiện tại</span>
                <span className="px-3 py-1 bg-slate-100 rounded-full text-[var(--color-text-main)] font-bold text-[11px] uppercase tracking-tighter border border-slate-200">
                    {order.status}
                </span>
            </div>

            <div className="space-y-3">
                {renderActions()}

                {/* Nút Hủy đơn luôn hiện nếu chưa hoàn thành/hủy */}
                {order.status === 'Pending' && (
                    <button
                        onClick={() => onUpdateStatus(order._id, 'Cancelled')}
                        className="w-full py-2.5 text-[var(--color-danger)] font-semibold hover:bg-rose-50 rounded-xl transition-all text-sm mt-2"
                    >
                        Hủy đơn hàng
                    </button>
                )}
            </div>
        </div>
    );
};