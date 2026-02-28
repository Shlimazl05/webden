"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Lamp, LampCeiling, LampWallUp, LampDesk, 
  Sparkles, Lightbulb, Gem, Focus 
} from 'lucide-react';
import { CategoryItem } from './CategoryItem';
import { ICategory } from '../../category.types';

const getFallbackIcon = (iconName: string | undefined) => {
  const props = { size: 36, strokeWidth: 1.5, className: "transition-transform duration-500" };
  switch (iconName) {
    case 'LampWallUp': return <LampWallUp {...props} className="text-indigo-500" />;
    case 'Gem': return <Gem {...props} className="text-cyan-500" />;
    case 'Lightbulb': return <Lightbulb {...props} className="text-yellow-500" />;
    case 'LampCeiling': return <LampCeiling {...props} className="text-pink-500" />;
    case 'LampDesk': return <LampDesk {...props} className="text-emerald-500" />;
    case 'Lamp': return <Lamp {...props} className="text-amber-600" />;
    case 'Sparkles': return <Sparkles {...props} className="text-purple-500" />;
    case 'Focus': return <Focus {...props} className="text-blue-500" />;
    default: return <Lamp {...props} className="text-slate-400" />;
  }
};

export const CategoryGrid = () => {
  const categories: (Partial<ICategory> & { imageUrl?: string })[] = [
    { _id: '1', name: 'Đèn tường', slug: 'den-tuong', iconName: 'LampWallUp', imageUrl: '' },
    { _id: '2', name: 'Đèn ốp trần pha lê', slug: 'den-op-tran-pha-le', iconName: 'Gem', imageUrl: '' },
    { _id: '3', name: 'Đèn ốp trần LED', slug: 'den-op-tran-led', iconName: 'Lightbulb', imageUrl: '' },
    { _id: '4', name: 'Đèn thả', slug: 'den-tha', iconName: 'LampCeiling', imageUrl: '' },
    { _id: '5', name: 'Đèn bàn', slug: 'den-ban', iconName: 'LampDesk', imageUrl: '' },
    { _id: '6', name: 'Đèn chùm cổ điển', slug: 'den-chum-co-dien', iconName: 'Lamp', imageUrl: '' },
    { _id: '7', name: 'Đèn chùm hiện đại', slug: 'den-chum-hien-dai', iconName: 'Sparkles', imageUrl: '' },
    { _id: '8', name: 'Đèn chiếu tường', slug: 'den-chieu-tuong', iconName: 'Focus', imageUrl: '' },
  ];

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white">
        <h2 className="text-sm font-black text-indigo-900 uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
          Danh mục sản phẩm
        </h2>
        <Link href="/categories" className="text-[11px] font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
          Tất cả danh mục
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 divide-x divide-slate-50">
        {categories.map((cat) => (
          <CategoryItem 
            key={cat._id} 
            category={cat} 
            fallbackIcon={getFallbackIcon(cat.iconName)} 
          />
        ))}
      </div>
    </div>
  );
};