import React from 'react';
import { Banknote, CreditCard } from 'lucide-react';
import { PaymentMethod } from '../checkout.types';

interface Props {
    value: PaymentMethod;
    onChange: (value: PaymentMethod) => void;
}

export const PaymentMethodForm = ({ value, onChange }: Props) => {
    return (
        <div className="space-y-6">

            <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                <h2 className="text-[15px] font-bold text-slate-800">
                    Phương thức thanh toán
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                {/* Lựa chọn 1: Thanh toán khi nhận hàng (COD) */}
                <label
                    className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${value === 'COD'
                            ? 'border-indigo-600 bg-indigo-50/50'
                            : 'border-slate-100 bg-[#F8FAFC] hover:border-indigo-200'
                        }`}
                >
                    <input
                        type="radio" name="paymentMethod"
                        value="COD"
                        checked={value === 'COD'}
                        onChange={() => onChange('COD')}
                        className="w-5 h-5 accent-indigo-600 flex-shrink-0 cursor-pointer"
                    />
                    <Banknote className={value === 'COD' ? 'text-indigo-600' : 'text-slate-400'} size={28} />
                    <div>
                        <span className="block text-[13px] font-bold text-slate-800  tracking-wide">
                            Thanh toán khi nhận hàng
                        </span>
                        <span className="block text-[11px] font-medium text-slate-500 mt-1">
                            Thanh toán bằng tiền mặt khi giao hàng (COD)
                        </span>
                    </div>
                </label>

                {/* Lựa chọn 2: Thanh toán trực tuyến */}
                <label
                    className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${value === 'SePay'
                            ? 'border-indigo-600 bg-indigo-50/50'
                            : 'border-slate-100 bg-[#F8FAFC] hover:border-indigo-200'
                        }`}
                >
                    <input
                        type="radio" name="paymentMethod"
                        value="ONLINE"
                        checked={value === 'SePay'}
                        onChange={() => onChange('SePay')}
                        className="w-5 h-5 accent-indigo-600 flex-shrink-0 cursor-pointer"
                    />
                    <CreditCard className={value === 'SePay' ? 'text-indigo-600' : 'text-slate-400'} size={28} />
                    <div>
                        <span className="block text-[13px] font-bold text-slate-800  tracking-wide">
                            Thanh toán trực tuyến
                        </span>
                        <span className="block text-[11px] font-medium text-slate-500 mt-1">
                            Quét mã QR tự động qua App Ngân hàng
                        </span>
                    </div>
                </label>
            </div>
        </div>
    );
};

