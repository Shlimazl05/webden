
// "use client";
// import React, { useState } from 'react';
// import { Loader2 } from 'lucide-react';
// import { AdminPageHeader } from '@/components/layout/AdminPageContainer';
// import { OrderTabs } from '@/features/orders/components/OrderTabs';
// import { Pagination } from '@/components/ui/Pagination';
// import { EmptyOrderState } from '@/features/orders/components/EmptyOrderState';
// import { ClientOrderCard } from '@/features/orders/components/client/ClientOrderCard';
// import { useCustomerOrders } from '@/features/orders/hooks/useCustomerOrders';
// import { orderClientApi } from '@/features/orders/api/order.client.api';
// import { toast } from 'react-hot-toast';

// export default function OrdersPage() {
//     const [activeTab, setActiveTab] = useState('all');
//     const [currentPage, setCurrentPage] = useState(1);

//     // GỌI DỮ LIỆU THẬT
//     const { orders, loading, totalPages, refresh } = useCustomerOrders(currentPage, activeTab);

//     const handleCancelOrder = async (id: string) => {
//         if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;
//         try {
//             const res = await orderClientApi.cancelMyOrder(id);
//             if (res.success) {
//                 toast.success("Hủy đơn hàng thành công");
//                 refresh();
//             }
//         } catch (error: any) {
//             toast.error(error.response?.data?.message || "Lỗi khi hủy đơn");
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div className="mb-2">
//                 <AdminPageHeader title="Đơn hàng của tôi" />
//             </div>

//             <OrderTabs activeTab={activeTab} onTabChange={(tab) => {
//                 setActiveTab(tab);
//                 setCurrentPage(1);
//             }} />

//             <div className="min-h-[400px]">
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <Loader2 className="animate-spin text-indigo-600 mb-2" />
//                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Đang tải...</span>
//                     </div>
//                 ) : orders && orders.length > 0 ? (
//                     // Hiển thị danh sách orders từ Hook
//                     orders.map((order: any) => (
//                         <ClientOrderCard key={order._id} order={order} onCancel={handleCancelOrder} />
//                     ))
//                 ) : (
//                     <EmptyOrderState />
//                 )}
//             </div>

//             {!loading && totalPages > 1 && (
//                 <div className="pt-6 border-t border-slate-50">
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={setCurrentPage}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";
import React from 'react';
import { Loader2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/layout/AdminPageContainer';
import { OrderTabs } from '@/features/orders/components/OrderTabs';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyOrderState } from '@/features/orders/components/EmptyOrderState';
import { ClientOrderCard } from '@/features/orders/components/client/ClientOrderCard';
import { PaymentModal } from '@/features/checkout/components/PaymentModal'; // Import Modal thanh toán
import { useCustomerOrders } from '@/features/orders/hooks/useCustomerOrders';

export default function OrdersPage() {
    // TẤT CẢ LOGIC ĐÃ NẰM TRONG HOOK NÀY
    const {
        orders,
        loading,
        totalPages,
        currentPage,
        activeTab,
        paymentInfo,
        setPage,
        setTab,
        handleCancelOrder,
        handleOpenPayment,
        closePayment
    } = useCustomerOrders();

    return (
        <div className="space-y-6">
            <div className="mb-2">
                <AdminPageHeader title="Đơn hàng của tôi" />
            </div>

            {/* BỘ LỌC TRẠNG THÁI */}
            <OrderTabs activeTab={activeTab} onTabChange={setTab} />

            <div className="min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-indigo-500">
                        <Loader2 className="animate-spin mb-2" />
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Đang tải...</span>
                    </div>
                ) : orders && orders.length > 0 ? (
                    orders.map((order: any) => (
                        <ClientOrderCard
                            key={order._id}
                            order={order}
                            onCancel={handleCancelOrder}
                            onPay={handleOpenPayment} // Thêm hàm xử lý thanh toán lại
                        />
                    ))
                ) : (
                    <EmptyOrderState />
                )}
            </div>

            {/* PHÂN TRANG */}
            {!loading && totalPages > 1 && (
                <div className="pt-6 border-t border-slate-50">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}

            {/* CỬA SỔ THANH TOÁN (Hiện lên khi bấm nút THANH TOÁN ở Card) */}
            {paymentInfo && (
                <PaymentModal
                    qrUrl={paymentInfo.qrUrl}
                    orderCode={paymentInfo.orderCode}
                    onClose={closePayment}
                />
            )}
        </div>
    );
}