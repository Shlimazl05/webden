

"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from 'react-hot-toast'; // 1. Import thư viện toast
import { loginApi } from "./auth.api";
import { tokenUtils } from "@/utils/token.utils";

/**
 * Hook dùng chung: Lấy thông tin user hiện tại và đăng xuất
 */
export const useAuth = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) {
          setUser({
            name: parsedUser.name || parsedUser.username,
            role: parsedUser.role
          });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Lỗi đọc dữ liệu user:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  const logout = useCallback(() => {
    // FIX 1: Phải dùng tokenUtils để xóa sạch localStorage
    tokenUtils.clearTokens();
    localStorage.removeItem('user');

    // Xóa thêm các cookie nếu có dùng
    Cookies.remove('user_role', { path: '/' });

    setUser(null);
    setIsLoggedIn(false);

    toast.success("Đã đăng xuất");

    // Dùng window.location để reset sạch bộ nhớ RAM của trình duyệt
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }, []);

  return { user, isLoggedIn, isLoaded, logout };
};


/**
 * Hook bảo vệ trang Admin (Dùng trong Layout Admin)
 */
export const useAdminAuth = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = Cookies.get("user_role");
    
    if (!role || role.toLowerCase() !== "admin") {
      const timer = setTimeout(() => {
        toast.error("Bạn không có quyền truy cập vùng quản trị!"); // Thay alert bằng toast
        router.push("/admin"); // Đưa về trang login của admin
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  return { isAuthorized };
};

/**
 * Hook xử lý logic Đăng nhập cho ADMIN (Dùng cho AdminLoginForm)
 */
export const useAdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminAction = async (credentials: { identifier: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await loginApi(credentials);
      const resData = response.data || response;
      const { token, user: userData } = resData;

      const role = userData.role.toLowerCase();

      // KIỂM TRA QUYỀN TRƯỚC KHI CHO VÀO ADMIN
      if (role !== "admin") {
        toast.error("Tài khoản này không có quyền quản trị!");
        return;
      }

      tokenUtils.setAccessToken(token); 
      localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      Cookies.set("user_role", role, { expires: 7, path: '/' });

      toast.success(`Xác thực thành công! Chào Admin ${userData.name}`);

      // Đợi 1 chút để hiện Toast rồi mới load lại trang
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 800);

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đăng nhập Admin thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleAdminAction, isLoading };
};

/**
 * Hook xử lý logic Đăng nhập cho CLIENT (Dùng cho LoginForm khách hàng)
 */
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginAction = async (credentials: { identifier: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await loginApi(credentials);
      
      const resData = response.data || response;
      const { token, user: userData } = resData;

      const role = userData.role.toLowerCase();
      tokenUtils.setAccessToken(token); 
      localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      Cookies.set("user_role", role, { expires: 7, path: '/' });

      toast.success(`Đăng nhập thành công!`);

      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      }, 800);

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Sai tài khoản hoặc mật khẩu!");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLoginAction, isLoading };
};