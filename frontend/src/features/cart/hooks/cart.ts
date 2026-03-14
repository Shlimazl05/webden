


// "use client";

// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { toast } from 'react-hot-toast';
// import {
//   getCartApi,
//   updateCartItemApi,
//   removeCartItemApi,
//   removeSelectedItemsApi
// } from '../api/cart.api';
// import { ICart, ICartDetail } from '../cart.types';
// import { useAuth } from '@/features/auth/auth.hooks';

// export const useCart = () => {
//   const { isLoggedIn, isLoaded: authLoaded } = useAuth();
//   const [cart, setCart] = useState<ICart | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isUpdating, setIsUpdating] = useState<string | null>(null);

//   const fetchCart = useCallback(async () => {
//     if (!isLoggedIn) {
//       setIsLoading(false);
//       return;
//     }
//     try {
//       setIsLoading(true);
//       const res: any = await getCartApi();
//       if (res.success) {
//         setCart(res.data);
//       }
//     } catch (error: any) {
//       console.error("Lỗi lấy giỏ hàng:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     if (authLoaded) fetchCart();
//   }, [authLoaded, fetchCart]);

//   const updateQuantity = async (cartDetailId: string, newQty: number) => {
//     if (newQty < 1) return;
//     setIsUpdating(cartDetailId);
//     try {
//       const res = await updateCartItemApi(cartDetailId, newQty);

//       if (res.success) {
//         setCart((prev: any) => {
//           if (!prev) return null;
//           return {
//             ...prev,
//             items: prev.items.map((item: any) =>
//               item._id === cartDetailId ? { ...item, quantity: newQty } : item
//             )
//           };
//         });
//       }
//     } catch (error) {
//       toast.error("Lỗi cập nhật số lượng");
//       fetchCart();
//     } finally {
//       setIsUpdating(null);
//     }
//   };

//   const removeItem = async (cartDetailId: string) => {
//     try {
//       await removeCartItemApi(cartDetailId);
//       setCart(prev => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           items: prev.items.filter(item => item._id !== cartDetailId)
//         };
//       });
//       toast.success("Đã xóa khỏi giỏ hàng");
//     } catch (error) {
//       toast.error("Xóa thất bại");
//     }
//   };

//   const toggleSelect = (cartDetailId: string) => {
//     setCart(prev => {
//       if (!prev) return null;
//       return {
//         ...prev,
//         items: prev.items.map(item =>
//           item._id === cartDetailId ? { ...item, selected: !item.selected } : item
//         )
//       };
//     });
//   };

//   const isAllSelected = useMemo(() => {
//     return cart?.items.length ? cart.items.every(i => i.selected) : false;
//   }, [cart]);

//   const toggleAll = () => {
//     const targetValue = !isAllSelected;
//     setCart(prev => {
//       if (!prev) return null;
//       return {
//         ...prev,
//         items: prev.items.map(item => ({ ...item, selected: targetValue }))
//       };
//     });
//   };

//   const removeSelected = async () => {
//     const selectedIds = cart?.items.filter(i => i.selected).map(i => i._id) || [];
//     if (selectedIds.length === 0) return;
//     try {
//       await removeSelectedItemsApi(selectedIds);
//       setCart(prev => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           items: prev.items.filter(item => !selectedIds.includes(item._id))
//         };
//       });
//       toast.success(`Đã xóa mục đã chọn`);
//     } catch (error) {
//       toast.error("Lỗi khi xóa mục đã chọn");
//     }
//   };

//   const totals = useMemo(() => {
//     const selectedItems = cart?.items.filter(i => i.selected) || [];
//     const subTotal = selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
//     const selectedCount = selectedItems.length;

//     // BỎ PHẦN PHÍ SHIP GIẢ Ở ĐÂY - CHỈ TRẢ VỀ SUB TOTAL
//     return { subTotal, selectedCount };
//   }, [cart]);

//   return {
//     items: cart?.items || [],
//     isLoading,
//     isUpdating,
//     totals,
//     isAllSelected,
//     updateQuantity,
//     removeItem,
//     toggleSelect,
//     toggleAll,
//     removeSelected,
//     refreshCart: fetchCart
//   };
// };


"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import {
  getCartApi,
  updateCartItemApi,
  removeCartItemApi,
  removeSelectedItemsApi
} from '../api/cart.api';
import { ICart, ICartDetail } from '../cart.types';
import { useAuth } from '@/features/auth/auth.hooks';

// Key để lưu danh sách các ID đã chọn vào máy tính
const SELECTED_STORAGE_KEY = 'selected_cart_item_ids';

