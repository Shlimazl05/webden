import { IOrder } from "../../order.types";

export const OrderPackageDetails: React.FC<{ order: IOrder }> = ({ order }) => {
    return (
        <div className="ui-card rounded-[2.5rem] border border-slate-100 shadow-sm bg-white overflow-hidden">
            {/* 1. Tiêu đề mục */}
            <div className="p-8 pb-4">
                <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                    Chi tiết kiện hàng
                </h3>
            </div>

            {/* 2. Danh sách sản phẩm */}
            <div className="px-8 pb-4 space-y-6">
                {order.orderDetails?.map((item: any, idx: number) => {
                    const product = item.productId;
                    const name = product?.productName || "Sản phẩm không xác định";
                    const code = product?.productCode || "N/A";
                    const image = product?.imageUrl;

                    return (
                        <div key={idx} className="flex items-center gap-5 group transition-all">
                            <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 flex-shrink-0 overflow-hidden shadow-sm">
                                {image ? (
                                    <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300 font-bold uppercase">No Image</div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-[15px] font-bold text-slate-800 leading-tight truncate">
                                    {name}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-400 rounded-md uppercase tracking-tighter border border-slate-200">
                                         {code}
                                    </span>
                                    <span className="text-[13px] text-slate-500 font-bold">
                                        Số lượng: {item.quantity}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right pl-4">
                                <p className="text-[17px] font-black text-slate-900 tabular-nums">
                                    {(item.quantity * item.unitPrice)?.toLocaleString()}
                                    <span className="text-[11px] ml-0.5 underline font-bold">đ</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. KHU VỰC TỔNG KẾT - ĐÃ CĂN THẲNG LẠI TUYỆT ĐỐI */}
            {/* 3. KHU VỰC TỔNG KẾT - CĂN THẲNG HÀNG TUYỆT ĐỐI THEO LỀ PHẢI */}
            <div className="mx-6 mb-6 p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100/50">
                <div className="flex flex-col items-end space-y-4">

                    {/* Hàng: Tiền hàng */}
                    <div className="flex items-center justify-end w-full">
                        <span className="text-slate-400 font-medium text-[14px]">
                            Tiền hàng ({order.orderDetails?.length || 0} món)
                        </span>
                        {/* Cố định độ rộng w-40 để dóng hàng */}
                        <span className="w-40 text-right font-bold text-slate-700 tabular-nums text-[15px]">
                            {order.totalAmount?.toLocaleString()}đ
                        </span>
                    </div>

                    {/* Hàng: Phí vận chuyển */}
                    <div className="flex items-center justify-end w-full">
                        <span className="text-slate-400 font-medium text-[14px]">
                            Phí vận chuyển
                        </span>
                        <span className="w-40 text-right font-bold text-slate-700 tabular-nums text-[15px]">
                            +{order.shippingFee?.toLocaleString()}đ
                        </span>
                    </div>

                    {/* Đường kẻ phân cách - Căn theo độ rộng của cụm tiền */}
                    <div className="w-64 h-px bg-slate-200 my-1"></div>

                    {/* Hàng: TỔNG THANH TOÁN */}
                    <div className="flex items-center justify-end w-full">
                        {/* Cụm nhãn bên trái */}
                        <div className="text-right mr-4">
                            <p className="text-[14px] font-bold text-indigo-600 leading-none">
                                Tổng thanh toán
                            </p>
                            <p className="text-[13px] text-slate-700 italic font-medium mt-1">
                                Phương thức: {order.paymentMethod}
                            </p>
                        </div>

                        {/* Cụm số tiền - Quan trọng: w-40 khớp với bên trên để thẳng hàng */}
                        <div className="w-40 text-right flex items-baseline justify-end">
                            <span className="text-2xl font-black  tracking-tighter tabular-nums leading-none">
                                {order.finalAmount?.toLocaleString()}
                            </span>
                            <span className="text-xl font-bold  underline decoration-4 underline-offset-4 ml-1">
                                đ
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};