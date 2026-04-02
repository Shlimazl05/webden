import { useState } from 'react';
import { notify } from '@/utils/notifications';
import { useChangePassword } from './useChangePassword';


export const useSecurityForm = () => {
    const { changePassword, isLoading } = useChangePassword();
    const [showPw, setShowPw] = useState({ old: false, new: false, confirm: false });
    const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    const toggleVisibility = (field: keyof typeof showPw) => {
        setShowPw(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleSubmit = async () => {
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            notify.error("Vui lòng nhập đầy đủ thông tin! ⚠️");
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            notify.error("Xác nhận mật khẩu không khớp! ❌"); // Thay alert bằng notify
            return false;
        }

        if (formData.newPassword.length < 6) {
            notify.error("Mật khẩu mới phải có ít nhất 6 ký tự! ⚠️");
            return false;
        }

        try {
            // Gọi API thông qua hook changePassword
            const success = await changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });

            if (success) {
                handleReset();
                return true;
            }
            return false;
        } catch (err) {
            // Ném lỗi ra ngoài để SecuritySection.tsx bắt được và hiện notify.error(msg)
            throw err;
        }
    };

    return {
        formData, showPw, isLoading,
        toggleVisibility, handleInputChange, handleSubmit, handleReset
    };
};