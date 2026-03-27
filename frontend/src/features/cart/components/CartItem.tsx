


// "use client";

// import React from 'react';
// import Image from 'next/image';
// import { Minus, Plus, Trash2 } from 'lucide-react';
// import { ICartDetail } from '../cart.types';

// interface CartItemProps {
//   item: ICartDetail;
//   onUpdateQuantity: (id: string, newQty: number) => void;
//   onRemove: (id: string) => void;
//   onToggleSelect: (id: string) => void;
// }

// export const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect }: CartItemProps) => {
//   const { product, quantity, unitPrice, selected, _id } = item;

//   return (
//     <div className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all duration-300 mb-4">
      
//       {/* 1. CHECKBOX CHỌN MÓN */}
//       <div className="flex items-center">
//         <input 
//           type="checkbox" 
//           checked={selected}
//           onChange={() => onToggleSelect(_id)}
//           className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 cursor-pointer accent-indigo-600 focus:ring-0"
//         />
//       </div>

//       {/* 2. HÌNH ẢNH SẢN PHẨM */}
//       <div className="relative w-24 h-24 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-50">
//         <Image 
//           src={product.imageUrl || '/placeholder-product.png'} 
//           alt={product.productName}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//       </div>

//       {/* 3. THÔNG TIN SẢN PHẨM (Đã bỏ mã đèn, thêm kích thước) */}
//       <div className="flex-1 min-w-0">
//         <div className="flex flex-col gap-1">
//           <h3 className="text-sm font-bold text-slate-800 truncate pr-4">
//             {product.productName}
//           </h3>
          
//           <div className="flex flex-wrap gap-x-4 gap-y-1">
//             {product.specifications?.power && (
//               <span className="text-[11px] text-slate-400 font-medium">Công suất: {product.specifications.power}</span>
//             )}
//             {product.specifications?.material && (
//               <span className="text-[11px] text-slate-400 font-medium">Chất liệu: {product.specifications.material}</span>
//             )}
//             {/* THÊM KÍCH THƯỚC TẠI ĐÂY */}
//             {product.specifications?.size && (
//               <span className="text-[11px] text-slate-400 font-medium">Kích thước: {product.specifications.size}</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 4. BỘ TĂNG GIẢM SỐ LƯỢNG */}
//       <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-100 mx-4">
//         <button 
//           onClick={() => onUpdateQuantity(_id, quantity - 1)}
//           disabled={quantity <= 1}
//           className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:text-indigo-600 disabled:opacity-20 transition-all text-slate-500"
//         >
//           <Minus size={14} strokeWidth={3} />
//         </button>
        
//         <span className="w-8 text-center text-sm font-black text-slate-700">
//           {quantity}
//         </span>

//         <button 
//           onClick={() => onUpdateQuantity(_id, quantity + 1)}
//           className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:text-indigo-600 transition-all text-slate-500"
//         >
//           <Plus size={14} strokeWidth={3} />
//         </button>
//       </div>

//       {/* 5. GIÁ TIỀN (Đã bỏ phần giá cũ gạch ngang) */}
//       <div className="flex flex-col items-end w-32">
//         <span className="text-base font-black text-indigo-600">
//           {(unitPrice * quantity).toLocaleString()}đ
//         </span>
//         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
//           Đơn giá: {unitPrice.toLocaleString()}đ
//         </p>
//       </div>

//       {/* 6. NÚT XÓA */}
//       <button 
//         onClick={() => onRemove(_id)}
//         className="p-2 text-slate-300 hover:text-red-500 transition-all"
//       >
//         <Trash2 size={18} strokeWidth={2} />
//       </button>

//     </div>
//   );
// };


// // D:\webden\frontend\src\features\cart\components\CartItem.tsx
// import Image from 'next/image';
// import { Minus, Plus, Trash2 } from 'lucide-react';
// import { ICartDetail } from '../cart.types';

// export const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect }: any) => {
//   const { product, quantity, unitPrice, selected, _id } = item;

