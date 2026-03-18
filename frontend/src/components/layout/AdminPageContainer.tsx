export const AdminPageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 p-10 min-h-[800px]">
    {children}
  </div>
);

export const AdminPageHeader = ({ title, children }: { title: React.ReactNode, children?: React.ReactNode }) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-black text-[#001529] tracking-tight ">
      {title}
    </h1>
    {children}
  </div>
);

export const AdminInnerBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-6 min-h-[500px]">
    {children}
  </div>
);