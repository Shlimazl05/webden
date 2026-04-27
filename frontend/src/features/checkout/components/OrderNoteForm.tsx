



import React from 'react';
import { FileText } from 'lucide-react';

interface Props {
    note: string;
    onChange: (value: string) => void;
}

export const OrderNoteForm = ({ note, onChange }: Props) => {
    return (
        <div className="space-y-4">
            {/* Tiêu đề - Giữ màu Indigo để đồng bộ hoặc Amber nếu muốn phân biệt nhẹ */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-amber-500 rounded-full"></div>
                <h2 className="text-[15px] font-bold text-slate-800">
                    Ghi chú
                </h2>
            </div>

            {/* Khung ghi chú đồng bộ với DeliveryInfoForm */}
            <div className="bg-[#F8FAFC] rounded-[24px] p-6 border border-slate-50">
                <div className="flex items-start gap-2 group">
                    {/* Icon ngang hàng với nhãn */}
                    <FileText className="text-amber-500/70 flex-shrink-0 mt-0.5" size={18} />

                    <textarea
                        placeholder="Thêm ghi chú"
                        className="flex-1 bg-transparent border-none outline-none font-bold text-slate-700 placeholder-slate-300 text-[14px] ml-1 resize-none leading-relaxed min-h-[60px]"
                        value={note}
                        onChange={(e) => {
                            onChange(e.target.value);
                            // Tự động giãn chiều cao theo nội dung
                            e.target.style.height = 'inherit';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />
                </div>
            </div>

        </div>
    );
};