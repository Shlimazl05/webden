// import { CustomerInfo } from "./CustomerInfo";
// import { OrderPackageDetails } from "./OrderPackageDetails";
// import { OrderStatusActions } from "./OrderStatusActions";

// export default function AdminOrderDetailPage({ order, onUpdateStatus }: any) {
//     return (
//         <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
//             {/* Header quay lại */}
//             <div className="mb-6 flex items-center gap-3">
//                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">
//                     CHI TIẾT ĐƠN <span className="text-[var(--color-primary)]">#{order.orderCode}</span>
//                 </h2>
//                 <span className="text-[var(--color-text-muted)] text-sm ml-2">
//                     Ngày đặt: {new Date(order.createdAt).toLocaleString()}
//                 </span>
//             </div>

//             <div className="grid grid-cols-12 gap-6">
//                 {/* CỘT TRÁI (8 CỘT): Kiện hàng */}
//                 <div className="col-span-12 lg:col-span-8 space-y-6">
//                     <OrderPackageDetails order={order} />
//                 </div>

//                 {/* CỘT PHẢI (4 CỘT): Trạng thái & Khách hàng */}
//                 <div className="col-span-12 lg:col-span-4 space-y-6">
//                     <OrderStatusActions order={order} onUpdateStatus={onUpdateStatus} />
//                     <CustomerInfo order={order} />
//                 </div>
//             </div>
//         </div>
//     );
// }

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
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header trang chi tiết */}
            <div className="p-8 border-b border-slate-50 flex items-center gap-6 bg-white">
                <button
                    onClick={onBack}
                    className="group w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-900 transition-all shadow-sm"
                >
                    <ArrowLeft size={20} className="text-slate-600 group-hover:text-white transition-colors" />
                </button>

                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                            Đơn hàng <span className="text-[var(--color-primary)]">#{order.orderCode}</span>
                        </h2>
                    </div>
                    <p className="ui-label normal-case text-slate-400 mt-0.5">
                        Ngày tạo: {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </p>
                </div>
            </div>

            {/* Nội dung chia 2 cột */}
            <div className="p-8 bg-[#fcfcfc] flex-1">
                <div className="grid grid-cols-12 gap-8">
                    {/* Cột trái (8/12): Kiện hàng */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <OrderPackageDetails order={order} />
                    </div>

                    {/* Cột phải (4/12): Actions & Khách hàng */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <OrderStatusActions order={order} onUpdateStatus={onUpdateStatus} />
                        <CustomerInfo order={order} />
                    </div>
                </div>
            </div>
        </div>
    );
};