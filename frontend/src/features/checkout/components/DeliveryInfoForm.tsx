

import React from 'react';
import { Phone, MapPin, User } from 'lucide-react';

interface Props {
    recipientName: string;
    phone: string;
    address: string;
    onChange: (field: "recipientName" | "phone" | "address", value: string) => void;
}

export const DeliveryInfoForm = ({ recipientName, phone, address, onChange }: Props) => {
    return (
        <div className="space-y-4">
            {/* Tiêu đề phần */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                <h2 className="text-[15px] font-bold text-slate-800">
                    Thông tin giao nhận
                </h2>
            </div>

            <div className="bg-[#F8FAFC] rounded-[24px] p-6 space-y-5 border border-slate-50">

                {/* 1. Họ tên người nhận */}
                <div className="flex items-center gap-2 group">
                    <User className="text-indigo-500/70 flex-shrink-0" size={18} />
                    <span className="text-[13px] font-medium text-slate-600 whitespace-nowrap">
                        Tên người nhận:
                    </span>
                    <input
                        type="text" required
                        placeholder="Nhập tên người nhận"
                        className="flex-1 bg-transparent border-none outline-none font-bold text-slate-700 placeholder-slate-300 text-[14px] ml-1"
                        value={recipientName}
                        onChange={(e) => onChange("recipientName", e.target.value)}
                    />
                </div>

                <div className="h-[1px] bg-slate-100 w-full"></div>

                {/* 2. Số điện thoại */}
                <div className="flex items-center gap-2 group">
                    <Phone className="text-emerald-500/70 flex-shrink-0" size={18} />
                    <span className="text-[13px] font-medium text-slate-600 whitespace-nowrap">
                        Số điện thoại:
                    </span>
                    <input
                        type="tel" required
                        placeholder="Nhập số điện thoại"
                        className="flex-1 bg-transparent border-none outline-none font-bold text-slate-700 placeholder-slate-300 text-[14px] ml-1"
                        value={phone}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            onChange("phone", value);
                        }}
                    />
                </div>

                <div className="h-[1px] bg-slate-100 w-full"></div>

                {/* 3. Địa chỉ */}
                <div className="flex items-start gap-2 group">
                    <MapPin className="text-rose-500/70 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[13px] font-medium text-slate-600 whitespace-nowrap mt-0.5">
                        Địa chỉ:
                    </span>
                    <textarea
                        required rows={1}
                        placeholder="Nhập địa chỉ"
                        className="flex-1 bg-transparent border-none outline-none font-bold text-slate-700 placeholder-slate-300 resize-none text-[14px] ml-1 leading-relaxed"
                        value={address}
                        onChange={(e) => {
                            onChange("address", e.target.value);
                            // Tự động tăng chiều cao textarea khi gõ nhiều
                            e.target.style.height = 'inherit';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />
                </div>
            </div>
        </div>
    );
};