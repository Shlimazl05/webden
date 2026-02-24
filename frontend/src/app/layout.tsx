// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/layout/Navbar";

// // Cấu hình Font chữ
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // Cấu hình Metadata (Tiêu đề trang web)
// export const metadata: Metadata = {
//   title: "Stellar Lights - Thế giới ánh sáng nội thất",
//   description: "Cung cấp đèn trang trí cao cấp",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="vi">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {/* KHÔNG ĐỂ NAVBAR Ở ĐÂY NỮA */}
//         {children}
//       </body>
//     </html>
//   );
// }

// import "./globals.css";
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="vi">
//       <body className="antialiased bg-[#f4f4f2]">{children}</body>
//     </html>
//   );
// }

import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

// 1. Cấu hình Font
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam", // Tạo biến CSS để Tailwind dùng
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      {/* 2. Áp dụng font vào body. 
          Class 'antialiased' giúp nét chữ thanh mảnh và sắc nét hơn */}
      <body className={`${beVietnamPro.variable} font-sans antialiased text-[#001529]`}>
        {children}
      </body>
    </html>
  );
}