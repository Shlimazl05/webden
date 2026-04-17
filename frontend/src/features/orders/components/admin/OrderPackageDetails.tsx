

import React from 'react';
import { IOrder } from "../../order.types";

interface Props {
    order: IOrder;
    isClientView?: boolean; // Thuộc tính điều khiển hiển thị cho Client/Admin
}

export const OrderPackageDetails: React.FC<Props> = ({ order, isClientView = false }) => {
    return (
        /* 1. Khung ngoài sử dụng ui-card */
        <div className="ui-card overflow-hidden border-slate-100 shadow-sm bg-white">
            {/* Tiêu đề mục sử dụng ui-section-title */}
            <div className="p-8 pb-4">
                <h3 className="ui-section-title flex items-center gap-2">
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
                            {/* Ảnh sản phẩm */}
                            <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 flex-shrink-0 overflow-hidden shadow-sm">
                                {image ? (
                                    <img src={image} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center ui-label">No Image</div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                {/* Tên sản phẩm */}
                                <p className="ui-product-name hover:text-[var(--color-text-main)]">
                                    {name}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5">

                                    {/* MÃ SẢN PHẨM - CHỈ HIỆN KHI KHÔNG PHẢI LÀ CLIENT VIEW */}
                                    {!isClientView && (
                                        <span className="ui-label px-2 py-0.5 bg-slate-100 rounded border border-slate-200 normal-case">
                                            {code}
                                        </span>
                                    )}

                                    <span className="text-[13px] text-[var(--color-text-muted)] font-semibold ml-1">
                                        Số lượng: {item.quantity}
                                    </span>
                                </div>
                            </div>

                            {/* Giá sản phẩm */}
                            <div className="text-right pl-4">
                                <p className="ui-currency text-[17px]">
                                    {isClientView
                                        ? item.unitPrice.toLocaleString() // Client: Hiện đơn giá (Chưa cộng dồn)
                                        : (item.unitPrice * item.quantity).toLocaleString() // Admin: Hiện tổng tiền món đó
                                    }
                                    <span className="currency-symbol">đ</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. KHU VỰC TỔNG KẾT */}
            <div className="mx-6 mb-6 p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100/50">
                <div className="flex flex-col items-end space-y-4">

                    <div className="flex items-center justify-end w-full">
                        <span className="ui-label normal-case text-[14px]">
                            Tiền hàng ({order.orderDetails?.length || 0} món)
                        </span>
                        <span className="w-40 ui-currency text-[15px] text-right">
                            {order.totalAmount?.toLocaleString()}<span className="currency-symbol">đ</span>
                        </span>
                    </div>

                    <div className="flex items-center justify-end w-full">
                        <span className="ui-label normal-case text-[14px]">
                            Phí vận chuyển
                        </span>
                        <span className="w-40 ui-currency text-[15px] text-right">
                            +{order.shippingFee?.toLocaleString()}<span className="currency-symbol">đ</span>
                        </span>
                    </div>

                    <div className="w-64 h-px bg-slate-200 my-1"></div>

                    <div className="flex items-center justify-end w-full">
                        <div className="text-right mr-4">
                            <p className="text-[14px] font-bold text-indigo-600 leading-none">
                                Tổng thanh toán
                            </p>
                            <p className="ui-label normal-case italic mt-1.5 text-[13px]">
                                Phương thức: {order.paymentMethod}
                            </p>
                        </div>

                        <div className="w-40 text-right flex items-baseline justify-end">
                            <span className="ui-currency text-[32px] text-rose-600 leading-none">
                                {order.finalAmount?.toLocaleString()}
                            </span>
                            <span className="currency-symbol text-lg font-bold text-rose-600 ml-1">
                                đ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};