

"use client";
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    // Bỏ backdrop-blur-md, hạ độ đậm nền xuống để thấy rõ phía sau hơn
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/25 animate-in fade-in duration-300">

      {/* Thu nhỏ max-w từ md (448px) xuống còn 360px để gọn gàng */}
      <div className="relative bg-white w-full max-w-[360px] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-50">

        {/* Nút đóng góc phải nhỏ hơn */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 text-slate-300 hover:text-slate-500 transition-all hover:bg-slate-50 rounded-lg"
        >
          <X size={20} strokeWidth={3} />
        </button>

        {/* Giảm padding từ p-10 xuống p-8 */}
        <div className="p-8 flex flex-col items-center text-center">

          {/* Thu nhỏ Icon từ w-20 xuống w-16 */}
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-5 border border-red-100">
            <AlertTriangle size={32} strokeWidth={2.5} />
          </div>

          {/* Tiêu đề & Nội dung font nhỏ lại một chút cho cân đối */}
          <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-slate-500 font-bold text-[14px] leading-relaxed px-2">
            {message}
          </p>

          {/* Nhóm nút bấm: h-14 xuống h-12 */}
          <div className="flex gap-3 w-full mt-8">
            <button
              onClick={onClose}
              className="flex-1 h-12 bg-slate-100 text-slate-600 rounded-xl  font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 transition-all active:scale-95"
            >
              Hủy bỏ
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 h-12 bg-[#e13d45] text-white rounded-xl  font-black uppercase tracking-widest text-[11px] shadow-lg shadow-red-200 hover:bg-[#c9353c] transition-all active:scale-95"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};