


import { FooterStaticData } from '../footer.types';

export const useFooter = () => {
    const footerData: FooterStaticData = {
        policies: [
            { title: "Chính sách linh hoạt.", subtitle: "10 ngày đổi trả.", iconType: 'policy' },
            { title: "Cam kết chất lượng.", subtitle: "Sản phẩm chính hãng.", iconType: 'quality' },
            { title: "Thanh toán linh hoạt.", subtitle: "Giao hàng nhận tiền.", iconType: 'payment' },
            { title: "Vận chuyển nhanh.", subtitle: "Giao hàng trong ngày.", iconType: 'shipping' },
        ],
        brand: {
            name: "STELLAR LIGHTS",
            description: "Đơn vị cung cấp giải pháp chiếu sáng nội thất cao cấp, mang nghệ thuật ánh sáng vào không gian sống của bạn."
        },
        contact: {
            address: "Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ",
            hotline: "0988.123.456",
            email: "info@stellarlights.vn"
        },
        paymentMethods: ["Thanh toán trực tiếp", "Quét mã QR (Sepay)"]
    };

    return { footerData };
};