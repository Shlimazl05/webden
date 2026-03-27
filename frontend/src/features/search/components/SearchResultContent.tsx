// "use client";
// import React from 'react';
// import Link from 'next/link';
// import { useSearch } from '../hooks/useSearch';
// import { ShoppingCart, SearchX, ArrowRight, Loader2 } from 'lucide-react';

// export const SearchResultContent = () => {
//     const { query, results, isLoading, count } = useSearch();

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-white flex flex-col items-center justify-center">
//                 <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
//                 <p className="text-slate-400 font-medium text-xs uppercase tracking-widest">Đang tìm đèn phù hợp...</p>
//             </div>
//         );
//     }

//     return (
//         <main className="min-h-screen bg-white">
//             {/* 1. Breadcrumb & Header */}
//             <div className="pt-32 pb-16 px-[50px] bg-slate-50/50 border-b border-slate-100">
//                 <div className="max-w-[1400px] mx-auto">
//                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
//                         <Link href="/" className="hover:text-indigo-600 transition-colors">Stellar Lights</Link>
//                         <span className="text-slate-200">/</span>
//                         <span className="text-slate-900">Tìm kiếm sản phẩm</span>
//                     </div>

//                     <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
//                         KẾT QUẢ CHO: <span className="text-indigo-600 italic">"{query}"</span>
//                     </h1>

//                     <div className="flex items-center gap-4">
//                         <div className="h-[2px] w-12 bg-amber-500"></div>
//                         <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
//                             Tìm thấy {count} sản phẩm 
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* 2. List Results */}
//             <div className="max-w-[1400px] mx-auto py-20 px-[50px]">
//                 {results.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
//                         {results.map((product) => (
//                             <div key={product._id} className="group">
//                                 {/* Ảnh - Bỏ bo góc theo style ní thích */}
//                                 <Link
//                                     href={`/products/${product._id}`}
//                                     className="relative aspect-[4/5] overflow-hidden bg-slate-100 block mb-6 border border-slate-100"
//                                 >
//                                     <img
//                                         src={product.imageUrl}
//                                         alt={product.productName}
//                                         className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                                     />
//                                     {/* Overlay khi hover */}
//                                     <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/5 transition-colors duration-500" />
//                                 </Link>

//                                 {/* Info */}
//                                 <div className="space-y-3">
//                                     <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
//                                         {(product.categoryId as any)?.name || "Bộ sưu tập mới"}
//                                     </p>

//                                     <h3 className="text-slate-900 font-bold text-base leading-tight uppercase tracking-tight line-clamp-2 min-h-[3rem]">
//                                         {product.productName}
//                                     </h3>

//                                     <div className="pt-4 flex items-center justify-between border-t border-slate-100">
//                                         <div className="flex flex-col">
//                                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Giá bán</span>
//                                             <p className="text-indigo-600 font-black text-xl">
//                                                 {product.salePrice?.toLocaleString('vi-VN')} <span className="text-xs">đ</span>
//                                             </p>
//                                         </div>

//                                         <button className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900 transition-all active:scale-90">
//                                             <ShoppingCart size={18} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     /* Trạng thái Không tìm thấy - Nền sáng */
//                     <div className="py-20 flex flex-col items-center justify-center text-center">
//                         <div className="w-32 h-32 bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
//                             <SearchX size={48} className="text-slate-200" strokeWidth={1} />
//                         </div>
//                         <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">
//                             Không tìm thấy đèn phù hợp
//                         </h2>
//                         <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed mb-10">
//                             Rất tiếc, chúng tôi không tìm thấy sản phẩm nào khớp với từ khóa <span className="text-slate-900 font-bold">"{query}"</span>.
//                             Hãy thử tìm kiếm với các từ khóa ngắn gọn hơn.
//                         </p>
//                         <Link
//                             href="/"
//                             className="px-12 py-4 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
//                         >
//                             Quay lại cửa hàng
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </main>
//     );
// };


