


import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { searchApi } from '../api/searchAI.api';
import { IProduct } from '../../product/product.types';
import { useVisualSearchStore } from '../store/useVisualSearchStore';
import { IVisualSearchResponse } from '../search.types';

export const useVisualSearch = () => {
    const router = useRouter();
    // Lấy hàm setVisualData từ Store
    const setVisualData = useVisualSearchStore((state) => state.setVisualData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isVisualLoading, setIsVisualLoading] = useState(false);

    // Lưu ý: visualResults ở đây là state cục bộ, 
    // thực tế bạn đã dùng Store để chuyển trang nên có thể để hoặc xóa.
    const [visualResults, setVisualResults] = useState<IProduct[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsDragging(false);
    };

    const clearResults = () => setVisualResults([]);

    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const processFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error("Vui lòng chọn một file ảnh!");
            return;
        }

        // 1. Tạo URL preview cho ảnh
        const previewUrl = URL.createObjectURL(file);

        closeModal();
        setIsVisualLoading(true);

        const searchPromise = searchApi.visualSearch(file);

        toast.promise(
            searchPromise,
            {
                loading: 'Hệ thống AI đang phân tích hình ảnh...',
                success: (res: IVisualSearchResponse) => {
                    const previewUrl = URL.createObjectURL(file);

                    // 1. ĐỔ TẤT CẢ DỮ LIỆU VÀO STORE (Kể cả khi success = false)
                    // Cần đảm bảo file Store của bạn đã cập nhật hàm setVisualData nhận 5 tham số
                    setVisualData(
                        res.products || [],
                        previewUrl,
                        res.categoryName || "Đang xác định...",
                        res.success, // 👈 Thêm biến success
                        res.message  // 👈 Thêm biến message
                    );

                    // 2. LUÔN CHUYỂN HƯỚNG SANG TRANG KẾT QUẢ
                    router.push('/search/visual');

                    // 3. Trả về thông báo cho Toast xanh (Success Toast)
                    if (!res.success) {
                        return "Đã phân tích xong (Không có sản phẩm phù hợp).";
                    }
                    return res.message || "Tìm thấy các sản phẩm phù hợp!";
                },
                error: (err) => err.message || "Lỗi hệ thống nhận diện AI.",
            },
            {
                style: { minWidth: '350px' },
                success: { duration: 5000 },
                error: { duration: 5000 },
            }
        ).finally(() => {
            setIsVisualLoading(false);
        });
    };

    // ... các hàm handleFileChange, handleDragOver, handleDrop giữ nguyên ...
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    return {
        isModalOpen,
        isDragging,
        isVisualLoading,
        visualResults,
        fileInputRef,
        openModal,
        closeModal,
        handleFileChange,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        clearResults,
        handleCameraClick,
        setVisualResults
    };
};