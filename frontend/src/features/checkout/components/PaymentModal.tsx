

"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'; // Thêm AlertCircle
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-hot-toast';

interface PaymentModalProps {
    qrUrl: string;
    orderCode: string;
    onClose: () => void;
}

export const PaymentModal = ({ qrUrl, orderCode, onClose }: PaymentModalProps) => {
    const router = useRouter();

    // Quản lý 3 trạng thái: 'pending' (đang chờ), 'success' (thành công), 'cancelled' (đã hủy)
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'cancelled'>('pending');

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // Chỉ chạy polling nếu đang ở trạng thái pending
        if (paymentStatus === 'pending') {
            timer = setInterval(async () => {
                try {
                    const res = await axiosInstance.get(`/orders/status/${orderCode}`);
                    const currentStatus = res.data.status;

                    // 1. Nếu đơn đã được thanh toán (chuyển sang Processing hoặc Completed)
                    if (currentStatus !== 'Pending' && currentStatus !== 'Cancelled') {
                        setPaymentStatus('success');
                        clearInterval(timer);
                        setTimeout(() => {
                            onClose(); // Đóng modal
                            router.push('/orders'); // Chuyển về trang đơn hàng chính xác
                        }, 2000);
                    }

                    // 2. Nếu đơn bị hệ thống hủy (do quá 10 phút)
                    if (currentStatus === 'Cancelled') {
                        setPaymentStatus('cancelled');
                        clearInterval(timer);
                        toast.error("Đơn hàng đã bị hủy do hết thời gian thanh toán!", { duration: 5000 });
                    }
                } catch (error) {
                    console.error("Lỗi kiểm tra trạng thái:", error);
                }
            }, 3000);
        }

        return () => clearInterval(timer);
    }, [orderCode, paymentStatus]);

    // Xử lý khi nhấn nút đóng hoặc hoàn tất ở trạng thái hủy
    const handleExit = () => {
        // Có thể đưa khách về trang danh sách đơn hàng để họ xem đơn đã hủy
        router.push('/orders');
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-10 max-w-sm w-full text-center shadow-2xl relative animate-in zoom-in duration-300">

                {/* TRƯỜNG HỢP 1: ĐANG CHỜ THANH TOÁN */}
                {paymentStatus === 'pending' && (
                    <>
                        <button onClick={onClose} className="absolute right-6 top-6 text-slate-300 hover:text-slate-500 transition-colors">
                            <X size={20} />
                        </button>
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Loader2 className="animate-spin text-indigo-600" size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase mb-1">Thanh toán Online</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Mã đơn: {orderCode}</p>
                        <div className="bg-slate-50 p-4 rounded-3xl mb-6 border border-slate-100">
                            <img src={qrUrl} alt="QR Code" className="w-full h-auto rounded-xl  shadow-sm" />
                        </div>
                        <p className="text-[11px] text-slate-500 italic mb-6">Đơn hàng sẽ tự động hủy sau 10 phút nếu không nhận được thanh toán.</p>
                        <button onClick={onClose} className="w-full py-4 text-slate-400 font-bold text-xs uppercase hover:text-indigo-600 transition-colors">Đóng và kiểm tra sau</button>
                    </>
                )}

                {/* TRƯỜNG HỢP 2: THANH TOÁN THÀNH CÔNG */}
                {paymentStatus === 'success' && (
                    <div className="py-6 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="text-emerald-500" size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase mb-2">Đặt hàng thành công!</h3>

                        <button onClick={() => router.push('/orders')} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Tiếp tục</button>
                    </div>
                )}

                {/* TRƯỜNG HỢP 3: ĐƠN HÀNG BỊ HỦY DO HẾT HẠN */}
                {paymentStatus === 'cancelled' && (
                    <div className="py-6 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="text-rose-500" size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase mb-2">Đã hết hạn</h3>
                        <p className="text-slate-500 font-bold mb-8 leading-relaxed">
                            Rất tiếc, thời gian thanh toán đã hết.<br />Đơn hàng này đã bị hủy.
                        </p>
                        <button
                            onClick={handleExit}
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs hover:bg-slate-800 transition-all shadow-xl"
                        >
                            Quay lại đơn hàng
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};