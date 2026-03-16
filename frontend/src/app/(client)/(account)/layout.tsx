// "use client";

// import React from 'react';
// import { CustomerSidebar } from '@/features/customer/components/client/CustomerSidebar';

// /**
//  * Layout dùng chung cho vùng quản lý tài khoản khách hàng
//  * Giúp Sidebar cố định bên trái và nội dung thay đổi bên phải
//  */
// export default function CustomerPortalLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="max-w-[1200px] mx-auto px-6 py-12 min-h-screen">
//       <div className="flex flex-col md:flex-row gap-8 items-start">
        
//         {/* 1. CỘT TRÁI: Thanh Menu (Sidebar) - Cố định độ rộng */}
//         <aside className="w-full md:w-[280px] flex-shrink-0 sticky top-[110px]">
//           <CustomerSidebar />
//         </aside>

//         {/* 2. CỘT PHẢI: Nội dung thay đổi (Profile Form hoặc Order List) */}
//         <main className="flex-1 w-full min-w-0 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }


"use client";

import React from 'react';
import { CustomerSidebar } from '@/features/customer/components/client/CustomerSidebar';

export default function CustomerPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1. Tăng max-w từ 1200px lên 1400px (hoặc 100%) để mở rộng không gian
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row gap-5 items-start"> {/* Giảm gap từ 8 xuống 5 */}

        {/* 2. Giảm độ rộng Sidebar từ 280px xuống còn 240px để nhường chỗ cho nội dung */}
        <aside className="w-full md:w-[240px] flex-shrink-0 sticky top-[110px]">
          <CustomerSidebar />
        </aside>

        {/* 3. Cột nội dung chính sẽ tự động rộng ra */}
        <main className="flex-1 w-full min-w-0 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 md:p-10">
          {children}
        </main>

      </div>
    </div>
  );
}