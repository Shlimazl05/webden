

"use client";
import React from 'react';
import {
  ShoppingBag, Package, Truck, PackageCheck,
  XCircle, Route
} from 'lucide-react';

interface OrderStatusTimelineProps {
  status: string;
  statusHistory: any[];
  createdAt: string; // Đảm bảo truyền cái này từ ClientOrderCard
}

export const OrderStatusTimeline = ({ status, statusHistory, createdAt }: OrderStatusTimelineProps) => {
  const steps = [
    { id: 'Pending', label: 'Đơn đã đặt', icon: <ShoppingBag size={18} /> },
    { id: 'Processing', label: 'Đang xử lý', icon: <Package size={18} /> },
    { id: 'Shipping', label: 'Đang giao hàng', icon: <Truck size={18} /> },
    { id: 'Completed', label: 'Hoàn thành', icon: <PackageCheck size={18} /> }
  ];

  const statusOrder = ['Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled'];
  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="mt-6">
      <div className="relative flex justify-between w-full px-4">
        {steps.map((step, index) => {
          const stepOrderIndex = statusOrder.indexOf(step.id);

          // Trạng thái: Đã qua hoặc đang ở bước này
          const isDone = status !== 'Cancelled' && stepOrderIndex <= currentIndex;
          const isActive = status === step.id;

          // LOGIC LẤY THỜI GIAN THÔNG MINH
          const log = statusHistory?.find(l => l.status === step.id);
          let displayDate = null;

          if (log) {
            displayDate = new Date(log.updatedAt);
          } else if (step.id === 'Pending' && createdAt) {
            displayDate = new Date(createdAt);
          }

          return (
            <div key={step.id} className="flex-1 relative flex flex-col items-center">

              {/* THANH NỐI NGANG (Nằm dưới icon) */}
              {index < steps.length - 1 && (
                <div className="absolute left-[50%] top-[22px] w-full h-[3px] bg-slate-100 -z-0">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-700"
                    style={{
                      width: status !== 'Cancelled' && currentIndex > index ? '100%' : '0%'
                    }}
                  />
                </div>
              )}

              {/* Icon vòng tròn (Z-10 để đè lên thanh nối) */}
              <div className={`w-11 h-11 rounded-full flex items-center justify-center z-10 border-[3px] transition-all duration-500 shadow-sm
                ${isDone ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-300'}
                ${isActive ? 'ring-4 ring-indigo-100 scale-110' : ''}
              `}>
                {step.icon}
              </div>

              {/* Thông tin chữ phía dưới */}
              <div className="mt-4 text-center px-2">
                <p className={`text-[14px] font-black leading-tight whitespace-nowrap ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </p>

                {/* HIỂN THỊ THỜI GIAN */}
                {displayDate && isDone && (
                  <p className="text-[11px] text-slate-500 font-bold mt-2 bg-slate-50 px-2 py-0.5 rounded-full inline-block border border-slate-100 animate-in fade-in duration-500">
                    {displayDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {displayDate.toLocaleDateString('vi-VN')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* THÔNG BÁO HỦY ĐƠN (Xử lý bỏ chữ "Hệ thống:") */}
      {status === 'Cancelled' && (
        <div className="mt-12 flex flex-col items-center p-8 bg-rose-50/50 rounded-xl  border border-rose-100 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 text-rose-600 mb-2">
            <XCircle size={24} strokeWidth={3} />
            <span className="text-[14px] font-black uppercase tracking-widest">Đơn hàng đã bị hủy</span>
          </div>
          <p className="text-[12px] text-rose-500 font-bold italic text-center leading-relaxed">
            {(() => {
              // Lấy note từ lịch sử hủy đơn
              const rawNote = statusHistory?.filter(l => l.status === 'Cancelled').pop()?.note
                || "Tự động đóng đơn hàng.";
              // Sử dụng Regex để xóa cụm "Hệ thống:" hoặc "Hệ thống: " ở đầu câu
              return rawNote.replace(/^Hệ thống:\s*/i, '');
            })()}
          </p>
        </div>
      )}
    </div>
  );
};