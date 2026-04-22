// import axiosInstance from "@/lib/axiosInstance";
// import { IProduct } from "../../product/product.types";

// export const searchApi = {
//     visualSearch: async (file: File): Promise<IProduct[]> => {
//         const formData = new FormData();
//         formData.append('image', file);

//         const response = await axiosInstance.post('/search/visual-search', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         // Backend trả về mảng sản phẩm trực tiếp hoặc trong data.data
//         return response.data.data || response.data;
//     }
// };


import axiosInstance from "@/lib/axiosInstance";
import { IVisualSearchResponse } from "../search.types"; // Import type mới chúng ta vừa sửa

export const searchApi = {
    // 1. Đổi kiểu trả về từ IProduct[] thành IVisualSearchResponse
    visualSearch: async (file: File): Promise<IVisualSearchResponse> => {
        const formData = new FormData();
        formData.append('image', file);

        // 2. Định nghĩa kiểu dữ liệu trả về cho Axios là <IVisualSearchResponse>
        const response = await axiosInstance.post<IVisualSearchResponse>('/search/visual-search', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // 3. Trả về toàn bộ object (bao gồm success, message, products)
        // Không dùng response.data.data nữa vì Backend giờ trả về object phẳng
        return response.data;
    }
};