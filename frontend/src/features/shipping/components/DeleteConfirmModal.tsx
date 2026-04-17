// components/admin/modals/DeleteConfirmModal.tsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export const DeleteConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "XÁC NHẬN XÓA",
    message = "Hành động này sẽ xóa vĩnh viễn dữ liệu."
}: DeleteConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop: Giảm độ mờ (20%) và giảm blur xuống mức tối thiểu */}
            <div
                className="absolute inset-0 bg-slate-900/20 transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content: Thu nhỏ max-width xuống 340px, giảm padding */}
            <div className="relative bg-white w-full max-w-[340px] rounded-xl p-8 shadow-2xl transition-all scale-100 animate-in fade-in zoom-in duration-200 border border-slate-100">

                {/* Nút đóng nhỏ hơn */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-slate-300 hover:text-slate-500 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    {/* Icon nhỏ lại */}
                    <div className="w-16 h-16 bg-red-50 rounded-[24px] flex items-center justify-center mb-5">
                        <AlertTriangle size={32} className="text-[#E5484D]" strokeWidth={2.5} />
                    </div>

                    {/* Tiêu đề nhỏ lại */}
                    <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight uppercase">
                        {title}
                    </h3>

                    {/* Nội dung ngắn gọn */}
                    <p className="text-[14px] text-slate-500 font-bold leading-relaxed mb-8 px-2">
                        {message}
                    </p>

                    {/* Nút bấm thấp hơn và chữ nhỏ hơn */}
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-slate-100 text-slate-600 font-black py-3 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-wider text-[12px]"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="flex-1 bg-[#E5484D] text-white font-black py-3 rounded-2xl hover:bg-red-600 transition-all shadow-md shadow-red-100 uppercase tracking-wider text-[12px]"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};