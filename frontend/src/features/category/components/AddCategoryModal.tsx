

"use client";
import React, { useEffect, useState } from "react";
import { X, FolderPlus, Edit3 } from "lucide-react";
import { ICategory, CreateCategoryPayload } from "../category.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: ICategory | null;
  onSubmit: (data: CreateCategoryPayload) => Promise<void>; // Thêm prop này để gọi hàm lưu từ Hook
}

export const AddCategoryModal = ({ isOpen, onClose, initialData, onSubmit }: Props) => {
  // State quản lý dữ liệu form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Hidden">("Active");

  // Tự động điền dữ liệu khi bấm vào nút "Cây viết" (Sửa) hoặc reset khi Thêm
  useEffect(() => {
    if (initialData && isOpen) {
      setName(initialData.name);
      setDescription(initialData.description || "");
      setStatus(initialData.status);
    } else if (!initialData) {
      setName("");
      setDescription("");
      setStatus("Active");
    }
  }, [initialData, isOpen]);

  // Hàm xử lý khi nhấn nút Submit
  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    // Đóng gói dữ liệu và gửi về Hook
    await onSubmit({
      name: name.trim(),
      description: description.trim(),
      status: status
    });
  };

  if (!isOpen) return null;

  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-[#EFE7D3]">
        
        {/* Header */}
        <div className="px-10 py-8 flex justify-between items-center border-b border-[#EFE7D3]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FBF7EE] text-[#C5A059] rounded-2xl shadow-sm border border-[#EFE7D3]">
              {isEdit ? <Edit3 size={26} strokeWidth={2.5} /> : <FolderPlus size={26} strokeWidth={2.5} />}
            </div>
            <h2 className="text-[28px] font-black text-[#0F172A] tracking-tight uppercase">
              {isEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-[#C5A059] hover:bg-[#FBF7EE] rounded-xl transition-all"
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Body Form - Gắn hàm handleLocalSubmit vào đây */}
        <form className="p-10 space-y-9" onSubmit={handleLocalSubmit}>
          
          {/* Tên danh mục */}
          <div className="space-y-3">
            <label className="block text-[13px] font-black text-[#C5A059] uppercase tracking-[0.2em] ml-1">
              Tên danh mục <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: ĐÈN CHÙM PHA LÊ"
              className="w-full h-16 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#0F172A] text-[16px] placeholder:text-slate-300 focus:border-[#C5A059] focus:bg-white transition-all uppercase tracking-wide"
            />
          </div>

          {/* Mô tả */}
          <div className="space-y-3">
            <label className="block text-[13px] font-black text-[#C5A059] uppercase tracking-[0.15em] ml-1">
              Mô tả ngắn gọn
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="NHẬP MÔ TẢ CHO NHÓM SẢN PHẨM..."
              className="w-full p-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#0F172A] text-[15px] placeholder:text-slate-300 focus:border-[#C5A059] focus:bg-white transition-all resize-none tracking-tight"
            />
          </div>

          {/* Trạng thái */}
          <div className="space-y-3">
            <label className="block text-[13px] font-black text-[#C5A059] uppercase tracking-[0.15em] ml-1">
              Trạng thái hiển thị
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Active" | "Hidden")}
                className="w-full h-16 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#0F172A] text-[15px] appearance-none cursor-pointer focus:border-[#C5A059] focus:bg-white transition-all uppercase tracking-widest"
              >
                <option value="Active">ĐANG HOẠT ĐỘNG (HIỂN THỊ)</option>
                <option value="Hidden">TẠM ẨN KHỎI WEBSITE</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A059]">
                <svg width="14" height="10" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="3"><path d="M1 1l5 5 5-5" /></svg>
              </div>
            </div>
          </div>

          {/* Footer - Buttons */}
          <div className="flex gap-5 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-16 bg-white border border-[#EFE7D3] text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[13px] hover:bg-[#FBF7EE] transition-all active:scale-95"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              className="flex-1 h-16 bg-gradient-to-tr from-[#C5A059] to-[#E0C27C] text-white rounded-2xl font-black uppercase tracking-widest text-[13px] shadow-xl shadow-yellow-200/40 hover:from-[#B99645] hover:to-[#D4B26A] hover:-translate-y-1 transition-all active:scale-95"
            >
              {isEdit ? "Cập nhật" : "Lưu danh mục"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};