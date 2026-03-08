// src/components/ui/StatusBadge.tsx
export const StatusBadge = ({ status }: { status: number }) => {
  const isActive = status === 1;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
      isActive 
        ? "bg-green-100 text-green-600" 
        : "bg-red-100 text-red-600"
    }`}>
      {isActive ? "● Hoạt động" : "● Bị chặn"}
    </span>
  );
};