// "use client";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, Package, FolderTree, Users, 
//   ShoppingBag, ChevronLeft, ChevronRight 
// } from 'lucide-react';

// const menuItems = [
//   { name: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboard, color: 'text-blue-500' },
//   { name: 'Sản phẩm', href: '/admin/products', icon: Package, color: 'text-emerald-500' },
//   { name: 'Danh mục', href: '/admin/categories', icon: FolderTree, color: 'text-orange-400' },
//   { name: 'Khách hàng', href: '/admin/customers', icon: Users, color: 'text-emerald-500' },
//   { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag, color: 'text-purple-500' },
// ];

// export const AdminSidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const pathname = usePathname();

//   return (
//     <aside className={`fixed left-0 top-0 h-screen bg-slate-100 border-r border-slate-200 transition-all duration-300 z-50 ${isExpanded ? "w-[260px]" : "w-[80px]"}`}>
//       {/* Nút Toggle */}
//       <button onClick={() => setIsExpanded(!isExpanded)} className="absolute -right-3 top-10 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:bg-slate-50 transition-colors">
//         {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
//       </button>

//       {/* Logo */}
//       <div className="p-6 flex justify-center">
//         <div className={`bg-gradient-to-tr from-[#D6E4FF] to-[#FDE2FF] rounded-full flex items-center justify-center transition-all ${isExpanded ? "w-16 h-16" : "w-10 h-10"}`}>
//           <div className="w-[85%] h-[85%] bg-white rounded-full flex items-center justify-center overflow-hidden">
//             <span className="text-[8px] font-extrabold text-pink-500 text-center leading-tight">
//               {isExpanded ? "STELLAR\nLIGHTS" : "SL"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="px-3 space-y-2">
//         {menuItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link key={item.href} href={item.href} className={`flex items-center gap-4 p-3 transition-all duration-200 group relative ${isActive ? "bg-white text-slate-900 rounded-full shadow-md shadow-slate-200" : "text-slate-500 hover:bg-slate-200/50 rounded-xl"} ${!isExpanded && "justify-center px-0"}`}>
//               <item.icon size={22} className={`${isActive ? item.color : "text-slate-400 group-hover:text-slate-600"}`} />
//               {isExpanded && <span className="text-sm font-bold">{item.name}</span>}
//               {!isExpanded && (
//                 <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
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
  LayoutDashboard, Package, FolderTree, Users, 
  ShoppingBag, ChevronLeft, ChevronRight 
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
    { name: 'Danh mục', href: '/admin/categories', icon: FolderTree, color: 'text-orange-400' },
    { name: 'Khách hàng', href: '/admin/customers', icon: Users, color: 'text-emerald-500' },
    { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag, color: 'text-purple-500' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-slate-100 border-r border-slate-200 transition-all duration-300 z-50 ${isExpanded ? "w-[260px]" : "w-[80px]"}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="absolute -right-3 top-10 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:bg-slate-50 transition-colors z-[60]"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="p-6 flex justify-center">
        <div className={`bg-gradient-to-tr from-[#D6E4FF] to-[#FDE2FF] rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? "w-16 h-16" : "w-10 h-10"}`}>
          <div className="w-[85%] h-[85%] bg-white rounded-full flex items-center justify-center">
            <span className="text-[8px] font-extrabold text-pink-500 text-center leading-tight">
              {isExpanded ? "STELLAR\nLIGHTS" : "SL"}
            </span>
          </div>
        </div>
      </div>

      <nav className="px-3 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex items-center gap-4 p-3 transition-all duration-200 group relative ${
                isActive ? "bg-white text-slate-900 rounded-full shadow-md shadow-slate-200" : "text-slate-500 hover:bg-slate-200/50 rounded-xl"
              } ${!isExpanded && "justify-center px-0"}`}
            >
              <item.icon size={22} className={`${isActive ? item.color : "text-slate-400 group-hover:text-slate-600"}`} />
              {isExpanded && <span className="text-sm font-bold whitespace-nowrap">{item.name}</span>}
              {!isExpanded && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};