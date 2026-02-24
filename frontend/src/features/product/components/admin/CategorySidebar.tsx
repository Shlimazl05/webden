import React from "react";
import { ChevronRight } from "lucide-react";

const categories = ["Đèn tường", "Đèn ốp trần pha lê", "Đèn ốp trần LED", "Đèn thả", "Đèn bàn", "Đèn chùm cổ điển", "Đèn chùm hiện đại", "Đèn chiếu tường"];

export default function CategorySidebar() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
      <h2 className="font-bold text-gray-800 mb-4 px-2">Danh mục sản phẩm</h2>
      <button className="w-full text-left bg-blue-600 text-white py-2.5 px-4 rounded-xl mb-3 text-sm font-medium shadow-md shadow-blue-100">
        Tất cả sản phẩm
      </button>
      <div className="space-y-1">
        {categories.map((cat) => (
          <button key={cat} className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
            <ChevronRight size={14} /> {cat}
          </button>
        ))}
      </div>
    </div>
  );
}