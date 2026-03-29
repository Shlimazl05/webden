
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/features/cart/hooks/cart';
import { useCheckout } from '@/features/checkout/checkout.hooks';
import { DeliveryInfoForm } from '@/features/checkout/components/DeliveryInfoForm';
import { OrderNoteForm } from '@/features/checkout/components/OrderNoteForm';
import { PaymentMethodForm } from '@/features/checkout/components/PaymentMethodForm';
import { PaymentModal } from '@/features/checkout/components/PaymentModal';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, refreshCart } = useCart();
    const [paymentInfo, setPaymentInfo] = useState<{ qrUrl: string, orderCode: string } | null>(null);

    const { formData, isSubmitting, updateField, submitOrder, calculatedTotal } = useCheckout(items, refreshCart);

    const handleFormSubmit = async (e: React.FormEvent) => {
        const result = await submitOrder(e);
        if (result?.showQR) {
            setPaymentInfo({
                qrUrl: result.qrUrl,
                orderCode: result.orderCode
            });
        }
    };

    const buttonText = formData.paymentMethod === 'SePay'
        ? "Tiến hành thanh toán"
        : "Xác nhận đặt hàng";

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 min-h-screen relative font-['Be_Vietnam_Pro']">
            {/* Header - Thanh thoát */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                    <ShoppingBag className="text-white" size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">Thông tin đặt hàng</h1>
                    <p className="text-[12px] text-slate-400 font-medium">Vui lòng kiểm tra kỹ thông tin và thanh toán</p>
                </div>
            </div>

            
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                
                <div className="lg:col-span-7">
                    <div className="h-full bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex flex-col">
                        <div className="flex-1">
                            <DeliveryInfoForm
                                recipientName={formData.recipientName}
                                phone={formData.phone}
                                address={formData.address}
                                onChange={updateField}
                            />
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-50">
                            <OrderNoteForm
                                note={formData.note}
                                onChange={(value) => updateField("note", value)}
                            />
                        </div>
                    </div>
                </div>

                
                <div className="lg:col-span-5 flex flex-col gap-4">

                    
                    <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
                        <PaymentMethodForm
                            value={formData.paymentMethod}
                            onChange={(value) => updateField("paymentMethod", value)}
                        />
                    </div>

                    
                    <div className="bg-indigo-950 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden flex-1 flex flex-col justify-center">
                       
                        <div className="absolute -right-2 -top-2 w-20 h-20 bg-indigo-800 rounded-full blur-3xl opacity-40"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[12px] font-medium text-indigo-300">Tổng thanh toán</span>
                                <span className="bg-indigo-800 text-indigo-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                                    {items.filter(i => i.selected).length} sản phẩm
                                </span>
                            </div>

                            <div className="flex items-baseline gap-1 mb-6">
                                
                                <span className="text-3xl font-bold tracking-tighter">
                                    {calculatedTotal.toLocaleString()}
                                </span>
                                <span className="text-base font-bold opacity-60">đ</span>
                            </div>

                            
                            <button
                                type="submit"
                                disabled={isSubmitting || items.length === 0}
                                className={`w-full py-3.5 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 ${(isSubmitting || items.length === 0)
                                    ? 'bg-indigo-900/50 text-indigo-700 cursor-not-allowed'
                                    : 'bg-white text-indigo-950 hover:bg-indigo-50 active:scale-[0.98]'
                                    }`}
                            >
                                {isSubmitting ? "Đang xử lý..." : buttonText}
                                {!isSubmitting && <ArrowRight size={16} />}
                            </button>

                            <p className="text-[10px] text-indigo-400 mt-4 text-center font-medium opacity-80">
                                {formData.paymentMethod === 'SePay'
                                    ? "Xác nhận để nhận mã QR"
                                    : "Thanh toán khi nhận hàng"}
                            </p>
                        </div>
                    </div>
                </div>
            </form>

            {paymentInfo && (
                <PaymentModal
                    qrUrl={paymentInfo.qrUrl}
                    orderCode={paymentInfo.orderCode}
                    onClose={() => router.push('/orders')}
                />
            )}
        </div>
    );
}