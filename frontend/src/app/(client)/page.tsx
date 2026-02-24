

import HeroBanner from "@/features/home/components/HeroBanner";
import CategorySidebar from "@/features/product/components/admin/CategorySidebar";
// import ProductList from "@/features/product/components/ProductList";

export default function HomePage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-20">
      <div className="mt-6">
        <HeroBanner />
      </div>
      
      <div className="flex gap-6 mt-8">
        <aside className="w-1/4">
          <CategorySidebar />
        </aside>
        
        <section className="w-3/4 bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <h2 className="font-bold text-xl mb-6 text-gray-800">Sản phẩm</h2>
          {/* <ProductList /> */}

        </section>
      </div>
    </div>
  );
}