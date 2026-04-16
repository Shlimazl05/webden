
// import { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation'; // Thêm useRouter để chuyển trang
// import { useAuth } from '@/features/auth/auth.hooks';
// import { useCartStore } from '@/features/cart/hooks/useCartStore';
// import { ICartStore } from '@/features/cart/cart.types';
// import { productClientApi } from '@/features/product/api/product.client.api';

// export const useNavbarLogic = () => {
//     const { user, isLoggedIn, isLoaded, logout } = useAuth();
//     const cartCount = useCartStore((state: ICartStore) => state.cartCount);
//     const fetchCartCount = useCartStore((state: ICartStore) => state.fetchCartCount);
//     const pathname = usePathname();
//     const router = useRouter(); // Khởi tạo router

//     // State cho tìm kiếm
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showNavbar, setShowNavbar] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);

//     // 1. Xử lý ẩn/hiện khi scroll (Giữ nguyên logic của ní)
//     useEffect(() => {
//         const controlNavbar = () => {
//             const currentScrollY = window.scrollY;
//             if (currentScrollY > lastScrollY && currentScrollY > 100) {
//                 setShowNavbar(false);
//             } else {
//                 setShowNavbar(true);
//             }
//             setLastScrollY(currentScrollY);
//         };

//         window.addEventListener('scroll', controlNavbar);
//         return () => window.removeEventListener('scroll', controlNavbar);
//     }, [lastScrollY]);

//     // 2. Sync giỏ hàng lần đầu (Giữ nguyên logic của ní)
//     useEffect(() => {
//         if (isLoggedIn) fetchCartCount();
//     }, [isLoggedIn, fetchCartCount]);

//     /**
//      * 3. Xử lý tìm kiếm khi người dùng nhấn Enter hoặc click icon Search
//      */
//     const handleSearchSubmit = (e?: React.FormEvent) => {
//         if (e) e.preventDefault(); // Ngăn load lại trang nếu dùng thẻ <form>

//         if (searchTerm.trim()) {
//             // Chuyển hướng sang trang kết quả tìm kiếm với query parameter
//             router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
//             // Hoặc nếu ní dùng trang /search riêng: router.push(`/search?q=${...}`)
//         }
//     };

//     const isCartPage = pathname === '/cart';

//     return {
//         user,
//         isLoggedIn,
//         isLoaded,
//         logout,
//         cartCount,
//         showNavbar,
//         isCartPage,
//         // Trả thêm các biến tìm kiếm ra ngoài cho Navbar sử dụng
//         searchTerm,
//         setSearchTerm,
//         handleSearchSubmit
//     };
// };


// import { useState, useEffect, useRef } from 'react'; // Thêm useRef
// import { usePathname, useRouter } from 'next/navigation';
// import { useAuth } from '@/features/auth/auth.hooks';
// import { useCartStore } from '@/features/cart/hooks/useCartStore';
// import { ICartStore } from '@/features/cart/cart.types';
// import { productClientApi } from '@/features/product/api/product.client.api'; // Import API Client
// import toast from 'react-hot-toast'; // Import thư viện thông báo
// import { IProduct } from '@/features/product/product.types';


// export const useNavbarLogic = () => {
//     const { user, isLoggedIn, isLoaded, logout } = useAuth();
//     const cartCount = useCartStore((state: ICartStore) => state.cartCount);
//     const fetchCartCount = useCartStore((state: ICartStore) => state.fetchCartCount);
//     const pathname = usePathname();
//     const router = useRouter();

//     // --- State cũ ---
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showNavbar, setShowNavbar] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);

//     // --- MỚI: State xử lý tìm kiếm bằng hình ảnh ---
//     const [isVisualLoading, setIsVisualLoading] = useState(false);
//     const [visualResults, setVisualResults] = useState<IProduct[]>([]);
//     const fileInputRef = useRef<HTMLInputElement>(null); // Để tham chiếu tới input file ẩn

//     // 1. Logic Scroll (Giữ nguyên của bạn)
//     useEffect(() => {
//         const controlNavbar = () => {
//             const currentScrollY = window.scrollY;
//             if (currentScrollY > lastScrollY && currentScrollY > 100) {
//                 setShowNavbar(false);
//             } else {
//                 setShowNavbar(true);
//             }
//             setLastScrollY(currentScrollY);
//         };
//         window.addEventListener('scroll', controlNavbar);
//         return () => window.removeEventListener('scroll', controlNavbar);
//     }, [lastScrollY]);

