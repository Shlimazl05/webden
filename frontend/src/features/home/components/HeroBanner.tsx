import React from "react";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
      <img 
        src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070" 
        className="w-full h-full object-cover"
        alt="Banner Đèn"
      />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
}