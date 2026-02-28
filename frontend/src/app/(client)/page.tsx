
// import React from 'react';
// import HeroBanner from "@/features/home/components/HeroBanner";
// import { CategoryGrid } from "@/features/category/components/client/CategoryGrid";
// // import ProductList from "@/features/product/components/client/ProductList";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-[#fcfcfd]">
//       <div className="max-w-[1300px] mx-auto px-6 pb-24 space-y-10">
        
//         {/* 1. Banner quảng bá */}
//         <section className="pt-8">
//           <HeroBanner />
//         </section>

//         {/* 2. Danh mục Grid (Kiểu Shopee Card) */}
//         <section>
//           <CategoryGrid />
//         </section>

//         {/* 3. Danh sách sản phẩm (Bố cục tràn trang) */}
//         <section className="bg-white rounded-[40px] p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.02)] border border-slate-50">
//           <div className="flex items-center justify-between mb-12 border-b border-slate-50 pb-8">
//             <div>
//               <h2 className="text-3xl font-black text-indigo-900 uppercase tracking-tighter">
//                 Sản phẩm nổi bật
//               </h2>
//               <p className="text-sm text-slate-400 font-medium mt-1">
//                 Những thiết kế ánh sáng bán chạy nhất trong tháng này
//               </p>
//             </div>
            
//             <button className="px-6 py-2.5 rounded-full bg-slate-50 text-xs font-black text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all uppercase tracking-widest">
//                 Lọc sản phẩm
//             </button>
//           </div>

//           {/* Product List */}
//           <div className="min-h-[500px]">
//             {/* <ProductList /> */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {/* Mockup sản phẩm */}
//                 {[1,2,3,4].map(i => (
//                     <div key={i} className="aspect-[3/4] bg-slate-50 rounded-[32px] animate-pulse" />
//                 ))}
//             </div>
//           </div>
//         </section>

//       </div>
//     </main>
//   );
// }

import React from 'react';
import HeroBanner from "@/features/home/components/HeroBanner";
import { CategoryGrid } from "@/features/category/components/client/CategoryGrid";
// import ProductList from "@/features/product/components/client/ProductList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fcfcfd]">
      <div className="max-w-[1300px] mx-auto px-6 pb-24 space-y-10">
        
        {/* 1. Banner quảng bá (Hero Section) */}
        <section className="pt-8">
          <HeroBanner />
        </section>

        {/* 2. Danh mục sản phẩm (Thay thế hoàn toàn Sidebar) */}
        <section>
          <CategoryGrid />
        </section>

        {/* 3. Khu vực sản phẩm - Giờ đã được mở rộng tối đa bề ngang */}
        <section className="bg-white rounded-[40px] p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.02)] border border-slate-50">
          <div className="flex items-center justify-between mb-12 border-b border-slate-50 pb-8">
            <h2 className="text-3xl font-black text-indigo-900 uppercase tracking-tighter">
              Sản phẩm mới nhất
            </h2>
            {/* Chỗ này sau này ní có thể thêm nút "Lọc" hoặc "Sắp xếp" */}
          </div>

          {/* Danh sách sản phẩm 4 cột (Grid) */}
          <div className="min-h-[600px]">
             {/* <ProductList /> */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Mockup sản phẩm mẫu */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-[3/4] bg-slate-50 rounded-[32px] animate-pulse" />
                ))}
             </div>
          </div>
        </section>

      </div>
    </main>
  );
}