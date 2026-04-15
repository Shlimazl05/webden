import { useState, useEffect, useCallback } from 'react';

export const useBanner = (imageCount: number, interval: number = 5000) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Hàm chuyển slide tiếp theo
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
    }, [imageCount]);

    // Hàm click chọn slide cụ thể
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Tự động chạy
    useEffect(() => {
        const timer = setInterval(nextSlide, interval);
        return () => clearInterval(timer); // Xóa timer khi component unmount để tránh leak memory
    }, [nextSlide, interval]);

    return { currentIndex, goToSlide };
};