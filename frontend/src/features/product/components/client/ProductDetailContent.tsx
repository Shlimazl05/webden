

// "use client";
// import React, { useState } from "react";
// import {
//     Box,
//     FileText,
//     ShoppingCart,
//     Plus,
//     Minus,
//     Zap, // Icon cho nút Mua ngay
// } from "lucide-react";
// import { IProduct } from "../../product.types";
// import toast from "react-hot-toast";

// export const ProductDetailContent = ({ product }: { product: IProduct }) => {
//     const [quantity, setQuantity] = useState(1);

//     const handleAddToCart = () => {
//         toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, {
//             style: { borderRadius: '15px', background: '#1e293b', color: '#fff', fontWeight: 'bold' }
//         });
//     };

//     return (
//         <div className="space-y-6 animate-in fade-in duration-700 max-w-[1200px] mx-auto">

//             {/* 1. KHUNG BAO CHÍNH (Ảnh & Thông tin cơ bản) */}
//             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8 lg:p-12">
//                 <div className="grid grid-cols-12 gap-10">

//                     {/* CỘT TRÁI: Ảnh sản phẩm */}
//                     <div className="col-span-12 lg:col-span-4 flex justify-center items-start">
//                         <div className="w-full max-w-[360px] aspect-[3/4] bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
//                             <img
//                                 src={product.imageUrl || "/img/placeholder.svg"}
//                                 className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
//                                 alt={product.productName}
//                             />
//                         </div>
//                     </div>

//                     {/* CỘT PHẢI: Thông tin tóm tắt */}
//                     <div className="col-span-12 lg:col-span-8 flex flex-col justify-between py-2">
//                         <div className="space-y-10">
//                             {/* Tên sản phẩm với vạch xanh dọc */}
//                             <div className="border-l-4 border-indigo-500 pl-5">
//                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-0.5">Tên sản phẩm</p>
//                                 <h1 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
//                                     {product.productName}
//                                 </h1>
//                             </div>

//                             {/* Giá niêm yết với vạch đỏ dọc */}
//                             <div className="border-l-4 border-rose-500 pl-5">
//                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-0.5">Giá niêm yết</p>
//                                 <div className="flex items-baseline gap-1">
//                                     <span className="text-4xl font-black text-rose-600 tracking-tighter">
//                                         {product.salePrice?.toLocaleString('vi-VN')}
//                                     </span>
//                                     <span className="text-2xl font-bold text-rose-600 underline uppercase">đ</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Phần Footer của thông tin: Số lượng, Tồn kho & Nút bấm */}
//                         <div className="pt-8 mt-8 border-t border-slate-50 space-y-8">

//                             {/* CẤU TRÚC XẾP CHỒNG: SỐ LƯỢNG TRÊN - TỒN KHO DƯỚI */}
//                             <div className="flex flex-col gap-5">

//                                 {/* 1. SỐ LƯỢNG MUA (Ở TRÊN) */}
//                                 <div className="space-y-3">
//                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số lượng mua</p>
//                                     <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-sm w-fit h-12">
//                                         <button
//                                             onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                                             className="h-full px-3 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600 active:scale-90"
//                                         >
//                                             <Minus size={16} strokeWidth={3} />
//                                         </button>
//                                         <span className="w-10 text-center font-black text-slate-900 text-base">{quantity}</span>
//                                         <button
//                                             onClick={() => setQuantity(quantity + 1)}
//                                             className="h-full px-3 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600 active:scale-90"
//                                         >
//                                             <Plus size={16} strokeWidth={3} />
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* 2. TÌNH TRẠNG KHO (NGAY DƯỚI) */}
//                                 <div className="flex items-center gap-2 px-1">
//                                     {/* Icon nhỏ lại (size 16) */}
//                                     <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 border border-indigo-100/50">
//                                         <Box size={16} strokeWidth={2.5} />
//                                     </div>
//                                     {/* Text hiển thị: Tồn kho: <số> sản phẩm */}
//                                     <p className="text-[13px] font-bold text-slate-500">
//                                         Tồn kho: <span className="text-slate-950 font-black">{product.stockQuantity}</span> sản phẩm
//                                     </p>
//                                 </div>

