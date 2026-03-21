"use client";
import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { useCustomerOrders } from '@/features/orders/hooks/useCustomerOrders';
import { CustomerOrderDetailView } from '@/features/orders/components/client/CustomerOrderDetailView';
import { PaymentModal } from '@/features/checkout/components/PaymentModal';

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.id as string;
    const { id } = useParams();
    const {
        order,
        loading,
        paymentInfo,
        cancelModal,
        fetchOrderDetail,
        handleOpenPayment,
        closePayment,
        openCancelModal,
        closeCancelModal,
        handleConfirmCancel
    } = useCustomerOrders();

    // Gọi API lấy chi tiết khi mount page
    useEffect(() => {
        if (orderId) {
            fetchOrderDetail(orderId);
        }
    }, [orderId, fetchOrderDetail]);

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                <Loader2 className="animate-spin text-indigo-600 w-10 h-10 mb-4 stroke-[3]" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Đang tải thông tin đơn hàng...</span>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                <p className="text-slate-500 font-bold">Không tìm thấy đơn hàng</p>
                <button onClick={() => router.back()} className="mt-4 text-indigo-600 font-bold uppercase text-xs">Quay lại</button>
            </div>
        );
    }

    return (
        <div className="h-screen bg-white">
            {/* View chi tiết bạn đã gửi */}
            <CustomerOrderDetailView
                order={order}
                onBack={() => router.push('/orders')} // Quay về danh sách
                onOpenPayment={handleOpenPayment}
                onOpenCancel={openCancelModal}
            />

            {/* Modal Thanh toán QR */}
            {paymentInfo && (
                <PaymentModal
                    qrUrl={paymentInfo.qrUrl}
                    orderCode={paymentInfo.orderCode}
                    onClose={closePayment}
                />
            )}

            {/* Modal Xác nhận hủy đơn (Dùng chung logic UI với trang List) */}
            {cancelModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <AlertCircle size={32} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Hủy đơn hàng</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">
                                Bạn có chắc chắn muốn hủy đơn hàng này không? <br />
                                Hành động này không thể hoàn tác.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-50 flex gap-3 border-t border-slate-100">
                            <button
                                onClick={closeCancelModal}
                                className="flex-1 py-4 rounded-2xl bg-white text-slate-500 text-[11px] font-black uppercase border border-slate-200"
                            >
                                Quay lại
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                className="flex-1 py-4 rounded-2xl bg-rose-500 text-white text-[11px] font-black uppercase shadow-lg shadow-rose-200"
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