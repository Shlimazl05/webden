import { useState, useRef, useEffect } from 'react';

export const useProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Đóng menu
    const closeMenu = () => setIsOpen(false);

    // Đảo ngược trạng thái menu (Toggle)
    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    // Xử lý click ra ngoài để đóng menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return {
        isOpen,
        menuRef,
        toggleMenu,
        closeMenu
    };
};