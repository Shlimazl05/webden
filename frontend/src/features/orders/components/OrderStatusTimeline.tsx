

// "use client";
// import React from 'react';
// import { 
//   ShoppingBag, Package, Truck, PackageCheck, 
//   Clock, XCircle, Route, AlertCircle, Timer 
// } from 'lucide-react';

// interface OrderStatusTimelineProps {
//   status: string;
//   statusHistory: any[];
// }

// export const OrderStatusTimeline = ({ status, statusHistory }: OrderStatusTimelineProps) => {
//   const steps = [
//     { id: 'Pending', label: 'Chờ xác nhận', icon: <ShoppingBag size={18} /> },
//     { id: 'Processing', label: 'Đang xử lý', icon: <Package size={18} /> },
//     { id: 'Shipping', label: 'Đang giao hàng', icon: <Truck size={18} /> },
//     { id: 'Completed', label: 'Hoàn thành', icon: <PackageCheck size={18} /> }
//   ];

//   const statusOrder = ['Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled'];
//   const currentIndex = statusOrder.indexOf(status);

//   return (
//     <div className="pt-10 border-t border-slate-100 mt-10">
//       <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-12">
//         <Route size={22} strokeWidth={3} className="text-indigo-600" /> 
//         Hành trình đơn hàng
//       </h4>

//       <div className="relative flex justify-between w-full max-w-4xl mx-auto px-4">
//         {steps.map((step, index) => {
//           const stepIndex = statusOrder.indexOf(step.id);
//           const isDone = status !== 'Cancelled' && stepIndex <= currentIndex;
//           const isActive = status === step.id;
//           const log = isDone ? [...statusHistory].reverse().find(l => l.status === step.id) : null;

//           return (
//             <div key={step.id} className="flex-1 relative flex flex-col items-center group">
//               {/* Đường nối ngang */}
//               {index < steps.length - 1 && (
//                 <div className="absolute left-[50%] top-[21px] w-full h-[3px] bg-slate-100 -z-0">
//                   <div 
//                     className={`h-full bg-indigo-500 transition-all duration-700 ${stepIndex < currentIndex && status !== 'Cancelled' ? 'w-full' : 'w-0'}`} 
//                   />
//                 </div>
//               )}

//               {/* Icon vòng tròn */}
//               <div className={`w-11 h-11 rounded-full flex items-center justify-center z-10 border-[3px] transition-all duration-500 shadow-sm
//                 ${isDone ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-300'}
//                 ${isActive ? 'ring-4 ring-indigo-100 scale-110' : ''}
//               `}>
//                 {step.icon}
//               </div>

//               {/* Chữ trạng thái (Chữ đen, font đậm) */}
//               <div className="mt-4 text-center px-2">
//                 <p className={`text-[14px] font-black leading-tight ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
//                   {step.label}
//                 </p>
                
//                 {log && (
//                   <p className="text-[12px] text-slate-500 font-bold mt-1.5 bg-slate-100 px-2 py-0.5 rounded-full inline-block">
//                     {new Date(log.updatedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(log.updatedAt).toLocaleDateString('vi-VN')}
//                   </p>
//                 )}

                
//                 {isActive && (
//                    <div className={`mt-4 px-4 py-3 border rounded-2xl max-w-[220px] mx-auto shadow-sm animate-in fade-in zoom-in duration-300
//                       ${log?.note?.toLowerCase().includes('thiếu') || log?.note?.toLowerCase().includes('lưu ý')
//                         ? 'bg-amber-50 border-amber-100 text-amber-700' 
//                         : 'bg-indigo-50/50 border-indigo-100 text-indigo-700'
//                       }`}
//                    >
//                       <p className="text-[12px] font-bold leading-relaxed italic">
//                          {log?.note || "Hệ thống đang xử lý đơn hàng"}
//                       </p>
//                    </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Thông báo hủy đơn */}
//       {status === 'Cancelled' && (
//         <div className="mt-12 flex flex-col items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-200 max-w-md mx-auto">
//            <div className="flex items-center gap-2 text-slate-600">
//               <XCircle size={20} strokeWidth={3} />
//               <span className="text-[14px] font-black uppercase tracking-wider">Đơn hàng đã đóng</span>
//            </div>
//            <p className="text-[12px] text-slate-500 mt-2 font-bold italic text-center leading-relaxed">
//               {statusHistory?.reverse().find(l => l.status === 'Cancelled')?.note || "Hệ thống tự động đóng đơn hàng."}
//            </p>
//         </div>
//       )}
//     </div>
//   );
// };


// "use client";
// import React from 'react';
// import {
//   ShoppingBag, Package, Truck, PackageCheck,
//   XCircle, Route
// } from 'lucide-react';

// interface OrderStatusTimelineProps {
//   status: string;
//   statusHistory: any[];
//   createdAt: string;
// }

// export const OrderStatusTimeline = ({ status, statusHistory }: OrderStatusTimelineProps) => {
//   const steps = [
//     { id: 'Pending', label: 'Chờ xác nhận', icon: <ShoppingBag size={18} /> },
//     { id: 'Processing', label: 'Đang xử lý', icon: <Package size={18} /> },
//     { id: 'Shipping', label: 'Đang giao hàng', icon: <Truck size={18} /> },
//     { id: 'Completed', label: 'Hoàn thành', icon: <PackageCheck size={18} /> }
//   ];

//   const statusOrder = ['Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled'];
//   const currentIndex = statusOrder.indexOf(status);

//   return (
//     <div className="pt-10 border-t border-slate-100 mt-10">
//       <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-12">
//         <Route size={22} strokeWidth={3} className="text-indigo-600" />
//         Hành trình đơn hàng
//       </h4>

