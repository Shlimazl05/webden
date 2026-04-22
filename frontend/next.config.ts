import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Thêm đoạn này để ẩn biểu tượng Dev Indicator
  devIndicators: false,
} as any;

export default nextConfig;