// "use client";
// import React from 'react';
// import Link from 'next/link';
// import { useSearch } from '../hooks/useSearch';
// import { ShoppingCart, SearchX, Loader2 } from 'lucide-react';
// import { ProductList } from '@/features/product/components/client/ProductList'; 
// export const SearchResultContent = () => {
//     const { query, results, isLoading, count } = useSearch();

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-white flex flex-col items-center justify-center">
//                 <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
//                 <p className="text-slate-400 font-medium text-xs uppercase tracking-widest text-center">
//                     Đang tìm sản phẩm phù hợp...
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <main className="min-h-screen bg-white pt-32 pb-20 px-[50px]">
//             <div className="max-w-[1400px] mx-auto">

//                 {/* 1. Header (Vệt vàng) - Nằm sát vào viền của khung dưới */}
//                 <div className="relative inline-block z-10 translate-y-[2px]">
//                     {/* translate-y-[2px] để đè khít lên viền khung bên dưới */}
//                     <div className="absolute inset-0 bg-amber-400 -rotate-1 transform -translate-x-1"
//                         style={{ clipPath: 'polygon(0% 0%, 100% 5%, 95% 100%, 2% 90%)' }}>
//                     </div>

//                     <div className="relative z-10 p-4 pr-10">
//                         <h1 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tighter leading-none">
//                             Kết quả tìm kiếm cho: <span className="italic">"{query}"</span>
//                         </h1>
//                         <p className="text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] mt-2">
//                             Số sản phẩm: {count}
//                         </p>
//                     </div>
//                 </div>

//                 {/* 2. Khung bao quanh sản phẩm (Sát vào header trên) */}
//                 <div className="border-2 border-slate-900 p-6 md:p-10 min-h-[500px]">
//                     {results.length > 0 ? (
//                         /* Sử dụng chính ProductList của bạn */
//                         <ProductList products={results} loading={false} />
//                     ) : (
//                         <div className="h-full flex flex-col items-center justify-center py-20">
//                             <SearchX size={48} className="text-slate-200 mb-4" strokeWidth={1} />
//                             <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
//                                 Không tìm thấy kết quả phù hợp
//                             </h2>
//                             <Link href="/" className="mt-6 text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b border-indigo-600 pb-1">
//                                 Quay lại trang chủ
//                             </Link>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </main>
//     );
// };


"use client";
import React from 'react';
import { useSearch } from '../hooks/useSearch';
import { SearchX, Loader2, ArrowRight } from 'lucide-react';
import { ProductList } from '@/features/product/components/client/ProductList';

export const SearchResultContent = () => {
    const { query, results, isLoading, count } = useSearch();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Đang tìm kiếm...</p>
            </div>
        );
    }

    return (
        /* Nền xám nhạt bên ngoài để làm nổi bật khung trắng */
        <main className="min-h-screen bg-slate-50/50 pt-28 pb-20 px-4 md:px-10">

            {/* KHUNG CHÍNH: Bo góc cực lớn giống ảnh (rounded-[3rem]) */}
            <div className="max-w-[1400px] mx-auto bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden p-8 md:p-16">

                {/* HEADER: Tiêu đề và nút theo style trong ảnh */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl font-black text-[#2D2D8A]  tracking-tight">
                            Kết quả tìm kiếm: <span className=" italic">"{query}"</span>
                        </h1>
                        <p className="text-[15px] font-bold text-slate-400 tracking-[0.2em]">
                            Tìm thấy {count} sản phẩm phù hợp
                        </p>
                    </div>

                </div>

                {/* DANH SÁCH SẢN PHẨM */}
                {results.length > 0 ? (
                    <ProductList products={results} loading={false} />
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <SearchX size={32} className="text-slate-200" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 uppercase">Không tìm thấy sản phẩm</h2>
                        <p className="text-slate-400 text-sm mt-2">Hãy thử thay đổi từ khóa tìm kiếm của bạn</p>
                    </div>
                )}
            </div>
        </main>
    );
};