

'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { notify } from '@/utils/notifications';
import { Lock, Eye, EyeOff, RotateCcw, CheckCircle2, Loader2 } from 'lucide-react';
import { useSecurityForm } from '@/features/customer/hooks/useSecurityForm';

interface SecuritySectionProps {
    onBack: () => void;
}

export const SecuritySection = ({ onBack }: SecuritySectionProps) => {
    const { formData, showPw, isLoading, toggleVisibility, handleInputChange, handleSubmit } = useSecurityForm();

    const onSave = async () => {
        try {
            // Bước 1: Gọi hàm xử lý logic (nó sẽ check mật khẩu và gọi API)
            const success = await handleSubmit();

            // Bước 2: Nếu API trả về thành công (true)
            if (success) {
                notify.successIndigo('Đổi mật khẩu thành công! 🔐');

                // Đợi 1 giây để người dùng thấy thông báo rồi mới quay lại
                setTimeout(() => {
                    onBack();
                }, 1000);
            }
        } catch (err: any) {
            // Bước 3: Nếu API trả về lỗi (sai mật khẩu cũ, lỗi server...)
            const msg = err.response?.data?.message || "Đổi mật khẩu thất bại!";
            notify.error(msg);
        }
    };

    return (
        <div id="security-section" className="relative w-full max-w-5xl mx-auto py-4 font-['Be_Vietnam_Pro'] animate-in fade-in slide-in-from-right-4 duration-500">

            {/* HEADER: Phân đoạn Bảo mật */}
            <div className="flex items-center justify-center gap-4 mb-12">
                <span className="ui-label text-lg text-[var(--color-primary)] font-extrabold  whitespace-nowrap">
                    ĐỔI MẬT KHẨU
                </span>
            </div>

            {/* GRID: Căn chỉnh mật khẩu chuẩn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 px-6 md:px-12">

                {/* 1. Mật khẩu hiện tại */}
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 text-indigo-500 mb-2">
                        <Lock size={15} strokeWidth={2.5} />
                        <span className="ui-label !text-indigo-500 font-bold !tracking-wider text-[10px]">MẬT KHẨU HIỆN TẠI</span>
                    </div>
                    <div className="relative ml-6 border-b border-slate-100">
                        <input
                            type={showPw.old ? "text" : "password"}
                            className="w-full bg-transparent py-2 px-1 text-base outline-none focus:border-indigo-500 transition-all font-bold text-slate-900 tracking-widest placeholder:tracking-normal"
                            value={formData.oldPassword}
                            onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => toggleVisibility('old')}
                            className="absolute right-0 top-2 text-slate-300 hover:text-indigo-400 transition-colors"
                        >
                            {showPw.old ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="hidden md:block"></div>

                {/* 2. Mật khẩu mới */}
                <div className="transition-all duration-300">
                    <div className="flex items-center gap-2 text-indigo-500 mb-2">
                        <Lock size={15} strokeWidth={2.5} />
                        <span className="ui-label !text-indigo-500 font-bold !tracking-wider text-[10px]">MẬT KHẨU MỚI</span>
                    </div>
                    <div className="relative ml-6 border-b border-slate-100">
                        <input
                            type={showPw.new ? "text" : "password"}
                            className="w-full bg-transparent py-2 px-1 text-base outline-none focus:border-indigo-500 transition-all font-bold text-slate-900 tracking-widest placeholder:tracking-normal"
                            value={formData.newPassword}
                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => toggleVisibility('new')}
                            className="absolute right-0 top-2 text-slate-300 hover:text-indigo-400 transition-colors"
                        >
                            {showPw.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* 3. Xác nhận mật khẩu mới */}
                <div className="transition-all duration-300">
                    <div className="flex items-center gap-2 text-indigo-500 mb-2">
                        <Lock size={15} strokeWidth={2.5} />
                        <span className="ui-label !text-indigo-500 font-bold !tracking-wider text-[10px]">XÁC NHẬN MẬT KHẨU MỚI</span>
                    </div>
                    <div className="relative ml-6 border-b border-slate-100">
                        <input
                            type={showPw.confirm ? "text" : "password"}
                            className="w-full bg-transparent py-2 px-1 text-base outline-none focus:border-indigo-500 transition-all font-bold text-slate-900 tracking-widest placeholder:tracking-normal"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => toggleVisibility('confirm')}
                            className="absolute right-0 top-2 text-slate-300 hover:text-indigo-400 transition-colors"
                        >
                            {showPw.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* BỘ NÚT ĐIỀU KHIỂN */}
            <div className="flex justify-end items-center gap-5 mt-14 px-12">
                <Button variant="outline" onClick={onBack} leftIcon={<RotateCcw size={16} />}>
                    Quay lại
                </Button>

                <Button variant="primary" onClick={onSave} isLoading={isLoading} leftIcon={<CheckCircle2 size={16} />}>
                    Lưu mật khẩu
                </Button>
            </div>
        </div>
    );
};