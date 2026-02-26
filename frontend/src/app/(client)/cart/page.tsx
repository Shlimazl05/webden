


// "use client";

// import React, { useState } from 'react';
// import { CartItem } from "@/features/cart/components/CartItem";
// import { CartSummary } from "@/features/cart/components/CartSummary";
// import { EmptyCart } from "@/features/cart/components/EmptyCart";
// import { Trash2, ShoppingBag } from 'lucide-react';

// /**
//  * Cấu hình các hằng số về vận chuyển
//  */
// const SHIPPING_CONFIG = {
//   FREE_THRESHOLD: 5000000, // Ngưỡng miễn phí: 5.000.000đ
//   BASE_FEE: 150000,        // Phí vận chuyển mặc định: 150.000đ
// };

// export default function CartPage() {
//   // Trạng thái giỏ hàng (Mock Data)
//   const [items, setItems] = useState<any[]>([
//     { 
//       _id: 'cd1', 
//       quantity: 1, 
//       unitPrice: 12500000, 
//       selected: true,
//       product: { 
//         productName: 'Đèn Chùm Pha Lê Hoàng Gia', 
//         imageUrl: '', 
//         specifications: { power: '60W', material: 'Pha lê', size: 'Ø80cm'} 
//       }
//     },
//     { 
//       _id: 'cd2', 
//       quantity: 2, 
//       unitPrice: 3200000, 
//       selected: true,
//       product: { 
//         productName: 'Đèn Treo Trần Scandinavian', 
//         imageUrl: '', 
//         specifications: { power: '25W', material: 'Gỗ sồi', size: 'Ø45cm' } 
//       }
//     },
//   ]);

//   // --- LOGIC HANDLERS ---

//   const handleUpdateQuantity = (id: string, newQty: number) => {
//     setItems(prev => prev.map(item => item._id === id ? { ...item, quantity: newQty } : item));
//   };

//   const handleToggleSelect = (id: string) => {
//     setItems(prev => prev.map(item => item._id === id ? { ...item, selected: !item.selected } : item));
//   };

//   const isAllSelected = items.length > 0 && items.every(item => item.selected);
//   const handleToggleAll = () => {
//     setItems(prev => prev.map(item => ({ ...item, selected: !isAllSelected })));
//   };

//   const handleRemoveItem = (id: string) => {
//     setItems(prev => prev.filter(item => item._id !== id));
//   };

//   const handleRemoveSelected = () => {
//     setItems(prev => prev.filter(item => !item.selected));
//   };

//   // --- CALCULATIONS ---

//   const selectedItems = items.filter(item => item.selected);
//   const selectedCount = selectedItems.length;

//   // Tổng tiền hàng của các món được chọn
//   const subTotal = selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

//   /**
//    * Tính toán phí vận chuyển dựa trên ngưỡng Freeship
//    */
//   const shippingFee = (subTotal >= 5000000 || subTotal === 0) ? 0 : 150000;

//   if (items.length === 0) return <EmptyCart />;

//   return (
//     <div className="max-w-[1300px] mx-auto px-6 py-12 min-h-screen">
      
//       {/* Page Header */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-black text-indigo-900 mb-2 uppercase tracking-tighter">
//           Giỏ Hàng
//         </h1>
//         <p className="text-sm text-slate-400 font-medium">
//           Bạn đang có <span className="text-indigo-600 font-bold">{items.length}</span> món hàng trong túi
//         </p>
//       </div>

//       {/* Thanh thông báo tiến trình Freeship (Upsell bar) */}
//       {subTotal > 0 && subTotal < SHIPPING_CONFIG.FREE_THRESHOLD && (
//         <div className="mb-8 p-5 bg-amber-50 border border-amber-100 rounded-[24px] flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-amber-200">
//               <ShoppingBag size={20} />
//             </div>
//             <div>
//               <p className="text-sm text-amber-900 font-bold">
//                 Chỉ thiếu <span className="text-lg underline">{(SHIPPING_CONFIG.FREE_THRESHOLD - subTotal).toLocaleString()}đ</span> nữa để được Freeship!
//               </p>
//               <p className="text-[11px] text-amber-700 font-medium opacity-80 uppercase tracking-wider">
//                 Mua thêm để tiết kiệm ngay {SHIPPING_CONFIG.BASE_FEE.toLocaleString()}đ phí vận chuyển
//               </p>
//             </div>
//           </div>
//           <button className="text-[11px] font-black text-amber-600 border-b-2 border-amber-200 hover:border-amber-500 transition-all uppercase tracking-widest">
//             Tiếp tục mua thêm
//           </button>
//         </div>
//       )}

//       {/* Main Container Frame */}
//       <div className="bg-white/70 backdrop-blur-md rounded-[40px] border border-slate-200/50 p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
        
//         <div className="flex flex-col lg:flex-row gap-12 items-start">
          
//           {/* Cột trái: Danh sách sản phẩm */}
//           <div className="flex-1 w-full">
            
//             {/* Toolbar */}
//             <div className="flex items-center justify-between mb-8 px-8 py-5 bg-slate-50/50 rounded-2xl border border-slate-100 transition-all">
//                <label className="flex items-center gap-3 cursor-pointer group">
//                   <input 
//                     type="checkbox" 
//                     className="w-5 h-5 accent-indigo-600 rounded-lg cursor-pointer transition-transform group-hover:scale-110" 
//                     checked={isAllSelected}
//                     onChange={handleToggleAll} 
//                   />
//                   <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest">
//                     Chọn tất cả ({items.length})
//                   </span>
//                </label>

