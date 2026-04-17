import React from 'react';
import { Trophy, ShoppingCart } from 'lucide-react';

export const BestSellersList = ({ items, loading }: { items: any[], loading: boolean }) => {
    if (loading) return (
        <div className="flex-1 flex flex-col items-center justify-center p-10">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!items || items.length === 0) return (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-slate-400 font-bold text-xs uppercase">
            Chưa có dữ liệu bán hàng
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {items.map((item, index) => (
                <div key={item._id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
                    <div className="relative">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl  object-cover shadow-sm" />
                        <div className="absolute -top-2 -left-2 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                            {index + 1}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-black text-slate-800 text-[13px] line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors" title={item.name}
                        >{item.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                <ShoppingCart size={12} /> Đã bán: {item.totalSold}
                            </span>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};