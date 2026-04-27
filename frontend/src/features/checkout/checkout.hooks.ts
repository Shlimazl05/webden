


"use client";
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createOrderApi } from '../checkout/checkout.api';
import { ICheckoutForm } from '../checkout/checkout.types';
import { authApi } from '@/features/customer/api/authApi';
// --- BƯỚC 1: Import Store ---
import { useCartStore } from '@/features/cart/hooks/useCartStore';

const SELECTED_STORAGE_KEY = 'selected_cart_item_ids';

export const useCheckout = (items: any[], refreshCart: () => void) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- BƯỚC 2: Lấy hàm cập nhật số lượng từ Store ---
    const fetchGlobalCartCount = useCartStore(state => state.fetchCartCount);

    const [formData, setFormData] = useState<ICheckoutForm>({
        recipientName: '',
        phone: '',
        address: '',
        note: '',
        paymentMethod: 'COD'
    });

    const getStoredSelectedIds = (): string[] => {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem(SELECTED_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    };

    const selectedItems = useMemo(() => {
        const storedIds = getStoredSelectedIds();
        return items.filter(item => storedIds.includes(item._id));
    }, [items]);

    const calculatedTotal = useMemo(() => {
        return selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    }, [selectedItems]);

    // (Giữ nguyên useEffect loadUserProfile và updateField...)
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const res = await authApi.getProfile();
                const userData = res.data?.data || res.data;
                if (userData) {
                    setFormData(prev => ({
                        ...prev,
                        recipientName: userData.username || prev.recipientName,
                        phone: userData.phone || prev.phone,
                        address: userData.address || prev.address
                    }));
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu profile:", error);
            }
        };
        loadUserProfile();
    }, []);

    const updateField = (field: keyof ICheckoutForm, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const submitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (selectedItems.length === 0) {
            toast.error("Vui lòng quay lại giỏ hàng và chọn sản phẩm!");
            return;
        }

        // (... Các bước validate khác giữ nguyên ...)

        try {
            setIsSubmitting(true);

            const payload = {
                ...formData,
                items: selectedItems.map(item => ({
                    cartDetailId: item._id,
                    productId: item.product?._id || item.productId?._id,
                    quantity: item.quantity,
                    price: item.unitPrice
                }))
            };

            const res = await createOrderApi(payload as any);

            if (res.success) {
                // --- BƯỚC 3: ĐỒNG BỘ NGAY LẬP TỨC ---
                localStorage.setItem(SELECTED_STORAGE_KEY, JSON.stringify([]));

                // Cập nhật lại danh sách giỏ hàng ở trang hiện tại
                await refreshCart();

                // Cập nhật lại số lượng trên Navbar (Số lượng mới = Tổng cũ - Số món vừa mua)
                await fetchGlobalCartCount();

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