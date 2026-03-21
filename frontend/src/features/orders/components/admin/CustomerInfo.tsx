
// import { IOrder } from "../../order.types";
// import { User, Phone, MapPin, MessageSquare, Info } from "lucide-react";

// export const CustomerInfo: React.FC<{ order: IOrder }> = ({ order }) => {
//     return (
//         <div className="ui-card rounded-[2rem] space-y-6 border border-slate-100 shadow-sm">
//             {/* 1. Tiêu đề mục */}
//             <h3 className="ui-section-title flex items-center gap-2">
//                 <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
//                 Thông tin khách hàng
//             </h3>

//             <div className="space-y-6">
//                 {/* 2. Tên người nhận (Nổi bật nhất) */}
//                 <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
//                     <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm flex-shrink-0">
//                         <User size={20} />
//                     </div>
//                     <div className="flex flex-col">
//                         <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Người nhận hàng</span>
//                         <span className="text-base font-black text-slate-800 tracking-tight">
//                             {order.recipientName}
//                         </span>
//                     </div>
//                 </div>

//                 {/* 3. Khu vực liên hệ và giao hàng (Gộp chung) */}
//                 <div className="grid grid-cols-1 gap-6 px-1">
//                     {/* Số điện thoại */}
//                     <div className="flex items-start gap-3">
//                         <Phone size={18} className="text-slate-400 mt-1 flex-shrink-0" />
//                         <div className="flex flex-col">
//                             <span className="text-[13px] font-medium text-slate-400">Số điện thoại liên hệ</span>
//                             <span className="text-[15px] font-bold text-slate-800 tracking-wide">
//                                 {order.phone}
//                             </span>
//                         </div>
//                     </div>

//                     {/* Địa chỉ giao hàng */}
//                     <div className="flex items-start gap-3">
//                         <MapPin size={18} className="text-slate-400 mt-1 flex-shrink-0" />
//                         <div className="flex flex-col">
//                             <span className="text-[13px] font-medium text-slate-400">Địa chỉ giao hàng thực tế</span>
//                             <span className="text-[15px] font-semibold text-slate-700 leading-relaxed max-w-xl">
//                                 {order.address}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 4. Ghi chú đơn hàng (Luôn hiện) */}
//                 <div className="pt-2">
//                     <div className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${order.note
//                             ? 'bg-amber-50/40 border-amber-100'
//                             : 'bg-slate-50 border-slate-100'
//                         }`}>
//                         <MessageSquare size={18} className={`mt-0.5 flex-shrink-0 ${order.note ? 'text-amber-600' : 'text-slate-300'}`} />
//                         <div className="flex flex-col">
//                             <span className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${order.note ? 'text-amber-700' : 'text-slate-400'}`}>
//                                 Ghi chú đơn hàng
//                             </span>
//                             <p className={`text-sm leading-relaxed ${order.note ? 'text-amber-900 italic font-medium' : 'text-slate-400 italic font-normal'}`}>
//                                 {order.note ? `"${order.note}"` : "Khách hàng không để lại ghi chú cho đơn này."}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

import { IOrder } from "../../order.types";
import { User, Phone, MapPin, MessageSquare } from "lucide-react";

export const CustomerInfo: React.FC<{ order: IOrder }> = ({ order }) => {
    return (
        <div className="ui-card rounded-[2rem] space-y-6">
            {/* 1. Tiêu đề mục */}
            <h3 className="ui-section-title flex items-center gap-2">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                Thông tin khách hàng
            </h3>

            <div className="space-y-6">
                {/* 2. Khối người nhận hàng */}
                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm flex-shrink-0">
                        <User size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Người nhận hàng</span>
                        <span className="text-base font-black text-slate-800 tracking-tight">
                            {order.recipientName}
                        </span>
                    </div>
                </div>

                {/* 3. Khu vực liên hệ và giao hàng - ĐÃ CĂN THẲNG LỀ */}
                <div className="space-y-6 px-1">
                    {/* Số điện thoại */}
                    <div className="flex items-start gap-4">
                        {/* Cố định độ rộng icon là w-6 để phần chữ luôn bắt đầu cùng một vị trí */}
                        <div className="w-6 flex justify-center text-slate-400 mt-1 flex-shrink-0">
                            <Phone size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-slate-400 leading-none">Số điện thoại liên hệ</span>
                            <span className="text-[15px] font-bold text-slate-800 mt-1.5">
                                {order.phone}
                            </span>
                        </div>
                    </div>

                    {/* Địa chỉ giao hàng */}
                    <div className="flex items-start gap-4">
                        <div className="w-6 flex justify-center text-slate-400 mt-1 flex-shrink-0">
                            <MapPin size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-slate-400 leading-none">Địa chỉ giao hàng thực tế</span>
                            <span className="text-[15px] font-semibold text-slate-700 leading-relaxed mt-1.5 max-w-xl">
                                {order.address}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 4. Ghi chú đơn hàng */}
                <div className="pt-2">
                    <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${order.note
                            ? 'bg-amber-50/40 border-amber-100'
                            : 'bg-slate-50 border-slate-100'
                        }`}>
                        <div className={`w-6 flex justify-center mt-1 flex-shrink-0 ${order.note ? 'text-amber-600' : 'text-slate-300'}`}>
                            <MessageSquare size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 ${order.note ? 'text-amber-700' : 'text-slate-400'}`}>
                                Ghi chú đơn hàng
                            </span>
                            <p className={`text-[13px] leading-relaxed ${order.note ? 'text-amber-900 italic font-medium' : 'text-slate-400 italic'}`}>
                                {order.note ? `"${order.note}"` : "Khách hàng không để lại ghi chú cho đơn này."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};