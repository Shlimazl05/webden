import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/auth.hooks';
import { useCartStore } from '@/features/cart/hooks/useCartStore';
import { ICartStore } from '@/features/cart/cart.types';

export const useNavbarLogic = () => {
    const { user, isLoggedIn, isLoaded, logout } = useAuth();
    const cartCount = useCartStore((state: ICartStore) => state.cartCount);
    const fetchCartCount = useCartStore((state: ICartStore) => state.fetchCartCount);
    const pathname = usePathname();

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Xử lý ẩn/hiện khi scroll
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

    // Sync giỏ hàng lần đầu
    useEffect(() => {
        if (isLoggedIn) fetchCartCount();
    }, [isLoggedIn, fetchCartCount]);

    const isCartPage = pathname === '/cart';

    return {
        user,
        isLoggedIn,
        isLoaded,
        logout,
        cartCount,
        showNavbar,
        isCartPage
    };
};