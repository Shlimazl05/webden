import { useState, useEffect } from 'react';
import { IOrder } from '../order.types';

export const useOrderCountdown = (order: IOrder) => {
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        // Chỉ chạy timer nếu là SePay, trạng thái Pending và chưa thanh toán
        const isEligible = order.paymentMethod === 'SePay' &&
            order.status === 'Pending' &&
            order.paymentStatus !== 'Paid';

        if (!isEligible) return;

        const updateTimer = () => {
            const startTime = new Date(order.orderDate || order.createdAt).getTime();
            const deadline = startTime + 10 * 60 * 1000; // 10 phút
            const diff = deadline - Date.now();

            if (diff > 0) {
                const m = Math.floor(diff / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${m}p ${s}s`);
                setIsExpired(false);
            } else {
                setTimeLeft("Hết hạn");
                setIsExpired(true);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [order]);

    return { timeLeft, isExpired };
};