//     // 2. Logic Sync giỏ hàng (Giữ nguyên của bạn)
//     useEffect(() => {
//         if (isLoggedIn) fetchCartCount();
//     }, [isLoggedIn, fetchCartCount]);

//     // 3. Logic Tìm kiếm văn bản (Giữ nguyên của bạn)
//     const handleSearchSubmit = (e?: React.FormEvent) => {
//         if (e) e.preventDefault();
//         if (searchTerm.trim()) {
//             router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
//         }
//     };

//     // --- MỚI: Logic xử lý Tìm kiếm bằng hình ảnh (AI Visual Search) ---

//     // Hàm kích hoạt mở cửa sổ chọn ảnh khi bấm vào icon máy ảnh
//     const handleCameraClick = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };

//     // Hàm xử lý sau khi người dùng chọn file ảnh xong
//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         // Bắt đầu quá trình gọi AI
//         setIsVisualLoading(true);
//         const toastId = toast.loading("AI đang phân tích hình ảnh..."); // Hiện toast chờ (màu Indigo mặc định của bạn)

//         try {
//             // Gọi đến API visualSearch đã thêm ở product.client.api
//             const results = await productClientApi.visualSearch(file);

//             setVisualResults(results); // Lưu kết quả trả về vào state

//             if (results.length > 0) {
//                 toast.success(`Tìm thấy ${results.length} sản phẩm tương đồng!`, { id: toastId });
//             } else {
//                 toast.error("Không tìm thấy sản phẩm nào giống ảnh này.", { id: toastId });
//             }
//         } catch (error: any) {
//             console.error("Lỗi AI Search:", error);
//             toast.error("Lỗi hệ thống nhận diện, vui lòng thử lại sau.", { id: toastId });
//         } finally {
//             setIsVisualLoading(false);
//             // Quan trọng: Reset input file để người dùng có thể chọn lại chính tấm ảnh đó nếu muốn
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         }
//     };

//     const isCartPage = pathname === '/cart';

//     return {
//         // Auth & Cart
//         user, isLoggedIn, isLoaded, logout,
//         cartCount, showNavbar, isCartPage,

//         // Text Search
//         searchTerm, setSearchTerm, handleSearchSubmit,

//         // --- Trả thêm các hàm AI ra ngoài cho UI sử dụng ---
//         isVisualLoading,
//         visualResults,
//         setVisualResults, // Để UI có thể chủ động reset kết quả (ví dụ nút Đóng)
//         fileInputRef,
//         handleCameraClick,
//         handleFileChange
//     };
// };


import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/auth.hooks';
import { useCartStore } from '@/features/cart/hooks/useCartStore';
import { ICartStore } from '@/features/cart/cart.types';
// Import hook AI đã tách ra
import { useVisualSearch } from '@/features/search/hooks/useVisualSearch';

export const useNavbarLogic = () => {
    const { user, isLoggedIn, isLoaded, logout } = useAuth();
    const cartCount = useCartStore((state: ICartStore) => state.cartCount);
    const fetchCartCount = useCartStore((state: ICartStore) => state.fetchCartCount);
    const pathname = usePathname();
    const router = useRouter();

    // --- 1. Nhúng Logic Tìm kiếm bằng hình ảnh (AI) ---
    // Sau khi tách, hook này trả về mọi thứ liên quan đến AI Search
    const visualSearch = useVisualSearch();

    // --- 2. Logic Tìm kiếm văn bản cũ ---
    const [searchTerm, setSearchTerm] = useState("");
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // 3. Xử lý ẩn/hiện khi scroll
    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    // 4. Sync giỏ hàng lần đầu
    useEffect(() => {
        if (isLoggedIn) fetchCartCount();
    }, [isLoggedIn, fetchCartCount]);

    // 5. Xử lý tìm kiếm văn bản
    const handleSearchSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const isCartPage = pathname === '/cart';

    return {
        // Auth & Cart
        user,
        isLoggedIn,
        isLoaded,
        logout,
        cartCount,
        showNavbar,
        isCartPage,

        // Text Search
        searchTerm,
        setSearchTerm,
        handleSearchSubmit,

        // --- TRẢ VỀ TOÀN BỘ OBJECT AI SEARCH ---
        // Bao gồm: visualResults, isVisualLoading, fileInputRef, handleCameraClick, handleFileChange, clearResults
        visualSearch
    };
};