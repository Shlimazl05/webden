

// features/cart/components/ShippingStepper.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface ShippingStepperProps {
    rules: any[];
    subTotal: number;
}

export const ShippingStepper = ({ rules, subTotal }: ShippingStepperProps) => {
    const sortedRules = [...rules].sort((a, b) => a.minAmount - b.minAmount);
    if (sortedRules.length === 0) return null;

    // Tính toán khoảng cách để đường kẻ không bị dư ra 2 đầu
    const stepCount = sortedRules.length;
    const lineOffset = `${100 / stepCount / 2}%`;

    return (
        <div className="w-full pt-4 pb-12 px-2">
            <div className="relative flex justify-between items-start w-full">
                {/* Đường kẻ nền (Xám nhạt) - Chỉ nằm giữa các mốc */}
                <div
                    className="absolute top-[21px] h-[3px] bg-slate-100 z-0"
                    style={{ left: lineOffset, right: lineOffset }}
                />

                {/* Đường kẻ tiến trình (Xanh lá) */}
                <div
                    className="absolute top-[21px] h-[3px] bg-emerald-500 z-0 transition-all duration-1000"
                    style={{
                        left: lineOffset,
                        width: subTotal >= sortedRules[sortedRules.length - 1].minAmount
                            ? `calc(100% - ${100 / stepCount}%)`
                            : `${Math.max(0, (sortedRules.filter(r => subTotal >= r.minAmount).length - 1) / (stepCount - 1)) * (100 - (100 / stepCount))}%`
                    }}
                />

                {sortedRules.map((rule) => {
                    const isReached = subTotal >= rule.minAmount;
                    return (
                        <div key={rule._id} className="relative z-10 flex flex-col items-center flex-1">
                            {/* Vòng tròn Icon chuẩn ảnh ní gửi */}
                            <div className={`w-[45px] h-[45px] rounded-full flex items-center justify-center border-[2.5px] transition-all duration-500 bg-white
                ${isReached ? 'border-emerald-500 text-emerald-500' : 'border-slate-200 text-slate-200'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isReached ? 'bg-emerald-50' : 'bg-transparent'}`}>
                                    {isReached ? <Check size={20} strokeWidth={4} /> : <div className="w-2 h-2 rounded-full bg-slate-200" />}
                                </div>
                            </div>

                            {/* Text phía dưới */}
                            <div className="mt-4 text-center">
                                <p className={`text-[12px] font-black uppercase mb-0.5 ${isReached ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {rule.fee === 0 ? "Freeship" : `Phí: ${rule.fee.toLocaleString()}đ`}
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold">Đơn từ {rule.minAmount.toLocaleString()}đ</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};