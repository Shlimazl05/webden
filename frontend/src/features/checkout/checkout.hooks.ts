


// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
// import { createOrderApi } from '../checkout/checkout.api';
// import { ICheckoutForm } from '../checkout/checkout.types';
// import { useCart } from '@/features/cart/hooks/cart';

// export const useCheckout = () => {
//     const router = useRouter();
//     const { items, totals, refreshCart } = useCart();

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [formData, setFormData] = useState<ICheckoutForm>({
//         recipientName: '',
//         phone: '',
//         address: '',
//         note: '',
//         paymentMethod: 'COD'
//     });

//     const updateField = (field: keyof ICheckoutForm, value: string) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     };

//     const submitOrder = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Ngăn chặn bấm nút nhiều lần nếu đang trong quá trình xử lý
//         if (isSubmitting) return;

//         const selectedItems = items.filter(item => item.selected === true);
//         console.log("Danh sách sản phẩm được chọn để mua:", selectedItems);

//         if (selectedItems.length === 0) {
//             toast.error("Giỏ hàng của bạn đang trống hoặc chưa chọn sản phẩm nào!");
//             return;
//         }

//         const calculatedTotal = selectedItems.reduce((sum, item) => {
//             return sum + (item.unitPrice * item.quantity);
//         }, 0);

//         console.log("Tổng tiền tự tính toán lại:", calculatedTotal);

//         if (!formData.recipientName || !formData.phone || !formData.address) {
//             toast.error("Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ!");
//             return;
//         }

//         const phoneRegex = /^0[0-9]{9}$/;
//         if (!phoneRegex.test(formData.phone)) {
//             toast.error("Số điện thoại không hợp lệ!");
//             return;
//         }

//         try {
//             setIsSubmitting(true);

//             const payload = {
//                 recipientName: formData.recipientName,
//                 phone: formData.phone,
//                 address: formData.address,
//                 note: formData.note,
//                 paymentMethod: formData.paymentMethod,
//                 totalAmount: calculatedTotal,
//                 finalAmount: calculatedTotal, 
//                 items: selectedItems.map(item => ({
//                     cartDetailId: item._id,
//                     productId: item.productId?._id || item.productId,
//                     quantity: item.quantity,
//                     price: item.unitPrice
//                 }))
//             };
//             console.log("DỮ LIỆU GỬI ĐI:", payload);

//             const res = await createOrderApi(payload as any);

//             if (res.success) {
//                 // --- ĐIỂM SỬA 1: GỌI REFRESH GIỎ HÀNG TẠI ĐÂY ---
//                 // Gọi ngay sau khi thành công để UI xóa giỏ hàng trước khi chuyển trang/đi thanh toán
//                 await refreshCart();

//                 if (formData.paymentMethod === 'SePay' && res.data.checkoutUrl) {
//                     toast.success("Đang tạo mã thanh toán...");
//                     // Chuyển hướng ngay lập tức
//                     window.location.href = res.data.checkoutUrl;
//                 } else {
//                     toast.success("Đặt hàng thành công!");
//                     router.push('/order-success');
//                 }
//             }
//         } catch (error: any) {
//             const errorMsg = error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng";
//             toast.error(errorMsg);
//             console.error("Checkout Error:", error);
//             // Nếu lỗi thì cho phép bấm nút lại
//             setIsSubmitting(false);
//         } finally {
//             // Không set isSubmitting(false) nếu thành công để nút bấm vẫn bị khóa trong khi chuyển trang
//         }
//     };

//     return {
//         formData,
//         isSubmitting,
//         updateField,
//         submitOrder,
//         totals,
//         selectedItems: items.filter(i => i.selected)
//     };
// };
"use client";
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createOrderApi } from '../checkout/checkout.api';
import { ICheckoutForm } from '../checkout/checkout.types';
import { useCart } from '@/features/cart/hooks/cart';

export const useCheckout = (items: any[], refreshCart: () => void) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Lọc sản phẩm đã chọn (Dùng useMemo để tối ưu và tránh lỗi gạch đỏ)
    const selectedItems = useMemo(() => {
        return items.filter(item => item.selected === true);
    }, [items]);

    // 2. Tính tổng tiền CHỈ cho những món đã chọn
    const calculatedTotal = useMemo(() => {
        return selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    }, [selectedItems]);

    const [formData, setFormData] = useState<ICheckoutForm>({
        recipientName: '',
        phone: '',
        address: '',
        note: '',
        paymentMethod: 'COD'
    });

    const updateField = (field: keyof ICheckoutForm, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const submitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (selectedItems.length === 0) {
            toast.error("Vui lòng chọn sản phẩm trong giỏ hàng trước!");
            return;
        }

        if (!formData.recipientName || !formData.phone || !formData.address) {
            toast.error("Vui lòng nhập đầy đủ thông tin giao hàng!");
            return;
        }

        if (!/^0[0-9]{9}$/.test(formData.phone)) {
            toast.error("Số điện thoại không hợp lệ!");
            return;
        }

        try {
            setIsSubmitting(true);

            // BƯỚC QUAN TRỌNG: Đóng gói payload đúng
            const payload = {
                recipientName: formData.recipientName,
                phone: formData.phone,
                address: formData.address,
                note: formData.note,
                paymentMethod: formData.paymentMethod,

                // --- SỬA TẠI ĐÂY: PHẢI DÙNG calculatedTotal ---
                totalAmount: calculatedTotal,
                finalAmount: calculatedTotal,

                items: selectedItems.map(item => ({
                    cartDetailId: item._id,
                    // Lấy ID sản phẩm linh hoạt (để tránh lỗi đỏ TypeScript)
                    productId: item.productId?._id || item.product?._id || item.productId,
                    quantity: item.quantity,
                    price: item.unitPrice
                }))
            };

            console.log("DỮ LIỆU GỬI ĐI:", payload);

            const res = await createOrderApi(payload as any);

            if (res.success) {
                await refreshCart();
                if (formData.paymentMethod === 'SePay' && res.data.checkoutUrl) {
                    window.location.href = res.data.checkoutUrl;
                } else {
                    toast.success("Đặt hàng thành công!");
                    router.push('/order-success');
                }
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Có lỗi xảy ra");
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        updateField,
        submitOrder,
        selectedItems,
        calculatedTotal // Trả về để hiện thị ở UI cho đúng
    };
};
