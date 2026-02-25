

// import { Be_Vietnam_Pro } from "next/font/google";
// import "./globals.css";

// // 1. Cấu hình Font
// const beVietnamPro = Be_Vietnam_Pro({
//   subsets: ["vietnamese"],
//   weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-be-vietnam", // Tạo biến CSS để Tailwind dùng
// });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="vi">
//       {/* 2. Áp dụng font vào body. 
//           Class 'antialiased' giúp nét chữ thanh mảnh và sắc nét hơn */}
//       <body className={`${beVietnamPro.variable} font-sans antialiased text-[#001529]`}>
//         {children}
//       </body>
//     </html>
//   );
// }


import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// 1. Cấu hình Font Be Vietnam Pro
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} font-sans antialiased text-[#001529]`}>
        
        {/* 2. Cấu hình Toaster - Thông báo sẽ hiện ra ở CHÍNH GIỮA phía trên */}
        <Toaster 
          position="top-center" // Đưa thông báo ra giữa màn hình
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            // Style chung chuẩn text-sm (14px) và tươi sáng
            style: {
              background: '#ffffff',
              color: '#001529',
              fontSize: '14px',      // .875rem chuẩn của ní
              fontWeight: '600',
              borderRadius: '16px',
              padding: '12px 24px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)',
              marginTop: '15px',    // Cách mép trên một chút cho thoáng
            },
            // Style khi thành công (Màu Indigo)
            success: {
              iconTheme: {
                primary: '#4f46e5',
                secondary: '#fff',
              },
            },
            // Style khi có lỗi (Màu Hồng/Đỏ)
            error: {
              iconTheme: {
                primary: '#f43f5e',
                secondary: '#fff',
              },
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}