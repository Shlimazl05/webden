import React from 'react';
import { PackageOpen } from 'lucide-react';

export const EmptyOrderState = () => {
  return (
    <div className="w-full py-24 flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-100 rounded-xl ">
      <div className="p-6 bg-slate-100 rounded-full mb-4">
        <PackageOpen size={64} className="text-slate-400" strokeWidth={1.5} />
      </div>
      <p className="text-slate-400 font-medium">Không có đơn hàng nào.</p>
    </div>
  );
};
