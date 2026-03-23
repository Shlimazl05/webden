import { useState } from 'react';
import { authApi } from '../api/authApi';
import { ChangePasswordPayload } from '../customer.types';

export const useChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);

    const changePassword = async (data: ChangePasswordPayload) => {
        setIsLoading(true);
        try {
            await authApi.changePassword(data);
            alert("Đổi mật khẩu thành công!");
            return true;
        } catch (err: any) {
            alert(err.response?.data?.message || "Mật khẩu cũ không chính xác");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { changePassword, isLoading };
};