


"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { OrderInfoCard } from '@/features/orders/components/client/OrderDetail/OrderInfoCard';
import { OrderItemList } from '@/features/orders/components/client/OrderDetail/OrderItemList';
import { OrderBillSummary } from '@/features/orders/components/client/OrderDetail/OrderBillSummary';
import { IOrder } from '@/features/orders/order.types';

/**
 * Trang chi tiết đơn hàng cá nhân
 * Quản lý bố cục hiển thị thông tin vận chuyển và chi tiết thanh toán
 */
export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Dữ liệu mẫu khớp cấu trúc sơ đồ lớp
  const mockOrder: IOrder = {
      _id: "order_001",
      orderCode: "STL-9921",
      orderDate: "2024-03-20",
      status: "Hoàn thành",
      shippingFee: 0,
      totalAmount: 18900000,
      address: "123 Đường Ánh Sáng, Quận 1, TP.HCM",
      paymentMethod: "VNPAY",
      phone: "0901234567",
      statusHistory: "",
      customerId: "user_01",
      orderDetails: [
          {
              _id: "d1", quantity: 1, unitPrice: 12500000,
              product: { _id: "p1", productName: "Đèn Chùm Pha Lê", imageUrl: "", specifications: { power: "60W", size: "80cm" } } as any
          },
          {
              _id: "d2", quantity: 2, unitPrice: 3200000,
              product: { _id: "p2", productName: "Đèn Treo Scandinavian", imageUrl: "", specifications: { power: "25W", size: "45cm" } } as any
          }
      ],
      items: undefined
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Thanh điều hướng và mã đơn */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-xs font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-indigo-900 uppercase tracking-tighter">ĐƠN HÀNG #{mockOrder.orderCode}</span>
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            {mockOrder.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Thông tin giao nhận & Thanh toán */}
        <div className="lg:col-span-1">
          <OrderInfoCard order={mockOrder} />
        </div>

        {/* Danh sách sản phẩm và Chi tiết bảng giá */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
             <OrderItemList details={mockOrder.orderDetails} />
             {/* Component tổng hợp chi phí với đường kẻ thẳng */}
             <OrderBillSummary 
                subtotal={mockOrder.totalAmount - mockOrder.shippingFee} 
                shippingFee={mockOrder.shippingFee} 
                total={mockOrder.totalAmount} 
             />
          </div>

          {/* Hành động chính của đơn hàng */}
          <div className="flex justify-end">
             <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-3 active:scale-95">
               <ShoppingCart size={18} strokeWidth={2.5} />
               MUA LẠI ĐƠN HÀNG
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}