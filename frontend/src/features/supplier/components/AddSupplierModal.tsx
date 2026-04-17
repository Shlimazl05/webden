"use client";
import React, { useEffect, useState } from "react";
import { X, Loader2, Check, EyeOff, Building2, Phone, Mail, MapPin } from "lucide-react";
import { ISupplier, CreateSupplierPayload } from "../../supplier/supplier.types";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: ISupplier | null;
  onSubmit: (data: CreateSupplierPayload) => Promise<void>;
}

const toastStyle = {
  borderRadius: '12px',
  background: '#1e293b',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
};

export const AddSupplierModal = ({ isOpen, onClose, initialData, onSubmit }: Props) => {
  const [nameSL, setNameSL] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"Active" | "Hidden">("Active");
  const [loading, setLoading] = useState(false);

  // Điền dữ liệu khi Sửa hoặc Reset khi Thêm mới
  useEffect(() => {
    if (initialData && isOpen) {
      setNameSL(initialData.name);
      setPhone(initialData.phone);
      setEmail(initialData.email || "");
      setAddress(initialData.address);
      setStatus(initialData.status);
    } else if (!initialData) {
      setNameSL("");
      setPhone("");
      setEmail("");
      setAddress("");
      setStatus("Active");
    }
  }, [initialData, isOpen]);

  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate - Chữ in hoa cho chuyên nghiệp
    if (!nameSL.trim()) return toast.error("VUI LÒNG NHẬP TÊN NHÀ CUNG CẤP!", { style: toastStyle });
    if (!phone.trim()) return toast.error("VUI LÒNG NHẬP SỐ ĐIỆN THOẠI!", { style: toastStyle });
    if (!address.trim()) return toast.error("VUI LÒNG NHẬP ĐỊA CHỈ!", { style: toastStyle });

    setLoading(true);

    // 2. Chuẩn bị dữ liệu (Gửi trường 'name' cho Backend khớp với yêu cầu của bạn)
    const payload = {
      name: nameSL.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      status: status
    };

    try {
      // 3. Chỉ gọi onSubmit và chờ kết quả. 
      // Việc hiển thị thông báo "Đang xử lý", "Thành công" hay "Thất bại" 
      // ĐÃ ĐƯỢC thực hiện bên trong Hook 'handleSubmit' rồi.
      await onSubmit(payload as any);
    } catch (err) {
      console.error("Lỗi tại Modal:", err);
      // Không cần toast.error ở đây vì Hook đã xử lý lỗi hệ thống qua Toast rồi.
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[500px] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">

        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
            {isEdit ? "Sửa nhà cung cấp" : "Thêm nhà cung cấp"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        <form className="p-8 space-y-5" onSubmit={handleLocalSubmit}>

          {/* Tên nhà cung cấp */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
              <Building2 size={14} className="text-indigo-600" /> Tên nhà cung cấp <span className="text-red-500">*</span>
            </label>
            <input
              disabled={loading}
              type="text"
              value={nameSL}
              onChange={(e) => setNameSL(e.target.value)}
              placeholder="Ví dụ: Công ty Đèn Châu Âu"
              className="w-full h-11 px-4 bg-white border border-slate-300 rounded-xl  outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 transition-all"
            />
          </div>

          {/* Hàng: SĐT và Email */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                <Phone size={14} className="text-indigo-600" /> Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                disabled={loading}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="090..."
                className="w-full h-11 px-4 bg-white border border-slate-300 rounded-xl  outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                <Mail size={14} className="text-indigo-600" /> Email
              </label>
              <input
                disabled={loading}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ncc@gmail.com"
                className="w-full h-11 px-4 bg-white border border-slate-300 rounded-xl  outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 transition-all"
              />
            </div>
          </div>

          {/* Địa chỉ */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
              <MapPin size={14} className="text-indigo-600" /> Địa chỉ liên hệ <span className="text-red-500">*</span>
            </label>
            <textarea
              disabled={loading}
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ chi tiết..."
              className="w-full p-4 bg-white border border-slate-300 rounded-xl  outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 transition-all resize-none"
            />
          </div>

          {/* Trạng thái */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
              Trạng thái hợp tác
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("Active")}
                className={`h-11 rounded-xl  flex items-center justify-center gap-2 font-bold text-[12px] transition-all border ${status === "Active"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white text-slate-400 border-slate-200"
                  }`}
              >
                <Check size={16} className={status === "Active" ? "block" : "hidden"} />
                ĐANG GIAO DỊCH
              </button>

              <button
                type="button"
                onClick={() => setStatus("Hidden")}
                className={`h-11 rounded-xl  flex items-center justify-center gap-2 font-bold text-[12px] transition-all border ${status === "Hidden"
                  ? "bg-slate-100 text-slate-700 border-slate-300"
                  : "bg-white text-slate-400 border-slate-200"
                  }`}
              >
                <EyeOff size={16} className={status === "Hidden" ? "block" : "hidden"} />
                TẠM NGỪNG
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="flex-1 h-12 text-slate-500 font-bold text-[13px] hover:bg-slate-50 rounded-xl  transition-all"
            >
              HỦY BỎ
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-[1.5] h-12 bg-indigo-600 text-white rounded-xl  font-bold text-[13px] shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                isEdit ? "CẬP NHẬT THÔNG TIN" : "XÁC NHẬN THÊM"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};