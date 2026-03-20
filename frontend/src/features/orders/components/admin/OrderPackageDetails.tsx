import { IOrder } from "../../order.types";

export const OrderPackageDetails: React.FC<{ order: IOrder }> = ({ order }) => {
    return (
        <div className="ui-card rounded-[2rem]">
            <h3 className="ui-section-title mb-6">Chi tiết đơn hàng</h3>

            <div className="space-y-5 mb-8">
                {order.orderDetails.map((item: any, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex-shrink-0 flex items-center justify-center text-[10px] text-slate-300">IMG</div>
                        <div className="flex-1 pt-1">
                            <p className="ui-product-name font-semibold text-slate-800">{item.productId?.name || "Sản phẩm"}</p>
                            <p className="text-sm text-slate-400 mt-1">
                                {item.quantity} x {item.unitPrice.toLocaleString()} <span className="currency-symbol">đ</span>
                            </p>
                        </div>
                        <div className="ui-currency pt-1 text-slate-900 font-bold">
                            {(item.quantity * item.unitPrice).toLocaleString()}
                            <span className="currency-symbol">đ</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tiền hàng ({order.orderDetails.length} món)</span>
                    <span className="font-bold text-slate-800">{order.totalAmount.toLocaleString()}<span className="currency-symbol">đ</span></span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Phí vận chuyển</span>
                    <span className="font-bold text-slate-800">+{order.shippingFee.toLocaleString()}<span className="currency-symbol">đ</span></span>
                </div>
                <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                    <div>
                        <p className="text-sm font-bold text-indigo-600 mb-0.5">Tổng thanh toán</p>
                        <p className="text-[11px] text-slate-400 italic">Phương thức: {order.paymentMethod}</p>
                    </div>
                    <span className="text-3xl font-black text-rose-600 tracking-tight">
                        {order.finalAmount.toLocaleString()}
                        <span className="text-base ml-1 underline decoration-2">đ</span>
                    </span>
                </div>
            </div>
        </div>
    );
};