//       <div className="relative flex justify-between w-full max-w-4xl mx-auto px-4">
//         {steps.map((step, index) => {
//           // Lấy index của bước này trong mảng chuẩn
//           const stepOrderIndex = statusOrder.indexOf(step.id);

//           // Trạng thái: Đã qua hoặc đang ở bước này (trừ khi bị Cancelled)
//           const isDone = status !== 'Cancelled' && stepOrderIndex <= currentIndex;
//           const isActive = status === step.id;

//           // Lấy log thời gian cho bước này
//           const log = statusHistory?.find(l => l.status === step.id);

//           return (
//             <div key={step.id} className="flex-1 relative flex flex-col items-center group">

//               {/* THANH NỐI NGANG (Nằm giữa các icon) */}
//               {index < steps.length - 1 && (
//                 <div className="absolute left-[50%] top-[21px] w-full h-[3px] bg-slate-100 -z-0">
//                   <div
//                     className="h-full bg-indigo-500 transition-all duration-700"
//                     style={{
//                       // Thanh nối sẽ xanh nếu trạng thái hiện tại đã vượt qua bước này
//                       width: status !== 'Cancelled' && currentIndex > index ? '100%' : '0%'
//                     }}
//                   />
//                 </div>
//               )}

//               {/* Icon vòng tròn */}
//               <div className={`w-11 h-11 rounded-full flex items-center justify-center z-10 border-[3px] transition-all duration-500 shadow-sm
//                 ${isDone ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-300'}
//                 ${isActive ? 'ring-4 ring-indigo-100 scale-110' : ''}
//               `}>
//                 {step.icon}
//               </div>

//               {/* Thông tin chữ phía dưới */}
//               <div className="mt-4 text-center px-2">
//                 <p className={`text-[14px] font-black leading-tight ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
//                   {step.label}
//                 </p>

//                 {/* HIỂN THỊ THỜI GIAN (Bao gồm cả Chờ xác nhận) */}
//                 {log && (
//                   <p className="text-[11px] text-slate-500 font-bold mt-2 bg-slate-50 px-2 py-0.5 rounded-full inline-block border border-slate-100">
//                     {new Date(log.updatedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(log.updatedAt).toLocaleDateString('vi-VN')}
//                   </p>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* THÔNG BÁO HỦY ĐƠN (Chỉ hiện khi đơn bị Cancelled) */}
//       {status === 'Cancelled' && (
//         <div className="mt-12 flex flex-col items-center p-8 bg-rose-50/50 rounded-[2.5rem] border border-rose-100 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
//           <div className="flex items-center gap-2 text-rose-600 mb-2">
//             <XCircle size={24} strokeWidth={3} />
//             <span className="text-[14px] font-black uppercase tracking-widest">Đơn hàng đã bị hủy</span>
//           </div>
//           <p className="text-[12px] text-rose-500 font-bold italic text-center leading-relaxed">
//             {/* Lấy note cuối cùng của trạng thái Cancelled */}
//             {statusHistory?.filter(l => l.status === 'Cancelled').pop()?.note || "Hệ thống tự động đóng đơn hàng."}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };


"use client";
import React from 'react';
import {
  ShoppingBag, Package, Truck, PackageCheck,
  XCircle, Route
} from 'lucide-react';

interface OrderStatusTimelineProps {
  status: string;
  statusHistory: any[];
  createdAt: string; // THÊM DÒNG NÀY ĐỂ LẤY GIỜ GỐC
}

export const OrderStatusTimeline = ({ status, statusHistory, createdAt }: OrderStatusTimelineProps) => {
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
      <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-12">
        <Route size={22} strokeWidth={3} className="text-indigo-600" />
        Hành trình đơn hàng
      </h4>

      <div className="relative flex justify-between w-full max-w-4xl mx-auto px-4">
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
            // Nếu là bước đầu tiên mà history trống, lấy ngày tạo đơn làm giờ "Chờ xác nhận"
            displayDate = new Date(createdAt);
          }

          return (
            <div key={step.id} className="flex-1 relative flex flex-col items-center group">

              {/* THANH NỐI NGANG */}
              {index < steps.length - 1 && (
                <div className="absolute left-[50%] top-[21px] w-full h-[3px] bg-slate-100 -z-0">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-700"
                    style={{
                      // Thanh nối xanh nếu trạng thái hiện tại đã vượt qua bước này
                      width: status !== 'Cancelled' && currentIndex > index ? '100%' : '0%'
                    }}
                  />
                </div>
              )}

              {/* Icon vòng tròn */}
              <div className={`w-11 h-11 rounded-full flex items-center justify-center z-10 border-[3px] transition-all duration-500 shadow-sm
                ${isDone ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-300'}
                ${isActive ? 'ring-4 ring-indigo-100 scale-110' : ''}
              `}>
                {step.icon}
              </div>

              {/* Thông tin chữ phía dưới */}
              <div className="mt-4 text-center px-2">
                <p className={`text-[14px] font-black leading-tight ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
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

      {/* THÔNG BÁO HỦY ĐƠN (Giữ nguyên của bạn) */}
      {status === 'Cancelled' && (
        <div className="mt-12 flex flex-col items-center p-8 bg-rose-50/50 rounded-[2.5rem] border border-rose-100 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 text-rose-600 mb-2">
            <XCircle size={24} strokeWidth={3} />
            <span className="text-[14px] font-black uppercase tracking-widest">Đơn hàng đã bị hủy</span>
          </div>
          <p className="text-[12px] text-rose-500 font-bold italic text-center leading-relaxed">
            {statusHistory?.filter(l => l.status === 'Cancelled').pop()?.note || "Hệ thống tự động đóng đơn hàng."}
          </p>
        </div>
      )}
    </div>
  );
};