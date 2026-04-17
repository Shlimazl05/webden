


"use client";
import React from 'react';
import { Loader2, ShoppingBag, AlertCircle } from 'lucide-react';
import { OrderTabs } from '@/features/orders/components/OrderTabs';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyOrderState } from '@/features/orders/components/EmptyOrderState';
import { ClientOrderCard } from '@/features/orders/components/client/ClientOrderCard';
import { PaymentModal } from '@/features/checkout/components/PaymentModal';
import { useCustomerOrders } from '@/features/orders/hooks/useCustomerOrders';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
    const router = useRouter();

    // Lấy toàn bộ logic từ hook bạn đã viết
    const {
        orders,
        loading,
        totalPages,
        currentPage,
        activeTab,
        paymentInfo,
        cancelModal,         // State quản lý đóng/mở modal hủy
        setPage,
        setTab,
        handleOpenPayment,
        closePayment,
        openCancelModal,     // Hàm mở modal (truyền xuống Card)
        closeCancelModal,    // Hàm đóng modal
        handleConfirmCancel  // Hàm gọi API hủy đơn
    } = useCustomerOrders();

    return (
        <div className="w-full bg-white">
            <div className="space-y-8">

                {/* Header Tiêu đề */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 shadow-sm flex items-center justify-center text-indigo-600">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Đơn hàng của tôi</h1>
                        <p className="text-sm text-slate-400 font-medium">Quản lý và theo dõi hành trình đơn hàng</p>
                    </div>
                </div>

                {/* BỘ LỌC TRẠNG THÁI */}
                <div className="bg-white sticky top-0 z-10">
                    <OrderTabs activeTab={activeTab} onTabChange={setTab} />
                </div>

                {/* DANH SÁCH CARD */}
                <div className="h-auto space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 text-indigo-500">
                            <Loader2 className="animate-spin mb-4 w-10 h-10 stroke-[3]" />
                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Đang tải dữ liệu...</span>
                        </div>
                    ) : orders && orders.length > 0 ? (
                        orders.map((order: any) => (
                            <ClientOrderCard
                                key={order._id}
                                order={order}
                                onClick={(o) => router.push(`/orders/${o._id}`)}
                                onPay={handleOpenPayment}
                                onCancel={openCancelModal} // Truyền hàm openCancelModal từ hook vào card
                            />
                        ))
                    ) : (
                        // <div className="bg-white rounded-xl  p-20 border border-slate-100">
                        <EmptyOrderState />
                        // </div>
                    )}
                </div>

                {/* PHÂN TRANG */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center pt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </div>

            {/* MODAL THANH TOÁN (Logic cũ) */}
            {paymentInfo && (
                <PaymentModal
                    qrUrl={paymentInfo.qrUrl}
                    orderCode={paymentInfo.orderCode}
                    onClose={closePayment}
                />
            )}

            {/* MODAL XÁC NHẬN HỦY ĐƠN (Sử dụng đúng state cancelModal từ hook) */}
            {cancelModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <AlertCircle size={32} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Hủy đơn hàng</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">
                                Bạn có chắc chắn muốn hủy đơn hàng này không? <br />
                                Hành động này sẽ không thể khôi phục lại.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-50/50 flex gap-3 border-t border-slate-100">
                            <button
                                onClick={closeCancelModal} // Đóng modal (logic hook)
                                className="flex-1 py-4 rounded-2xl bg-white text-slate-500 text-[11px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-100 transition-colors"
                            >
                                Quay lại
                            </button>
                            <button
                                onClick={handleConfirmCancel} // Gọi hàm API hủy (logic hook)
                                className="flex-1 py-4 rounded-2xl bg-rose-500 text-white text-[11px] font-black uppercase tracking-widest hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all"
                            >
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}