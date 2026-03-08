

// "use client";
// import React from 'react';
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useCustomerManagement } from "@/features/customer/hooks/useAdminCustomer";
// import { CustomerTable } from "@/features/customer/components/CustomerTable";
// import { CustomerSearch } from "@/features/customer/components/CustomerSearch";
// import { Users2 } from "lucide-react";

// // Import các Layout Components dùng chung
// import { 
//   AdminPageContainer, 
//   AdminPageHeader 
// } from "@/components/layout/AdminPageContainer";

// export default function CustomerPage() {
//   const { isAuthorized } = useAdminAuth();
//   const { customers, loading, handleToggleStatus } = useCustomerManagement();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500">
      
//       {/* LỚP BAO TRẮNG TOÀN TRANG */}
//       <AdminPageContainer>
        
//         {/* TIÊU ĐỀ TRANG & THỐNG KÊ NHANH */}
//         <AdminPageHeader title="QUẢN LÝ KHÁCH HÀNG">

//         </AdminPageHeader>

//         {/* THANH TÌM KIẾM */}
//         <div className="mb-10 max-w-sm">
//           <CustomerSearch onSearch={(val) => console.log("Tìm kiếm:", val)} />
//         </div>

//         {/* VÙNG CHỨA BẢNG CÓ THANH KÉO (Scrollable Table) */}
//         <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-2 mt-6">
//           <CustomerTable 
//             customers={customers} 
//             loading={loading} 
//             onStatusChange={handleToggleStatus} 
//           />
//         </div>

//       </AdminPageContainer>
//     </div>
//   );
// }

"use client";
import React, { useState } from 'react';
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useCustomerManagement } from "@/features/customer/hooks/useAdminCustomer";
import { CustomerTable } from "@/features/customer/components/CustomerTable";
import { SearchBar } from "@/components/ui/SearchBar"; 
import { Pagination } from "@/components/ui/Pagination"; 
import { Users2, ArrowRight } from "lucide-react";

import { 
  AdminPageContainer, 
  AdminPageHeader 
} from "@/components/layout/AdminPageContainer";

export default function CustomerPage() {
  const { isAuthorized } = useAdminAuth();
  
  // 1. Quản lý trạng thái trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  
  // 2. TRUYỀN currentPage vào hook để mỗi khi trang đổi, hook sẽ tự gọi API lấy dữ liệu mới
  const { 
    customers, 
    totalPages, // Lấy tổng số trang thực tế từ Backend trả về
    loading, 
    handleToggleStatus, 
    setSearchTerm 
  } = useCustomerManagement(currentPage); 

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1); // Tìm kiếm mới luôn về trang 1
  };

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>
        
        <AdminPageHeader 
          title={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center shadow-sm border border-cyan-100">
                <Users2 size={22} strokeWidth={2.5} />
              </div>
              <span >QUẢN LÝ KHÁCH HÀNG</span>
            </div>
          }
        />

        <div className="mb-8 max-w-sm">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Tìm kiếm theo tên hoặc SĐT..." 
          />
        </div>

        <div className="mt-4">

          <div className="max-h-[550px] overflow-y-auto custom-scrollbar pr-2 border border-slate-50 rounded-[2.5rem] mb-6">
            <CustomerTable 
              customers={customers} 
              loading={loading} 
              onStatusChange={handleToggleStatus} 
              onResetPage={() => setCurrentPage(1)} 
            />
          </div>
        </div>

        {/* 3. CẬP NHẬT PHẦN PHÂN TRANG */}
        <div className="border-t border-slate-50 pt-4">
          <Pagination 
            currentPage={currentPage}
            // Dùng totalPages từ hook (Backend trả về), không để số 5 cố định nữa
            totalPages={totalPages || 1} 
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

      </AdminPageContainer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}</style>
    </div>
  );
}