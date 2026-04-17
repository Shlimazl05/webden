import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export const EditShippingModal = ({ isOpen, onClose, onUpdate, initialData }: any) => {
    const [minAmount, setMinAmount] = useState(0);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        if (initialData) {
            setMinAmount(initialData.minAmount);
            setFee(initialData.fee);
        }
    }, [initialData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-[450px] rounded-3xl p-8 shadow-2xl space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-900 uppercase">Sửa cấu hình phí</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl  transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Đơn hàng từ (VNĐ)</label>
                        <input
                            type="number"
                            className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl  outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                            value={minAmount}
                            onChange={(e) => setMinAmount(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Phí vận chuyển (VNĐ)</label>
                        <input
                            type="number"
                            className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl  outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                            value={fee}
                            onChange={(e) => setFee(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button onClick={onClose} className="flex-1 h-12 font-bold text-slate-400 hover:bg-slate-50 rounded-xl ">HỦY</button>
                    <button
                        onClick={() => onUpdate(initialData._id, { minAmount, fee })}
                        className="flex-[1.5] h-12 bg-indigo-600 text-white rounded-xl  font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                        CẬP NHẬT
                    </button>
                </div>
            </div>
        </div>
    );
};