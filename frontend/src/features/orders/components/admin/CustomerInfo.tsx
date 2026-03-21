

import { IOrder } from "../../order.types";
import { User, Phone, MapPin, MessageSquare } from "lucide-react";

export const CustomerInfo: React.FC<{ order: IOrder }> = ({ order }) => {
    return (
        <div className="ui-card rounded-[2rem] space-y-6 border border-slate-100 shadow-sm bg-white overflow-hidden">
            {/* 1. Tiêu đề mục */}
            <h3 className="ui-section-title flex items-center gap-2">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                Thông tin khách hàng
            </h3>

            <div className="space-y-6">
                {/* 2. Khối người nhận hàng */}
                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm flex-shrink-0">
                        <User size={18} />
                    </div>
                    {/* Thay đổi flex-col thành flex-row items-baseline */}
                    <div className="flex items-baseline gap-2">
                        <span className="ui-label normal-case text-slate-500 font-semibold mb-0 whitespace-nowrap text-[14px]">Người nhận:</span>
                        <span className="ui-value text-[16px] leading-none">
                            {order.recipientName}
                        </span>
                    </div>
                </div>

                {/* 3. Khu vực liên hệ và giao hàng */}
                <div className="space-y-6 px-1">
                    {/* Số điện thoại */}
                    <div className="flex items-start gap-1">
                        <div className="w-6 flex justify-center text-slate-400 mt-1 flex-shrink-0">
                            <Phone size={18} />
                        </div>
                        {/* Thay đổi flex-col thành flex-row items-baseline */}
                        <div className="flex items-baseline gap-2">
                            <span className="ui-label normal-case text-slate-500 font-semibold mb-0 whitespace-nowrap text-[14px]">Số điện thoại:</span>
                            <span className="ui-value text-[15px]">
                                {order.phone}
                            </span>
                        </div>
                    </div>

                    {/* Địa chỉ giao hàng */}
                    <div className="flex items-start gap-1">
                        <div className="w-6 flex justify-center text-slate-500 mt-1 flex-shrink-0">
                            <MapPin size={18} />
                        </div>
                        {/* Thay đổi flex-col thành flex-row items-baseline */}
                        <div className="flex items-baseline gap-2">
                            <span className="ui-label normal-case text-slate-500 font-semibold mb-0 whitespace-nowrap text-[14px]">Nơi nhận:</span>
                            <span className="ui-value text-[15px] font-semibold text-slate-700 leading-relaxed">
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
                            <span className={`text-[14px] ui-label mb-1.5 ${order.note ? 'text-amber-700' : 'text-slate-500'}`}>
                                GHI CHÚ TỪ BẠN
                            </span>
                            <p className={`ui-value text-[15px] font-semibold text-slate-700 leading-relaxed`}>
                                {order.note ? `"${order.note}"` : "Khách hàng không để lại ghi chú cho đơn này."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};