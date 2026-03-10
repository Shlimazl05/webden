// "use client";

// import React from 'react';
// import Link from 'next/link';
// import { 
//   Lamp, LampCeiling, LampWallUp, LampDesk, 
//   Sparkles, Lightbulb, Gem, Focus 
// } from 'lucide-react';
// import { CategoryItem } from './CategoryItem';
// import { ICategory } from '../../category.types';

// const getFallbackIcon = (iconName: string | undefined) => {
//   const props = { size: 36, strokeWidth: 1.5, className: "transition-transform duration-500" };
//   switch (iconName) {
//     case 'LampWallUp': return <LampWallUp {...props} className="text-indigo-500" />;
//     case 'Gem': return <Gem {...props} className="text-cyan-500" />;
//     case 'Lightbulb': return <Lightbulb {...props} className="text-yellow-500" />;
//     case 'LampCeiling': return <LampCeiling {...props} className="text-pink-500" />;
//     case 'LampDesk': return <LampDesk {...props} className="text-emerald-500" />;
//     case 'Lamp': return <Lamp {...props} className="text-amber-600" />;
//     case 'Sparkles': return <Sparkles {...props} className="text-purple-500" />;
//     case 'Focus': return <Focus {...props} className="text-blue-500" />;
//     default: return <Lamp {...props} className="text-slate-400" />;
//   }
// };

// export const CategoryGrid = () => {
//   const categories: (Partial<ICategory> & { imageUrl?: string })[] = [
//     { _id: '1', name: 'Đèn tường', slug: 'den-tuong', iconName: 'LampWallUp', imageUrl: '' },
//     { _id: '2', name: 'Đèn ốp trần pha lê', slug: 'den-op-tran-pha-le', iconName: 'Gem', imageUrl: '' },
//     { _id: '3', name: 'Đèn ốp trần LED', slug: 'den-op-tran-led', iconName: 'Lightbulb', imageUrl: '' },
//     { _id: '4', name: 'Đèn thả', slug: 'den-tha', iconName: 'LampCeiling', imageUrl: '' },
//     { _id: '5', name: 'Đèn bàn', slug: 'den-ban', iconName: 'LampDesk', imageUrl: '' },
//     { _id: '6', name: 'Đèn chùm cổ điển', slug: 'den-chum-co-dien', iconName: 'Lamp', imageUrl: '' },
//     { _id: '7', name: 'Đèn chùm hiện đại', slug: 'den-chum-hien-dai', iconName: 'Sparkles', imageUrl: '' },
//     { _id: '8', name: 'Đèn chiếu tường', slug: 'den-chieu-tuong', iconName: 'Focus', imageUrl: '' },
//   ];

//   return (
//     <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
//       <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white">
//         <h2 className="text-sm font-black text-indigo-900 uppercase tracking-[0.2em] flex items-center gap-3">
//           <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
//           Danh mục sản phẩm
//         </h2>
//         <Link href="/categories" className="text-[11px] font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
//           Tất cả danh mục
//         </Link>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 divide-x divide-slate-50">
//         {categories.map((cat) => (
//           <CategoryItem 
//             key={cat._id} 
//             category={cat} 
//             fallbackIcon={getFallbackIcon(cat.iconName)} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight, Lamp } from 'lucide-react';
// import { CategoryItem } from './CategoryItem';
// import { ICategory } from '../../category.types';
// import { categoryApi } from '../../api/category.admin.api';

// export const CategoryGrid = () => {
//   const [categories, setCategories] = useState<ICategory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // 1. Lấy dữ liệu thực từ API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // Lấy trang 1, giới hạn 20 danh mục, search trống, status là Active
//         const response = await categoryApi.getAll(1, 20, '', 'Active');
//         setCategories(response.categories || []);
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // 2. Logic điều hướng mũi tên
//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const scrollTo = direction === 'left'
//         ? scrollLeft - clientWidth / 2
//         : scrollLeft + clientWidth / 2;

