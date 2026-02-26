// "use client";
// import React from 'react';
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useCustomerManagement } from "@/features/customer/customer.hooks";
// import { CustomerTable } from "@/features/customer/components/CustomerTable";
// import { CustomerSearch } from "@/features/customer/components/CustomerSearch";

// export default function CustomerPage() {
//   const { isAuthorized } = useAdminAuth();
//   const { customers, loading, handleToggleStatus } = useCustomerManagement();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500">
//       <h1 className="text-3xl font-black text-[#001529] uppercase tracking-tighter mb-10">
//         Quản lý khách hàng
//       </h1>

//       <div className="mb-8">
//         <CustomerSearch onSearch={(val) => console.log(val)} />
//       </div>

//       <CustomerTable 
//         customers={customers} 
//         loading={loading} 
//         onStatusChange={handleToggleStatus} 
//       />
//     </div>
//   );
// }

"use client";
import React from 'react';
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useCustomerManagement } from "@/features/customer/hooks/useAdminCustomer";
import { CustomerTable } from "@/features/customer/components/CustomerTable";
import { CustomerSearch } from "@/features/customer/components/CustomerSearch";
import { Users2 } from "lucide-react";

// Import các Layout Components dùng chung
import { 
  AdminPageContainer, 
  AdminPageHeader 
} from "@/components/layout/AdminPageContainer";

export default function CustomerPage() {
  const { isAuthorized } = useAdminAuth();
  const { customers, loading, handleToggleStatus } = useCustomerManagement();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* LỚP BAO TRẮNG TOÀN TRANG */}
      <AdminPageContainer>
        
        {/* TIÊU ĐỀ TRANG & THỐNG KÊ NHANH */}
        <AdminPageHeader title="QUẢN LÝ KHÁCH HÀNG">
          <div className="flex items-center gap-3 bg-[#FBF7EE] px-5 py-2 rounded-2xl border border-[#EFE7D3]">
            <div className="p-1.5 bg-white rounded-lg shadow-sm text-[#C5A059]">
              <Users2 size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest leading-none">
                Tổng khách hàng
              </span>
              <span className="text-sm font-black text-[#001529] mt-0.5">
                {customers?.length || 0}
              </span>
            </div>
          </div>
        </AdminPageHeader>

        {/* THANH TÌM KIẾM */}
        <div className="mb-10 max-w-sm">
          <CustomerSearch onSearch={(val) => console.log("Tìm kiếm:", val)} />
        </div>

        {/* VÙNG CHỨA BẢNG CÓ THANH KÉO (Scrollable Table) */}
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-2 mt-6">
          <CustomerTable 
            customers={customers} 
            loading={loading} 
            onStatusChange={handleToggleStatus} 
          />
        </div>

      </AdminPageContainer>
    </div>
  );
}