"use client";
import React, { useState } from 'react';
import { useShipping } from '@/features/shipping/useShipping';
import { ShippingForm } from '@/features/shipping/components/ShippingForm';
import { DeleteConfirmModal } from '@/features/shipping/components/DeleteConfirmModal';
import { Trash2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ShippingPage() {
    const { rules, addRule, deleteRule, isLoading } = useShipping();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const requestDelete = (id: string) => {
        setSelectedRuleId(id); // Ở đây id chính là _id từ MongoDB
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedRuleId) {
            deleteRule(selectedRuleId);
            setSelectedRuleId(null);
        }
    };

    return (
        <div className="p-8 bg-[#F8FAFC] min-h-screen">
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Hành động này sẽ xóa vĩnh viễn cấu hình phí ship này khỏi hệ thống."
            />

            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500 rounded-lg text-white">
                        <ShieldCheck size={20} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Cấu hình vận chuyển</h1>
                </div>
                <p className="text-slate-500 font-bold ml-11">Tự động thay đổi phí giao hàng dựa trên giá trị giỏ hàng</p>
            </div>

            <div className="max-w-5xl">
                <ShippingForm onAdd={addRule} />

                <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-7 border-b border-slate-100 flex justify-between items-center bg-white">
                        <h3 className="font-black text-slate-800 text-lg uppercase">Danh sách mốc phí</h3>
                        <div className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black ring-4 ring-orange-50">
                            {rules.length} CẤU HÌNH
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {isLoading ? (
                            <div className="p-20 text-center font-black text-slate-300 tracking-widest uppercase">Đang tải dữ liệu...</div>
                        ) : (
                            rules.map((rule: any, index: number) => (
                                <div key={rule._id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                                    <div className="flex items-center gap-8">
                                        <div className="w-14 h-14 bg-slate-900 rounded-[20px] flex items-center justify-center font-black text-white shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">
                                            {index + 1}
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Đơn hàng từ</span>
                                                <p className="text-xl font-black text-slate-900 tracking-tight">{formatPrice(rule.minAmount)}</p>
                                            </div>
                                            <ArrowRight className="text-slate-300" />
                                            <div>
                                                <span className="text-[10px] font-black text-slate-400  tracking-[0.2em]">Phí ship</span>
                                                <p className={`text-xl font-black tracking-tight ${rule.fee === 0 ? "text-emerald-500" : "text-orange-500"}`}>
                                                    {rule.fee === 0 ? "Miễn phí" : formatPrice(rule.fee)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => requestDelete(rule._id)} // MongoDB dùng _id
                                        className="p-4 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all active:scale-90"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                </div>
                            ))
                        )}

                        {!isLoading && rules.length === 0 && (
                            <div className="p-20 text-center font-bold text-slate-400 italic">
                                Chưa có cấu hình phí vận chuyển nào.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}