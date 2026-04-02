import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'success' | 'outline' | 'danger';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = ({
    children,
    variant = 'primary',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {

    // Định nghĩa style cho từng loại nút
    const variants = {
        primary: 'bg-[#5842f4] text-white shadow-[0_8px_20px_rgba(88,66,244,0.3)] hover:bg-[#4732d9]',
        success: 'bg-emerald-500 text-white shadow-emerald-100 hover:bg-emerald-600',
        outline: 'border border-slate-200 text-slate-500 hover:bg-slate-50',
        danger: 'bg-red-500 text-white shadow-red-100 hover:bg-red-600',
    };

    const baseStyles = "h-12 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg";

    return (
        <button
            disabled={isLoading || disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <Loader2 size={16} className="animate-spin mr-2" />
            ) : (
                leftIcon && <span className="mr-2">{leftIcon}</span>
            )}

            {children}

            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};