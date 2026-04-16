// "use client";
// import React from 'react';
// import { useVisualSearchStore } from '../store/useVisualSearchStore';
// import { SearchX, Camera, ArrowLeft } from 'lucide-react';
// import { ProductList } from '@/features/product/components/client/ProductList';
// import Link from 'next/link';

// export const VisualSearchResultContent = () => {
//     const { results, previewImage } = useVisualSearchStore();

//     return (
//         <main className="min-h-screen bg-slate-50/50 pt-28 pb-20 px-4 md:px-10">
//             <div className="max-w-[1400px] mx-auto bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden p-8 md:p-16">

//                 {/* HEADER: HIỂN THỊ ẢNH ĐÃ TÌM KIẾM */}
//                 <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16">
//                     {previewImage && (
//                         <div className="relative shrink-0">
//                             <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
//                                 <img src={previewImage} alt="Search" className="w-full h-full object-cover" />
//                                 <div className="absolute bottom-0 right-0 bg-amber-500 p-2 rounded-tl-xl text-white">
//                                     <Camera size={16} />
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     <div className="space-y-2">
//                         <div className="flex items-center gap-3">
//                             <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">Visual AI Search</span>
//                         </div>
//                         <h1 className="text-3xl md:text-4xl font-black text-[#2D2D8A] tracking-tight">
//                             Kết quả tìm kiếm hình ảnh
//                         </h1>
//                         <p className="text-[15px] font-bold text-slate-400 tracking-[0.2em] uppercase">
//                             Tìm thấy {results.length} mẫu thiết kế tương đồng
//                         </p>
//                     </div>
//                 </div>

//                 {/* DANH SÁCH KẾT QUẢ */}
//                 {results.length > 0 ? (
//                     <ProductList products={results} loading={false} />
//                 ) : (
//                     <div className="py-20 flex flex-col items-center justify-center text-center">
//                         <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
//                             <SearchX size={32} className="text-slate-200" />
//                         </div>
//                         <h2 className="text-lg font-bold text-slate-900 uppercase">Không tìm thấy sản phẩm</h2>
//                         <p className="text-slate-400 text-sm mt-2 font-medium">Hãy thử lại với một góc chụp khác rõ ràng hơn</p>
//                         <Link href="/" className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold">Về trang chủ</Link>
//                     </div>
//                 )}
//             </div>
//         </main>
//     );
// };

"use client";
import React from 'react';
import { useVisualSearchStore } from '../store/useVisualSearchStore';
import { SearchX, Camera, ArrowLeft, LayoutGrid } from 'lucide-react';
import { ProductList } from '@/features/product/components/client/ProductList';
import Link from 'next/link';

export const VisualSearchResultContent = () => {
    const { results, previewImage, categoryName } = useVisualSearchStore();

    return (
        <main className="min-h-screen bg-slate-50/50 pt-16 pb-20 px-4 md:px-10 font-sans">
            <div className="max-w-[1400px] mx-auto bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden p-6 md:p-12">

                <div className="flex flex-col md:flex-row items-center gap-6 mb-10 border-b border-slate-50 pb-10">

                    {/* --- SỬA Ở ĐÂY: Chỉ render khung ảnh nếu có previewImage --- */}
                    {previewImage && (
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-100">
                                <img
                                    src={previewImage}
                                    alt="Search Query"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 right-0 bg-amber-500 p-1.5 rounded-tl-xl text-white">
                                    <Camera size={14} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="text-center md:text-left space-y-1">
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-full">Visual AI Search</span>
                            {categoryName && (
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                                    <LayoutGrid size={10} />
                                    Danh mục: {categoryName}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-[#2D2D8A] tracking-tighter uppercase">
                            Kết quả tìm kiếm hình ảnh
                        </h1>
                        <p className="text-[13px] font-bold text-slate-400 tracking-[0.15em] uppercase">
                            Hệ thống AI nhận diện và tìm thấy {results.length} mẫu đèn tương đồng
                        </p>
                    </div>

                    <Link href="/" className="md:ml-auto flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-full text-slate-500 hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-widest">
                        <ArrowLeft size={16} /> Quay lại
                    </Link>
                </div>

                <div className="relative">
                    {results.length > 0 ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <ProductList products={results} loading={false} />
                        </div>
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <SearchX size={32} className="text-slate-200" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 uppercase">Không có kết quả phù hợp</h2>
                            <p className="text-slate-400 text-sm mt-2 font-medium italic">Hãy thử tải lại trang hoặc tìm kiếm với ảnh khác</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};