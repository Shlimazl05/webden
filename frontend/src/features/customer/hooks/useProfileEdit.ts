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
        const result = await updateProfile(formData);
        if (result) {
            setIsEditing(false);
            onUpdateSuccess();
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