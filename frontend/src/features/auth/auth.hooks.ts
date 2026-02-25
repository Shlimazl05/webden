
// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { loginApi } from "./auth.api";
// import { tokenUtils } from "@/utils/token.utils";

// /**
//  * Hook dùng chung để lấy thông tin user hiện tại và đăng xuất
//  */
// export const useAuth = () => {
//   const [user, setUser] = useState<{ name: string } | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Chỉ chạy ở Client
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       try {
//         const parsedUser = JSON.parse(savedUser);
//         if (parsedUser && (parsedUser.name || parsedUser.username)) {
//           setUser({
//             name: parsedUser.name || parsedUser.username
//           });
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.error("Lỗi đọc dữ liệu user:", error);
//       }
//     }
//     setIsLoaded(true); 
//   }, []);

//   const logout = useCallback(() => {
//     // 1. Xóa sạch LocalStorage
//     localStorage.removeItem('user');

//     // 2. Xóa sạch Cookies (Quan trọng: Phải có path '/' mới xóa được triệt để)
//     Cookies.remove('token', { path: '/' });
//     Cookies.remove('user_role', { path: '/' });
    
//     // 3. Reset state
//     setUser(null);
//     setIsLoggedIn(false);

//     // 4. CHUYỂN HƯỚNG MẠNH TAY
//     // Dùng window.location.href thay vì router.push để xóa sạch cache của trình duyệt
//     // và đảm bảo Middleware chặn quyền ngay lập tức.
//     window.location.href = "/login";
//   }, []);

//   return { user, isLoggedIn, isLoaded, logout };
// };

// /**
//  * Hook bảo vệ trang Admin
//  */
// export const useAdminAuth = () => {
//   const router = useRouter();
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     const role = Cookies.get("user_role");
    
//     // Nếu không thấy role admin, đá về trang login
//     if (!role || role.toLowerCase() !== "admin") {
//       // Dùng timeout cực ngắn để tránh xung đột với quá trình ghi Cookie
//       const timer = setTimeout(() => {
//         alert("Bạn không có quyền truy cập vùng quản trị!");
//         router.push("/login");
//       }, 100);
//       return () => clearTimeout(timer);
//     } else {
//       setIsAuthorized(true);
//     }
//   }, [router]);

//   return { isAuthorized };
// };

// /**
//  * Hook xử lý logic Đăng nhập
//  */
// export const useLogin = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLoginAction = async (credentials: { identifier: string; password: string }) => {
//     try {
//       setIsLoading(true);
//       const response = await loginApi(credentials);
      
//       const resData = response.data || response;
//       const { token, user: userData } = resData;

//       if (!token || !userData) {
//         throw new Error("Dữ liệu đăng nhập không hợp lệ từ máy chủ");
//       }

//       // 1. CHUẨN HÓA & LƯU TRỮ
//       const role = userData.role.toLowerCase();
      
//       // Lưu Token qua utils
//       tokenUtils.setAccessToken(token); 
      
//       // Lưu User Info vào LocalStorage để UI hiển thị "Xin chào..."
//       localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      
//       // Lưu Role vào Cookie để Middleware và useAdminAuth kiểm tra
//       // BẮT BUỘC có path: '/'
//       Cookies.set("user_role", role, { expires: 7, path: '/' });

//       // 2. ĐIỀU HƯỚNG
//       // Dùng window.location.href để ép Middleware nhận Cookie mới ngay lập tức
//       // Khắc phục lỗi "bấm 2 lần mới vào được"
//       if (role === "admin") {
//         window.location.href = "/admin/dashboard";
//       } else {
//         window.location.href = "/";
//       }
//     } catch (error: any) {
//       const errorMsg = error.response?.data?.message || "Đăng nhập thất bại!";
//       alert(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { handleLoginAction, isLoading };
// };

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
    localStorage.removeItem('user');
    Cookies.remove('token', { path: '/' });
    Cookies.remove('user_role', { path: '/' });
    
    setUser(null);
    setIsLoggedIn(false);

    toast.success("Đã đăng xuất"); // Thông báo đẹp khi logout

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