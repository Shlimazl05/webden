

// // src/features/auth/auth.hooks.ts
// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { loginApi } from "./auth.api";
// import { tokenUtils } from "@/utils/token.utils"; // QUAN TRỌNG: Phải import cái này

// /**
//  * Hook dùng chung để lấy thông tin user hiện tại và đăng xuất
//  */
// export const useAuth = () => {
//   const [user, setUser] = useState<{ name: string } | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Chỉ chạy ở phía Client để đọc localStorage
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
//     localStorage.removeItem('user');
//     Cookies.remove('token', { path: '/' });
//     Cookies.remove('user_role', { path: '/' });
    
//     setUser(null);
//     setIsLoggedIn(false);

//     // Dùng href để reset toàn bộ trạng thái app, tránh lỗi cache Middleware
//     window.location.href = "/login";
//   }, []);

//   return { user, isLoggedIn, isLoaded, logout };
// };

// /**
//  * Hook bảo vệ các trang Admin (Chặn truy cập nếu không phải admin)
//  */
// export const useAdminAuth = () => {
//   const router = useRouter();
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     const role = Cookies.get("user_role");
    
//     if (!role || role.toLowerCase() !== "admin") {
//       // Nếu không phải admin, thông báo và đá về login
//       const timeout = setTimeout(() => {
//         alert("Bạn không có quyền truy cập vùng quản trị!");
//         router.push("/login");
//       }, 100);
//       return () => clearTimeout(timeout);
//     } else {
//       setIsAuthorized(true);
//     }
//   }, [router]);

//   return { isAuthorized };
// };

// /**
//  * Hook xử lý riêng logic Đăng nhập cho Form
//  */
// export const useLogin = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLoginAction = async (credentials: { identifier: string; password: string }) => {
//     try {
//       setIsLoading(true);
//       const response = await loginApi(credentials);
      
//       // Chấp nhận cả cấu trúc response.data hoặc response trực tiếp tùy theo Axios interceptor
//       const resData = response.data || response;
//       const { token, user: userData } = resData;

//       if (!token || !userData) {
//         throw new Error("Dữ liệu phản hồi từ máy chủ không hợp lệ");
//       }

//       // 1. CHUẨN HÓA & LƯU TRỮ
//       const role = userData.role.toLowerCase();
      
//       // Lưu Token vào cookie thông qua utils của bạn
//       tokenUtils.setAccessToken(token); 
      
//       // Lưu thông tin user để hiển thị UI
//       localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      
//       // Lưu Role vào Cookie (BẮT BUỘC có path: '/' để Middleware mọi cấp độ đều đọc được)
//       Cookies.set("user_role", role, { expires: 7, path: '/' });

//       // 2. ĐIỀU HƯỚNG MẠNH TAY
//       // Sử dụng window.location.href thay cho router.push để đảm bảo 
//       // Middleware nhận diện Cookie mới ngay lập tức mà không cần F5 thủ công.
//       if (role === "admin") {
//         window.location.href = "/admin/dashboard";
//       } else {
//         window.location.href = "/";
//       }
//     } catch (error: any) {
//       const errorMsg = error.response?.data?.message || error.message || "Đăng nhập thất bại";
//       alert(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { handleLoginAction, isLoading };
// };
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginApi } from "./auth.api";
import { tokenUtils } from "@/utils/token.utils";

/**
 * Hook dùng chung để lấy thông tin user hiện tại và đăng xuất
 */
export const useAuth = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Chỉ chạy ở Client
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && (parsedUser.name || parsedUser.username)) {
          setUser({
            name: parsedUser.name || parsedUser.username
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
    // 1. Xóa sạch LocalStorage
    localStorage.removeItem('user');

    // 2. Xóa sạch Cookies (Quan trọng: Phải có path '/' mới xóa được triệt để)
    Cookies.remove('token', { path: '/' });
    Cookies.remove('user_role', { path: '/' });
    
    // 3. Reset state
    setUser(null);
    setIsLoggedIn(false);

    // 4. CHUYỂN HƯỚNG MẠNH TAY
    // Dùng window.location.href thay vì router.push để xóa sạch cache của trình duyệt
    // và đảm bảo Middleware chặn quyền ngay lập tức.
    window.location.href = "/login";
  }, []);

  return { user, isLoggedIn, isLoaded, logout };
};

/**
 * Hook bảo vệ trang Admin
 */
export const useAdminAuth = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = Cookies.get("user_role");
    
    // Nếu không thấy role admin, đá về trang login
    if (!role || role.toLowerCase() !== "admin") {
      // Dùng timeout cực ngắn để tránh xung đột với quá trình ghi Cookie
      const timer = setTimeout(() => {
        alert("Bạn không có quyền truy cập vùng quản trị!");
        router.push("/login");
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  return { isAuthorized };
};

/**
 * Hook xử lý logic Đăng nhập
 */
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginAction = async (credentials: { identifier: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await loginApi(credentials);
      
      const resData = response.data || response;
      const { token, user: userData } = resData;

      if (!token || !userData) {
        throw new Error("Dữ liệu đăng nhập không hợp lệ từ máy chủ");
      }

      // 1. CHUẨN HÓA & LƯU TRỮ
      const role = userData.role.toLowerCase();
      
      // Lưu Token qua utils
      tokenUtils.setAccessToken(token); 
      
      // Lưu User Info vào LocalStorage để UI hiển thị "Xin chào..."
      localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      
      // Lưu Role vào Cookie để Middleware và useAdminAuth kiểm tra
      // BẮT BUỘC có path: '/'
      Cookies.set("user_role", role, { expires: 7, path: '/' });

      // 2. ĐIỀU HƯỚNG
      // Dùng window.location.href để ép Middleware nhận Cookie mới ngay lập tức
      // Khắc phục lỗi "bấm 2 lần mới vào được"
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