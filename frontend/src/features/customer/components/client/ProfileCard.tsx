
'use client';
import React from 'react';
import { User, Phone, Mail, MapPin, Check, X, Loader2 } from 'lucide-react';
import { IUser } from '@/features/customer/customer.types';
import { ProfileMenu } from './ProfileMenu';
import { useProfileEdit } from '@/features/customer/hooks/useProfileEdit';

interface ProfileCardProps {
    user: IUser;
    onUpdateSuccess: () => void;
    onGoToSecurity: () => void;
}

export const ProfileCard = ({ user, onUpdateSuccess, onGoToSecurity }: ProfileCardProps) => {
    const {
        isEditing, formData, isLoading,
        startEditing, cancelEditing, saveChanges, handleInputChange
    } = useProfileEdit(user, onUpdateSuccess);

    return (
        <div className="relative w-full max-w-5xl mx-auto py-4 font-['Be_Vietnam_Pro'] animate-in fade-in duration-500">
            {/* 
                CẬP NHẬT: Bọc ProfileMenu trong div có tọa độ âm để bù trừ padding của Layout.
                -top-6 -right-6 cho mobile (p-6)
                md:-top-10 md:-right-10 cho desktop (p-10)
            */}
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 z-50">
                <ProfileMenu
                    user={user}
                    onUpdateSuccess={onUpdateSuccess}
                    onEditClick={startEditing}
                    onGoToSecurity={onGoToSecurity}
                />
            </div>

            {/* HEADER: Tiêu đề có đường kẻ dashed 2 bên giống ảnh mẫu */}
            <div className="flex items-center justify-center gap-4 mb-12">
                <span className="ui-label text-lg text-[var(--color-primary)] font-extrabold  whitespace-nowrap">
                    THÔNG TIN TÀI KHOẢN
                </span>
            </div>

            {/* GRID: Dàn thông tin theo cột */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 px-4 md:px-8">

                {/* 1. Tên đăng nhập */}
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 mb-1.5">
                        <User size={14} strokeWidth={2.5} />
                        <span className="ui-label !text-indigo-500 font-bold">Tên đăng nhập</span>
                    </div>
                    <div className="ui-value text-slate-800 ml-5">{user.username}</div>
                </div>

                {/* 2. Số điện thoại */}
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 mb-1.5">
                        <Phone size={14} strokeWidth={2.5} />
                        <span className="ui-label !text-indigo-500 font-bold">Số điện thoại</span>
                    </div>
                    <div className="ui-value text-slate-800 ml-5 tabular-nums">{user.phone}</div>
                </div>

                {/* 3. Email (Có chế độ sửa) */}
                <div className="transition-all duration-300">
                    <div className="flex items-center gap-2 text-indigo-500 mb-1.5">
                        <Mail size={14} strokeWidth={2.5} />
                        <span className="ui-label !text-indigo-500 font-bold">Email liên hệ</span>
                    </div>
                    <div className="ml-5">
                        {isEditing ? (
                            <input
                                className="w-full bg-slate-50/50 border-b border-indigo-200 py-1 px-2 text-sm outline-none focus:border-indigo-500 transition-all font-medium"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <div className="ui-value text-slate-800">
                                {user.email || <span className="text-slate-300 italic font-normal">Chưa cập nhật</span>}
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. Địa chỉ (Có chế độ sửa) */}
                <div className="transition-all duration-300">
                    <div className="flex items-center gap-2 text-indigo-500 mb-1.5">
                        <MapPin size={14} strokeWidth={2.5} />
                        <span className="ui-label !text-indigo-500 font-bold">Địa chỉ nhận hàng</span>
                    </div>
                    <div className="ml-5">
                        {isEditing ? (
                            <textarea
                                rows={1}
                                className="w-full bg-slate-50/50 border-b border-indigo-200 py-1 px-2 text-sm outline-none focus:border-indigo-500 transition-all font-medium resize-none"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        ) : (
                            <div className="ui-value text-slate-800 leading-relaxed">
                                {user.address || <span className="text-slate-300 italic font-normal">Chưa cập nhật</span>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* BỘ NÚT ĐIỀU KHIỂN: Chỉ hiện khi đang sửa */}
            {isEditing && (
                <div className="flex justify-end gap-4 mt-12 px-8 animate-in slide-in-from-right-4 duration-300">
                    <button
                        onClick={cancelEditing}
                        className="flex items-center px-6 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs transition-all"
                    >
                        <X size={14} className="mr-2" /> HỦY
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={isLoading}
                        className="flex items-center px-6 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={14} className="animate-spin" /> : <><Check size={14} className="mr-2" /> LƯU THÔNG TIN</>}
                    </button>
                </div>
            )}

            {/* FOOTER: Ngày tham gia */}
            <div className="mt-16 text-center">
                <p className="text-[10px] text-slate-300 uppercase tracking-[0.3em] font-medium">
                    THÀNH VIÊN TỪ {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                </p>
            </div>
        </div>
    );
};