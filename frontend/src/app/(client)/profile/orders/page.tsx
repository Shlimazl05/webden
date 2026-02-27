// "use client";

// import React, { useState } from 'react';
// import { OrderTabs } from '@/features/orders/components/OrderTabs';
// import { OrderCard } from '@/features/customer/components/client/OrderCard';
// import { IOrder } from '@/features/orders/order.types';
// import { Search, PackageOpen } from 'lucide-react';

// export default function OrdersPage() {
//   const [activeTab, setActiveTab] = useState('all');

//   // MOCK DATA: Khớp chính xác cấu trúc IOrder từ sơ đồ lớp
//   const mockOrders: IOrder[] = [
//     {
//         _id: '1',
//         orderCode: 'STL-9921',
//         orderDate: '2024-03-20T10:00:00Z',
//         status: 'Completed',
//         shippingFee: 0,
//         totalAmount: 12500000,
//         address: '123 Đường Ánh Sáng, Quận 1, TP.HCM',
//         paymentMethod: 'VNPAY',
//         phone: '0901234567',
//         statusHistory: 'Order placed -> Paid -> Shipping -> Completed',
//         customerId: 'user123',
//         orderDetails: [
//             {
//                 _id: 'det1',
//                 quantity: 1,
//                 unitPrice: 12500000,
//                 product: {
//                     _id: 'p1',
//                     productName: 'Đèn Chùm Pha Lê Hoàng Gia',
//                     imageUrl: '',
//                     specifications: { power: '60W', material: 'Pha lê', size: 'Ø80cm' },
//                     productCode: 'DEN-001', salePrice: 12500000, stockQuantity: 5, status: 'Active'
//                 }
//             }
//         ],
//         items: undefined
//     },
//     {
//         _id: '2',
//         orderCode: 'STL-8820',
//         orderDate: '2024-03-25T14:30:00Z',
//         status: 'Shipping',
//         shippingFee: 150000,
//         totalAmount: 6550000,
//         address: '456 Phố Nội Thất, Hà Nội',
//         paymentMethod: 'COD',
//         phone: '0988777666',
//         statusHistory: 'Order placed -> Processing -> Shipping',
//         customerId: 'user123',
//         orderDetails: [
//             {
//                 _id: 'det2',
//                 quantity: 2,
//                 unitPrice: 3200000,
//                 product: {
//                     _id: 'p2',
//                     productName: 'Đèn Treo Trần Scandinavian',
//                     imageUrl: '',
//                     specifications: { power: '25W', material: 'Gỗ sồi', size: 'Ø45cm' },
//                     productCode: 'DEN-002', salePrice: 3200000, stockQuantity: 10, status: 'Active'
//                 }
//             }
//         ],
//         items: undefined
//     }
//   ];

//   // Logic lọc đơn hàng
//   const filteredOrders = activeTab === 'all' 
//     ? mockOrders 
//     : mockOrders.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());

//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
//       {/* 1. Header Navigation */}
//       <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

//       {/* 2. Lọc đơn hàng nhanh */}
//       <div className="mb-8 relative group">
//         <input 
//           type="text" 
//           placeholder="Tìm theo mã đơn hàng hoặc tên đèn..." 
//           className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-[20px] text-sm outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all duration-300"
//         />
//         <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
//       </div>

//       {/* 3. Danh sách đơn hàng */}
//       <div className="min-h-[500px]">
//         {filteredOrders.length > 0 ? (
//           filteredOrders.map(order => (
//             <OrderCard key={order._id} order={order} />
//           ))
//         ) : (
//           <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
//             <div className="p-6 bg-white rounded-full shadow-sm mb-4">
//               <PackageOpen size={48} className="text-slate-300" strokeWidth={1.5} />
//             </div>
//             <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">Không tìm thấy đơn hàng</h3>
//             <p className="text-sm text-slate-400 mt-1">Ní chưa có đơn hàng nào trong mục này</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from 'react';
import { OrderTabs } from '@/features/orders/components/OrderTabs';
import { OrderCard } from '@/features/customer/components/client/OrderCard';
import { IOrder } from '@/features/orders/order.types';
import { Search, PackageOpen } from 'lucide-react';

/**
 * Trang quản lý lịch sử đơn hàng của khách hàng
 */
export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  /**
   * Dữ liệu mẫu mô phỏng từ cơ sở dữ liệu
   * Trạng thái (status) được giữ ở dạng mã kỹ thuật để khớp với logic xử lý của hệ thống
   */
  const mockOrders: IOrder[] = [
    {
        _id: '1',
        orderCode: 'STL-9921',
        orderDate: '2024-03-20T10:00:00Z',
        status: 'Completed',
        shippingFee: 0,
        totalAmount: 12500000,
        address: '123 Đường Ánh Sáng, Quận 1, TP.HCM',
        paymentMethod: 'VNPAY',
        phone: '0901234567',
        statusHistory: 'Đã đặt hàng -> Đã thanh toán -> Đang giao -> Hoàn thành',
        customerId: 'user123',
        orderDetails: [
            {
                _id: 'det1',
                quantity: 1,
                unitPrice: 12500000,
                product: {
                    _id: 'p1',
                    productName: 'Đèn Chùm Pha Lê Hoàng Gia',
                    imageUrl: '',
                    specifications: { power: '60W', material: 'Pha lê', size: 'Ø80cm' },
                    productCode: 'DEN-001',
                    salePrice: 12500000,
                    stockQuantity: 5,
                    status: 'Active'
                }
            }
        ],
        items: undefined
    },
    {
        _id: '2',
        orderCode: 'STL-8820',
        orderDate: '2024-03-25T14:30:00Z',
        status: 'Shipping',
        shippingFee: 150000,
        totalAmount: 6550000,
        address: '456 Phố Nội Thất, Hà Nội',
        paymentMethod: 'COD',
        phone: '0988777666',
        statusHistory: 'Đã đặt hàng -> Đang xử lý -> Đang giao hàng',
        customerId: 'user123',
        orderDetails: [
            {
                _id: 'det2',
                quantity: 2,
                unitPrice: 3200000,
                product: {
                    _id: 'p2',
                    productName: 'Đèn Treo Trần Scandinavian',
                    imageUrl: '',
                    specifications: { power: '25W', material: 'Gỗ sồi', size: 'Ø45cm' },
                    productCode: 'DEN-002',
                    salePrice: 3200000,
                    stockQuantity: 10,
                    status: 'Active'
                }
            }
        ],
        items: undefined
    }
  ];

  /** 
   * Lọc danh sách đơn hàng theo trạng thái đã chọn trên thanh điều hướng
   */
  const filteredOrders = activeTab === 'all'
    ? mockOrders
    : mockOrders.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Thanh trạng thái đơn hàng */}
      <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Công cụ tìm kiếm nhanh */}
      <div className="mb-8 relative group">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng theo mã đơn hoặc tên sản phẩm..."
          className="w-full h-11 pl-12 pr-4 bg-slate-50 border border-transparent rounded-[20px] text-sm outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all duration-300"
        />
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
      </div>

      {/* Hiển thị danh sách kết quả */}
      <div className="min-h-[500px]">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-50/30 rounded-[40px] border border-dashed border-slate-200">
            <div className="p-6 bg-white rounded-full shadow-sm mb-4">
              <PackageOpen size={48} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">Chưa có đơn hàng</h3>
          </div>
        )}
      </div>
    </div>
  );
}