// import React, { useState } from 'react';
// import { PlusCircle, DollarSign, Truck } from 'lucide-react';
// import { CreateShippingInput } from '@/features/shipping/shipping.types';

// interface ShippingFormProps {
//     onAdd: (data: CreateShippingInput) => void;
// }

// export const ShippingForm = ({ onAdd }: ShippingFormProps) => {
//     const [formData, setFormData] = useState({ minAmount: '', fee: '' });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!formData.minAmount || !formData.fee) return;

//         onAdd({
//             minAmount: Number(formData.minAmount),
//             fee: Number(formData.fee)
//         });

//         setFormData({ minAmount: '', fee: '' });
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm mb-8">
//             <h3 className="text-lg font-black mb-5 flex items-center gap-2 text-slate-800">
//                 <PlusCircle className="text-orange-500" size={22} />
//                 THÊM CẤU HÌNH PHÍ SHIP
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//                 <div className="space-y-2">
//                     <label className="text-[13px] font-black text-slate-500 ml-1 uppercase tracking-wider">Tổng tiền từ (₫)</label>
//                     <div className="relative group">
//                         <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
//                         <input
//                             type="number"
//                             value={formData.minAmount}
//                             onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
//                             placeholder="Ví dụ: 500000"
//                             className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold"
//                         />
//                     </div>
//                 </div>
//                 <div className="space-y-2">
//                     <label className="text-[13px] font-black text-slate-500 ml-1 uppercase tracking-wider">Phí vận chuyển (₫)</label>
//                     <div className="relative group">
//                         <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
//                         <input
//                             type="number"
//                             value={formData.fee}
//                             onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
//                             placeholder="0 = Miễn phí"
//                             className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold"
//                         />
//                     </div>
//                 </div>
//                 <div className="flex items-end">
//                     <button
//                         type="submit"
//                         className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200/50 uppercase tracking-widest text-sm"
//                     >
//                         Lưu cấu hình
//                     </button>
//                 </div>
//             </div>
//         </form>
//     );
// };


// components/admin/shipping/ShippingForm.tsx
import React, { useState } from 'react';
import { PlusCircle, DollarSign, Truck, Plus } from 'lucide-react'; // Import thêm icon Plus
import { CreateShippingInput } from '@/features/shipping/shipping.types';

interface ShippingFormProps {
    onAdd: (data: CreateShippingInput) => void;
}

export const ShippingForm = ({ onAdd }: ShippingFormProps) => {
    const [formData, setFormData] = useState({ minAmount: '', fee: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.minAmount || !formData.fee || Number(formData.minAmount) < 0 || Number(formData.fee) < 0) return;

        onAdd({
            minAmount: Number(formData.minAmount),
            fee: Number(formData.fee)
        });

        setFormData({ minAmount: '', fee: '' });
    };
    
    // Hàm xử lý chỉ cho phép nhập số dương hoặc chuỗi rỗng
    const handleInputChange = (field: string, value: string) => {
        if (value === "" || Number(value) >= 0) {
            setFormData({ ...formData, [field]: value });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm mb-8">
            <h3 className="text-lg font-black mb-5 flex items-center gap-2 text-slate-800">
                <PlusCircle className="text-orange-500" size={22} />
                THÊM CẤU HÌNH PHÍ SHIP
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                    <label className="text-[13px] font-black text-slate-500 ml-1 uppercase tracking-wider">Tổng tiền từ (₫)</label>
                    <div className="relative group">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                            type="number"
                            min="0"
                            value={formData.minAmount}
                            onChange={(e) => handleInputChange('minAmount', e.target.value)}
                            placeholder="Ví dụ: 500000"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[13px] font-black text-slate-500 ml-1 uppercase tracking-wider">Phí vận chuyển (₫)</label>
                    <div className="relative group">
                        <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                            type="number"
                            min="0"
                            value={formData.fee}
                            onChange={(e) => handleInputChange('fee', e.target.value)}
                            placeholder="0 = Miễn phí"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold"
                        />
                    </div>
                </div>
                <div className="flex items-end">
                    {/* NÚT ĐÃ ĐƯỢC CẬP NHẬT GIAO DIỆN CHUẨN MẪU */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[#5B4EFA] text-white font-bold py-3.5 rounded-2xl hover:bg-[#4a3dd6] transition-all shadow-md hover:shadow-lg shadow-[#5B4EFA]/30 tracking-wide text-[14px]"
                    >
                        <Plus size={20} strokeWidth={3} />
                        THÊM CẤU HÌNH
                    </button>
                </div>
            </div>
        </form>
    );
};