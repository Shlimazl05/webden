




"use client";
import React, { useState, useEffect } from "react";
import { Box, FileText, ShoppingCart, Plus, Minus, Zap } from "lucide-react";
import { IProduct } from "../../product.types";
import toast from "react-hot-toast";
import { addToCartApi } from "@/features/cart/api/cart.api"; // Import API
import { useAuth } from "@/features/auth/auth.hooks"; // Để kiểm tra đăng nhập
import { useRouter } from "next/navigation";

export const ProductDetailContent = ({ product }: { product: IProduct }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false); // Trạng thái loading cho nút

    const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean) as string[];
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!isAutoPlay || allImages.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % allImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isAutoPlay, allImages.length]);

    const activeImg = allImages[activeIndex] || "/img/placeholder.svg";

    // HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG THẬT
    const handleAddToCart = async (showToast = true) => {
        if (!isLoggedIn) {
            toast.error("Vui lòng đăng nhập để mua hàng!");
            router.push("/login");
            return false;
        }

        try {
            setIsAdding(true);
            const res = await addToCartApi({
                productId: product._id,
                quantity: quantity
            });

            if (res.success) {
                if (showToast) {
                    toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, {
                        style: { borderRadius: '15px', background: '#1e293b', color: '#fff', fontWeight: 'bold' }
                    });
                }
                return true;
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Không thể thêm vào giỏ hàng");
            return false;
        } finally {
            setIsAdding(false);
        }
    };

    // HÀM XỬ LÝ MUA NGAY
    const handleBuyNow = async () => {
        const success = await handleAddToCart(false);
        if (success) {
            router.push("/cart");
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto pt-[64px] lg:pt-[70px] pb-10 px-4 animate-in fade-in duration-700">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-6 lg:p-8">
                <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* CỘT TRÁI - ẢNH */}
                    <div
                        className="col-span-12 lg:col-span-5 space-y-4"
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                    >
                        <div className="w-full aspect-square bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-inner">
                            <img
                                key={activeImg}
                                src={activeImg}
                                className="w-full h-full object-cover transition-all duration-700 animate-in zoom-in-95 fade-in"
                                alt={product.productName}
                            />
                        </div>

                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar px-1 justify-center">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        className={`w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0 rounded-xl border-2 transition-all overflow-hidden ${activeIndex === idx
                                            ? "border-indigo-600 shadow-md scale-110"
                                            : "border-transparent opacity-50 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt={`sub-${idx}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CỘT PHẢI - THÔNG TIN */}
                    <div className="col-span-12 lg:col-span-7 flex flex-col space-y-6 py-1">
                        <div className="border-l-4 border-indigo-500 pl-5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tên sản phẩm</p>
                            <h2 className="text-xl lg:text-3xl font-black text-slate-900 leading-tight ">
                                {product.productName}
                            </h2>
                        </div>

                        <div className="border-l-4 border-rose-500 pl-5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Giá bán</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl lg:text-4xl font-black text-rose-600 tracking-tighter">
                                    {product.salePrice?.toLocaleString('vi-VN')}
                                </span>
                                <span className="text-xl font-bold text-rose-600 underline ">đ</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Số lượng mua</p>
                                <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-sm w-fit h-11">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-full px-4 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600"
                                    >
                                        <Minus size={14} strokeWidth={3} />
                                    </button>
                                    <span className="w-10 text-center font-black text-slate-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-full px-4 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600"
                                    >
                                        <Plus size={14} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-1">
                                <Box size={14} className="text-indigo-600" />
                                <p className="text-[14px] font-bold text-slate-500">
                                    Tồn kho: <span className="text-slate-950 font-black">{product.stockQuantity}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={() => handleAddToCart()}
                                disabled={isAdding}
                                className={`flex-1 h-12 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all active:scale-95 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <ShoppingCart size={18} strokeWidth={2.5} />
                                {isAdding ? "Đang xử lý..." : "Thêm vào giỏ"}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-[1.2] h-12 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                            >
                                <Zap size={18} fill="currentColor" /> Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8 mt-6">
                <div className="flex items-center gap-2 border-l-4 border-indigo-500 pl-5 mb-6">
                    <FileText size={18} className="text-indigo-500" strokeWidth={2.5} />
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Thông tin chi tiết</h3>
                </div>
                <div className="pl-5">
                    <p className="text-[14px] text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                        {product.specifications?.description || "Thông tin đang được cập nhật..."}
                    </p>
                </div>
            </div>
        </div>
    );
};