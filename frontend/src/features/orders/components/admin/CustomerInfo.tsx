// import { IOrder } from "../../order.types";

// export const CustomerInfo: React.FC<{ order: IOrder }> = ({ order }) => {
//     return (
//         <div className="ui-card rounded-[2rem] space-y-5">
//             <h3 className="ui-section-title flex items-center gap-2">
//                 <div className="w-1.5 h-4 bg-[var(--color-primary)] rounded-full"></div>
//                 Thông tin khách hàng
//             </h3>

//             <div className="grid grid-cols-1 gap-5">
//                 <div className="flex flex-col gap-1">
//                     <span className="ui-label normal-case text-slate-400 font-medium">Người nhận</span>
//                     <span className="ui-value font-bold text-slate-800">{order.recipientName}</span>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                     <span className="ui-label normal-case text-slate-400 font-medium">Số điện thoại</span>
//                     <span className="ui-value font-bold text-slate-800">{order.phone}</span>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                     <span className="ui-label normal-case text-slate-400 font-medium">Địa chỉ giao hàng</span>
//                     <span className="ui-value font-semibold text-slate-700 leading-snug">{order.address}</span>
//                 </div>
//                 {order.note && (
//                     <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
//                         <p className="ui-label text-amber-700">Ghi chú từ khách</p>
//                         <p className="text-sm text-amber-800 italic mt-1">{order.note}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
import { IOrder } from "../../order.types";
import { User, Phone, MapPin, MessageSquare, Info } from "lucide-react";

export const CustomerInfo: React.FC<{ order: IOrder }> = ({ order }) => {
    return (
        <div className="ui-card rounded-[2rem] space-y-6 border border-slate-100 shadow-sm">
            {/* 1. Tiêu đề mục */}
            <h3 className="ui-section-title flex items-center gap-2">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                Thông tin khách hàng
            </h3>

            <div className="space-y-6">
                {/* 2. Tên người nhận (Nổi bật nhất) */}
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

                {/* 3. Khu vực liên hệ và giao hàng (Gộp chung) */}
                <div className="grid grid-cols-1 gap-6 px-1">
                    {/* Số điện thoại */}
                    <div className="flex items-start gap-3">
                        <Phone size={18} className="text-slate-400 mt-1 flex-shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-slate-400">Số điện thoại liên hệ</span>
                            <span className="text-[15px] font-bold text-slate-800 tracking-wide">
                                {order.phone}
                            </span>
                        </div>
                    </div>

                    {/* Địa chỉ giao hàng */}
                    <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-slate-400 mt-1 flex-shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-slate-400">Địa chỉ giao hàng thực tế</span>
                            <span className="text-[15px] font-semibold text-slate-700 leading-relaxed max-w-xl">
                                {order.address}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 4. Ghi chú đơn hàng (Luôn hiện) */}
                <div className="pt-2">
                    <div className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${order.note
                            ? 'bg-amber-50/40 border-amber-100'
                            : 'bg-slate-50 border-slate-100'
                        }`}>
                        <MessageSquare size={18} className={`mt-0.5 flex-shrink-0 ${order.note ? 'text-amber-600' : 'text-slate-300'}`} />
                        <div className="flex flex-col">
                            <span className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${order.note ? 'text-amber-700' : 'text-slate-400'}`}>
                                Ghi chú đơn hàng
                            </span>
                            <p className={`text-sm leading-relaxed ${order.note ? 'text-amber-900 italic font-medium' : 'text-slate-400 italic font-normal'}`}>
                                {order.note ? `"${order.note}"` : "Khách hàng không để lại ghi chú cho đơn này."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};