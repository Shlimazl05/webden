import React from 'react';
import { Trash2, Pencil, ArrowRight } from 'lucide-react';

interface Props {
    rules: any[];
    isLoading: boolean;
    onEdit: (rule: any) => void;
    onDelete: (id: string) => void;
    formatPrice: (price: number) => string;
}

export const ShippingRuleList = ({ rules, isLoading, onEdit, onDelete, formatPrice }: Props) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-7 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">Danh sách mốc phí</h3>
                <div className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {rules.length} CẤU HÌNH
                </div>
            </div>

            <div className="divide-y divide-slate-50">
                {isLoading ? (
                    <div className="p-20 text-center font-black text-slate-200 tracking-widest uppercase text-sm">Đang tải dữ liệu...</div>
                ) : (
                    rules.map((rule, index) => (
                        <div key={rule._id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                            <div className="flex items-center gap-8">
                                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex items-center gap-6">
                                    <div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đơn hàng từ</span>
                                        <p className="text-lg font-black text-slate-900 tracking-tight">{formatPrice(rule.minAmount)}</p>
                                    </div>
                                    <ArrowRight className="text-slate-200" size={20} />
                                    <div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phí ship</span>
                                        <p className={`text-lg font-black tracking-tight ${rule.fee === 0 ? "text-emerald-500" : "text-orange-500"}`}>
                                            {rule.fee === 0 ? "Miễn phí" : formatPrice(rule.fee)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* NÚT THAO TÁC  */}
                            <div className="flex items-center gap-3">
                                {/* Nút Sửa: Tông màu Indigo (Xanh tím) */}
                                <button
                                    onClick={() => onEdit(rule)}
                                    className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-500 rounded-xl  border border-indigo-100 shadow-sm hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
                                    title="Chỉnh sửa"
                                >
                                    <Pencil size={18} strokeWidth={2.5} />
                                </button>

                                {/* Nút Xóa: Tông màu Rose (Hồng đỏ) */}
                                <button
                                    onClick={() => onDelete(rule._id)}
                                    className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl  border border-rose-100 shadow-sm hover:bg-rose-600 hover:text-white transition-all active:scale-95"
                                    title="Xóa"
                                >
                                    <Trash2 size={18} strokeWidth={2.5} />
                                </button>
                            </div>

                        </div>
                    ))
                )}
                {!isLoading && rules.length === 0 && (
                    <div className="p-20 text-center font-bold text-slate-300 italic text-sm">Chưa có cấu hình nào.</div>
                )}
            </div>
        </div>
    );
};