export const useCart = () => {
  const { isLoggedIn, isLoaded: authLoaded } = useAuth();
  const [cart, setCart] = useState<ICart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Hàm hỗ trợ lấy danh sách ID đã lưu từ localStorage
  const getStoredSelectedIds = (): string[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(SELECTED_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  };

  // Hàm hỗ trợ lưu danh sách ID vào localStorage
  const saveSelectedIds = (items: ICartDetail[]) => {
    const selectedIds = items.filter(i => i.selected).map(i => i._id);
    localStorage.setItem(SELECTED_STORAGE_KEY, JSON.stringify(selectedIds));
  };

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res: any = await getCartApi();
      if (res.success) {
        const storedIds = getStoredSelectedIds();

        // CẬP NHẬT QUAN TRỌNG: Gắn lại thuộc tính 'selected' từ localStorage vào dữ liệu API trả về
        const itemsWithSelection = res.data.items.map((item: ICartDetail) => ({
          ...item,
          selected: storedIds.includes(item._id) // Nếu ID nằm trong danh sách đã lưu thì tích chọn
        }));

        setCart({ ...res.data, items: itemsWithSelection });
      }
    } catch (error: any) {
      console.error("Lỗi lấy giỏ hàng:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (authLoaded) fetchCart();
  }, [authLoaded, fetchCart]);

  const updateQuantity = async (cartDetailId: string, newQty: number) => {
    if (newQty < 1) return;
    setIsUpdating(cartDetailId);
    try {
      const res = await updateCartItemApi(cartDetailId, newQty);
      if (res.success) {
        setCart((prev: any) => {
          if (!prev) return null;
          return {
            ...prev,
            items: prev.items.map((item: any) =>
              item._id === cartDetailId ? { ...item, quantity: newQty } : item
            )
          };
        });
      }
    } catch (error) {
      toast.error("Lỗi cập nhật số lượng");
      fetchCart();
    } finally {
      setIsUpdating(null);
    }
  };

  const removeItem = async (cartDetailId: string) => {
    try {
      await removeCartItemApi(cartDetailId);
      setCart(prev => {
        if (!prev) return null;
        const newItems = prev.items.filter(item => item._id !== cartDetailId);
        // Cập nhật lại localStorage sau khi xóa
        const selectedIds = newItems.filter(i => i.selected).map(i => i._id);
        localStorage.setItem(SELECTED_STORAGE_KEY, JSON.stringify(selectedIds));
        return { ...prev, items: newItems };
      });
      toast.success("Đã xóa khỏi giỏ hàng");
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const toggleSelect = (cartDetailId: string) => {
    setCart(prev => {
      if (!prev) return null;
      const newItems = prev.items.map(item =>
        item._id === cartDetailId ? { ...item, selected: !item.selected } : item
      );
      // Lưu trạng thái vào máy tính
      saveSelectedIds(newItems);
      return { ...prev, items: newItems };
    });
  };

  const isAllSelected = useMemo(() => {
    return cart?.items.length ? cart.items.every(i => i.selected) : false;
  }, [cart]);

  const toggleAll = () => {
    const targetValue = !isAllSelected;
    setCart(prev => {
      if (!prev) return null;
      const newItems = prev.items.map(item => ({ ...item, selected: targetValue }));
      // Lưu trạng thái vào máy tính
      saveSelectedIds(newItems);
      return { ...prev, items: newItems };
    });
  };

  const removeSelected = async () => {
    const selectedIds = cart?.items.filter(i => i.selected).map(i => i._id) || [];
    if (selectedIds.length === 0) return;
    try {
      await removeSelectedItemsApi(selectedIds);
      setCart(prev => {
        if (!prev) return null;
        // Xóa sạch localStorage sau khi xóa mục đã chọn
        localStorage.removeItem(SELECTED_STORAGE_KEY);
        return {
          ...prev,
          items: prev.items.filter(item => !selectedIds.includes(item._id))
        };
      });
      toast.success(`Đã xóa mục đã chọn`);
    } catch (error) {
      toast.error("Lỗi khi xóa mục đã chọn");
    }
  };

  const totals = useMemo(() => {
    // CHỈ TÍNH TIỀN NHỮNG MÓN ĐÃ ĐƯỢC TÍCH CHỌN
    const selectedItems = cart?.items.filter(i => i.selected === true) || [];
    const subTotal = selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const selectedCount = selectedItems.length;

    return { subTotal, selectedCount };
  }, [cart]);

  return {
    items: cart?.items || [],
    isLoading,
    isUpdating,
    totals,
    isAllSelected,
    updateQuantity,
    removeItem,
    toggleSelect,
    toggleAll,
    removeSelected,
    refreshCart: fetchCart
  };
};