

import React from 'react';
import { IOrder, OrderStatus } from '../../order.types';
import { User, Clock, PackageCheck } from 'lucide-react';
import { statusConfig } from '@/features/orders/components/OrderStatus'; // Chứa cấu hình màu sắc đã làm ở bước trước

interface AdminOrderCardProps {
  order: IOrder;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onClick?: () => void;
}

export const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order, onUpdateStatus, onClick }) => {
  const config = statusConfig[order.status] || statusConfig.Pending;
  const StatusIcon = config.icon;

  // Xử lý hiển thị tên sản phẩm
  const firstItem = order.orderDetails[0];
  const firstItemName = typeof firstItem?.productId === 'object'
    ? (firstItem.productId as any).name
    : "Sản phẩm";
  const otherItemsCount = order.orderDetails.length - 1;

  return (

    <div
      onClick={onClick}
      className="ui-card cursor-pointer bg-white border border-slate-100 rounded-xl p-5 flex items-center justify-between hover:shadow-lg hover:shadow-slate-100 transition-all mb-4 group">
      <div className="flex items-center gap-5 flex-1">
        {/* Icon Trạng thái */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
          <StatusIcon className={`w-7 h-7 ${config.color}`} />
        </div>

        {/* Thông tin chính */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-slate-900 text-lg tracking-tight">#{order.orderCode}</h3>
            <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase ${config.badgeColor}`}>
              {config.label}
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-500 text-sm">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-slate-400" />
              <span className="font-medium text-slate-700">{order.recipientName}</span>
            </div>
            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-5">
              <Clock size={14} className="text-slate-500" />
              <span>{new Date(order.createdAt).toLocaleString('vi-VN')}</span>
            </div>
          </div>


        </div>
      </div>

      {/* Cột thao tác & Giá tiền */}
      <div className="flex items-center gap-8">
        {/* Nút thao tác nhanh cho Admin */}
        {/* <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {order.status === 'Pending' && (
            <button
              onClick={() => onUpdateStatus(order._id, 'Processing')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl  text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <PackageCheck size={14} /> XÁC NHẬN
            </button>
          )}
         
        </div> */}

        <div className="text-right min-w-[120px]">
          <p className="text-[13px] text-slate-500  font-semibold tracking-widest mb-1">Tổng thanh toán</p>
          <p className="text-2xl font-black text-indigo-950">
            {order.finalAmount.toLocaleString('vi-VN')} <span className="text-sm underline">đ</span>
          </p>
        </div>
      </div>
    </div>
  );
};