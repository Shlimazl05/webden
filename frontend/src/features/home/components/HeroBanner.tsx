
// 'use client';
// import React from "react";
// import { useBanner } from "../hooks/useHeroBanner";
// import Image from "next/image";

// const BANNER_IMAGES = [
//   "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070",
//   "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2071", // Thay link ảnh 2 của bạn
//   "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2072", // Thay link ảnh 3 của bạn
  
// ];

// export default function HeroBanner() {
//   const { currentIndex, goToSlide } = useBanner(BANNER_IMAGES.length);

//   return (
//     <div className="relative w-full h-[400px] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white group">

//       {/* Container chứa ảnh - Hiệu ứng Fade */}
//       {BANNER_IMAGES.map((img, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
//             }`}
//         >
//           <img
//             src={img}
//             className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110"
//             alt={`Banner ${index + 1}`}
//           />
//           {/* Lớp phủ nhẹ để text (nếu có) dễ đọc hơn */}
//           <div className="absolute inset-0 bg-black/10" />
//         </div>
//       ))}

//       {/* Nút điều hướng (Dots) */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
//         {BANNER_IMAGES.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => goToSlide(i)}
//             aria-label={`Go to slide ${i + 1}`}
//             className={`transition-all duration-300 rounded-full h-2 ${i === currentIndex
//                 ? 'bg-white w-8' // Dot đang chọn sẽ dài ra trông hiện đại hơn
//                 : 'bg-white/40 w-2 hover:bg-white/60'
//               }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


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