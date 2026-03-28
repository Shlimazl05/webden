



// "use client";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/features/cart/hooks/cart';
// import { useCheckout } from '@/features/checkout/checkout.hooks';
// import { DeliveryInfoForm } from '@/features/checkout/components/DeliveryInfoForm';
// import { OrderNoteForm } from '@/features/checkout/components/OrderNoteForm';
// import { PaymentMethodForm } from '@/features/checkout/components/PaymentMethodForm';
// // Import Component cửa sổ thanh toán
// import { PaymentModal } from '@/features/checkout/components/PaymentModal';

// export default function CheckoutPage() {
//     const router = useRouter();
//     const { items, refreshCart } = useCart();

//     // State để lưu thông tin thanh toán khi Backend trả về
//     const [paymentInfo, setPaymentInfo] = useState<{ qrUrl: string, orderCode: string } | null>(null);

//     const { formData, isSubmitting, updateField, submitOrder, calculatedTotal } = useCheckout(items, refreshCart);

//     // Hàm xử lý khi bấm nút đặt hàng
//     const handleFormSubmit = async (e: React.FormEvent) => {
//         // Gọi hàm submit từ hook
//         const result = await submitOrder(e);

//         // Nếu là thanh toán online và có dữ liệu trả về, ta hiện Modal
//         if (result?.showQR) {
//             setPaymentInfo({
//                 qrUrl: result.qrUrl,
//                 orderCode: result.orderCode
//             });
//         }
//     };

//     const buttonText = formData.paymentMethod === 'SePay'
//         ? "TIẾN HÀNH THANH TOÁN"
//         : "ĐẶT HÀNG";

//     return (
//         <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen relative">
//             <h1 className="text-2xl font-black text-indigo-900 mb-8 tracking-tighter uppercase">
//                 Thông tin đặt hàng
//             </h1>

//             {/* Đổi onSubmit thành handleFormSubmit */}
//             <form onSubmit={handleFormSubmit} className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                     {/* CỘT TRÁI */}
//                     <div>
//                         <DeliveryInfoForm
//                             recipientName={formData.recipientName}
//                             phone={formData.phone}
//                             address={formData.address}
//                             onChange={updateField}
//                         />
//                     </div>

//                     {/* CỘT PHẢI */}
//                     <div className="space-y-12">
//                         <OrderNoteForm
//                             note={formData.note}
//                             onChange={(value) => updateField("note", value)}
//                         />

//                         <PaymentMethodForm
//                             value={formData.paymentMethod}
//                             onChange={(value) => updateField("paymentMethod", value)}
//                         />

//                         {/* KHUNG TỔNG TIỀN THANH TOÁN */}
//                         <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100/50">
//                             <div className="flex justify-between items-end">
//                                 <div>
//                                     <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">
//                                         Tổng thanh toán
//                                     </p>
//                                     <span className="text-3xl font-black text-indigo-600">
//                                         {calculatedTotal.toLocaleString()}đ
//                                     </span>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-[10px] font-bold text-slate-400 italic">
//                                         Đã chọn {items.filter(i => i.selected).length} sản phẩm
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Nút Xác nhận */}
//                 <div className="mt-12 flex justify-end pt-8 border-t border-slate-100">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting || items.length === 0}
//                         className={`px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg tracking-widest uppercase flex items-center justify-center min-w-[240px] ${(isSubmitting || items.length === 0)
//                             ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
//                             : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
//                             }`}
//                     >
//                         {isSubmitting ? "ĐANG XỬ LÝ..." : buttonText}
//                     </button>
//                 </div>
//             </form>

//             {/* HIỂN THỊ CỬA SỔ THANH TOÁN KHI CÓ DỮ LIỆU */}
//             {paymentInfo && (
//                 <PaymentModal
//                     qrUrl={paymentInfo.qrUrl}
//                     orderCode={paymentInfo.orderCode}
//                     // Khi khách đóng cửa sổ mà chưa trả tiền, ta đưa họ về trang thành công/đơn hàng
//                     onClose={() => router.push('/orders')}
//                 />
//             )}
//         </div>
//     );
// }

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

            {/* Grid Container: items-stretch để chiều cao 2 cột bằng nhau */}
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                {/* CỘT TRÁI (7/12): KHUNG CHUẨN CHIỀU CAO */}
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

                {/* CỘT PHẢI (5/12): ĐÃ GIẢM KÍCH THƯỚC NHƯNG VẪN CAO BẰNG CỘT TRÁI */}
                <div className="lg:col-span-5 flex flex-col gap-4">

                    {/* 1. Khung thanh toán: Giảm padding từ p-8 xuống p-6 */}
                    <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
                        <PaymentMethodForm
                            value={formData.paymentMethod}
                            onChange={(value) => updateField("paymentMethod", value)}
                        />
                    </div>

                    {/* 2. Khung tổng tiền: Giảm padding, thu nhỏ font chữ số tiền */}
                    <div className="bg-indigo-950 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden flex-1 flex flex-col justify-center">
                        {/* Trang trí nền nhỏ lại */}
                        <div className="absolute -right-2 -top-2 w-20 h-20 bg-indigo-800 rounded-full blur-3xl opacity-40"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[12px] font-medium text-indigo-300">Tổng thanh toán</span>
                                <span className="bg-indigo-800 text-indigo-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                                    {items.filter(i => i.selected).length} sản phẩm
                                </span>
                            </div>

                            <div className="flex items-baseline gap-1 mb-6">
                                {/* Giảm font giá tiền từ 4xl xuống 3xl */}
                                <span className="text-3xl font-bold tracking-tighter">
                                    {calculatedTotal.toLocaleString()}
                                </span>
                                <span className="text-base font-bold opacity-60">đ</span>
                            </div>

                            {/* Nút bấm gọn hơn */}
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