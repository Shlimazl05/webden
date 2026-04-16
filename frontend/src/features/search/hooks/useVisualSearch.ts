


// import { useState, useRef } from 'react';
// import toast from 'react-hot-toast';
// import { searchApi } from '../api/searchAI.api';
// import { IProduct } from '../../product/product.types';

// export const useVisualSearch = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isDragging, setIsDragging] = useState(false);
//     const [isVisualLoading, setIsVisualLoading] = useState(false);
//     const [visualResults, setVisualResults] = useState<IProduct[]>([]);
//     const fileInputRef = useRef<HTMLInputElement | null>(null);

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setIsDragging(false);
//     };

//     // Định nghĩa hàm xóa kết quả
//     const clearResults = () => setVisualResults([]);

//     const handleCameraClick = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };

//     const processFile = async (file: File) => {
//         if (!file.type.startsWith('image/')) {
//             toast.error("Vui lòng chọn một file ảnh!");
//             return;
//         }

//         closeModal();
//         setIsVisualLoading(true);

//         // --- SỬ DỤNG TOAST.PROMISE ĐỂ GIỮ THÔNG BÁO ---
//         const searchPromise = searchApi.visualSearch(file);

//         toast.promise(
//             searchPromise,
//             {
//                 loading: 'Hệ thống AI đang phân tích hình ảnh...',
//                 success: (results: any) => {
//                     // Xử lý dữ liệu trả về
//                     const data = results.data?.data || results.data || results;
//                     setVisualResults(data);

//                     if (data.length > 0) {
//                         return `Tìm thấy ${data.length} sản phẩm tương đồng!`;
//                     } else {
//                         throw new Error("Không có sản phẩm nào phù hợp.");
//                     }
//                 },
//                 error: (err) => {
//                     return err.message || "Lỗi hệ thống nhận diện AI.";
//                 },
//             },
//             {
//                 // Giữ style đẹp của bạn từ layout.tsx
//                 style: {
//                     minWidth: '300px',
//                 },
//                 success: {
//                     duration: 5000, // Kết quả hiện trong 5 giây cho người dùng kịp nhìn
//                 },
//             }
//         ).finally(() => {
//             setIsVisualLoading(false);
//         });
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) processFile(file);
//     };

//     const handleDragOver = (e: React.DragEvent) => {
//         e.preventDefault();
//         setIsDragging(true);
//     };

//     const handleDragLeave = () => setIsDragging(false);

//     const handleDrop = (e: React.DragEvent) => {
//         e.preventDefault();
//         setIsDragging(false);
//         const file = e.dataTransfer.files?.[0];
//         if (file) processFile(file);
//     };

//     return {
//         isModalOpen,
//         isDragging,
//         isVisualLoading,
//         visualResults,
//         fileInputRef,
//         openModal,
//         closeModal,
//         handleFileChange,
//         handleDragOver,
//         handleDragLeave,
//         handleDrop,
//         clearResults,
//         handleCameraClick,
//         setVisualResults
//     };
// };


import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Import router
import toast from 'react-hot-toast';
import { searchApi } from '../api/searchAI.api';
import { IProduct } from '../../product/product.types';
import { useVisualSearchStore } from '../store/useVisualSearchStore'; // Import Store

export const useVisualSearch = () => {
    const router = useRouter();
    const setVisualData = useVisualSearchStore((state) => state.setVisualData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isVisualLoading, setIsVisualLoading] = useState(false);
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

        // Tạo URL preview để hiển thị ở trang kết quả
        const previewUrl = URL.createObjectURL(file);

        closeModal();
        setIsVisualLoading(true);

        const searchPromise = searchApi.visualSearch(file);

        toast.promise(
            searchPromise,
            {
                loading: 'Hệ thống AI đang phân tích hình ảnh...',
                success: (results: any) => {
                    const data = results.data?.data || results.data || results;

                    if (data && data.length > 0) {
                        // 1. Lưu dữ liệu vào Store toàn cục
                        setVisualData(data, previewUrl);

                        // 2. Chuyển hướng sang trang kết quả
                        router.push('/search/visual');

                        return `Tìm thấy ${data.length} sản phẩm phù hợp!`;
                    } else {
                        throw new Error("Không có sản phẩm nào phù hợp.");
                    }
                },
                error: (err) => err.message || "Lỗi hệ thống nhận diện AI.",
            },
            {
                style: { minWidth: '300px' },
                success: { duration: 5000 },
            }
        ).finally(() => {
            setIsVisualLoading(false);
        });
    };

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