
// "use client";
// import { useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
// import { createOrderApi } from '../checkout/checkout.api';
// import { ICheckoutForm } from '../checkout/checkout.types';
// import { authApi } from '@/features/customer/api/authApi'; 

// export const useCheckout = (items: any[], refreshCart: () => void) => {
//     const router = useRouter();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // 1. Lọc sản phẩm đã chọn
//     const selectedItems = useMemo(() => {
//         return items.filter(item => item.selected === true);
//     }, [items]);

//     // 2. Tính tổng tiền thực tế dựa trên các món đã tích chọn
//     const calculatedTotal = useMemo(() => {
//         return selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
//     }, [selectedItems]);

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

//         // Chống spam click
//         if (isSubmitting) return;

//         if (selectedItems.length === 0) {
//             toast.error("Vui lòng tích chọn sản phẩm muốn mua trong giỏ hàng!");
//             return;
//         }

//         if (!formData.recipientName || !formData.phone || !formData.address) {
//             toast.error("Vui lòng nhập đầy đủ thông tin giao hàng!");
//             return;
//         }

//         // Validate số điện thoại VN (10 số, bắt đầu bằng 0)
//         if (!/^0[0-9]{9}$/.test(formData.phone)) {
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
//                     cartDetailId: item._id, // Quan trọng để xóa đúng giỏ hàng ở Backend
//                     productId: item.productId?._id || item.product?._id || item.productId,
//                     quantity: item.quantity,
//                     price: item.unitPrice
//                 }))
//             };

//             const res = await createOrderApi(payload as any);

//             if (res.success) {
//                 // Xóa các món đã mua khỏi giỏ hàng ngay lập tức
//                 await refreshCart();

//                 if (formData.paymentMethod === 'SePay') {
//                     // TRẢ VỀ DỮ LIỆU ĐỂ GIAO DIỆN HIỆN MODAL QR
//                     return {
//                         showQR: true,
//                         qrUrl: res.data.checkoutUrl,
//                         orderCode: res.data.order.orderCode
//                     };
//                 } else {
//                     // Thanh toán khi nhận hàng
//                     toast.success("Đặt hàng thành công!");
//                     router.push('/orders');
//                 }
//             }
//         } catch (error: any) {
//             const errorMsg = error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng";
//             toast.error(errorMsg);
//             console.error("Checkout Error:", error);
//             setIsSubmitting(false); // Chỉ reset nếu có lỗi để user bấm lại
//         }
//     };

//     return {
//         formData,
//         isSubmitting,
//         updateField,
//         submitOrder,
//         selectedItems,
//         calculatedTotal
//     };
// };



"use client";
import { useState, useMemo, useEffect } from 'react'; // Thêm useEffect
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createOrderApi } from '../checkout/checkout.api';
import { ICheckoutForm } from '../checkout/checkout.types';
import { authApi } from '@/features/customer/api/authApi';

export const useCheckout = (items: any[], refreshCart: () => void) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<ICheckoutForm>({
        recipientName: '',
        phone: '',
        address: '',
        note: '',
        paymentMethod: 'COD'
    });

    // --- MỚI: TỰ ĐỘNG ĐIỀN THÔNG TIN TỪ DATABASE ---
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const res = await authApi.getProfile();

                // Kiểm tra cấu trúc trả về của axios (thường là res.data hoặc res.data.data)
                const userData = res.data?.data || res.data;

                if (userData) {
                    setFormData(prev => ({
                        ...prev,
                        // Ưu tiên thông tin từ DB nếu có, nếu không giữ nguyên giá trị cũ
                        recipientName: userData.username || prev.recipientName,
                        phone: userData.phone || prev.phone,
                        address: userData.address || prev.address
                    }));
                }
            } catch (error) {
                // Không cần toast lỗi ở đây để tránh làm phiền khách nếu họ chưa cập nhật profile
                console.error("Lỗi khi lấy dữ liệu profile:", error);
            }
        };

        loadUserProfile();
    }, []);

    // 1. Lọc sản phẩm đã chọn
    const selectedItems = useMemo(() => {
        return items.filter(item => item.selected === true);
    }, [items]);

    // 2. Tính tổng tiền thực tế dựa trên các món đã tích chọn
    const calculatedTotal = useMemo(() => {
        return selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    }, [selectedItems]);

    const updateField = (field: keyof ICheckoutForm, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const submitOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (selectedItems.length === 0) {
            toast.error("Vui lòng tích chọn sản phẩm muốn mua trong giỏ hàng!");
            return;
        }

        if (!formData.recipientName || !formData.phone || !formData.address) {
            toast.error("Vui lòng nhập đầy đủ thông tin giao hàng!");
            return;
        }

        // Validate số điện thoại VN (10 số, bắt đầu bằng 0)
        if (!/^0[0-9]{9}$/.test(formData.phone)) {
            toast.error("Số điện thoại không hợp lệ!");
            return;
        }

        try {
            setIsSubmitting(true);

            const payload = {
                recipientName: formData.recipientName,
                phone: formData.phone,
                address: formData.address,
                note: formData.note,
                paymentMethod: formData.paymentMethod,
                totalAmount: calculatedTotal,
                finalAmount: calculatedTotal,
                items: selectedItems.map(item => ({
                    cartDetailId: item._id,
                    productId: item.productId?._id || item.product?._id || item.productId,
                    quantity: item.quantity,
                    price: item.unitPrice
                }))
            };

            const res = await createOrderApi(payload as any);

            if (res.success) {
                await refreshCart();

                if (formData.paymentMethod === 'SePay') {
                    return {
                        showQR: true,
                        qrUrl: res.data.checkoutUrl,
                        orderCode: res.data.order.orderCode
                    };
                } else {
                    toast.success("Đặt hàng thành công!");
                    router.push('/orders');
                }
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng";
            toast.error(errorMsg);
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        updateField,
        submitOrder,
        selectedItems,
        calculatedTotal
    };
};