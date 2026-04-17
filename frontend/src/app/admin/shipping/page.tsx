

// D:\webden\frontend\src\app\admin\shipping\page.tsx

// "use client";
// import React, { useState } from 'react';
// import { useShipping } from '@/features/shipping/useShipping';
// import { ShippingForm } from '@/features/shipping/components/ShippingForm';
// import { EditShippingModal } from '@/features/shipping/components/EditShippingModal';
// import { ShippingRuleList } from '@/features/shipping/components/ShippingRuleList';
// import { DeleteConfirmModal } from '@/features/shipping/components/DeleteConfirmModal';
// import { Trash2, Truck, ArrowRight } from 'lucide-react'; // Đổi ShieldCheck thành Truck

// export default function ShippingPage() {
//     const { rules, addRule, deleteRule, updateRule, isLoading } = useShipping();

//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [editingRule, setEditingRule] = useState<any>(null);

//     const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

//     const openEditModal = (rule: any) => {
//         setEditingRule(rule);
//         setIsEditModalOpen(true);
//     };

//     const handleUpdate = async (id: string, data: any) => {
//         await updateRule(id, data);
//         setIsEditModalOpen(false);
//     };

//     return (
//         <div className="min-h-screen bg-white">
//             <div className="max-w-6xl mx-auto bg-white rounded-xl  shadow-sm border border-slate-100 overflow-hidden min-h-[85vh] flex flex-col relative mt-8">

//                 <DeleteConfirmModal
//                     isOpen={isDeleteModalOpen}
//                     onClose={() => setIsDeleteModalOpen(false)}
//                     onConfirm={() => { deleteRule(selectedRuleId!); setIsDeleteModalOpen(false); }}
//                     message="Xóa vĩnh viễn cấu hình này?"
//                 />

//                 <EditShippingModal
//                     isOpen={isEditModalOpen}
//                     onClose={() => setIsEditModalOpen(false)}
//                     onUpdate={handleUpdate}
//                     initialData={editingRule}
//                 />

//                 {/* --- HEADER ĐÃ CẬP NHẬT --- */}
//                 <div className="p-8 pb-0">
//                     <div className="flex items-center gap-3">
//                         {/* Nền nhỏ gọn (w-10 h-10), bo góc xl, màu cam đồng bộ */}
//                         <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl  flex items-center justify-center shadow-sm border border-orange-100">
//                             <Truck size={22} strokeWidth={2.5} />
//                         </div>

//                         {/* Tiêu đề: Giữ nguyên size và độ đậm để đồng bộ */}
//                         <h1 className="text-[22px] font-black text-slate-900 uppercase tracking-tight leading-none">
//                             Cấu hình vận chuyển
//                         </h1>
//                     </div>
//                 </div>

//                 {/* Nội dung chính */}
//                 <div className="p-8 space-y-8 animate-in fade-in duration-500">
//                     <ShippingForm onAdd={addRule} />

//                     <ShippingRuleList
//                         rules={rules}
//                         isLoading={isLoading}
//                         formatPrice={formatPrice}
//                         onEdit={openEditModal}
//                         onDelete={(id) => { setSelectedRuleId(id); setIsDeleteModalOpen(true); }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// D:\webden\frontend\src\app\admin\shipping\page.tsx

"use client";
import React, { useState } from 'react';
import { useShipping } from '@/features/shipping/useShipping';
import { ShippingForm } from '@/features/shipping/components/ShippingForm';
import { EditShippingModal } from '@/features/shipping/components/EditShippingModal';
import { ShippingRuleList } from '@/features/shipping/components/ShippingRuleList';
import { DeleteConfirmModal } from '@/features/shipping/components/DeleteConfirmModal';
import { Truck } from 'lucide-react';

// Import 2 component layout chuẩn của hệ thống
import { AdminPageContainer, AdminPageHeader } from "@/components/layout/AdminPageContainer";

export default function ShippingPage() {
    const { rules, addRule, deleteRule, updateRule, isLoading } = useShipping();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState<any>(null);

    const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const openEditModal = (rule: any) => {
        setEditingRule(rule);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (id: string, data: any) => {
        await updateRule(id, data);
        setIsEditModalOpen(false);
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* 1. SỬ DỤNG CONTAINER CHUẨN (Giúp trang kéo dãn bằng Dashboard) */}
            <AdminPageContainer>

                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => { deleteRule(selectedRuleId!); setIsDeleteModalOpen(false); }}
                    message="Xóa vĩnh viễn cấu hình này?"
                />

                <EditShippingModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdate}
                    initialData={editingRule}
                />

                {/* 2. DÙNG ADMIN PAGE HEADER ĐÃ NÂNG CẤP (Gọn gàng và đồng bộ màu Cam) */}
                <AdminPageHeader
                    title="Cấu hình vận chuyển"
                    icon={<Truck size={22} strokeWidth={2.5} />}
                    colorClass="text-orange-500"
                    bgColorClass="bg-orange-50"
                />

                {/* 3. NỘI DUNG CHÍNH (Đã bỏ padding thừa vì Container đã có p-10) */}
                <div className="space-y-8 mt-2">
                    <ShippingForm onAdd={addRule} />

                    <ShippingRuleList
                        rules={rules}
                        isLoading={isLoading}
                        formatPrice={formatPrice}
                        onEdit={openEditModal}
                        onDelete={(id) => { setSelectedRuleId(id); setIsDeleteModalOpen(true); }}
                    />
                </div>
            </AdminPageContainer>
        </div>
    );
}