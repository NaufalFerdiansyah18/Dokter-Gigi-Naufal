/**
 * Button Component
 * Props:
 *  - variant: "primary" | "secondary" | "danger" | "ghost" | "outline"
 *  - size: "sm" | "md" | "lg"
 *  - leftIcon, rightIcon: React node
 *  - loading: boolean
 *  - disabled: boolean
 *  - fullWidth: boolean
 */

import { FaSpinner } from "react-icons/fa";

const VARIANTS = {
  primary:
    "bg-[#1A7C6E] text-white hover:bg-[#15675C] active:bg-[#115550] shadow-sm",
  secondary:
    "bg-[#E8F8F6] text-[#1A7C6E] hover:bg-[#d0f0ec] active:bg-[#b8e8e3]",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200",
  outline:
    "bg-transparent border border-[#1A7C6E] text-[#1A7C6E] hover:bg-[#E8F8F6] active:bg-[#d0f0ec]",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-200 select-none
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <FaSpinner className="animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
