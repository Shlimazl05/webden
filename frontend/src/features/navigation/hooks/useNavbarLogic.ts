// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/features/auth/auth.hooks';
// import { useCartStore } from '@/features/cart/hooks/useCartStore';
// import { ICartStore } from '@/features/cart/cart.types';

// export const useNavbarLogic = () => {
//     const { user, isLoggedIn, isLoaded, logout } = useAuth();
//     const cartCount = useCartStore((state: ICartStore) => state.cartCount);
//     const fetchCartCount = useCartStore((state: ICartStore) => state.fetchCartCount);
//     const pathname = usePathname();
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showNavbar, setShowNavbar] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);

//     // Xử lý ẩn/hiện khi scroll
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

//     // Sync giỏ hàng lần đầu
//     useEffect(() => {
//         if (isLoggedIn) fetchCartCount();
//     }, [isLoggedIn, fetchCartCount]);

//     const isCartPage = pathname === '/cart';

//     return {
//         user,
//         isLoggedIn,
//         isLoaded,
//         logout,
//         cartCount,
//         showNavbar,
//         isCartPage
//     };
// };



import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Thêm useRouter để chuyển trang
import { useAuth } from '@/features/auth/auth.hooks';
import { useCartStore } from '@/features/cart/hooks/useCartStore';
import { ICartStore } from '@/features/cart/cart.types';

export const useNavbarLogic = () => {
    const { user, isLoggedIn, isLoaded, logout } = useAuth();
    const cartCount = useCartStore((state: ICartStore) => state.cartCount);
    const fetchCartCount = useCartStore((state: ICartStore) => state.fetchCartCount);
    const pathname = usePathname();
    const router = useRouter(); // Khởi tạo router

    // State cho tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // 1. Xử lý ẩn/hiện khi scroll (Giữ nguyên logic của ní)
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

    // 2. Sync giỏ hàng lần đầu (Giữ nguyên logic của ní)
    useEffect(() => {
        if (isLoggedIn) fetchCartCount();
    }, [isLoggedIn, fetchCartCount]);

    /**
     * 3. Xử lý tìm kiếm khi người dùng nhấn Enter hoặc click icon Search
     */
    const handleSearchSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault(); // Ngăn load lại trang nếu dùng thẻ <form>

        if (searchTerm.trim()) {
            // Chuyển hướng sang trang kết quả tìm kiếm với query parameter
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            // Hoặc nếu ní dùng trang /search riêng: router.push(`/search?q=${...}`)
        }
    };

    const isCartPage = pathname === '/cart';

    return {
        user,
        isLoggedIn,
        isLoaded,
        logout,
        cartCount,
        showNavbar,
        isCartPage,
        // Trả thêm các biến tìm kiếm ra ngoài cho Navbar sử dụng
        searchTerm,
        setSearchTerm,
        handleSearchSubmit
    };
};