//                             </div>

//                             {/* CỤM NÚT BẤM (Giữ nguyên) */}
//                             <div className="flex flex-col sm:flex-row gap-4">
//                                 <button
//                                     onClick={handleAddToCart}
//                                     className="flex-1 h-14 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-sm"
//                                 >
//                                     <ShoppingCart size={18} strokeWidth={2.5} /> Thêm vào giỏ
//                                 </button>
//                                 <button
//                                     className="flex-[1.2] h-14 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
//                                 >
//                                     <Zap size={18} fill="currentColor" /> Mua ngay
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* 2. KHUNG CHI TIẾT SẢN PHẨM (Phía dưới) */}
//             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8 lg:p-12">
//                 <div className="flex items-center gap-2 border-l-4 border-indigo-500 pl-5 mb-10">
//                     <FileText size={18} className="text-indigo-500" strokeWidth={2.5} />
//                     <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Chi tiết sản phẩm</h3>
//                 </div>

//                 <div className="pl-5 prose prose-slate max-w-none">
//                     <p className="text-[15px] text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
//                         {product.specifications?.description || "Sản phẩm hiện đang được cập nhật thông tin mô tả chi tiết."}
//                     </p>
//                 </div>
//             </div>

//         </div>
//     );
// };

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     FileText,
//     ShoppingCart,
//     Plus,
//     Minus,
//     Zap,
// } from "lucide-react";
// import { IProduct } from "../../product.types";
// import toast from "react-hot-toast";

// export const ProductDetailContent = ({ product }: { product: IProduct }) => {
//     const [quantity, setQuantity] = useState(1);

//     // 1. Quản lý ảnh và tự động chuyển
//     const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean) as string[];
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [isAutoPlay, setIsAutoPlay] = useState(true);

//     // FIX 1: Tách riêng logic cuộn lên đầu trang để chạy đúng 1 lần duy nhất
//     useEffect(() => {
//         window.scrollTo({ top: 0, left: 0, behavior: "instant" });
//     }, []);

//     // Logic tự động chuyển ảnh mỗi 3 giây
//     useEffect(() => {

//         if (!isAutoPlay || allImages.length <= 1) return;

//         const interval = setInterval(() => {
//             setActiveIndex((prev) => (prev + 1) % allImages.length);
//         }, 3000);

//         return () => clearInterval(interval);
//     }, [isAutoPlay, allImages.length]);

//     const activeImg = allImages[activeIndex] || "/img/placeholder.svg";

//     const handleAddToCart = () => {
//         toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, {
//             style: { borderRadius: '15px', background: '#1e293b', color: '#fff', fontWeight: 'bold' }
//         });
//     };

//     return (
        
//         <div className="max-w-[1200px] mx-auto pt-[64px] lg:pt-[1px] pb-10 px-4 animate-in fade-in duration-700">

//             {/* 1. KHUNG BAO CHÍNH */}
//             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-6 lg:p-8">
//                 <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">

//                     {/* CỘT TRÁI: Ảnh sản phẩm */}
//                     <div
//                         className="col-span-12 lg:col-span-5 space-y-6"
//                         onMouseEnter={() => setIsAutoPlay(false)}
//                         onMouseLeave={() => setIsAutoPlay(true)}
//                     >
                        
//                         <div className="w-full aspect-square bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-inner">
//                             <img
//                                 key={activeImg}
//                                 src={activeImg}
                                
//                                 className="w-full h-full object-cover transition-all duration-700 animate-in zoom-in-95 fade-in"
//                                 alt={product.productName}
//                             />
//                         </div>

