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
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                <h2 className="text-sm font-black tracking-widest uppercase text-slate-800">
                    Giao nhận & Liên hệ
                </h2>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-50 flex gap-4 items-start">
                <User className="text-indigo-500 mt-1" size={20} />
                <div className="w-full">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                        Họ và tên người nhận
                    </label>
                    <input
                        type="text" required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        className="w-full bg-transparent border-none outline-none font-bold text-slate-800 placeholder-slate-300"
                        value={recipientName}
                        onChange={(e) => onChange("recipientName", e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-50 flex gap-4 items-start">
                <Phone className="text-emerald-500 mt-1" size={20} />
                <div className="w-full">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                        Số điện thoại
                    </label>
                    <input
                        type="tel" required
                        placeholder="Ví dụ: 0987654321"
                        className="w-full bg-transparent border-none outline-none font-bold text-slate-800 placeholder-slate-300"
                        value={phone}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Chỉ cho phép nhập số (dùng regex loại bỏ ký tự không phải số)
                            const numericValue = value.replace(/[^0-9]/g, '');
                            onChange("phone", numericValue);
                        }}
                    />
                </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-50 flex gap-4 items-start">
                <MapPin className="text-rose-500 mt-1" size={20} />
                <div className="w-full">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                        Địa chỉ nhận hàng
                    </label>
                    <textarea
                        required rows={3}
                        placeholder="Nhập địa chỉ chi tiết (Số nhà, Đường, Phường, Quận, TP)"
                        className="w-full bg-transparent border-none outline-none font-bold text-slate-800 placeholder-slate-300 resize-none"
                        value={address}
                        onChange={(e) => onChange("address", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};