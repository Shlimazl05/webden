import { useState } from 'react';
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
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Xác nhận mật khẩu không khớp!");
            return false;
        }
        const success = await changePassword({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
        });
        if (success) {
            handleReset();
            return true;
        }
        return false;
    };

    return {
        formData, showPw, isLoading,
        toggleVisibility, handleInputChange, handleSubmit, handleReset
    };
};