//                <button 
//                 onClick={handleRemoveSelected}
//                 className="flex items-center gap-2 text-[12px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-all"
//                >
//                   <Trash2 size={16} />
//                   Xóa mục đã chọn
//                </button>
//             </div>

//             {/* Cart Items List */}
//             <div className="space-y-4">
//               {items.map(item => (
//                 <CartItem 
//                   key={item._id} 
//                   item={item} 
//                   onUpdateQuantity={handleUpdateQuantity} 
//                   onRemove={handleRemoveItem} 
//                   onToggleSelect={handleToggleSelect}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Cột phải: Tổng đơn hàng */}
//           <div className="w-full lg:w-[400px] sticky top-[110px]">
//             {/* Chuyền cả subTotal, selectedCount và shippingFee mới tính được */}
//             <CartSummary 
//               subTotal={subTotal} 
//               selectedCount={selectedCount} 
//               shippingFee={shippingFee} 
//             />
            
//             <p className="mt-6 text-center text-[11px] text-slate-400 font-medium leading-relaxed italic px-4">
//               * Phí vận chuyển sẽ được áp dụng dựa trên tổng giá trị các sản phẩm được chọn thanh toán.
//             </p>
//           </div>

//         </div>

//         {/* Brand Footer */}
//         <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center gap-2">
//             <div className="w-8 h-1 bg-indigo-100 rounded-full" />
//             <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
//                 Stellar Lights • Premium Interior Lighting
//             </p>
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from 'react';
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { EmptyCart } from "@/features/cart/components/EmptyCart";
import { Trash2 } from 'lucide-react';
import { ICartDetail } from '@/features/cart/cart.types';

export default function CartPage() {
  // SAU NÀY: Thay cái mảng items này bằng dữ liệu từ Backend
  const [items, setItems] = useState<ICartDetail[]>([
    { 
      _id: 'cd1', 
      quantity: 1, 
      unitPrice: 12500000, 
      selected: true,
      product: {
          _id: 'p1',
          productName: 'Đèn Chùm Pha Lê Hoàng Gia',
          imageUrl: '',
          specifications: { power: '60W', material: 'Pha lê', size: 'Ø80cm' },
          productCode: 'DEN-001',
          salePrice: 12500000,
          stockQuantity: 10,
          status: 'Active'
      }
    },
    { 
      _id: 'cd2', 
      quantity: 2, 
      unitPrice: 3200000, 
      selected: true,
      product: {
          _id: 'p2',
          productName: 'Đèn Treo Trần Scandinavian',
          imageUrl: '',
          specifications: { power: '25W', material: 'Gỗ sồi', size: 'Ø45cm' },
          productCode: 'DEN-002',
          salePrice: 3200000,
          stockQuantity: 5,
          status: 'Active'
      }
    },
  ]);

  // LOGIC XỬ LÝ TẠM THỜI
  const updateQty = (id: string, q: number) => 
    setItems(items.map(i => i._id === id ? { ...i, quantity: q } : i));

  const toggleSelect = (id: string) => 
    setItems(items.map(i => i._id === id ? { ...i, selected: !i.selected } : i));

  const remove = (id: string) => setItems(items.filter(i => i._id !== id));

  const toggleAll = () => {
    const allSelected = items.every(i => i.selected);
    setItems(items.map(i => ({ ...i, selected: !allSelected })));
  };

  // HÀM MỚI: Xóa tất cả những món đang được tick chọn
  const removeSelected = () => {
    setItems(items.filter(i => !i.selected));
  };

  // TÍNH TOÁN HIỂN THỊ
  const selectedItems = items.filter(i => i.selected);
  const subTotal = selectedItems.reduce((s, i) => s + (i.unitPrice * i.quantity), 0);
  
  // Logic phí ship: 0đ nếu tổng > 5tr hoặc chưa chọn món nào, ngược lại 150k
  const shippingFee = (subTotal >= 5000000 || selectedItems.length === 0) ? 0 : 150000;

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-black text-indigo-900 mb-10 uppercase tracking-tighter">Giỏ Hàng</h1>

      <div className="bg-white/70 backdrop-blur-md rounded-[40px] border border-slate-200/50 p-8 lg:p-12 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="flex-1 w-full">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8 px-8 py-5 bg-slate-50/50 rounded-2xl border border-slate-100">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" 
                    checked={items.length > 0 && items.every(i => i.selected)}
                    onChange={toggleAll} 
                  />
                  <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest">
                    Chọn tất cả ({items.length})
                  </span>
               </label>
               
               {/* Đã gán hàm xóa ở đây */}
               <button 
                onClick={removeSelected}
                className="flex items-center gap-2 text-[12px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
               >
                  <Trash2 size={16} /> Xóa mục đã chọn
               </button>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-4">
              {items.map(item => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  onUpdateQuantity={updateQty} 
                  onRemove={remove} 
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>
          </div>

          {/* Tổng đơn hàng */}
          <div className="w-full lg:w-[400px] sticky top-[110px]">
            <CartSummary 
                subTotal={subTotal} 
                selectedCount={selectedItems.length} 
                shippingFee={shippingFee} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}