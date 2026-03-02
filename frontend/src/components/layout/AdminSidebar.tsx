

// "use client";
// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, Package, FolderTree, Users, 
//   ShoppingBag, ChevronLeft, ChevronRight, FileText // Thêm FileText
// } from 'lucide-react';

// interface SidebarProps {
//   isExpanded: boolean;
//   setIsExpanded: (value: boolean) => void;
// }

// export const AdminSidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
//   const pathname = usePathname();

//   const menuItems = [
//     { name: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboard, color: 'text-blue-500' },
//     { name: 'Sản phẩm', href: '/admin/products', icon: Package, color: 'text-emerald-500' },
//     { name: 'Danh mục', href: '/admin/categories', icon: FolderTree, color: 'text-orange-400' },
//     // MỤC MỚI: Hóa đơn nhập (Đặt sau Danh mục hoặc Sản phẩm cho hợp logic kho)
//     { name: 'Hóa đơn nhập', href: '/admin/incoming-invoices', icon: FileText, color: 'text-indigo-500' },
//     { name: 'Khách hàng', href: '/admin/customers', icon: Users, color: 'text-emerald-500' },
//     { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag, color: 'text-purple-500' },
//   ];

//   return (
//     <aside className={`fixed left-0 top-0 h-screen bg-slate-100 border-r border-slate-200 transition-all duration-300 z-50 ${isExpanded ? "w-[260px]" : "w-[80px]"}`}>
//       <button 
//         type="button"
//         onClick={() => setIsExpanded(!isExpanded)} 
//         className="absolute -right-3 top-10 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:bg-slate-50 transition-colors z-[60]"
//       >
//         {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
//       </button>

//       <div className="p-6 flex justify-center">
//         <div className={`bg-gradient-to-tr from-[#D6E4FF] to-[#FDE2FF] rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? "w-16 h-16" : "w-10 h-10"}`}>
//           <div className="w-[85%] h-[85%] bg-white rounded-full flex items-center justify-center shadow-sm">
//             <span className="text-[8px] font-extrabold text-pink-500 text-center leading-tight">
//               {isExpanded ? "STELLAR\nLIGHTS" : "SL"}
//             </span>
//           </div>
//         </div>
//       </div>

//       <nav className="px-3 space-y-2 mt-4">
//         {menuItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link 
//               key={item.href} 
//               href={item.href} 
//               className={`flex items-center gap-4 p-3 transition-all duration-200 group relative ${
//                 isActive ? "bg-white text-slate-900 rounded-full shadow-md shadow-slate-200" : "text-slate-500 hover:bg-slate-200/50 rounded-xl"
//               } ${!isExpanded && "justify-center px-0"}`}
//             >
//               <item.icon 
//                 size={22} 
//                 strokeWidth={isActive ? 2.5 : 2} 
//                 className={`${isActive ? item.color : "text-slate-400 group-hover:text-slate-600"}`} 
//               />
              
//               {isExpanded && <span className={`text-sm whitespace-nowrap ${isActive ? "font-black" : "font-bold"}`}>{item.name}</span>}
              
//               {!isExpanded && (
//                 <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-xl transition-opacity">
//                   {item.name}
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, Layers, Users, // Thay FolderTree bằng Layers
  ShoppingBag, ChevronLeft, ChevronRight, FileText 
} from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const AdminSidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboard, color: 'text-blue-500' },
    { name: 'Sản phẩm', href: '/admin/products', icon: Package, color: 'text-emerald-500' },
    // ICON MỚI: Layers - Trông gọn gàng và chuyên nghiệp hơn
    { name: 'Danh mục', href: '/admin/categories', icon: Layers, color: 'text-amber-500' },
    { name: 'Hóa đơn nhập', href: '/admin/incoming-invoices', icon: FileText, color: 'text-indigo-500' },
    { name: 'Khách hàng', href: '/admin/customers', icon: Users, color: 'text-cyan-500' },
    { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag, color: 'text-rose-500' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-100 transition-all duration-300 z-50 ${isExpanded ? "w-[260px]" : "w-[80px]"} shadow-sm`}>
      {/* Nút đóng/mở Sidebar */}
      <button 
        type="button"
        onClick={() => setIsExpanded(!isExpanded)} 
        className="absolute -right-3 top-12 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:text-indigo-600 transition-all z-[60]"
      >
        {isExpanded ? <ChevronLeft size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
      </button>

      {/* Logo Area */}
      <div className="p-6 mb-4 flex justify-center">
        <div className={`bg-indigo-50 rounded-2xl flex items-center justify-center transition-all duration-500 ${isExpanded ? "w-full h-16" : "w-12 h-12"}`}>
           <span className={`font-black text-indigo-600 tracking-tighter transition-all ${isExpanded ? "text-xl" : "text-sm"}`}>
              {isExpanded ? "STELLAR" : "S"}
           </span>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="px-3 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex items-center gap-4 p-3.5 transition-all duration-200 group relative ${
                isActive 
                ? "bg-indigo-50/50 text-indigo-600 rounded-2xl shadow-sm border border-indigo-100/50" 
                : "text-slate-500 hover:bg-slate-50 rounded-2xl"
              } ${!isExpanded && "justify-center"}`}
            >
              {/* Icon với StrokeWidth lớn hơn khi Active để rõ nét */}
              <item.icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={`${isActive ? item.color : "text-slate-400 group-hover:text-slate-600"}`} 
              />
              
              {isExpanded && (
                <span className={`text-[13px] whitespace-nowrap tracking-tight ${isActive ? "font-black" : "font-bold"}`}>
                  {item.name}
                </span>
              )}
              
              {/* Tooltip khi thu nhỏ */}
              {!isExpanded && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-2xl transition-all uppercase tracking-widest">
                  {item.name}
                </div>
              )}

              {/* Thanh chỉ báo nhỏ khi Active */}
              {isActive && isExpanded && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-sm shadow-indigo-200"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};