import React from 'react';
import { FileText } from 'lucide-react';

interface Props {
    note: string;
    onChange: (value: string) => void;
}

export const OrderNoteForm = ({ note, onChange }: Props) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-orange-400 rounded-full"></div>
                <h2 className="text-sm font-black tracking-widest uppercase text-slate-800">
                    Ghi chú từ khách
                </h2>
            </div>

            <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100/50 flex gap-4 items-start h-[calc(100%-60px)]">
                <FileText className="text-orange-400 mt-1 flex-shrink-0" size={20} />
                <textarea
                    placeholder='"Ví dụ: Giao hàng vào giờ hành chính..."'
                    className="w-full h-full min-h-[120px] bg-transparent border-none outline-none font-medium text-slate-600 placeholder-slate-400 italic resize-none"
                    value={note}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};