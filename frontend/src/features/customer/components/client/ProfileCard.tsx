
// 'use client';
// import React from 'react';
// import { User, Phone, Mail, MapPin, Check, X, Loader2 } from 'lucide-react';
// import { IUser } from '@/features/customer/customer.types';
// import { ProfileMenu } from './ProfileMenu';
// import { useProfileEdit } from '@/features/customer/hooks/useProfileEdit';

// interface ProfileCardProps {
//     user: IUser;
//     onUpdateSuccess: () => void;
//     onGoToSecurity: () => void; // Thêm prop này
// }

// export const ProfileCard = ({ user, onUpdateSuccess, onGoToSecurity }: ProfileCardProps) => {
//     // Gọi Logic từ Hook
//     const {
//         isEditing, formData, isLoading,
//         startEditing, cancelEditing, saveChanges, handleInputChange
//     } = useProfileEdit(user, onUpdateSuccess);

//     return (
//         <div className="ui-card relative overflow-visible font-['Be_Vietnam_Pro'] max-w-[450px] mx-auto p-6 md:p-8">
//             <ProfileMenu
//                 user={user}
//                 onUpdateSuccess={onUpdateSuccess}
//                 onEditClick={startEditing} // Kích hoạt từ menu
//                 onGoToSecurity={onGoToSecurity} // Truyền xuống Menu
//             />

//             <h2 className="ui-section-title mb-10 flex items-center text-xl">
//                 <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mr-3 shrink-0">
//                     <User className="text-[var(--color-primary)]" size={20} />
//                 </div>
//                 Thông tin cá nhân
//             </h2>

//             <div className="space-y-7">
//                 {/* Các trường cố định */}
//                 <div className="opacity-80">
//                     <div className="ui-label mb-1">Tên đăng nhập</div>
//                     <div className="ui-value text-slate-500">{user.username}</div>
//                 </div>

//                 <div className="opacity-80">
//                     <div className="ui-label mb-1">Số điện thoại</div>
//                     <div className="ui-value flex items-center text-slate-500 font-medium">
//                         <Phone size={14} className="mr-2" />
//                         <span className="tabular-nums">{user.phone}</span>
//                     </div>
//                 </div>

//                 {/* Email (Inline Edit) */}
//                 <div>
//                     <div className="ui-label mb-1.5 flex justify-between">Email liên hệ</div>
//                     {isEditing ? (
//                         <div className="relative animate-in fade-in duration-200">
//                             <Mail className="absolute left-3 top-3.5 text-slate-400" size={16} />
//                             <input
//                                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[var(--color-primary)] transition-all font-medium"
//                                 value={formData.email}
//                                 onChange={(e) => handleInputChange('email', e.target.value)}
//                             />
//                         </div>
//                     ) : (
//                         <div className="ui-value flex items-center">
//                             <Mail size={14} className="mr-2 text-slate-400" />
//                             {user.email || <span className="text-slate-300 italic">Chưa cập nhật</span>}
//                         </div>
//                     )}
//                 </div>

//                 {/* Địa chỉ (Inline Edit) */}
//                 <div>
//                     <div className="ui-label mb-1.5">Địa chỉ nhận hàng</div>
//                     {isEditing ? (
//                         <div className="relative animate-in fade-in duration-200">
//                             <MapPin className="absolute left-3 top-3.5 text-slate-400" size={16} />
//                             <textarea
//                                 rows={2}
//                                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[var(--color-primary)] transition-all font-medium resize-none"
//                                 value={formData.address}
//                                 onChange={(e) => handleInputChange('address', e.target.value)}
//                             />
//                         </div>
//                     ) : (
//                         <div className="ui-value flex items-start leading-relaxed">
//                             <MapPin size={14} className="mr-2 mt-1 text-slate-400 shrink-0" />
//                             {user.address || <span className="text-slate-300 italic">Chưa cập nhật</span>}
//                         </div>
//                     )}
//                 </div>

//                 {/* Bộ nút điều khiển - Chỉ hiện khi isEditing = true */}
//                 {isEditing && (
//                     <div className="flex gap-3 pt-4 animate-in slide-in-from-top-2 duration-300">
//                         <button onClick={cancelEditing} className="flex-1 flex items-center justify-center py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-sm transition-all">
//                             <X size={16} className="mr-2" /> Hủy
//                         </button>
//                         <button onClick={saveChanges} disabled={isLoading} className="flex-1 flex items-center justify-center py-3 bg-[var(--color-success)] text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-50 disabled:opacity-50">
//                             {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><Check size={18} className="mr-2" /> Lưu</>}
//                         </button>
//                     </div>
//                 )}
//             </div>

//             <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] text-center">
//                 <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium">
//                     Thành viên từ {new Date(user.createdAt).toLocaleDateString('vi-VN')}
//                 </p>
//             </div>
//         </div>
//     );
// };
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
            <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] bg-slate-200 flex-1 border-t border-dashed"></div>
                <span className="ui-label text-[var(--color-primary)] font-extrabold tracking-[0.3em] whitespace-nowrap">
                    THÔNG TIN TÀI KHOẢN
                </span>
                <div className="h-[1px] bg-slate-200 flex-1 border-t border-dashed"></div>
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