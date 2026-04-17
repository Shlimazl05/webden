// // D:\webden\frontend\src\features\shipping\useShipping.ts
// import { useState, useEffect } from 'react';
// import { shippingApi } from './shipping.api';

// export const useShipping = () => {
//     const [rules, setRules] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchRules = async () => {
//         setIsLoading(true);
//         try {
//             const json = await shippingApi.getRules();
//             if (json.success) {
//                 setRules(json.data);
//             }
//         } catch (err) {
//             console.error("Lỗi lấy danh sách phí ship:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchRules();
//     }, []);

//     const addRule = async (data: any) => {
//         try {
//             const json = await shippingApi.createRule(data);
//             if (json.success) fetchRules();
//         } catch (err) {
//             console.error("Lỗi thêm phí ship:", err);
//         }
//     };

//     const deleteRule = async (id: string) => {
//         try {
//             const json = await shippingApi.deleteRule(id);
//             if (json.success) fetchRules();
//         } catch (err) {
//             console.error("Lỗi xóa phí ship:", err);
//         }
//     };

//     return { rules, addRule, deleteRule, isLoading };
// };


// D:\webden\frontend\src\features\shipping\useShipping.ts
import { useState, useEffect, useCallback } from 'react';
import { shippingApi } from './shipping.api';
import toast from 'react-hot-toast';

// Định nghĩa style cho thông báo (Đồng bộ với các modal khác của bạn)
const toastStyle = {
    borderRadius: '12px',
    background: '#1e293b',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
};

export const useShipping = () => {
    const [rules, setRules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRules = useCallback(async () => {
        setIsLoading(true);
        try {
            const json = await shippingApi.getRules();
            if (json.success) {
                setRules(json.data);
            }
        } catch (err) {
            console.error("Lỗi lấy danh sách phí ship:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRules();
    }, [fetchRules]);

    // 1. THÊM MỚI CẤU HÌNH
    const addRule = async (data: any) => {
        const promise = shippingApi.createRule(data);

        toast.promise(promise, {
            loading: 'Đang lưu cấu hình mới...',
            success: () => {
                fetchRules();
                return "Thêm thành công!";
            },
            error: (err) => err.response?.data?.message || "LỖI KHI THÊM!",
        }, { style: toastStyle });

        return promise;
    };

    // 2. CẬP NHẬT CẤU HÌNH (Tính năng mới bạn yêu cầu)
    const updateRule = async (id: string, data: any) => {
        const promise = shippingApi.updateRule(id, data);

        toast.promise(promise, {
            loading: 'Đang cập nhật thay đổi...',
            success: () => {
                fetchRules();
                return "Cập nhật thành công!";
            },
            error: (err) => err.response?.data?.message || "LỖI KHI CẬP NHẬT!",
        }, { style: toastStyle });

        return promise;
    };

    // 3. XÓA CẤU HÌNH
    const deleteRule = async (id: string) => {
        const promise = shippingApi.deleteRule(id);

        toast.promise(promise, {
            loading: 'Đang xóa cấu hình...',
            success: () => {
                fetchRules();
                return "Đã xóa!";
            },
            error: (err) => err.response?.data?.message || "LỖI KHI XÓA!",
        }, { style: toastStyle });

        return promise;
    };

    return {
        rules,
        addRule,
        updateRule, // Trả về hàm mới để Page sử dụng
        deleteRule,
        isLoading,
        refresh: fetchRules
    };
};