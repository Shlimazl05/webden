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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Khung thông báo */}
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-red-100">
        
        {/* Nút đóng nhanh ở góc */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 transition-all"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <div className="p-10 flex flex-col items-center text-center">
          {/* Icon Cảnh báo to, rõ */}
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-red-100">
            <AlertTriangle size={40} strokeWidth={2.5} />
          </div>

          {/* Tiêu đề & Nội dung */}
          <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tighter mb-3">
            {title}
          </h2>
          <p className="text-slate-500 font-semibold text-[15px] leading-relaxed px-4">
            {message}
          </p>

          {/* Nhóm nút bấm hành động */}
          <div className="flex gap-4 w-full mt-10">
            <button 
              onClick={onClose}
              className="flex-1 h-14 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[12px] hover:bg-slate-200 transition-all active:scale-95"
            >
              Hủy bỏ
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 h-14 bg-[#e13d45] text-white rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-lg shadow-red-200 hover:bg-[#c9353c] hover:-translate-y-1 transition-all active:scale-95"
            >
              Xác nhận xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};