import { create } from 'zustand';
import { getCartApi } from '../api/cart.api';
import { ICartStore } from '../cart.types'; // Import định nghĩa từ file types


export const useCartStore = create<ICartStore>()((set) => ({
    cartCount: 0,
    fetchCartCount: async () => {
        try {
            const res: any = await getCartApi();
            if (res.success && res.data) {
                // CẬP NHẬT Ở ĐÂY: 
                // Chỉ lấy độ dài của mảng items (số lượng loại sản phẩm khác nhau)
                const count = res.data.items.length;

                set({ cartCount: count });
            }
        } catch (error) {
            console.error("Lỗi cập nhật badge:", error);
        }
    },
    
    clearCart: () => set({ cartCount: 0 }),
}));