//                         {/* DANH SÁCH ẢNH PHỤ  */}
//                         {allImages.length > 1 && (
//                             <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar px-1 justify-center">
//                                 {allImages.map((img, idx) => (
//                                     <button
//                                         key={idx}
//                                         onMouseEnter={() => setActiveIndex(idx)}
//                                         className={`w-14 h-14 lg:w-16 lg:h-16 flex-shrink-0 rounded-xl border-2 transition-all overflow-hidden ${activeIndex === idx
//                                                 ? "border-indigo-600 shadow-md scale-110"
//                                                 : "border-transparent opacity-50 hover:opacity-100"
//                                             }`}
//                                     >
//                                         <img src={img} className="w-full h-full object-cover" alt={`sub-${idx}`} />
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* CỘT PHẢI: Thông tin tóm tắt */}
//                     <div className="col-span-12 lg:col-span-7 flex flex-col space-y-8 py-2">

//                         {/* Tên sản phẩm */}
//                         <div className="border-l-4 border-indigo-500 pl-5">
//                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tên sản phẩm</p>
//                             <h1 className="text-2xl lg:text-4xl font-black text-slate-900 leading-tight">
//                                 {product.productName}
//                             </h1>
//                         </div>

//                         {/* Giá  */}
//                         <div className="border-l-4 border-rose-500 pl-5">
//                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Giá bán</p>
//                             <div className="flex items-baseline gap-1">
//                                 <span className="text-4xl lg:text-5xl font-black text-rose-600 tracking-tighter">
//                                     {product.salePrice?.toLocaleString('vi-VN')}
//                                 </span>
//                                 <span className="text-2xl font-bold text-rose-600 underline uppercase">đ</span>
//                             </div>
//                         </div>

//                         {/* Điều khiển số lượng & Tồn kho */}
//                         <div className="space-y-6 pt-4">
//                             <div className="space-y-3">
//                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số lượng mua</p>
//                                 <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-sm w-fit h-12">
//                                     <button
//                                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                                         className="h-full px-4 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600"
//                                     >
//                                         <Minus size={16} strokeWidth={3} />
//                                     </button>
//                                     <span className="w-12 text-center font-black text-slate-900 text-lg">{quantity}</span>
//                                     <button
//                                         onClick={() => setQuantity(quantity + 1)}
//                                         className="h-full px-4 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600"
//                                     >
//                                         <Plus size={16} strokeWidth={3} />
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-2 px-1">
//                                 <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
//                                     <Box size={16} strokeWidth={2.5} />
//                                 </div>
//                                 <p className="text-[13px] font-bold text-slate-500">
//                                     Tồn kho: <span className="text-slate-950 font-black">{product.stockQuantity}</span> sản phẩm
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Cụm nút bấm */}
//                         <div className="flex flex-col sm:flex-row gap-4 pt-6">
//                             <button
//                                 onClick={handleAddToCart}
//                                 className="flex-1 h-14 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all active:scale-95"
//                             >
//                                 <ShoppingCart size={20} strokeWidth={2.5} /> Thêm vào giỏ
//                             </button>
//                             <button
//                                 className="flex-[1.2] h-14 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
//                             >
//                                 <Zap size={20} fill="currentColor" /> Mua ngay
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* 2. KHUNG CHI TIẾT SẢN PHẨM */}
//             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8 lg:p-12">
//                 <div className="flex items-center gap-2 border-l-4 border-indigo-500 pl-5 mb-8">
//                     <FileText size={18} className="text-indigo-500" strokeWidth={2.5} />
//                     <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Thông tin chi tiết</h3>
//                 </div>
//                 <div className="pl-5">
//                     <p className="text-[15px] text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
//                         {product.specifications?.description || "Thông tin đang được cập nhật..."}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };


"use client";
import React, { useState, useEffect } from "react";
import { Box, FileText, ShoppingCart, Plus, Minus, Zap } from "lucide-react";
import { IProduct } from "../../product.types";
import toast from "react-hot-toast";

