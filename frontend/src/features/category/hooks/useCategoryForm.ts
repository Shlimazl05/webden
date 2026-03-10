// D:\webden\frontend\src\features\category\hooks\useCategoryForm.ts
// import { useState, useEffect, useRef, useCallback } from 'react';
// import { ICategory, CreateCategoryPayload } from '../category.types';

// export const useCategoryForm = (initialData: ICategory | null, isOpen: boolean) => {
//   // 1. Định nghĩa giá trị mặc định để tái sử dụng
//   const defaultValues: CreateCategoryPayload = {
//     name: '',
//     description: '',
//     status: 'Active',
//     image: ''
//   };

//   const [formData, setFormData] = useState<CreateCategoryPayload>(defaultValues);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // 2. Cập nhật form khi Modal mở hoặc initialData thay đổi
//   useEffect(() => {
//     if (isOpen) {
//       if (initialData) {
//         // Chế độ Chỉnh sửa (Edit): Điền dữ liệu cũ
//         setFormData({
//           name: initialData.name,
//           description: initialData.description || '',
//           status: initialData.status,
//           image: initialData.image || ''
//         });
//         setImagePreview(initialData.image || null);
//       } else {
//         // Chế độ Thêm mới (Add): Reset về trắng
//         setFormData(defaultValues);
//         setImagePreview(null);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [initialData, isOpen]);

//   // 3. Xử lý thay đổi ảnh (Dùng useCallback để tránh tạo lại function dư thừa)
//   const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Kiểm tra định dạng file (Tùy chọn thêm để tránh lỗi)
//       if (!file.type.startsWith('image/')) {
//         alert("Vui lòng chọn file hình ảnh!");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64 = reader.result as string;
//         setImagePreview(base64);
//         setFormData(prev => ({ ...prev, image: base64 }));
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   // 4. Hàm bổ trợ để cập nhật từng field nhanh (Giúp code ở Modal ngắn hơn)
//   const updateField = useCallback((field: keyof CreateCategoryPayload, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   }, []);

//   return { 
//     formData, 
//     setFormData, 
//     updateField, // Thêm hàm này để dùng ở UI cho gọn
//     imagePreview, 
//     fileInputRef, 
//     handleImageChange 
//   };
// };



// D:\webden\frontend\src\features\category\hooks\useCategoryForm.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { ICategory, CreateCategoryPayload } from '../category.types';

export const useCategoryForm = (initialData: ICategory | null, isOpen: boolean) => {
    const defaultValues: CreateCategoryPayload = {
        name: '',
        description: '',
        status: 'Active',
        image: ''
    };

    const [formData, setFormData] = useState<CreateCategoryPayload>(defaultValues);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 2. Cập nhật form khi Modal mở hoặc initialData thay đổi
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // CHỖ SỬA QUAN TRỌNG: Chuẩn hóa status từ Backend
                // Chấp nhận cả 'Active', 'active', 'Hidden', 'hidden'
                const normalizedStatus =
                    (initialData.status?.toLowerCase() === 'active') ? 'Active' : 'Hidden';

                setFormData({
                    name: initialData.name || '',
                    description: initialData.description || '',
                    status: normalizedStatus as 'Active' | 'Hidden',
                    image: initialData.image || ''
                });
                setImagePreview(initialData.image || null);
            } else {
                setFormData(defaultValues);
                setImagePreview(null);
            }
        }
    }, [initialData, isOpen]);

    // 3. Xử lý thay đổi ảnh
    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImagePreview(base64);
                setFormData(prev => ({ ...prev, image: base64 }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    // 4. Hàm cập nhật Field (Dùng cái này cho các nút bấm)
    const updateField = useCallback((field: keyof CreateCategoryPayload, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    return {
        formData,
        setFormData, // Trả về để Modal có thể gọi trực tiếp nếu cần
        updateField,
        imagePreview,
        fileInputRef,
        handleImageChange
    };
};