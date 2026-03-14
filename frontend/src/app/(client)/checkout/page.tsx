// "use client";
// import React from 'react';
// import { useCheckout } from '@/features/checkout/checkout.hooks';
// import { DeliveryInfoForm } from '@/features/checkout/components/DeliveryInfoForm';
// import { OrderNoteForm } from '@/features/checkout/components/OrderNoteForm';
// import { PaymentMethodForm } from '@/features/checkout/components/PaymentMethodForm';

// export default function CheckoutPage() {
//     // Gọi hook duy nhất để lấy toàn bộ dữ liệu & hàm xử lý
//     const { items, totals, refreshCart } = useCart();

//     const { formData, isSubmitting, updateField, submitOrder } = useCheckout(items, refreshCart);
//     const buttonText = formData.paymentMethod === 'SePay'
//         ? "TIẾN HÀNH THANH TOÁN"
//         : "ĐẶT HÀNG";

//     return (
//         <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
//             <h1 className="text-2xl font-black text-indigo-900 mb-8 tracking-tighter uppercase">
//                 Thông tin đặt hàng
//             </h1>

//             <form
//                 onSubmit={submitOrder}
//                 className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm"
//             >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

//                     {/* CỘT TRÁI */}
//                     <div>
//                         <DeliveryInfoForm
//                             recipientName={formData.recipientName}
//                             phone={formData.phone}
//                             address={formData.address}
//                             onChange={updateField}
//                             />
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
//                     </div>

//                 </div>

//                 {/* Nút Xác nhận */}
//                 <div className="mt-12 flex justify-end pt-8 border-t border-slate-100">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className={`px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg tracking-widest uppercase flex items-center justify-center min-w-[240px] ${isSubmitting
//                                 ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
//                                 : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
//                             }`}
//                     >
//                         {isSubmitting ? "ĐANG XỬ LÝ..." : buttonText}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }


// "use client";
// import React from 'react';
// import { useCart } from '@/features/cart/hooks/cart'; // THÊM IMPORT NÀY
// import { useCheckout } from '@/features/checkout/checkout.hooks';
// import { DeliveryInfoForm } from '@/features/checkout/components/DeliveryInfoForm';
// import { OrderNoteForm } from '@/features/checkout/components/OrderNoteForm';
// import { PaymentMethodForm } from '@/features/checkout/components/PaymentMethodForm';

// export default function CheckoutPage() {
//     // 1. Gọi useCart tại đây để lấy nguồn dữ liệu thực tế từ giỏ hàng
//     const { items, totals, refreshCart } = useCart();

//     // 2. Truyền items và refreshCart vào useCheckout để đồng bộ trạng thái "selected"
//     const { formData, isSubmitting, updateField, submitOrder, calculatedTotal } = useCheckout(items, refreshCart);

//     const buttonText = formData.paymentMethod === 'SePay'
//         ? "TIẾN HÀNH THANH TOÁN"
//         : "ĐẶT HÀNG";

//     return (
//         <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
//             <h1 className="text-2xl font-black text-indigo-900 mb-8 tracking-tighter uppercase">
//                 Thông tin đặt hàng
//             </h1>

//             <form
//                 onSubmit={submitOrder}
//                 className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm"
//             >
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

//                         {/* Hiển thị tóm tắt tổng tiền để khách biết họ đang trả cho những gì đã tích */}
//                         <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tổng thanh toán</span>
//                                 <span className="text-xl font-black text-indigo-600">
//                                     {calculatedTotal.toLocaleString()}đ
//                                 </span>
//                             </div>
//                             <p className="text-[10px] text-slate-400 mt-2 italic">
//                                 * Thanh toán cho {items.filter(i => i.selected).length} sản phẩm đã chọn
//                             </p>
//                         </div>
//                     </div>

//                 </div>

//                 {/* Nút Xác nhận */}
//                 <div className="mt-12 flex justify-end pt-8 border-t border-slate-100">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className={`px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg tracking-widest uppercase flex items-center justify-center min-w-[240px] ${isSubmitting
//                             ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
//                             : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
//                             }`}
//                     >
//                         {isSubmitting ? "ĐANG XỬ LÝ..." : buttonText}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }


"use client";
import React from 'react';
import { useCart } from '@/features/cart/hooks/cart';
import { useCheckout } from '@/features/checkout/checkout.hooks';
import { DeliveryInfoForm } from '@/features/checkout/components/DeliveryInfoForm';
import { OrderNoteForm } from '@/features/checkout/components/OrderNoteForm';
import { PaymentMethodForm } from '@/features/checkout/components/PaymentMethodForm';

export default function CheckoutPage() {
    const { items, refreshCart } = useCart();

    // 1. Nhớ thêm 'calculatedTotal' vào đây để lấy từ hook ra dùng
    const { formData, isSubmitting, updateField, submitOrder, calculatedTotal } = useCheckout(items, refreshCart);

    const buttonText = formData.paymentMethod === 'SePay'
        ? "TIẾN HÀNH THANH TOÁN"
        : "ĐẶT HÀNG";

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
            <h1 className="text-2xl font-black text-indigo-900 mb-8 tracking-tighter uppercase">
                Thông tin đặt hàng
            </h1>

            <form onSubmit={submitOrder} className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm">
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

                        {/* --- ĐẶT Ở ĐÂY: KHUNG TỔNG TIỀN THANH TOÁN --- */}
                        <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100/50">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">
                                        Tổng thanh toán
                                    </p>
                                    {/* Dòng bạn hỏi đặt ở đây */}
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
                        disabled={isSubmitting}
                        className={`px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg tracking-widest uppercase flex items-center justify-center min-w-[240px] ${isSubmitting
                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                            }`}
                    >
                        {isSubmitting ? "ĐANG XỬ LÝ..." : buttonText}
                    </button>
                </div>
            </form>
        </div>
    );
}