export const ProductDetailContent = ({ product }: { product: IProduct }) => {
    const [quantity, setQuantity] = useState(1);
    const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean) as string[];
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    // FIX 1: Tách riêng logic cuộn lên đầu trang để chạy đúng 1 lần duy nhất
    useEffect(() => {
        window.scrollTo(0, 0); // Ép về tọa độ 0 ngay lập tức
    }, []);

    // Logic tự động chuyển ảnh
    useEffect(() => {
        if (!isAutoPlay || allImages.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % allImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isAutoPlay, allImages.length]);

    const activeImg = allImages[activeIndex] || "/img/placeholder.svg";

    const handleAddToCart = () => {
        toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, {
            style: { borderRadius: '15px', background: '#1e293b', color: '#fff', fontWeight: 'bold' }
        });
    };

    return (
        /* 
           FIX 2: Chỉnh pt-[64px] (độ cao Header chuẩn) và loại bỏ space-y-6 ở ngoài 
        */
        <div className="max-w-[1200px] mx-auto pt-[64px] lg:pt-[70px] pb-10 px-4 animate-in fade-in duration-700">

            {/* 
               FIX 3: Loại bỏ mt-2 và giảm p-10 xuống p-8 để kéo nội dung lên 
            */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-6 lg:p-8">
                <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* CỘT TRÁI */}
                    <div
                        className="col-span-12 lg:col-span-5 space-y-4" // Giảm space-y-6 xuống 4
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                    >
                        <div className="w-full aspect-square bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-inner">
                            <img
                                key={activeImg}
                                src={activeImg}
                                className="w-full h-full object-cover transition-all duration-700 animate-in zoom-in-95 fade-in"
                                alt={product.productName}
                            />
                        </div>

                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar px-1 justify-center">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        className={`w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0 rounded-xl border-2 transition-all overflow-hidden ${activeIndex === idx
                                            ? "border-indigo-600 shadow-md scale-110"
                                            : "border-transparent opacity-50 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt={`sub-${idx}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CỘT PHẢI: GIẢM CÁC KHOẢNG CÁCH DỌC ĐỂ KÉO NÚT LÊN */}
                    <div className="col-span-12 lg:col-span-7 flex flex-col space-y-6 py-1"> {/* Giảm space-y-8 xuống 6 */}

                        {/* Tên sản phẩm */}
                        <div className="border-l-4 border-indigo-500 pl-5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tên sản phẩm</p>
                            <h2 className="text-xl lg:text-3xl font-black text-slate-900 leading-tight ">
                                {product.productName}
                            </h2>
                        </div>

                        {/* Giá */}
                        <div className="border-l-4 border-rose-500 pl-5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Giá bán</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl lg:text-4xl font-black text-rose-600 tracking-tighter">
                                    {product.salePrice?.toLocaleString('vi-VN')}
                                </span>
                                <span className="text-xl font-bold text-rose-600 underline ">đ</span>
                            </div>
                        </div>

                        {/* Số lượng & Tồn kho */}
                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Số lượng mua</p>
                                <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-sm w-fit h-11">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-full px-4 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600"
                                    >
                                        <Minus size={14} strokeWidth={3} />
                                    </button>
                                    <span className="w-10 text-center font-black text-slate-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-full px-4 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600"
                                    >
                                        <Plus size={14} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-1">
                                <Box size={14} className="text-indigo-600" />
                                <p className="text-[14px] font-bold text-slate-500">
                                    Tồn kho: <span className="text-slate-950 font-black">{product.stockQuantity}</span>
                                </p>
                            </div>
                        </div>

                        {/* Cụm nút bấm - Bây giờ sẽ hiển thị cao hơn */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 h-12 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                            >
                                <ShoppingCart size={18} strokeWidth={2.5} /> Thêm vào giỏ
                            </button>
                            <button
                                className="flex-[1.2] h-12 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                            >
                                <Zap size={18} fill="currentColor" /> Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* THÔNG TIN CHI TIẾT */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8 mt-6">
                <div className="flex items-center gap-2 border-l-4 border-indigo-500 pl-5 mb-6">
                    <FileText size={18} className="text-indigo-500" strokeWidth={2.5} />
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Thông tin chi tiết</h3>
                </div>
                <div className="pl-5">
                    <p className="text-[14px] text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                        {product.specifications?.description || "Thông tin đang được cập nhật..."}
                    </p>
                </div>
            </div>
        </div>
    );
};
