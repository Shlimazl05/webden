

'use client';
import React from 'react';
import { Settings, Edit3, Lock } from 'lucide-react';
import { useProfileMenu } from '@/features/customer/hooks/useProfileMenu';
import { IUser } from '@/features/customer/customer.types';

interface ProfileMenuProps {
    user: IUser;
    onUpdateSuccess: () => void;
    onEditClick: () => void;
    onGoToSecurity: () => void;
}

export const ProfileMenu = ({ user, onUpdateSuccess, onEditClick, onGoToSecurity }: ProfileMenuProps) => {
    const { isOpen, menuRef, toggleMenu, closeMenu } = useProfileMenu();

    return (
        /* 
           SỬA TẠI ĐÂY: 
           - Chuyển 'relative' thành 'absolute' 
           - Đặt 'top-0 right-0' để nó bám sát vào góc của thẻ cha (ProfileCard)
        */
        <div className="absolute top-0 right-0 z-[60]" ref={menuRef}>
            <button
                type="button"
                onClick={toggleMenu}
                className={`p-3 rounded-full transition-all outline-none ${isOpen
                        ? 'bg-slate-100 rotate-90 text-indigo-600'
                        : 'text-slate-300 hover:text-indigo-500 hover:bg-indigo-50/50'
                    }`}
            >
                <Settings size={20} />
            </button>

            {isOpen && (
                /* 
                   Menu Dropdown: 
                   - 'right-0' để dóng hàng bên phải nút bấm 
                   - 'mt-1' để tạo khoảng cách nhỏ với nút bánh răng
                */
                <div className="absolute right-0 mt-1 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-[100] animate-in fade-in zoom-in duration-150">
                    <button
                        onClick={() => { onEditClick(); closeMenu(); }}
                        className="w-full flex items-center px-4 py-3 text-sm font-bold hover:bg-slate-50 text-slate-700 transition-colors"
                    >
                        <Edit3 size={16} className="mr-3 text-blue-500" /> Chỉnh sửa thông tin
                    </button>

                    <div className="h-[1px] bg-slate-50 mx-2 my-1"></div>

                    <button
                        onClick={() => { onGoToSecurity(); closeMenu(); }}
                        className="w-full flex items-center px-4 py-3 text-sm font-bold hover:bg-slate-50 text-slate-700 transition-colors"
                    >
                        <Lock size={16} className="mr-3 text-orange-500" /> Đổi mật khẩu
                    </button>
                </div>
            )}
        </div>
    );
};