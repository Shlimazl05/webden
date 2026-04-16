// import { useState, useRef } from 'react';
// import toast from 'react-hot-toast';
// import { searchApi } from '../api/searchAI.api';
// import { IProduct } from '../../product/product.types';

// export const useVisualSearch = () => {
//     const [isVisualLoading, setIsVisualLoading] = useState(false);
//     const [visualResults, setVisualResults] = useState<IProduct[]>([]);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleCameraClick = () => {
//         fileInputRef.current?.click();
//     };

//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         setIsVisualLoading(true);
//         const toastId = toast.loading("AI đang phân tích hình ảnh...");

//         try {
//             const results = await searchApi.visualSearch(file);
//             setVisualResults(results);

//             if (results.length > 0) {
//                 toast.success(`Tìm thấy ${results.length} sản phẩm tương đồng!`, { id: toastId });
//             } else {
//                 toast.error("Không tìm thấy sản phẩm phù hợp.", { id: toastId });
//             }
//         } catch (error) {
//             toast.error("Lỗi hệ thống nhận diện.", { id: toastId });
//         } finally {
//             setIsVisualLoading(false);
//             if (fileInputRef.current) fileInputRef.current.value = "";
//         }
//     };

//     const clearResults = () => setVisualResults([]);

//     return {
//         isVisualLoading,
//         visualResults,
//         fileInputRef,
//         handleCameraClick,
//         handleFileChange,
//         clearResults
//     };
// };



// import { useState, useRef } from 'react';
// import toast from 'react-hot-toast';
// import { searchApi } from '../api/searchAI.api';
// import { IProduct } from '../../product/product.types';

// export const useVisualSearch = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isDragging, setIsDragging] = useState(false);
//     const [isVisualLoading, setIsVisualLoading] = useState(false);
//     const [visualResults, setVisualResults] = useState<IProduct[]>([]);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setIsDragging(false);
//     };

//     // Hàm xử lý file chung (dùng cho cả click và drop)
//     const processFile = async (file: File) => {
//         if (!file.type.startsWith('image/')) {
//             toast.error("Vui lòng chọn một file ảnh!");
//             return;
//         }

//         setIsVisualLoading(true);
//         const toastId = toast.loading("AI đang phân tích hình ảnh...");

//         try {
//             const results = await searchApi.visualSearch(file);
//             setVisualResults(results);
//             if (results.length > 0) {
//                 toast.success(`Tìm thấy ${results.length} sản phẩm tương đồng!`, { id: toastId });
//                 closeModal(); // Đóng modal sau khi tìm thấy
//             } else {
//                 toast.error("Không tìm thấy sản phẩm phù hợp.", { id: toastId });
//             }
//         } catch (error) {
//             toast.error("Lỗi hệ thống nhận diện.", { id: toastId });
//         } finally {
//             setIsVisualLoading(false);
//         }
//     };

//     // Xử lý khi chọn file qua hộp thoại
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) processFile(file);
//     };

//     // Xử lý kéo thả
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
//         setVisualResults
//     };
// };


import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { searchApi } from '../api/searchAI.api';
import { IProduct } from '../../product/product.types';

export const useVisualSearch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isVisualLoading, setIsVisualLoading] = useState(false);
    const [visualResults, setVisualResults] = useState<IProduct[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsDragging(false);
    };

    // --- BẠN ĐANG THIẾU DÒNG NÀY ---
    const clearResults = () => setVisualResults([]);
    // -------------------------------

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

        setIsVisualLoading(true);
        const toastId = toast.loading("AI đang phân tích hình ảnh...");

        try {
            const results = await searchApi.visualSearch(file);
            setVisualResults(results);
            if (results.length > 0) {
                toast.success(`Tìm thấy ${results.length} sản phẩm tương đồng!`, { id: toastId });
                closeModal();
            } else {
                toast.error("Không tìm thấy sản phẩm phù hợp.", { id: toastId });
            }
        } catch (error) {
            toast.error("Lỗi hệ thống nhận diện.", { id: toastId });
        } finally {
            setIsVisualLoading(false);
        }
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