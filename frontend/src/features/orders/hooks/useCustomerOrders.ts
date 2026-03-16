


// import { useState, useEffect, useCallback } from 'react';
// import { orderClientApi } from '../api/order.client.api';
// import toast from 'react-hot-toast';

// export const useCustomerOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [activeTab, setActiveTab] = useState('all');
//     const [paymentInfo, setPaymentInfo] = useState<{ qrUrl: string, orderCode: string } | null>(null);

//     const fetchOrders = useCallback(async () => {
//         try {
//             setLoading(true);
//             const res = await orderClientApi.getMyOrders(currentPage, 10, activeTab === 'all' ? '' : activeTab);
//             if (res.success && res.data) {
//                 setOrders(res.data.orders);
//                 setTotalPages(res.data.pagination?.totalPages || 1);
//             }
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     }, [currentPage, activeTab]);

//     useEffect(() => { fetchOrders(); }, [fetchOrders]);

//     const handleCancelOrder = async (id: string) => {
//         if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
//         try {
//             const res = await orderClientApi.cancelMyOrder(id);
//             if (res.success) {
//                 toast.success("Hủy đơn hàng thành công");
//                 fetchOrders();
//             }
//         } catch (error: any) {
//             toast.error(error.response?.data?.message || "Lỗi khi hủy đơn");
//         }
//     };

//     const handleOpenPayment = (order: any) => {
//         // Ưu tiên dùng link QR từ Backend nếu có, nếu không thì tự tạo theo .env
//         const qrUrl = order.checkoutUrl || `https://qr.sepay.vn/img?acc=0000887124333&bank=MBBank&amount=${Math.round(order.finalAmount)}&des=${order.orderCode}`;
//         setPaymentInfo({ qrUrl, orderCode: order.orderCode });
//     };

//     return {
//         orders, loading, totalPages, currentPage, activeTab, paymentInfo,
//         setPage: setCurrentPage,
//         setTab: (tab: string) => { setActiveTab(tab); setCurrentPage(1); },
//         handleCancelOrder,
//         handleOpenPayment,
//         closePayment: () => setPaymentInfo(null),
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

    // Quản lý Modal Thanh toán
    const [paymentInfo, setPaymentInfo] = useState<{ qrUrl: string, orderCode: string } | null>(null);

    // --- QUẢN LÝ MODAL HỦY ĐƠN ---
    const [cancelModal, setCancelModal] = useState<{ isOpen: boolean; orderId: string | null }>({
        isOpen: false,
        orderId: null
    });

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

    // Hàm mở modal (truyền vào nút Hủy của Card)
    const openCancelModal = (id: string) => {
        setCancelModal({ isOpen: true, orderId: id });
    };

    // Hàm đóng modal
    const closeCancelModal = () => {
        setCancelModal({ isOpen: false, orderId: null });
    };

    // Hàm thực hiện hủy (gọi khi bấm Xác nhận trong Modal)
    const handleConfirmCancel = async () => {
        if (!cancelModal.orderId) return;

        const toastId = toast.loading("Đang xử lý hủy đơn...");
        try {
            const res = await orderClientApi.cancelMyOrder(cancelModal.orderId);
            if (res.success) {
                toast.success("Đã hủy đơn hàng", { id: toastId });
                fetchOrders(); // Load lại danh sách
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Lỗi khi hủy đơn", { id: toastId });
        } finally {
            closeCancelModal();
        }
    };

    const handleOpenPayment = (order: any) => {
        const qrUrl = order.checkoutUrl || `https://qr.sepay.vn/img?acc=0000887124333&bank=MBBank&amount=${Math.round(order.finalAmount)}&des=${order.orderCode}`;
        setPaymentInfo({ qrUrl, orderCode: order.orderCode });
    };

    return {
        orders, loading, totalPages, currentPage, activeTab, paymentInfo, cancelModal,
        setPage: setCurrentPage,
        setTab: (tab: string) => { setActiveTab(tab); setCurrentPage(1); },
        openCancelModal,
        closeCancelModal,
        handleConfirmCancel,
        handleOpenPayment,
        closePayment: () => setPaymentInfo(null),
        refresh: fetchOrders
    };
};