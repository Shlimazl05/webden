



"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/features/cart/hooks/cart';
import { useCheckout } from '@/features/checkout/checkout.hooks';
import { DeliveryInfoForm } from '@/features/checkout/components/DeliveryInfoForm';
import { OrderNoteForm } from '@/features/checkout/components/OrderNoteForm';
import { PaymentMethodForm } from '@/features/checkout/components/PaymentMethodForm';
// Import Component cửa sổ thanh toán
import { PaymentModal } from '@/features/checkout/components/PaymentModal';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, refreshCart } = useCart();

    // State để lưu thông tin thanh toán khi Backend trả về
    const [paymentInfo, setPaymentInfo] = useState<{ qrUrl: string, orderCode: string } | null>(null);

    const { formData, isSubmitting, updateField, submitOrder, calculatedTotal } = useCheckout(items, refreshCart);

    // Hàm xử lý khi bấm nút đặt hàng
    const handleFormSubmit = async (e: React.FormEvent) => {
        // Gọi hàm submit từ hook
        const result = await submitOrder(e);

        // Nếu là thanh toán online và có dữ liệu trả về, ta hiện Modal
        if (result?.showQR) {
            setPaymentInfo({
                qrUrl: result.qrUrl,
                orderCode: result.orderCode
            });
        }
    };

    const buttonText = formData.paymentMethod === 'SePay'
        ? "TIẾN HÀNH THANH TOÁN"
        : "ĐẶT HÀNG";

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen relative">
            <h1 className="text-2xl font-black text-indigo-900 mb-8 tracking-tighter uppercase">
                Thông tin đặt hàng
            </h1>

            {/* Đổi onSubmit thành handleFormSubmit */}
            <form onSubmit={handleFormSubmit} className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* CỘT TRÁI */}
                    <div>
                        <DeliveryInfoForm
                            recipientName={formData.recipientName}
                            phone={formData.phone}
                            address={formData.address}
                            onChange={updateField}
                        />
                    </div>

                    {/* CỘT PHẢI */}
                    <div className="space-y-12">
                        <OrderNoteForm
                            note={formData.note}
                            onChange={(value) => updateField("note", value)}
                        />

                        <PaymentMethodForm
                            value={formData.paymentMethod}
                            onChange={(value) => updateField("paymentMethod", value)}
                        />

                        {/* KHUNG TỔNG TIỀN THANH TOÁN */}
                        <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100/50">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">
                                        Tổng thanh toán
                                    </p>
                                    <span className="text-3xl font-black text-indigo-600">
                                        {calculatedTotal.toLocaleString()}đ
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 italic">
                                        Đã chọn {items.filter(i => i.selected).length} sản phẩm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nút Xác nhận */}
                <div className="mt-12 flex justify-end pt-8 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={isSubmitting || items.length === 0}
                        className={`px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg tracking-widest uppercase flex items-center justify-center min-w-[240px] ${(isSubmitting || items.length === 0)
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                            }`}
                    >
                        {isSubmitting ? "ĐANG XỬ LÝ..." : buttonText}
                    </button>
                </div>
            </form>

            {/* HIỂN THỊ CỬA SỔ THANH TOÁN KHI CÓ DỮ LIỆU */}
            {paymentInfo && (
                <PaymentModal
                    qrUrl={paymentInfo.qrUrl}
                    orderCode={paymentInfo.orderCode}
                    // Khi khách đóng cửa sổ mà chưa trả tiền, ta đưa họ về trang thành công/đơn hàng
                    onClose={() => router.push('/orders')}
                />
            )}
        </div>
    );
}