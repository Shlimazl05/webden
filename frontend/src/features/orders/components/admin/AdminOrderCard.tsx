

"use client";
import React, { useState, useEffect } from 'react';
import { 
  Clock, User, ShoppingBag, ChevronDown, CreditCard, 
  AlertCircle, Timer, Hash, CheckCircle2, Truck, 
  PackageCheck, XCircle
} from 'lucide-react';
import { OrderStatusBadge } from '../OrderStatusBadge';
import { IOrder, OrderStatus } from '../../order.types';
import { OrderStatusTimeline } from '../OrderStatusTimeline'; 

// Import các component con đã tách
import { OrderDeliveryInfo } from '../OrderDeliveryInfo';
import { OrderItemsTable } from '../OrderItemsTable';
import { OrderPriceSummary } from '../OrderPriceSummary';

interface Props {
  order: IOrder;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export const AdminOrderCard = ({ order, onUpdateStatus }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dateSource = order.orderDate || order.createdAt;
    if (dateSource) {
      const date = new Date(dateSource);
      setFormattedDate(`${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${date.toLocaleDateString('vi-VN')}`);
      
      if (order.status === 'Pending' && order.paymentStatus !== 'Paid') {
        const updateTimer = () => {
          const deadline = new Date(dateSource).getTime() + 24 * 60 * 60 * 1000;
          const now = Date.now();
          const diff = deadline - now;
          if (diff > 0) {
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`Hết hạn sau: ${h} giờ ${m} phút`);
          } else { setTimeLeft("Đơn hàng đã quá hạn thanh toán"); }
        };
        updateTimer();
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
      }
    }
  }, [order.createdAt, order.status, order.paymentStatus]);

  const renderActionButtons = () => {
    const btnBase = "h-10 px-5 flex items-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm";
    return (
      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {order.status === 'Pending' && (
          <button onClick={() => onUpdateStatus(order._id, 'Processing')} className={`${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 shadow-md`}>
            <CheckCircle2 size={16} strokeWidth={2.5} /> Xác nhận đơn
          </button>
        )}
        {order.status === 'Processing' && (
          <button onClick={() => onUpdateStatus(order._id, 'Shipping')} className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700 shadow-md`}>
            <Truck size={16} strokeWidth={2.5} /> Giao hàng
          </button>
        )}
        {order.status === 'Shipping' && (
          <button onClick={() => onUpdateStatus(order._id, 'Completed')} className={`${btnBase} bg-emerald-600 text-white hover:bg-emerald-700 shadow-md`}>
            <PackageCheck size={16} strokeWidth={2.5} /> Hoàn thành
          </button>
        )}
        {['Pending', 'Processing', 'Shipping'].includes(order.status) && (
          <button onClick={() => onUpdateStatus(order._id, 'Cancelled')} className={`${btnBase} bg-white text-rose-500 border border-rose-100 hover:bg-rose-50`}>
            <XCircle size={16} strokeWidth={2.5} /> Hủy đơn
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-6 transition-all hover:shadow-xl group font-sans">
      
      {/* HEADER SECTION */}
      <div onClick={() => setIsExpanded(!isExpanded)} className="px-8 py-6 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-colors">
        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-indigo-600">
              <ShoppingBag size={20} strokeWidth={3} />
              <span className="text-lg font-black uppercase">#{order.orderCode}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-bold">
              <Clock size={14} strokeWidth={2.5} className="text-sky-500" />
              <span className="text-[12px] font-medium">{mounted ? formattedDate : "---"}</span>
            </div>
          </div>
          <div className="hidden lg:block h-10 w-[1px] bg-slate-100" />
          <div className="hidden lg:flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Hash size={12} strokeWidth={3} className="text-indigo-400" /> Trạng thái</span>
             <OrderStatusBadge status={order.status} />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">{renderActionButtons()}</div>
          <div className={`p-2 rounded-full transition-all ${isExpanded ? "bg-indigo-50 text-indigo-600 rotate-180" : "bg-slate-50 text-slate-300"}`}>
            <ChevronDown size={20} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* INFO BAR */}
      <div className="px-8 py-4 bg-slate-50/80 border-y border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-12">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <User size={16} strokeWidth={2.5} className="text-indigo-500" />
              </div>
              <span className="text-slate-700 font-black text-[15px]">{order.recipientName}</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <CreditCard size={16} strokeWidth={2.5} className="text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-700 font-black text-[15px] uppercase leading-none">{order.paymentMethod}</span>
                {order.paymentMethod === 'SePay' && order.paymentStatus === 'Partially_Paid' && (
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-tighter flex items-center gap-0.5 mt-1">
                    <AlertCircle size={10} strokeWidth={3} /> Thiếu tiền
                  </span>
                )}
              </div>
           </div>
        </div>
        <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-indigo-50">
          <span className="text-[11px] font-bold text-slate-900 uppercase">Tổng tiền</span>
          <span className="text-2xl font-black text-rose-600 tracking-tighter">{order.finalAmount?.toLocaleString()}đ</span>
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      {isExpanded && (
        <div className="p-8 bg-white animate-in slide-in-from-top-4 duration-300">
          
          {/* Banner thời hạn 24h / Cảnh báo thiếu tiền */}
          {(order.status === 'Pending' && timeLeft) && (
            <div className={`mb-8 flex items-center gap-4 p-5 rounded-[2rem] border-2 animate-in fade-in duration-500 ${order.paymentStatus === 'Partially_Paid' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 ${order.paymentStatus === 'Partially_Paid' ? 'bg-amber-500' : 'bg-sky-500'}`}>
                {order.paymentStatus === 'Partially_Paid' ? <AlertCircle size={20} strokeWidth={3} /> : <Timer size={20} strokeWidth={3} />}
              </div>
              <div>
                <p className="text-[14px] font-black uppercase tracking-tight leading-tight">{order.paymentStatus === 'Partially_Paid' ? 'Chờ thanh toán bổ sung' : 'Thông tin thời hạn'}</p>
                <p className="text-[12px] font-bold opacity-80 mt-0.5">{timeLeft}</p>
              </div>
            </div>
          )}

          <OrderDeliveryInfo phone={order.phone} address={order.address} note={order.note} />
          
          <OrderItemsTable details={order.orderDetails || []} />

          <OrderPriceSummary 
            totalAmount={order.totalAmount} 
            shippingFee={order.shippingFee} 
            finalAmount={order.finalAmount} 
          />

          <div className="bg-white p-10">
            <OrderStatusTimeline status={order.status} statusHistory={order.statusHistory || []} createdAt={order.createdAt} />
          </div>
        </div>
      )}
    </div>
  );
};