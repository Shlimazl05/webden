import { useState, useEffect, useCallback } from 'react';
import { ICategory } from '../category.types';
import { categoryApi } from '../api/category.api';
import { toast } from 'react-hot-toast';

/**
 * Hook truy xuất danh sách danh mục dành cho giao diện người dùng
 * Chế độ: Chỉ đọc (Read-only)
 */
export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Tải danh sách danh mục từ API khách hàng
   * Thường chỉ lấy các danh mục có trạng thái 'Active'
   */
  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await categoryApi.getCategories();
      setCategories(data);
    } catch (error: any) {
      console.error("Lỗi tải danh mục:", error);
      toast.error("Không thể hiển thị danh mục sản phẩm");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    refresh: fetchCategories
  };
};