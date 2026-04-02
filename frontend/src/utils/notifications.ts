import toast, { ToastOptions } from 'react-hot-toast';

// Cấu hình chung cho tất cả các thông báo
const baseOptions: ToastOptions = {
    duration: 3500,
    style: {
        fontFamily: '"Be Vietnam Pro", sans-serif', // Font của bạn
        fontSize: '13px',
        borderRadius: '99px', // Bo góc tròn chuẩn UI hiện đại
        padding: '12px 24px',
        fontWeight: '600',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
};

export const notify = {
    // Thông báo Thành công (Màu Emerald - dùng cho Profile)
    success: (message: string) => {
        return toast.success(message, {
            ...baseOptions,
            style: {
                ...baseOptions.style,
                border: '1px solid #10b981',
                background: '#f0fdf4',
                color: '#065f46',
            },
            iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
            },
        });
    },

    // Thông báo Thành công màu Indigo (Dùng cho phần Bảo mật/Security)
    successIndigo: (message: string) => {
        return toast.success(message, {
            ...baseOptions,
            style: {
                ...baseOptions.style,
                border: '1px solid #6366f1',
                background: '#eef2ff',
                color: '#312e81',
            },
            iconTheme: {
                primary: '#6366f1',
                secondary: '#fff',
            },
        });
    },

    // Thông báo Lỗi
    error: (message: string) => {
        return toast.error(message, {
            ...baseOptions,
            style: {
                ...baseOptions.style,
                border: '1px solid #fecaca',
                background: '#fef2f2',
                color: '#991b1b',
            },
        });
    },

    // Thông báo Đang xử lý (Loading)
    loading: (message: string) => {
        return toast.loading(message, baseOptions);
    },

    // Hàm để xóa thông báo đang hiện (dùng khi toast.loading xong)
    dismiss: (toastId?: string) => toast.dismiss(toastId),
};