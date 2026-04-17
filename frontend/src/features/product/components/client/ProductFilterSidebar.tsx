
"use client";
import React from 'react';
import { Filter, DollarSign, RotateCcw } from 'lucide-react';

// Interface này phải khớp chính xác với những gì bạn truyền ở file page.tsx
interface FilterProps {
    count: number;
    selectedPrice: string;
    onPriceChange: (val: string) => void;
    onReset: () => void;
}

export const ProductFilterSidebar = ({
    count,
    selectedPrice,
    onPriceChange,
    onReset
}: FilterProps) => {

    const priceRanges = [
        { label: 'Dưới 1 triệu', value: '0-1000000' },
        { label: '1 - 5 triệu', value: '1000000-5000000' },
        { label: '5 - 10 triệu', value: '5000000-10000000' },
        { label: 'Trên 10 triệu', value: '10000000-up' },
    ];

    const hasFilter = selectedPrice !== '';

    return (
        <aside className="w-full lg:w-72 space-y-6">
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-8">

                {/* Header: Số lượng & Nút xóa lọc */}
                <div className="space-y-4 pb-4 border-b border-slate-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter size={18} className="text-indigo-600" />
                            <span className="font-black text-[12px] uppercase tracking-widest text-slate-800">Bộ lọc</span>
                        </div>
                        {hasFilter && (
                            <button
                                onClick={onReset}
                                className="text-[10px] font-bold text-rose-500 flex items-center gap-1 hover:underline uppercase tracking-tighter"
                            >
                                <RotateCcw size={12} /> Xóa lọc
                            </button>
                        )}
                    </div>

                    <div className="bg-slate-50 px-4 py-2 rounded-xl  border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Kết quả</span>
                        <span className="text-lg font-black text-indigo-600">
                            {count} <small className="text-[10px] text-slate-400 font-bold uppercase ml-1">Sản phẩm</small>
                        </span>
                    </div>
                </div>

                {/* Lọc theo Giá */}
                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-[12px] font-black text-indigo-900 uppercase tracking-tight">
                        <DollarSign size={15} /> Khoảng giá
                    </h3>
                    <div className="space-y-2">
                        {priceRanges.map((range) => (
                            <label key={range.value} className="flex items-center gap-3 group cursor-pointer">
                                <input
                                    type="radio"
                                    name="price"
                                    checked={selectedPrice === range.value}
                                    onChange={() => onPriceChange(range.value)}
                                    className="w-4 h-4 border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <span className={`text-sm font-bold transition-colors ${selectedPrice === range.value ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-800'
                                    }`}>
                                    {range.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};