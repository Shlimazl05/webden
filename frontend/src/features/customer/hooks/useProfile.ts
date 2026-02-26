import { useState, useEffect, useCallback } from 'react';
import { ICustomer } from '../customer.types';
import { customerApi } from '../api/customer.api';
import { toast } from 'react-hot-toast';

export const useProfile = () => {
  const [profile, setProfile] = useState<ICustomer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  /**
   * Lấy dữ liệu hồ sơ từ Server
   */
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await customerApi.getMe();
      setProfile(data);
    } catch (error: any) {
      // Trong giai đoạn làm Frontend trước, có thể để dữ liệu mẫu tại đây để test UI
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /**
   * Xử lý cập nhật thông tin hồ sơ
   */
  const updateProfile = async (payload: Partial<ICustomer>) => {
    try {
      setIsUpdating(true);
      const updatedData = await customerApi.updateProfile(payload);
      setProfile(updatedData);
      toast.success("Cập nhật thông tin thành công");
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || "Cập nhật thất bại";
      toast.error(message);
      return { success: false, message };
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    profile,
    isLoading,
    isUpdating,
    updateProfile,
    refreshProfile: fetchProfile
  };
};