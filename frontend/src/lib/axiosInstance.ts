import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
// Sửa lỗi chính tả: .contants -> .constants
import { API_BASE_URL, AUTH_ENDPOINTS } from "../constants/api.contants"; 
import { tokenUtils } from "../utils/token.utils";

// Tạo instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 1. Interceptor cho Request: Tự động đính kèm Token vào Header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenUtils.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 2. Interceptor cho Response: Xử lý dữ liệu trả về và Refresh Token
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Tùy chọn: Bạn có thể trả về response.data luôn để ở feature đỡ phải .data
    // return response.data; 
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Lỗi 401 (Unauthorized) - Thường là do Token hết hạn
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      // Đảm bảo không refresh token khi đang ở các trang auth cơ bản
      !originalRequest.url?.includes(AUTH_ENDPOINTS.LOGIN) &&
      !originalRequest.url?.includes(AUTH_ENDPOINTS.REGISTER)
    ) {
      originalRequest._retry = true;
      const refreshToken = tokenUtils.getRefreshToken();

      if (refreshToken) {
        try {
          // Gọi API refresh token (Dùng axios thường, không dùng axiosInstance để tránh loop)
          const { data } = await axios.post(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
            refreshToken,
          });

          // Lấy token mới từ response
          const newAccessToken = data?.data?.accessToken || data?.accessToken;
          
          if (newAccessToken) {
            tokenUtils.setAccessToken(newAccessToken); // Hàm này phải có trong token.utils.ts
            
            // Thực hiện lại request cũ với token mới
            if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          // Nếu refresh token cũng hỏng (hết hạn nốt) -> Logout sạch sẽ
          tokenUtils.clearTokens();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
          // Không có refresh token thì đá ra login luôn
          tokenUtils.clearTokens();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;