


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

//     // --- BẠN ĐANG THIẾU DÒNG NÀY ---
//     const clearResults = () => setVisualResults([]);
//     // -------------------------------

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

//         // 1. Đóng Modal ngay để người dùng thấy giao diện tìm kiếm ở Navbar
//         closeModal();

//         // 2. Kích hoạt Loading state của AI
//         setIsVisualLoading(true);

//         // 3. Tạo một Toast Loading và lưu lại ID của nó
//         // Toast này sẽ KHÔNG BIẾN MẤT cho đến khi ta ra lệnh tiếp theo
//         const toastId = toast.loading("Đang gửi ảnh lên hệ thống AI...");

//         try {
//             // Cập nhật text của toast khi bắt đầu giai đoạn trích xuất vector
//             toast.loading("AI đang phân tích đặc trưng hình ảnh...", { id: toastId });

//             // GỌI API BACKEND
//             const results = await searchApi.visualSearch(file);

//             setVisualResults(results);

//             if (results.length > 0) {
//                 // THÀNH CÔNG: Thay thế Loading bằng Success (Dùng đúng toastId)
//                 toast.success(`Đã tìm thấy ${results.length} sản phẩm tương đồng!`, {
//                     id: toastId,
//                     duration: 4000 // Giữ thông báo thành công trong 4 giây
//                 });
//             } else {
//                 // KHÔNG CÓ KẾT QUẢ: Thay thế bằng Error
//                 toast.error("Không tìm thấy mẫu đèn nào phù hợp trong kho.", { id: toastId });
//             }
//         } catch (error) {
//             // LỖI HỆ THỐNG: Thay thế bằng Error
//             toast.error("Hệ thống AI đang bận hoặc lỗi kết nối.", { id: toastId });
//         } finally {
//             // Kết thúc quá trình loading
//             setIsVisualLoading(false);
//         }
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
import toast from 'react-hot-toast';
import { searchApi } from '../api/searchAI.api';
import { IProduct } from '../../product/product.types';

export const useVisualSearch = () => {
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

    // Định nghĩa hàm xóa kết quả
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

        closeModal();
        setIsVisualLoading(true);

        // --- SỬ DỤNG TOAST.PROMISE ĐỂ GIỮ THÔNG BÁO ---
        const searchPromise = searchApi.visualSearch(file);

        toast.promise(
            searchPromise,
            {
                loading: 'Hệ thống AI đang phân tích hình ảnh...',
                success: (results: any) => {
                    // Xử lý dữ liệu trả về
                    const data = results.data?.data || results.data || results;
                    setVisualResults(data);

                    if (data.length > 0) {
                        return `Tìm thấy ${data.length} sản phẩm tương đồng!`;
                    } else {
                        throw new Error("Không có sản phẩm nào phù hợp.");
                    }
                },
                error: (err) => {
                    return err.message || "Lỗi hệ thống nhận diện AI.";
                },
            },
            {
                // Giữ style đẹp của bạn từ layout.tsx
                style: {
                    minWidth: '300px',
                },
                success: {
                    duration: 5000, // Kết quả hiện trong 5 giây cho người dùng kịp nhìn
                },
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