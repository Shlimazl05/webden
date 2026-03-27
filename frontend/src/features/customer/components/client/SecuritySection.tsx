

'use client';
import React from 'react';
import { Lock, Eye, EyeOff, RotateCcw, CheckCircle2, Loader2 } from 'lucide-react';
import { useSecurityForm } from '@/features/customer/hooks/useSecurityForm';

interface SecuritySectionProps {
    onBack: () => void;
}

export const SecuritySection = ({ onBack }: SecuritySectionProps) => {
    const { formData, showPw, isLoading, toggleVisibility, handleInputChange, handleSubmit } = useSecurityForm();

    const onSave = async () => {
        const success = await handleSubmit();
        if (success) onBack();
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
            <div className="flex justify-end items-center gap-5 mt-14 px-12 animate-in slide-in-from-right-4 duration-300">

                {/* NÚT QUAY LẠI CHUẨN 100% UI ẢNH MẪU */}
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center justify-center px-8 py-3 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all group"
                >
                    {/* Icon nằm bên trái với khoảng cách mr-2 */}
                    <RotateCcw size={16} className="mr-2 transition-transform group-hover:-rotate-45" />

                    {/* Chữ nằm bên phải */}
                    <span className="text-[10px] font-black tracking-[0.15em] uppercase leading-none">
                        Quay lại
                    </span>
                </button>

                {/* NÚT LƯU MẬT KHẨU */}
                <button
                    disabled={isLoading}
                    onClick={onSave}
                    className="h-12 px-10 rounded-full bg-indigo-600 text-white font-bold text-[10px] shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 tracking-widest uppercase flex items-center justify-center"
                >
                    {isLoading ? (
                        <Loader2 size={14} className="animate-spin mr-2" />
                    ) : (
                        <CheckCircle2 size={14} className="mr-2" />
                    )}
                    Lưu mật khẩu
                </button>
            </div>
        </div>
    );
};