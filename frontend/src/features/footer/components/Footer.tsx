


'use client';
import React from 'react';
import { useFooter } from '../hooks/useFooter';

const PolicyIcons = {
    policy: () => (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-accent)]">
            <circle cx="9" cy="21" r="3" /><circle cx="20" cy="21" r="3" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    ),
    quality: () => (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" className="text-[var(--color-accent)]">
            <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-2 14.5l-3.5-3.5 1.41-1.41L10 13.67l5.09-5.09L16.5 10 10 16.5z" />
        </svg>
    ),
    payment: () => (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-accent)]">
            <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
        </svg>
    ),
    shipping: () => (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" className="text-[var(--color-accent)]">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
    )
};

// Thêm bộ Icon này phía trên hoặc trong component Footer
const ContactIcons = {
    MapPin: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent)]">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Phone: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent)]">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    Mail: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent)]">
            <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
};

const PaymentIcons = {
    Cash: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent)]">
            <rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" />
        </svg>
    ),
    QR: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent)]">
            <rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" />
        </svg>
    ),
    Shield: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM10 15.5l-3-3 1.41-1.41L10 12.67l4.59-4.59L16 9.5l-6 6z" />
        </svg>
    )
};

export const Footer = () => {
    const { footerData } = useFooter();

    return (
        <footer className="w-full mt-20">
            {/* Tầng 1: Thanh Cam kết (Xám nhạt) */}
            <div className="bg-[#f1f5f9] py-10 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {footerData.policies.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-5 relative">
                            <div className="flex-shrink-0">
                                {PolicyIcons[item.iconType]()}
                            </div>
                            <div>
                                <h5 className="font-bold text-[15px] text-slate-800 leading-tight">
                                    {item.title}
                                </h5>
                                <p className="text-[13px] text-slate-500 font-medium">
                                    {item.subtitle}
                                </p>
                            </div>
                            {/* Vạch kẻ dọc phân cách (chỉ hiện trên desktop) */}
                            {idx !== footerData.policies.length - 1 && (
                                <div className="hidden md:block absolute -right-4 h-10 w-[1px] bg-slate-300" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tầng 2: Thông tin chi tiết (Nền cùng màu hoặc nhạt hơn một chút) */}
            <div className="bg-[var(--bg-light)] pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

                        {/* Cột 1: Brand */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-black tracking-tighter italic">
                                <span className="text-[var(--color-primary)]">STELLAR</span>
                                <span className="text-[var(--color-accent)]">LIGHTS</span>
                            </h3>
                            <p className="text-[13px] text-[var(--color-text-body)] leading-relaxed">
                                {footerData.brand.description}
                            </p>
                        </div>

                        {/* Cột 2: Liên hệ */}

                        <div className="space-y-6">
                            <h4 className="ui-label text-[11px] uppercase tracking-widest text-slate-400">Liên hệ hỗ trợ</h4>

                            <div className="space-y-6">
                                {/* Địa chỉ - Sử dụng items-start và mt-0.5 để icon thẳng hàng với dòng đầu tiên nếu địa chỉ dài */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <ContactIcons.MapPin />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-medium text-slate-700 leading-snug">
                                            {footerData.contact.address}
                                        </span>
                                    </div>
                                </div>

                                {/* Hotline - items-center để icon và số điện thoại thẳng hàng tuyệt đối */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <ContactIcons.Phone />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="ui-value !text-[var(--color-primary)] text-[16px]">
                                            {footerData.contact.hotline}
                                        </span>
                                    </div>
                                </div>

                                {/* Email - items-center để icon và email thẳng hàng tuyệt đối */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <ContactIcons.Mail />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-medium text-slate-700 tracking-tight">
                                            {footerData.contact.email}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cột 3: Thanh toán */}
                        <div className="space-y-6">
                            <h4 className="ui-label text-[11px] uppercase tracking-[0.2em] text-slate-400">Giao dịch an toàn</h4>

                            <div className="space-y-5">
                                {/* Phương thức 1: QR Code */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <PaymentIcons.QR />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-medium text-slate-700 leading-snug">
                                            Quét mã QR
                                        </span>

                                    </div>
                                </div>

                                {/* Phương thức 2: Tiền mặt */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <PaymentIcons.Cash />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-medium text-slate-700 leading-snug">
                                            Thanh toán trực tiếp
                                        </span>

                                    </div>
                                </div>

                                {/* Trust Badge - Đây là phần tạo nên sự chuyên nghiệp */}
                                <div className="mt-4 pt-4 border-t border-slate-200/60">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                                        <PaymentIcons.Shield />
                                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tight">
                                            Secure Checkout by SePay
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                                        Hệ thống tự động bảo mật thông tin giao dịch khách hàng.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-16 pt-8 border-t border-slate-300 flex justify-between items-center opacity-50">
                        <span className="text-[12px] font-bold uppercase  text-slate-700">
                            © {new Date().getFullYear()} LUXE
                        </span>

                    </div>
                </div>
            </div>
        </footer>
    );
};