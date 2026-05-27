/**
 * Badge Component
 * Props:
 *  - variant: "success" | "warning" | "danger" | "info" | "default" | "teal"
 *  - size: "sm" | "md"
 *  - dot: boolean — tampilkan dot indicator
 *  - rounded: "full" | "md"
 */

const VARIANTS = {
  success: "bg-green-50 text-green-700 border border-green-100",
  warning: "bg-yellow-50 text-yellow-700 border border-yellow-100",
  danger:  "bg-red-50 text-red-600 border border-red-100",
  info:    "bg-blue-50 text-blue-700 border border-blue-100",
  default: "bg-gray-100 text-gray-600 border border-gray-200",
  teal:    "bg-[#E8F8F6] text-[#1A7C6E] border border-[#c5ede9]",
  purple:  "bg-purple-50 text-purple-700 border border-purple-100",
};

const DOT_COLORS = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger:  "bg-red-500",
  info:    "bg-blue-500",
  default: "bg-gray-400",
  teal:    "bg-[#1A7C6E]",
  purple:  "bg-purple-500",
};

const SIZES = {
  sm: "px-2 py-0.5 text-[10px] gap-1",
  md: "px-3 py-1 text-xs gap-1.5",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  rounded = "full",
  className = "",
}) {
  return (
    <span
      className={`
        inline-flex items-center font-bold
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${rounded === "full" ? "rounded-full" : "rounded-md"}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_COLORS[variant]}`}
        />
      )}
      {children}
    </span>
  );
}
