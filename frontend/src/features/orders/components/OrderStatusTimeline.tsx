// Hành trình đơn hàng

"use client";
import React from 'react';
import { 
  ShoppingBag, Package, Truck, PackageCheck, 
  Clock, XCircle, Milestone, 
} from 'lucide-react';

interface OrderStatusTimelineProps {
  status: string;
  statusHistory: any[];
}

export const OrderStatusTimeline = ({ status, statusHistory }: OrderStatusTimelineProps) => {
  const steps = [
    { id: 'Pending', label: 'Chờ xác nhận', icon: <ShoppingBag size={18} /> },
    { id: 'Processing', label: 'Đang xử lý', icon: <Package size={18} /> },
    { id: 'Shipping', label: 'Đang giao hàng', icon: <Truck size={18} /> },
    { id: 'Completed', label: 'Hoàn thành', icon: <PackageCheck size={18} /> }
  ];

  const statusOrder = ['Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled'];
  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="pt-10 border-t border-slate-100 mt-10">
      <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-12">
        <Milestone size={20} strokeWidth={3} className="text-indigo-600" /> Hành trình đơn hàng
      </h4>

      <div className="relative flex justify-between w-full max-w-4xl mx-auto px-4">
        {steps.map((step, index) => {
          const stepIndex = statusOrder.indexOf(step.id);
          
          // Chỉ lấy log nếu đơn hàng đã qua hoặc đang ở bước này
          const isDone = status !== 'Cancelled' && stepIndex <= currentIndex;
          const isActive = status === step.id;
          
          // Lấy thông tin thời gian (chỉ hiện nếu đã xong hoặc đang làm)
          const log = isDone ? [...statusHistory].reverse().find(l => l.status === step.id) : null;

          return (
            <div key={step.id} className="flex-1 relative flex flex-col items-center group">
              
              {/* ĐƯỜNG THẲNG NỐI */}
              {index < steps.length - 1 && (
                <div className="absolute left-[50%] top-[19px] w-full h-[3px] bg-slate-100 -z-0">
                  <div 
                    className={`h-full bg-indigo-500 transition-all duration-700 ${stepIndex < currentIndex && status !== 'Cancelled' ? 'w-full' : 'w-0'}`} 
                  />
                </div>
              )}

              {/* ICON (Đổi màu thay vì dấu tích) */}
              <div className={`w-11 h-11 rounded-full flex items-center justify-center z-10 border-[3px] transition-all duration-500 shadow-sm
                ${isDone ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-300'}
                ${isActive ? 'ring-4 ring-indigo-100 scale-110' : ''}
              `}>
                {step.icon}
              </div>

              {/* TEXT (Chữ đậm đen) */}
              <div className="mt-4 text-center px-2">
                <p className={`text-[12px] font-black uppercase tracking-tight leading-tight ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </p>
                
                {/* Chỉ hiện thời gian khi đã thực sự đạt tới bước này */}
                {log && (
                  <p className="text-[10px] text-slate-500 font-bold mt-1.5 bg-slate-100 px-2 py-0.5 rounded-full inline-block">
                    {new Date(log.updatedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(log.updatedAt).toLocaleDateString('vi-VN')}
                  </p>
                )}

                {/* Ghi chú từ Hệ thống/Admin - Chỉ hiện ở bước hiện tại */}
                {isActive && (
                   <div className="mt-4 px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-2xl max-w-[200px] mx-auto shadow-sm animate-in fade-in zoom-in duration-300">
                      <p className="text-[11px] text-indigo-700 font-bold leading-relaxed italic">
                         {log?.note || "Hệ thống đang xử lý đơn hàng"}
                      </p>
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* XỬ LÝ KHI HỦY ĐƠN */}
      {status === 'Cancelled' && (
        <div className="mt-12 flex flex-col items-center p-6 bg-rose-50 rounded-[2rem] border border-rose-100 max-w-md mx-auto">
           <div className="flex items-center gap-2 text-rose-600">
              <XCircle size={20} strokeWidth={3} />
              <span className="text-[14px] font-black uppercase tracking-wider">Đơn hàng đã bị hủy</span>
           </div>
           <p className="text-[12px] text-rose-500 mt-2 font-bold italic text-center">
              Lý do: {statusHistory?.find(l => l.status === 'Cancelled')?.note || "Hệ thống tự động hủy"}
           </p>
        </div>
      )}
    </div>
  );
};