import { OrderStatus } from '@/features/orders/order.types';
import { Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

export const statusConfig = {
    Pending: {
        label: 'Chờ xác nhận',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        badgeColor: 'bg-amber-100 text-amber-700',
        icon: Clock
    },
    Processing: {
        label: 'Đang xử lý',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        badgeColor: 'bg-blue-100 text-blue-700',
        icon: Package
    },
    Shipping: {
        label: 'Đang giao hàng',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        badgeColor: 'bg-orange-100 text-orange-700',
        icon: Truck
    },
    Completed: {
        label: 'Hoàn tất',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        icon: CheckCircle
    },
    Cancelled: {
        label: 'Đã hủy',
        color: 'text-rose-600',
        bgColor: 'bg-rose-50',
        badgeColor: 'bg-rose-100 text-rose-700',
        icon: XCircle
    }
};