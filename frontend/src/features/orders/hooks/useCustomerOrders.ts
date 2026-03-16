// import { useState, useEffect, useCallback } from 'react';
// import { orderClientApi } from '../api/order.client.api';
// import { IOrder } from '../order.types';
// import toast from 'react-hot-toast';

// export const useCustomerOrders = () => {
//     const [orders, setOrders] = useState<IOrder[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [activeTab, setActiveTab] = useState('all');

//     const fetchOrders = useCallback(async () => {
//         try {
//             setLoading(true);
//             const res = await orderClientApi.getMyOrders(
//                 currentPage,
//                 5,
//                 activeTab === 'all' ? '' : activeTab
//             );

//             if (res && res.orders) {
//                 setOrders(res.orders);
//                 setTotalPages(res.pagination?.totalPages || 1);
//             } else {
//                 setOrders([]);
//             }
//         } catch (err) {
//             setOrders([]);
//         } finally {
//             setLoading(false);
//         }
//     }, [currentPage, activeTab]);

//     useEffect(() => { fetchOrders(); }, [fetchOrders]);

//     const handleCancelOrder = async (orderId: string) => {
//         if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;
//         try {
//             await orderClientApi.cancelMyOrder(orderId);
//             toast.success("Đã hủy đơn hàng thành công");
//             fetchOrders();
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Không thể hủy đơn hàng");
//         }
//     };

//     return {
//         orders, loading, currentPage, totalPages, activeTab,
//         handlePageChange: setCurrentPage,
//         handleTabChange: (tab: string) => { setActiveTab(tab); setCurrentPage(1); },
//         handleCancelOrder,
//         refresh: fetchOrders
//     };
// };


import { useState, useEffect, useCallback } from 'react';
import { orderClientApi } from '../api/order.client.api';
import toast from 'react-hot-toast';

export const useCustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState('all');
    const [paymentInfo, setPaymentInfo] = useState<{ qrUrl: string, orderCode: string } | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const res = await orderClientApi.getMyOrders(currentPage, 10, activeTab === 'all' ? '' : activeTab);
            if (res.success && res.data) {
                setOrders(res.data.orders);
                setTotalPages(res.data.pagination?.totalPages || 1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, activeTab]);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const handleCancelOrder = async (id: string) => {
        if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
        try {
            const res = await orderClientApi.cancelMyOrder(id);
            if (res.success) {
                toast.success("Hủy đơn hàng thành công");
                fetchOrders();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Lỗi khi hủy đơn");
        }
    };

    const handleOpenPayment = (order: any) => {
        // Ưu tiên dùng link QR từ Backend nếu có, nếu không thì tự tạo theo .env
        const qrUrl = order.checkoutUrl || `https://qr.sepay.vn/img?acc=0000887124333&bank=MBBank&amount=${Math.round(order.finalAmount)}&des=${order.orderCode}`;
        setPaymentInfo({ qrUrl, orderCode: order.orderCode });
    };

    return {
        orders, loading, totalPages, currentPage, activeTab, paymentInfo,
        setPage: setCurrentPage,
        setTab: (tab: string) => { setActiveTab(tab); setCurrentPage(1); },
        handleCancelOrder,
        handleOpenPayment,
        closePayment: () => setPaymentInfo(null),
        refresh: fetchOrders
    };
};