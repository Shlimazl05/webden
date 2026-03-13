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
//   const [isUpdating, setIsUpdating] = useState<string | null>(null); // Lưu ID món đang cập nhật để hiện loading nhỏ

//   /**
//    * 1. Lấy dữ liệu giỏ hàng từ Server
//    */
//   const fetchCart = useCallback(async () => {
//     if (!isLoggedIn) {
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       const data = await getCartApi();
//       setCart(data);
//     } catch (error: any) {
//       console.error("Lỗi lấy giỏ hàng:", error);
//       // toast.error("Không thể tải giỏ hàng");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     if (authLoaded) fetchCart();
//   }, [authLoaded, fetchCart]);

//   /**
//    * 2. Thay đổi số lượng (Tăng/Giảm)
//    */
//   const updateQuantity = async (cartDetailId: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     setIsUpdating(cartDetailId);
//     try {
//       await updateCartItemApi(cartDetailId, newQty);
      
//       // Cập nhật State cục bộ ngay lập tức để UI mượt mà (Optimistic Update)
//       setCart(prev => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           items: prev.items.map(item => 
//             item._id === cartDetailId ? { ...item, quantity: newQty } : item
//           )
//         };
//       });
//     } catch (error) {
//       toast.error("Lỗi cập nhật số lượng");
//       fetchCart(); // Nếu lỗi thì load lại bản chuẩn từ server
//     } finally {
//       setIsUpdating(null);
//     }
//   };

//   /**
//    * 3. Xóa một món khỏi giỏ
//    */
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

//   /**
//    * 4. Tích chọn/Bỏ chọn sản phẩm (Xử lý Local cho nhanh)
//    */
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

//   /**
//    * 5. Chọn tất cả / Bỏ chọn tất cả
//    */
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

//   /**
//    * 6. Xóa các mục đã chọn (Batch Delete)
//    */
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
//       toast.success(`Đã dọn dẹp ${selectedIds.length} món`);
//     } catch (error) {
//       toast.error("Lỗi khi xóa mục đã chọn");
//     }
//   };

//   /**
//    * 7. TÍNH TOÁN CÁC CON SỐ (Dùng useMemo để tối ưu hiệu năng)
//    */
//   const totals = useMemo(() => {
//     const selectedItems = cart?.items.filter(i => i.selected) || [];
//     const subTotal = selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
//     const selectedCount = selectedItems.length;
    
//     // Ngưỡng Freeship 5 triệu
//     const shippingFee = (subTotal >= 5000000 || selectedCount === 0) ? 0 : 150000;

//     return { subTotal, selectedCount, shippingFee, total: subTotal + shippingFee };
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

export const useCart = () => {
  const { isLoggedIn, isLoaded: authLoaded } = useAuth();
  const [cart, setCart] = useState<ICart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res: any = await getCartApi();
      if (res.success) {
        setCart(res.data);
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
        return {
          ...prev,
          items: prev.items.filter(item => item._id !== cartDetailId)
        };
      });
      toast.success("Đã xóa khỏi giỏ hàng");
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const toggleSelect = (cartDetailId: string) => {
    setCart(prev => {
      if (!prev) return null;
      return {
        ...prev,
        items: prev.items.map(item =>
          item._id === cartDetailId ? { ...item, selected: !item.selected } : item
        )
      };
    });
  };

  const isAllSelected = useMemo(() => {
    return cart?.items.length ? cart.items.every(i => i.selected) : false;
  }, [cart]);

  const toggleAll = () => {
    const targetValue = !isAllSelected;
    setCart(prev => {
      if (!prev) return null;
      return {
        ...prev,
        items: prev.items.map(item => ({ ...item, selected: targetValue }))
      };
    });
  };

  const removeSelected = async () => {
    const selectedIds = cart?.items.filter(i => i.selected).map(i => i._id) || [];
    if (selectedIds.length === 0) return;
    try {
      await removeSelectedItemsApi(selectedIds);
      setCart(prev => {
        if (!prev) return null;
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
    const selectedItems = cart?.items.filter(i => i.selected) || [];
    const subTotal = selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const selectedCount = selectedItems.length;

    // BỎ PHẦN PHÍ SHIP GIẢ Ở ĐÂY - CHỈ TRẢ VỀ SUB TOTAL
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