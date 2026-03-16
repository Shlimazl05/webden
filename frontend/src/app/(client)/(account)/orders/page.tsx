

// "use client";
// import React from 'react';
// import { Loader2 } from 'lucide-react';
// import { AdminPageHeader } from '@/components/layout/AdminPageContainer';
// import { OrderTabs } from '@/features/orders/components/OrderTabs';
// import { Pagination } from '@/components/ui/Pagination';
// import { EmptyOrderState } from '@/features/orders/components/EmptyOrderState';
// import { ClientOrderCard } from '@/features/orders/components/client/ClientOrderCard';
// import { PaymentModal } from '@/features/checkout/components/PaymentModal'; // Import Modal thanh toán
// import { useCustomerOrders } from '@/features/orders/hooks/useCustomerOrders';

// export default function OrdersPage() {
//     // TẤT CẢ LOGIC ĐÃ NẰM TRONG HOOK NÀY
//     const {
//         orders,
//         loading,
//         totalPages,
//         currentPage,
//         activeTab,
//         paymentInfo,
//         setPage,
//         setTab,
//         handleCancelOrder,
//         handleOpenPayment,
//         closePayment
//     } = useCustomerOrders();

//     return (
//         <div className="space-y-6">
//             <div className="mb-2">
//                 <AdminPageHeader title="Đơn hàng của tôi" />
//             </div>

//             {/* BỘ LỌC TRẠNG THÁI */}
//             <OrderTabs activeTab={activeTab} onTabChange={setTab} />

//             <div className="min-h-[400px]">
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20 text-indigo-500">
//                         <Loader2 className="animate-spin mb-2" />
//                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Đang tải...</span>
//                     </div>
//                 ) : orders && orders.length > 0 ? (
//                     orders.map((order: any) => (
//                         <ClientOrderCard
//                             key={order._id}
//                             order={order}
//                             onCancel={handleCancelOrder}
//                             onPay={handleOpenPayment} // Thêm hàm xử lý thanh toán lại
//                         />
//                     ))
//                 ) : (
//                     <EmptyOrderState />
//                 )}
//             </div>

//             {/* PHÂN TRANG */}
//             {!loading && totalPages > 1 && (
//                 <div className="pt-6 border-t border-slate-50">
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={setPage}
//                     />
//                 </div>
//             )}

//             {/* CỬA SỔ THANH TOÁN (Hiện lên khi bấm nút THANH TOÁN ở Card) */}
//             {paymentInfo && (
//                 <PaymentModal
//                     qrUrl={paymentInfo.qrUrl}
//                     orderCode={paymentInfo.orderCode}
//                     onClose={closePayment}
//                 />
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
import { PaymentModal } from '@/features/checkout/components/PaymentModal';
import { ConfirmModal } from '@/components/ui/ConfirmModal'; // Import Modal mới của bạn
import { useCustomerOrders } from '@/features/orders/hooks/useCustomerOrders';

export default function OrdersPage() {
    const {
        orders, loading, totalPages, currentPage, activeTab,
        paymentInfo, cancelModal, // Các state từ Hook
        setPage, setTab, handleOpenPayment, closePayment,
        openCancelModal, closeCancelModal, handleConfirmCancel // Các hàm xử lý modal
    } = useCustomerOrders();

    return (
        <div className="space-y-6">
            <AdminPageHeader title="Đơn hàng của tôi" />

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
                            onCancel={openCancelModal} // Truyền hàm mở modal vào đây
                            onPay={handleOpenPayment}
                        />
                    ))
                ) : (
                    <EmptyOrderState />
                )}
            </div>

            {!loading && totalPages > 1 && (
                <div className="pt-6 border-t border-slate-50">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
                </div>
            )}

            {/* 1. MODAL THANH TOÁN LẠI */}
            {paymentInfo && (
                <PaymentModal
                    qrUrl={paymentInfo.qrUrl}
                    orderCode={paymentInfo.orderCode}
                    onClose={closePayment}
                />
            )}

            {/* 2. MODAL XÁC NHẬN HỦY ĐƠN (Giao diện mới của ní) */}
            <ConfirmModal
                isOpen={cancelModal.isOpen}
                onClose={closeCancelModal}
                onConfirm={handleConfirmCancel}
                title="Xác nhận hủy đơn"
                message="Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác."
            />
        </div>
    );
}