//       scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
//     }
//   };

//   if (loading) return <div className="h-[250px] bg-slate-50 animate-pulse rounded-[40px]" />;
//   if (categories.length === 0) return null;

//   return (
//     <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden group/container relative">

//       {/* HEADER: Tiêu đề và Mũi tên điều hướng */}
//       <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white relative z-10">
//         <h2 className="text-sm font-black text-indigo-900 uppercase tracking-[0.2em] flex items-center gap-3">
//           <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
//           Danh mục sản phẩm
//         </h2>

//         {/* Cụm nút điều hướng */}
//         <div className="flex gap-2">
//           <button
//             onClick={() => scroll('left')}
//             className="p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90"
//           >
//             <ChevronLeft size={20} strokeWidth={3} />
//           </button>
//           <button
//             onClick={() => scroll('right')}
//             className="p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90"
//           >
//             <ChevronRight size={20} strokeWidth={3} />
//           </button>
//         </div>
//       </div>

//       {/* NỘI DUNG: Danh sách trượt ngang */}
//       <div
//         ref={scrollRef}
//         className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//       >
//         {categories.map((cat) => (
//           <div key={cat._id} className="flex-none w-1/2 md:w-1/4 lg:w-[12.5%] snap-start border-r border-slate-50 last:border-r-0">
//             <CategoryItem
//               category={{
//                 ...cat,
//                 imageUrl: cat.image // Map field image từ DB sang imageUrl của component
//               }}
//               fallbackIcon={<Lamp size={36} strokeWidth={1.5} className="text-slate-400" />}
//             />
//           </div>
//         ))}
//       </div>

//       {/* CSS ẩn thanh cuộn (Dành cho Chrome/Safari) */}
//       <style jsx global>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

"use client";

import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Lamp } from 'lucide-react';
import { CategoryItem } from './CategoryItem';
import { ICategory } from '../../category.types';
import { categoryApi } from '../../api/category.admin.api';

export const CategoryGrid = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll(1, 20, '', 'Active');
        setCategories(response.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="h-[250px] bg-slate-50 animate-pulse rounded-[40px]" />;
  if (categories.length === 0) return null;

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden group/container relative">

      {/* HEADER */}
      <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white relative z-10">
        <h2 className="text-sm font-black text-indigo-900 uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
          Danh mục sản phẩm
        </h2>
      </div>

      {/* KHU VỰC HIỂN THỊ */}
      <div className="relative">

        {/* Nút bên trái */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 z-20 p-2.5 rounded-full bg-white text-slate-400 shadow-xl border border-slate-100 
                     transition-all duration-300 opacity-0 group-hover/container:opacity-100 active:scale-90
                     top-[76px] -translate-y-1/2
                     hover:bg-indigo-600 hover:text-white hover:scale-110 hover:shadow-indigo-200"
        >
          <ChevronLeft size={22} strokeWidth={3} />
        </button>

        {/* Danh sách danh mục - Đã dãn px-14 */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full px-14 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <div key={cat._id} className="flex-none w-1/2 md:w-1/4 lg:w-[12.5%] snap-start border-r border-slate-50 last:border-r-0">
              <CategoryItem
                category={{ ...cat, imageUrl: cat.image }}
                fallbackIcon={<Lamp size={36} strokeWidth={1.5} className="text-slate-400" />}
              />
            </div>
          ))}
        </div>

        {/* Nút bên phải */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 z-20 p-2.5 rounded-full bg-white text-slate-400 shadow-xl border border-slate-100 
                     transition-all duration-300 opacity-0 group-hover/container:opacity-100 active:scale-90
                     top-[76px] -translate-y-1/2
                     hover:bg-indigo-600 hover:text-white hover:scale-110 hover:shadow-indigo-200"
        >
          <ChevronRight size={22} strokeWidth={3} />
        </button>
      </div>

      {/* CSS ẩn thanh cuộn an toàn hơn */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};
