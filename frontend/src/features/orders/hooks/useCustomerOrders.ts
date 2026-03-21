

// import { useState, useEffect, useCallback } from 'react';
// import { orderClientApi } from '../api/order.client.api';
// import toast from 'react-hot-toast';

// export const useCustomerOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [activeTab, setActiveTab] = useState('all');

//     // Quản lý Modal Thanh toán
//     const [paymentInfo, setPaymentInfo] = useState<{ qrUrl: string, orderCode: string } | null>(null);

//     // --- QUẢN LÝ MODAL HỦY ĐƠN ---
//     const [cancelModal, setCancelModal] = useState<{ isOpen: boolean; orderId: string | null }>({
//         isOpen: false,
//         orderId: null
//     });

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

//     // Hàm mở modal (truyền vào nút Hủy của Card)
//     const openCancelModal = (id: string) => {
//         setCancelModal({ isOpen: true, orderId: id });
//     };

//     // Hàm đóng modal
//     const closeCancelModal = () => {
//         setCancelModal({ isOpen: false, orderId: null });
//     };

//     // Hàm thực hiện hủy (gọi khi bấm Xác nhận trong Modal)
//     const handleConfirmCancel = async () => {
//         if (!cancelModal.orderId) return;

//         const toastId = toast.loading("Đang xử lý hủy đơn...");
//         try {
//             const res = await orderClientApi.cancelMyOrder(cancelModal.orderId);
//             if (res.success) {
//                 toast.success("Đã hủy đơn hàng", { id: toastId });
//                 fetchOrders(); // Load lại danh sách
//             }
//         } catch (error: any) {
//             toast.error(error.response?.data?.message || "Lỗi khi hủy đơn", { id: toastId });
//         } finally {
//             closeCancelModal();
//         }
//     };

//     const handleOpenPayment = (order: any) => {
//         const qrUrl = order.checkoutUrl || `https://qr.sepay.vn/img?acc=0000887124333&bank=MBBank&amount=${Math.round(order.finalAmount)}&des=${order.orderCode}`;
//         setPaymentInfo({ qrUrl, orderCode: order.orderCode });
//     };

//     return {
//         orders, loading, totalPages, currentPage, activeTab, paymentInfo, cancelModal,
//         setPage: setCurrentPage,
//         setTab: (tab: string) => { setActiveTab(tab); setCurrentPage(1); },
//         openCancelModal,
//         closeCancelModal,
//         handleConfirmCancel,
//         handleOpenPayment,
//         closePayment: () => setPaymentInfo(null),
//         refresh: fetchOrders
//     };
// };


import { statusConfig } from '@/features/orders/components/OrderStatus';
import { useState, useEffect, useCallback } from 'react';
import { orderClientApi } from '../api/order.client.api';
import { IOrder } from '../order.types'; // Import type để code chuẩn hơn
import toast from 'react-hot-toast';

export const useCustomerOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]); // Danh sách đơn hàng
    const [order, setOrder] = useState<IOrder | null>(null); // Đơn hàng chi tiết
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

    // 1. Lấy danh sách đơn hàng (Trang List)
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

    // 2. Lấy chi tiết một đơn hàng (Trang Detail)
    const fetchOrderDetail = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const res = await orderClientApi.getOrderDetail(id); // Gọi API chi tiết
            if (res.success && res.data) {
                setOrder(res.data);
            }
        } catch (err) {
            console.error(err);
            toast.error("Không thể tải thông tin đơn hàng");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Chỉ tự động fetch list khi không có orderId cụ thể (logic cho trang list)
        // Nếu bạn muốn dùng hook này độc lập cho trang detail, hãy gọi fetchOrderDetail ở useEffect của Page đó
        fetchOrders();
    }, [fetchOrders]);

    // Hàm mở modal hủy
    const openCancelModal = (id: string) => {
        setCancelModal({ isOpen: true, orderId: id });
    };

    // Hàm đóng modal hủy
    const closeCancelModal = () => {
        setCancelModal({ isOpen: false, orderId: null });
    };

    // Hàm thực hiện hủy đơn
    const handleConfirmCancel = async () => {
        if (!cancelModal.orderId) return;

        const toastId = toast.loading("Đang xử lý hủy đơn...");
        try {
            const res = await orderClientApi.cancelMyOrder(cancelModal.orderId);
            if (res.success) {
                toast.success("Đã hủy đơn hàng", { id: toastId });

                // Cập nhật lại dữ liệu sau khi hủy
                if (order && order._id === cancelModal.orderId) {
                    fetchOrderDetail(order._id); // Nếu đang ở trang detail thì refresh detail
                }
                fetchOrders(); // Luôn refresh list
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Lỗi khi hủy đơn", { id: toastId });
        } finally {
            closeCancelModal();
        }
    };

    // Hàm mở Modal Thanh toán
    const handleOpenPayment = (targetOrder: any) => {
        const qrUrl = targetOrder.checkoutUrl || `https://qr.sepay.vn/img?acc=0000887124333&bank=MBBank&amount=${Math.round(targetOrder.finalAmount)}&des=${targetOrder.orderCode}`;
        setPaymentInfo({ qrUrl, orderCode: targetOrder.orderCode });
    };

    return {
        // States
        orders,
        order,
        loading,
        totalPages,
        currentPage,
        activeTab,
        paymentInfo,
        cancelModal,

        // Methods cho trang List
        setPage: setCurrentPage,
        setTab: (tab: string) => { setActiveTab(tab); setCurrentPage(1); },
        refresh: fetchOrders,

        // Methods cho trang Detail
        fetchOrderDetail,

        // Actions dùng chung
        openCancelModal,
        closeCancelModal,
        handleConfirmCancel,
        handleOpenPayment,
        closePayment: () => setPaymentInfo(null),
    };
};