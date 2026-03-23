import api from '@/lib/axiosInstance';
import { UpdateProfilePayload, ChangePasswordPayload } from '@/features/customer/customer.types';

export const authApi = {
    // Lấy thông tin cá nhân
    getProfile: () => api.get('/auth/profile'),

    // Cập nhật thông tin (Email, Địa chỉ)
    updateProfile: (data: UpdateProfilePayload) =>
        api.put('/auth/update-profile', data),

    // Đổi mật khẩu
    changePassword: (data: ChangePasswordPayload) =>
        api.put('/auth/change-password', data),
};