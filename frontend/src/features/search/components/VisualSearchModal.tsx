// import React from 'react';
// import { Upload, X, Image as ImageIcon } from 'lucide-react';

// interface Props {
//     isOpen: boolean;
//     isDragging: boolean;
//     isLoading: boolean;
//     onClose: () => void;
//     onDrop: (e: React.DragEvent) => void;
//     onDragOver: (e: React.DragEvent) => void;
//     onDragLeave: () => void;
//     onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     fileInputRef: React.RefObject<HTMLInputElement>;
// }

// export const VisualSearchModal: React.FC<Props> = ({
//     isOpen, isDragging, isLoading, onClose, onDrop, onDragOver, onDragLeave, onFileSelect, fileInputRef
// }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
//             <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
//                     <h3 className="text-lg font-bold text-amber-500 tracking-wide">Tìm kiếm bằng hình ảnh</h3>
//                     <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
//                         <X size={20} />
//                     </button>
//                 </div>

//                 {/* Body (Dropzone) */}
//                 <div className="p-8">
//                     <div
//                         onDragOver={onDragOver}
//                         onDragLeave={onDragLeave}
//                         onDrop={onDrop}
//                         onClick={() => fileInputRef.current?.click()}
//                         className={`
//                             relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer
//                             ${isDragging ? 'border-amber-500 bg-amber-500/10 scale-[1.02]' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}
//                             ${isLoading ? 'pointer-events-none opacity-50' : ''}
//                         `}
//                     >
//                         <input type="file" ref={fileInputRef} onChange={onFileSelect} accept="image/*" className="hidden" />

//                         <div className={`p-4 rounded-full mb-4 ${isDragging ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-amber-500'}`}>
//                             {isLoading ? <ImageIcon size={32} className="animate-pulse" /> : <Upload size={32} />}
//                         </div>

//                         <p className="text-white font-bold text-center mb-1">
//                             {isLoading ? "Đang xử lý ảnh..." : "Kéo thả ảnh vào đây hoặc nhấp để tải lên"}
//                         </p>
//                         <p className="text-slate-400 text-xs text-center">Hỗ trợ định dạng: JPG, PNG, WEBP</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };



"use client";

import React from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface VisualSearchModalProps {
    isOpen: boolean;
    isDragging: boolean;
    isVisualLoading: boolean;
    onClose: () => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent) => void;
    onCameraClick: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const VisualSearchModal: React.FC<VisualSearchModalProps> = ({
    isOpen,
    isDragging,
    isVisualLoading,
    onClose,
    onDragOver,
    onDragLeave,
    onDrop,
    onCameraClick,
    onFileChange,
    fileInputRef
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-hidden">
            <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">

                {/* Header Modal - Nền trắng sáng */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-amber-600 tracking-wide uppercase text-[11px]">Tìm kiếm bằng hình ảnh</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Vùng Dropzone */}
                <div className="p-8">
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={onCameraClick}
                        className={`
              relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer
              ${isDragging ? 'border-amber-500 bg-amber-50 scale-[1.02]' : 'border-slate-200 hover:border-amber-400 bg-slate-50'}
              ${isVisualLoading ? 'pointer-events-none opacity-50 shadow-inner' : ''}
            `}
                    >
                        {/* Input file thực tế (ẩn) */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onFileChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className={`p-5 rounded-full mb-4 shadow-sm transition-colors ${isDragging ? 'bg-amber-500 text-white' : 'bg-white border border-slate-100 text-amber-500'}`}>
                            {isVisualLoading ? (
                                <ImageIcon size={32} className="animate-pulse text-amber-600" />
                            ) : (
                                <Upload size={32} strokeWidth={2.5} />
                            )}
                        </div>

                        <p className="text-slate-800 font-bold text-center mb-1 text-sm">
                            {isVisualLoading ? "Đang phân tích ảnh..." : "Kéo thả ảnh vào đây"}
                        </p>
                        <p className="text-slate-500 text-[11px] text-center font-medium font-sans">hoặc nhấp để chọn file từ máy tính</p>

                        {/* Hiệu ứng loading chạy ngang */}
                        {isVisualLoading && (
                            <div className="absolute bottom-0 left-0 h-1 bg-amber-500 animate-progress w-full" />
                        )}
                    </div>
                </div>

                {/* Footer - Chữ xám thanh lịch */}
                <div className="px-8 py-4 bg-slate-50/80 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-medium italic font-sans leading-relaxed px-4">
                        Hệ thống AI sẽ tự động phân tích và tìm các mẫu đèn nội thất tương đồng nhất từ thư viện Stellar Lights
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VisualSearchModal;