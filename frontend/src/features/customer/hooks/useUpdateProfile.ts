import { useState } from 'react';
import { authApi } from '../api/authApi';
import { UpdateProfilePayload } from '../customer.types';

export const useUpdateProfile = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateProfile = async (data: UpdateProfilePayload) => {
        setIsLoading(true);
        try {
            const res = await authApi.updateProfile(data);
            return res.data;
        } catch (err: any) {
            throw err; 
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProfile, isLoading };
};