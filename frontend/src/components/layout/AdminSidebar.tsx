

// "use client";
// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, Package, Layers, Users, 
//   ShoppingBag, ChevronLeft, ChevronRight, FileText 
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
//     { name: 'Danh mục', href: '/admin/categories', icon: Layers, color: 'text-amber-500' },
//     { name: 'Hóa đơn nhập', href: '/admin/incoming-invoices', icon: FileText, color: 'text-indigo-500' },
//     { name: 'Khách hàng', href: '/admin/customers', icon: Users, color: 'text-cyan-500' },
//     { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag, color: 'text-rose-500' },
//   ];

//   return (
//     <aside className={`fixed left-0 top-0 h-screen  border-r bg-slate-50 border-slate-20 transition-all duration-300 z-50 ${isExpanded ? "w-[280px]" : "w-[80px]"} shadow-sm`}>
//       {/* Nút đóng/mở Sidebar */}
//       <button 
//         type="button"
//         onClick={() => setIsExpanded(!isExpanded)} 
//         className="absolute -right-3 top-12 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:text-indigo-600 transition-all z-[60]"
//       >
//         {isExpanded ? <ChevronLeft size={16} strokeWidth={3} /> : <ChevronRight size={16} strokeWidth={3} />}
//       </button>

//       {/* Logo Area */}
//       <div className="p-6 mb-4 flex justify-center">
//         <div className={`bg-slate-50 rounded-2xl flex items-center justify-center transition-all duration-500 ${isExpanded ? "w-full h-16" : "w-12 h-12"}`}>
//            <span className={`font-black text-slate-900 tracking-tighter transition-all ${isExpanded ? "text-2xl" : "text-sm"}`}>
//               {isExpanded ? "STELLAR" : "S"}
//            </span>
//         </div>
//       </div>

//       {/* Menu Navigation */}
//       <nav className="px-3 space-y-1.5">
//         {menuItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link 
//               key={item.href} 
//               href={item.href} 
//               className={`flex items-center gap-4 p-4 transition-all duration-200 group relative rounded-2xl ${
//                 isActive 
//                 ? "bg-slate-100 text-slate-950 shadow-sm" // "Cái bao" màu xám nhạt, chữ đen đậm
//                 : "text-slate-500 hover:bg-slate-50"
//               } ${!isExpanded && "justify-center"}`}
//             >
//               {/* Icon */}
//               <item.icon 
//                 size={24} 
//                 strokeWidth={isActive ? 2.8 : 2} 
//                 className={`${isActive ? item.color : "text-slate-400 group-hover:text-slate-600"}`} 
//               />
              
//               {/* Chữ: Làm đậm Font-Black khi Active */}
//               {isExpanded && (
//                 <span className={`text-[15px] whitespace-nowrap tracking-tight transition-all ${
//                   isActive ? "font-black" : "font-bold"
//                 }`}>
//                   {item.name}
//                 </span>
//               )}
              
//               {/* Tooltip khi thu nhỏ */}
//               {!isExpanded && (
//                 <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[12px] font-black rounded-xl opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-2xl transition-all uppercase tracking-widest">
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
  LayoutDashboard, Package, Layers, Users, 
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
    { name: 'Danh mục', href: '/admin/categories', icon: Layers, color: 'text-amber-500' },
    { name: 'Hóa đơn nhập', href: '/admin/incoming-invoices', icon: FileText, color: 'text-indigo-500' },
    { name: 'Khách hàng', href: '/admin/customers', icon: Users, color: 'text-cyan-500' },
    { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingBag, color: 'text-rose-500' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-slate-100 border-r border-slate-200 transition-all duration-300 z-50 ${isExpanded ? "w-[280px]" : "w-[80px]"} shadow-sm`}>
      {/* Nút đóng/mở Sidebar */}
      <button 
        type="button"
        onClick={() => setIsExpanded(!isExpanded)} 
        className="absolute -right-3 top-12 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:text-indigo-600 transition-all z-[60]"
      >
        {isExpanded ? <ChevronLeft size={16} strokeWidth={3} /> : <ChevronRight size={16} strokeWidth={3} />}
      </button>

      {/* Logo Area: Sử dụng nền trắng để nổi bật trên Sidebar xám */}
      <div className="p-6 mb-4 flex justify-center">
        <div className={`bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center transition-all duration-500 ${isExpanded ? "w-full h-16" : "w-12 h-12"}`}>
           <span className={`font-black text-slate-900 tracking-tighter transition-all ${isExpanded ? "text-2xl" : "text-sm"}`}>
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
              className={`flex items-center gap-4 p-4 transition-all duration-200 group relative rounded-2xl ${
                isActive 
                ? "bg-white text-slate-950 shadow-md border border-slate-200/50" // "Cái bao" trắng nổi bật trên nền xám
                : "text-slate-600 hover:bg-slate-200/60"
              } ${!isExpanded && "justify-center"}`}
            >
              {/* Icon */}
              <item.icon 
                size={24} 
                strokeWidth={isActive ? 2.8 : 2} 
                className={`${isActive ? item.color : "text-slate-500 group-hover:text-slate-700"}`} 
              />
              
              {/* Chữ: Font-Black khi Active */}
              {isExpanded && (
                <span className={`text-[15px] whitespace-nowrap tracking-tight transition-all ${
                  isActive ? "font-black" : "font-bold"
                }`}>
                  {item.name}
                </span>
              )}
              
              {/* Tooltip khi thu nhỏ */}
              {!isExpanded && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[12px] font-black rounded-xl opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-2xl transition-all uppercase tracking-widest">
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