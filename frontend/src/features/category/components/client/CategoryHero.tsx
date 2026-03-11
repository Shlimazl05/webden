"use client";
import React from 'react';
import Image from 'next/image';
import { ICategory } from '../../category.types';

export const CategoryHero = ({ category }: { category: ICategory }) => {
    return (
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row items-center gap-10 p-10">
                {/* Ảnh đại diện lớn */}
                <div className="w-full md:w-1/3 aspect-square relative rounded-[32px] overflow-hidden shadow-xl border-4 border-slate-50">
                    <Image
                        src={category.image || '/fallback-lamp.jpg'}
                        alt={category.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Thông tin mô tả */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <h1 className="text-4xl font-black text-[#001529] uppercase tracking-tighter">
                        {category.name}
                    </h1>
                    <div className="w-20 h-1.5 bg-indigo-600 rounded-full mx-auto md:mx-0" />
                    <p className="text-slate-500 leading-relaxed text-lg font-medium max-w-2xl italic">
                        "{category.description || "Khám phá bộ sưu tập đèn chiếu sáng cao cấp với thiết kế tinh tế, mang lại không gian ấm cúng và sang trọng cho ngôi nhà của bạn."}"
                    </p>
                </div>
            </div>
        </div>
    );
};