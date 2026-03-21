// import React from 'react';
// import { IOrder, OrderStatus } from '../../order.types';
// import { ArrowLeft } from 'lucide-react';
// import { OrderStatusActions } from './OrderStatusActions';
// import { CustomerInfo } from './CustomerInfo';
// import { OrderPackageDetails } from './OrderPackageDetails';

// interface Props {
//     order: IOrder;
//     onBack: () => void;
//     onUpdateStatus: (id: string, status: OrderStatus) => void;
// }

// export const AdminOrderDetailView: React.FC<Props> = ({ order, onBack, onUpdateStatus }) => {
//     const completedEntry = order.statusHistory?.find(h => h.status === 'Completed');
//     const completionTime = completedEntry
//         ? new Date(completedEntry.updatedAt).toLocaleString('vi-VN')
//         : null;

//     return (
//         <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">

//             {/* 1. Header cố định */}
//             <div className="p-8 pb-4 flex items-center gap-6 sticky top-0 bg-white z-10 border-b border-slate-50">
//                 <button onClick={onBack} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-700 group transition-all">
//                     <ArrowLeft size={18} className="text-slate-500 group-hover:text-white" />
//                 </button>
//                 <div className="flex flex-col">
//                     <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none mb-2">
//                         Đơn hàng <span className="text-indigo-600">#{order.orderCode}</span>
//                     </h2>

//                     {/* Dòng 1: Thời gian đặt hàng */}
//                     <p className="text-[12px] text-slate-400 font-medium">
//                         Đặt lúc: {new Date(order.createdAt).toLocaleString('vi-VN')}
//                     </p>

//                     {/* Dòng 2: THÊM TẠI ĐÂY - Thời gian hoàn tất */}
//                     {order.status === 'Completed' && completionTime && (
//                         <p className="text-[12px] text-emerald-600 font-bold mt-1 flex items-center gap-1.5">
//                             <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
//                             Hoàn tất: {completionTime}
//                         </p>
//                     )}

//                     {/* Nếu đơn bị hủy, bạn cũng có thể hiện thời gian hủy tương tự */}
//                     {order.status === 'Cancelled' && (
//                         <p className="text-[12px] text-rose-500 font-bold mt-1 flex items-center gap-1.5">
//                             <div className="w-1 h-1 rounded-full bg-rose-500"></div>
//                             Đã hủy đơn
//                         </p>
//                     )}
//                 </div>
//             </div>

//             {/* 2. Nội dung chính - Xếp chồng dọc */}
//             <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#fcfcfc]">
//                 <div className="max-w-4xl mx-auto space-y-6 pb-10">

//                     {/* PHẦN 1: TRẠNG THÁI (Lên đầu để xử lý ngay) */}
//                     <OrderStatusActions order={order} onUpdateStatus={onUpdateStatus} />

//                     {/* PHẦN 2: THÔNG TIN KHÁCH HÀNG */}
//                     <CustomerInfo order={order} />

//                     {/* PHẦN 3: KIỆN HÀNG & TỔNG TIỀN */}
//                     <OrderPackageDetails order={order} />

//                 </div>
//             </div>
//         </div>
//     );
// };


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
    // 1. Tìm mốc thời gian hoàn tất trong lịch sử
    const completedEntry = order.statusHistory?.find(h => h.status === 'Completed');
    const completionTime = completedEntry
        ? new Date(completedEntry.updatedAt).toLocaleString('vi-VN')
        : null;

    // 2. Tìm mốc thời gian hủy trong lịch sử (nếu có)
    const cancelledEntry = order.statusHistory?.find(h => h.status === 'Cancelled');
    const cancelledTime = cancelledEntry
        ? new Date(cancelledEntry.updatedAt).toLocaleString('vi-VN')
        : null;

    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">

            {/* 1. Header cố định */}
            <div className="p-8 pb-6 border-b border-slate-50 flex items-center gap-6 sticky top-0 bg-white z-20">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-700 group transition-all cursor-pointer"
                >
                    <ArrowLeft size={18} className="text-slate-500 group-hover:text-white" />
                </button>

                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none mb-2">
                        Đơn hàng <span className="text-indigo-600">#{order.orderCode}</span>
                    </h2>

                    {/* Thời gian đặt hàng */}
                    <p className="text-[12px] text-slate-500 font-medium">
                        Đặt lúc: {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </p>

                    {/* SỬA LỖI HYDRATION: Đổi thẻ p thành thẻ div */}
                    {order.status === 'Completed' && completionTime && (
                        <div className="text-[12px] text-emerald-600 font-bold mt-1 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            Hoàn tất: {completionTime}
                        </div>
                    )}

                    {/* Hiển thị thời gian hủy nếu đơn bị hủy */}
                    {order.status === 'Cancelled' && (
                        <div className="text-[12px] text-rose-500 font-bold mt-1 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                            Đã hủy đơn {cancelledTime ? `vào ${cancelledTime}` : ''}
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Nội dung chính - Xếp chồng dọc */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#fcfcfc]">
                <div className="max-w-4xl mx-auto space-y-6 pb-10">

                    {/* PHẦN 1: TRẠNG THÁI */}
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