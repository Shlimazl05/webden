// src/app/(client)/layout.tsx
"use client";
import Navbar from "@/components/layout/Navbar";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar /> {/* Navbar chỉ xuất hiện cho các trang trong nhóm (client) */}
      <main>{children}</main>
      
    </>
  );
}