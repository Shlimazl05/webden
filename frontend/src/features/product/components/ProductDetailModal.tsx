// "use client";
// import React from "react";
// import { X } from "lucide-react";
// import { IProduct } from "../../product/product.types";
// import { ProductDetailContent } from "@/features/product/components/ProductDetailContent";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   product: IProduct | null;
//   actions?: React.ReactNode; // Nơi truyền các nút bấm khác nhau
// }

// export const ProductDetailModal = ({ isOpen, onClose, product, actions }: Props) => {
//   if (!isOpen || !product) return null;

//   return (
//     <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-300">
//       <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in-95 duration-300">
        
//         {/* Nút đóng nổi lơ lửng */}
//         <button 
//           onClick={onClose} 
//           className="absolute right-8 top-8 z-50 p-2 bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500 shadow-lg rounded-full transition-all border border-slate-100"
//         >
//           <X size={24} strokeWidth={3} />
//         </button>

//         {/* Nội dung chính tái sử dụng */}
//         <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
//           <ProductDetailContent product={product} />
//         </div>

//         {/* Footer linh hoạt */}
//         <div className="px-10 py-6 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
//           <button 
//             onClick={onClose} 
//             className="text-slate-400 font-black uppercase text-[11px] tracking-widest hover:text-slate-900 transition-all"
//           >
//             Quay lại
//           </button>
//           <div className="flex gap-3">
//             {actions} {/* Các nút bấm riêng sẽ hiện ở đây */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import React from "react";
import { X } from "lucide-react";
import { IProduct } from "../../product/product.types";
import { ProductDetailContent } from "./ProductDetailContent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct | null;
  actions?: React.ReactNode;
}

export const ProductDetailModal = ({ isOpen, onClose, product, actions }: Props) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* NÚT ĐÓNG: To, sát góc bên trong */}
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 z-50 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all group"
        >
          <X size={32} strokeWidth={3} />
        </button>

        {/* NỘI DUNG CHÍNH */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-16">
          <ProductDetailContent product={product} />
        </div>

        {/* FOOTER: Không còn nút quay lại, chỉ có nút hành động */}
        <div className="px-10 py-6 border-t border-slate-50 bg-slate-50/50 flex justify-end">
          {actions}
        </div>
      </div>
    </div>
  );
};