//   return (
//     <div className="ui-card flex items-center gap-6 group hover:border-[var(--color-primary)] transition-all">
//       <input
//         type="checkbox"
//         checked={selected}
//         onChange={() => onToggleSelect(_id)}
//         className="w-5 h-5 rounded-md border-slate-300 accent-[var(--color-primary)]"
//       />

//       <div className="relative w-24 h-24 flex-shrink-0 bg-[var(--bg-light)] rounded-2xl overflow-hidden">
//         <Image src={product.imageUrl || '/placeholder.png'} alt={product.productName} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
//       </div>

//       <div className="flex-1 min-w-0">
//         <h3 className="ui-product-name mb-2">{product.productName}</h3>
//         <div className="flex gap-4">
//           {product.specifications?.power && <span className="ui-label !text-slate-400">CS: {product.specifications.power}</span>}
//           {product.specifications?.size && <span className="ui-label !text-slate-400">KT: {product.specifications.size}</span>}
//         </div>
//       </div>

//       <div className="flex items-center bg-[var(--bg-light)] rounded-full p-1 border border-slate-100">
//         <button onClick={() => onUpdateQuantity(_id, quantity - 1)} disabled={quantity <= 1} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-all"><Minus size={14} /></button>
//         <span className="w-8 text-center ui-value">{quantity}</span>
//         <button onClick={() => onUpdateQuantity(_id, quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-all"><Plus size={14} /></button>
//       </div>

//       <div className="flex flex-col items-end w-40">
//         <span className="ui-price !text-[var(--color-primary)]">
//           {(unitPrice * quantity).toLocaleString()}<span className="text-xs ml-0.5">đ</span>
//         </span>
//         <span className="ui-currency !text-[11px] opacity-50">
//           Đơn giá: {unitPrice.toLocaleString()}đ
//         </span>
//       </div>

//       <button onClick={() => onRemove(_id)} className="p-2 text-slate-300 hover:text-[var(--color-danger)] transition-colors">
//         <Trash2 size={18} />
//       </button>
//     </div>
//   );
// };


// D:\webden\frontend\src\features\cart\components\CartItem.tsx
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ICartDetail } from '../cart.types';

export const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect }: any) => {
  const { product, quantity, unitPrice, selected, _id } = item;

  return (
    <div className="ui-card flex items-center gap-6 group hover:border-[var(--color-primary)] transition-all">
      {/* 1. Thêm cursor-pointer vào checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggleSelect(_id)}
        className="w-5 h-5 rounded-md border-slate-300 accent-[var(--color-primary)] cursor-pointer"
      />

      <div className="relative w-24 h-24 flex-shrink-0 bg-[var(--bg-light)] rounded-2xl overflow-hidden">
        <Image src={product.imageUrl || '/placeholder.png'} alt={product.productName} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="ui-product-name mb-2">{product.productName}</h3>
        <div className="flex gap-4">
          {product.specifications?.power && <span className="ui-label !text-slate-400">CS: {product.specifications.power}</span>}
          {product.specifications?.size && <span className="ui-label !text-slate-400">KT: {product.specifications.size}</span>}
        </div>
      </div>

      <div className="flex items-center bg-[var(--bg-light)] rounded-full p-1 border border-slate-100">
        {/* 2. Thêm cursor-pointer và disabled:cursor-not-allowed cho nút trừ */}
        <button
          onClick={() => onUpdateQuantity(_id, quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>

        <span className="w-8 text-center ui-value">{quantity}</span>

        {/* 3. Thêm cursor-pointer cho nút cộng */}
        <button
          onClick={() => onUpdateQuantity(_id, quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-all cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="flex flex-col items-end w-40">
        <span className="ui-price !text-[var(--color-primary)]">
          {(unitPrice * quantity).toLocaleString()}<span className="text-xs ml-0.5">đ</span>
        </span>
        <span className="ui-currency !text-[11px] opacity-50">
          Đơn giá: {unitPrice.toLocaleString()}đ
        </span>
      </div>

      {/* 4. Thêm cursor-pointer cho nút xóa */}
      <button
        onClick={() => onRemove(_id)}
        className="p-2 text-slate-300 hover:text-[var(--color-danger)] transition-colors cursor-pointer"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
