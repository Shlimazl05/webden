import { useState } from 'react';
import { authApi } from '../api/authApi';
import { UpdateProfilePayload } from '../customer.types';

export const useUpdateProfile = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateProfile = async (data: UpdateProfilePayload) => {
        setIsLoading(true);
        try {
            const res = await authApi.updateProfile(data);
            alert("Cập nhật thành công!");
            return res.data;
        } catch (err: any) {
            alert(err.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProfile, isLoading };
};