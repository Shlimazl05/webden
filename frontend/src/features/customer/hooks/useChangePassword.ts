import { useState } from 'react';
import { authApi } from '../api/authApi';
import { ChangePasswordPayload } from '../customer.types';

export const useChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);

    const changePassword = async (data: ChangePasswordPayload) => {
        setIsLoading(true);
        try {
            await authApi.changePassword(data);
            return true;
        } catch (err: any) {
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { changePassword, isLoading };
};