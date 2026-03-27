

// // features/cart/components/ShippingStepper.tsx
// import React from 'react';
// import { Check } from 'lucide-react';

// interface ShippingStepperProps {
//     rules: any[];
//     subTotal: number;
// }

// export const ShippingStepper = ({ rules, subTotal }: ShippingStepperProps) => {
//     const sortedRules = [...rules].sort((a, b) => a.minAmount - b.minAmount);
//     if (sortedRules.length === 0) return null;

//     // Tính toán khoảng cách để đường kẻ không bị dư ra 2 đầu
//     const stepCount = sortedRules.length;
//     const lineOffset = `${100 / stepCount / 2}%`;

//     return (
//         <div className="w-full pt-4 pb-12 px-2">
//             <div className="relative flex justify-between items-start w-full">
//                 {/* Đường kẻ nền (Xám nhạt) - Chỉ nằm giữa các mốc */}
//                 <div
//                     className="absolute top-[21px] h-[3px] bg-slate-100 z-0"
//                     style={{ left: lineOffset, right: lineOffset }}
//                 />

//                 {/* Đường kẻ tiến trình (Xanh lá) */}
//                 <div
//                     className="absolute top-[21px] h-[3px] bg-emerald-500 z-0 transition-all duration-1000"
//                     style={{
//                         left: lineOffset,
//                         width: subTotal >= sortedRules[sortedRules.length - 1].minAmount
//                             ? `calc(100% - ${100 / stepCount}%)`
//                             : `${Math.max(0, (sortedRules.filter(r => subTotal >= r.minAmount).length - 1) / (stepCount - 1)) * (100 - (100 / stepCount))}%`
//                     }}
//                 />

//                 {sortedRules.map((rule) => {
//                     const isReached = subTotal >= rule.minAmount;
//                     return (
//                         <div key={rule._id} className="relative z-10 flex flex-col items-center flex-1">
//                             {/* Vòng tròn Icon chuẩn ảnh ní gửi */}
//                             <div className={`w-[45px] h-[45px] rounded-full flex items-center justify-center border-[2.5px] transition-all duration-500 bg-white
//                 ${isReached ? 'border-emerald-500 text-emerald-500' : 'border-slate-200 text-slate-200'}`}>
//                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isReached ? 'bg-emerald-50' : 'bg-transparent'}`}>
//                                     {isReached ? <Check size={20} strokeWidth={4} /> : <div className="w-2 h-2 rounded-full bg-slate-200" />}
//                                 </div>
//                             </div>

//                             {/* Text phía dưới */}
//                             <div className="mt-4 text-center">
//                                 <p className={`text-[12px] font-black uppercase mb-0.5 ${isReached ? 'text-emerald-600' : 'text-slate-400'}`}>
//                                     {rule.fee === 0 ? "Freeship" : `Phí: ${rule.fee.toLocaleString()}đ`}
//                                 </p>
//                                 <p className="text-[10px] text-slate-400 font-bold">Đơn từ {rule.minAmount.toLocaleString()}đ</p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// features/cart/components/ShippingStepper.tsx
import React from 'react';
import { Check } from 'lucide-react';

export const ShippingStepper = ({ rules, subTotal }: any) => {
    const sortedRules = [...rules].sort((a, b) => a.minAmount - b.minAmount);
    if (sortedRules.length === 0) return null;

    const activeStepsCount = sortedRules.filter(r => subTotal >= r.minAmount).length;
    const currentActiveIndex = activeStepsCount - 1;
    const stepCount = sortedRules.length;

    // Line offset để đường kẻ bắt đầu/kết thúc đúng giữa icon
    const lineOffset = `${100 / stepCount / 2}%`;

    return (
        <div className="w-full pt-10 pb-12 px-2">
            <div className="relative flex justify-between items-start w-full">

                {/* 1. ĐƯỜNG THẲNG NỀN XÁM */}
                <div
                    className="absolute top-[20px] h-[2px] bg-slate-100 z-0"
                    style={{ left: lineOffset, right: lineOffset }}
                />

                {/* 2. ĐƯỜNG TIẾN TRÌNH XANH */}
                <div
                    className="absolute top-[20px] h-[2px] bg-emerald-500 z-0 transition-all duration-1000 ease-out"
                    style={{
                        left: lineOffset,
                        width: subTotal >= sortedRules[sortedRules.length - 1].minAmount
                            ? `calc(100% - ${100 / stepCount}%)`
                            : `${Math.max(0, currentActiveIndex / (stepCount - 1)) * (100 - (100 / stepCount))}%`
                    }}
                />

                {sortedRules.map((rule, index) => {
                    const isReached = subTotal >= rule.minAmount;
                    const isPast = index < currentActiveIndex;
                    const isCurrent = index === currentActiveIndex;

                    return (
                        <div key={rule._id} className="relative z-10 flex flex-col items-center flex-1">

                            {/* VÒNG TRÒN DẤU TÍCH - Dùng bg-white để che đường kẻ */}
                            <div className={`
                                relative z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 bg-white
                                ${isReached
                                    ? 'border-emerald-500 text-emerald-500 shadow-sm'
                                    : 'border-slate-200 text-slate-200'}
                                ${isCurrent ? 'scale-110 ring-8 ring-emerald-50' : ''}
                            `}>
                                {isReached ? (
                                    <Check size={18} strokeWidth={3} className="animate-in zoom-in duration-300" />
                                ) : (
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                )}
                            </div>

                            {/* HIỂN THỊ PHÍ VẬN CHUYỂN GIẢM DẦN */}
                            <div className={`mt-5 text-center transition-all duration-500 ${isPast ? 'opacity-40' : 'opacity-100'}`}>
                                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                                    <p className={`text-[13px] font-bold tracking-tight
                                        ${isReached ? 'text-[#1E1B4B]' : 'text-slate-400'}`}>
                                        Phí: {rule.fee === 0 ? "0đ" : `${rule.fee.toLocaleString()}đ`}
                                    </p>
                                    {rule.fee === 0 && isReached && (
                                        <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-black uppercase">Freeship</span>
                                    )}
                                </div>

                                {/* Badge điều kiện đơn hàng */}
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                                    ${isReached
                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                        : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                    Đơn từ {rule.minAmount.toLocaleString()}đ
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};