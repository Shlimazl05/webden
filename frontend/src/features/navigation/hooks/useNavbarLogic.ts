


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