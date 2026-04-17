export const AdminPageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl  shadow-sm border border-slate-50 p-10 min-h-[800px]">
    {children}
  </div>
);

// export const AdminPageHeader = ({ title, children }: { title: React.ReactNode, children?: React.ReactNode }) => (
//   <div className="flex justify-between items-center mb-8">
//     <h1 className="text-2xl font-black text-[#001529] tracking-tight ">
//       {title}
//     </h1>
//     {children}
//   </div>
// );

// frontend/src/components/layout/AdminPageContainer.tsx

export const AdminPageHeader = ({
  title,
  icon, // Thêm prop icon mới
  colorClass = "text-indigo-500", // Màu mặc định
  bgColorClass = "bg-indigo-50", // Nền mặc định
  children
}: {
  title: React.ReactNode,
  icon?: React.ReactNode,
  colorClass?: string,
  bgColorClass?: string,
  children?: React.ReactNode
}) => (
  <div className="flex justify-between items-center mb-8">
    <div className="flex items-center gap-3">
      {/* Nếu có truyền icon thì mới hiển thị Box Icon */}
      {icon && (
        <div className={`w-10 h-10 ${bgColorClass} ${colorClass} rounded-xl  flex items-center justify-center shadow-sm border border-current/10 flex-shrink-0`}>
          {icon}
        </div>
      )}
      <h1 className="text-[22px] font-black text-[#001529] tracking-tight uppercase leading-none">
        {title}
      </h1>
    </div>
    {children}
  </div>
);

export const AdminInnerBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border-2 border-dashed border-slate-100 rounded-xl p-6 min-h-[500px]">
    {children}
  </div>
);