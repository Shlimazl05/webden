


'use client';
import React from "react";
import Image from "next/image"; // Import thẻ Image của Next.js
import { useBanner } from "../hooks/useHeroBanner";

const BANNER_IMAGES = [
  "/img/banners/banner1.png",
  "/img/banners/banner3.png",
  "/img/banners/banner2.png",
  
  "/img/banners/banner4.png",
  "/img/banners/banner5.png"
];

export default function HeroBanner() {
  const { currentIndex, goToSlide } = useBanner(BANNER_IMAGES.length);

  return (
    <div className="relative w-full aspect-[2/1] md:aspect-[16/7] rounded-[40px] overflow-hidden shadow-sm border-4 border-white group">

      {BANNER_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Dùng Next.js Image để cực kỳ chuyên nghiệp */}
          <Image
            src={img}
            alt={`Stellar Lights Banner ${index + 1}`}
            fill // Tự động lấp đầy khung cha h-[400px]
            priority={index === 0} // Ưu tiên load ảnh đầu tiên ngay lập tức
            className="object-cover transition-transform duration-[5000ms] group-hover:scale-105"
            sizes="(max-width: 1300px) 100vw"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>
      ))}

      {/* Nút điều hướng (Dots) - Giữ nguyên logic click */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {BANNER_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`cursor-pointer transition-all duration-300 rounded-full h-2 ${i === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/40 w-2 hover:bg-white/60'
              }`}
          />
        ))}
      </div>
    </div>
  );
}