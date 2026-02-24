"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginApi } from "./auth.api";
import { tokenUtils } from "@/utils/token.utils";

/**
 * 1. Hook dùng chung: Lấy thông tin user hiện tại và Đăng xuất
 */
export const useAuth = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Chỉ chạy ở phía Client
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) {
          setUser({
            name: parsedUser.name || parsedUser.username || "User",
            role: parsedUser.role || "user"
          });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Lỗi đọc dữ liệu user từ LocalStorage:", error);
      }
    }
    setIsLoaded(true); 
  }, []);

  const logout = useCallback(() => {
    // Xóa dữ liệu ở LocalStorage và Cookies
    localStorage.removeItem('user');
    tokenUtils.clearTokens(); // Giả sử hàm này xóa token trong cookie/storage
    Cookies.remove('user_role', { path: '/' });
    Cookies.remove('token', { path: '/' }); // Xóa trực tiếp cho chắc chắn

    // Reset state
    setUser(null);
    setIsLoggedIn(false);

    // Chuyển hướng mạnh tay để làm sạch bộ nhớ trình duyệt
    window.location.href = "/";
  }, []);

  return { user, isLoggedIn, isLoaded, logout };
};

/**
 * 2. Hook bảo vệ các trang Admin (Dùng trong Layout Admin)
 */
export const useAdminAuth = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = Cookies.get("user_role");
    
    // Nếu không thấy role admin, đá về trang login admin
    if (!role || role.toLowerCase() !== "admin") {
      const timer = setTimeout(() => {
        alert("Bạn không có quyền truy cập vùng quản trị!");
        router.push("/admin"); // Về trang login của admin
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  return { isAuthorized };
};

/**
 * 3. Hook xử lý logic Đăng nhập cho ADMIN (Dùng cho AdminLoginForm)
 */
export const useAdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminAction = async (credentials: { identifier: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await loginApi(credentials);
      
      // Chấp nhận cả cấu trúc { data: { token, user } } hoặc { token, user }
      const resData = response.data || response;
      const { token, user: userData } = resData;

      if (!token || !userData) {
        throw new Error("Dữ liệu phản hồi từ máy chủ không hợp lệ");
      }

      const role = userData.role.toLowerCase();

      // KIỂM TRA QUYỀN: Chỉ cho phép admin đi tiếp
      if (role !== "admin") {
        alert("Tài khoản này không có quyền truy cập hệ thống quản trị!");
        return;
      }

      // LƯU TRỮ
      tokenUtils.setAccessToken(token); 
      localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      Cookies.set("user_role", role, { expires: 7, path: '/' });

      // Điều hướng vào Dashboard
      window.location.href = "/admin/dashboard";
      
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Đăng nhập Admin thất bại!";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleAdminAction, isLoading };
};

/**
 * 4. Hook xử lý logic Đăng nhập cho CLIENT (Dùng cho trang đăng nhập khách hàng)
 */
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginAction = async (credentials: { identifier: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await loginApi(credentials);
      
      const resData = response.data || response;
      const { token, user: userData } = resData;

      if (!token || !userData) throw new Error("Lỗi dữ liệu");

      const role = userData.role.toLowerCase();
      
      // LƯU TRỮ
      tokenUtils.setAccessToken(token); 
      localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      Cookies.set("user_role", role, { expires: 7, path: '/' });

      // ĐIỀU HƯỚNG DỰA TRÊN ROLE
      if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Đăng nhập thất bại!";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLoginAction, isLoading };
};