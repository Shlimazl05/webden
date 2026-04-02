import toast from 'react-hot-toast';
import { notify } from '@/utils/notifications';
import { useState, useEffect } from 'react';
import { IUser, UpdateProfilePayload } from '../customer.types';
import { useUpdateProfile } from './useUpdateProfile';

export const useProfileEdit = (user: IUser, onUpdateSuccess: () => void) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updateProfile, isLoading } = useUpdateProfile();

    const [formData, setFormData] = useState<UpdateProfilePayload>({
        email: user.email || '',
        address: user.address || ''
    });

    // Đồng bộ lại dữ liệu khi user từ props thay đổi (ví dụ sau khi fetch lại)
    useEffect(() => {
        setFormData({
            email: user.email || '',
            address: user.address || ''
        });
    }, [user]);

    const startEditing = () => setIsEditing(true);

    const cancelEditing = () => {
        setFormData({ email: user.email || '', address: user.address || '' });
        setIsEditing(false);
    };

    const saveChanges = async () => {
        try {
            // Gọi API cập nhật
            const result = await updateProfile(formData);

            if (result) {
                // Thông báo thành công kiểu đơn giản & thân thiện
                notify.success('Cập nhật thành công!');

                setIsEditing(false);
                onUpdateSuccess();
            } 
        } catch (err: any) {
            // Lấy message lỗi từ Server (ví dụ: "Email đã tồn tại")
            const msg = err.response?.data?.message || "Không thể cập nhật hồ sơ!";
            notify.error(msg); // Hiện thông báo lỗi chuyên nghiệp
        }
    };

    const handleInputChange = (field: keyof UpdateProfilePayload, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return {
        isEditing,
        formData,
        isLoading,
        startEditing,
        cancelEditing,
        saveChanges,
        handleInputChange
    };
};