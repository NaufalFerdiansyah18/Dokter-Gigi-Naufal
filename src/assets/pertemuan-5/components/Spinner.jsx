/**
 * Spinner Component
 * Props:
 *  - size: "xs" | "sm" | "md" | "lg"
 *  - color: "teal" | "white" | "gray" | "blue"
 *  - label: string — teks di bawah spinner (opsional)
 *  - fullPage: boolean — center di tengah layar
 */

const SIZES = {
  xs: "w-4 h-4 border-2",
  sm: "w-6 h-6 border-2",
  md: "w-9 h-9 border-[3px]",
  lg: "w-14 h-14 border-4",
};

const COLORS = {
  teal:  "border-[#1A7C6E]/20 border-t-[#1A7C6E]",
  white: "border-white/30 border-t-white",
  gray:  "border-gray-200 border-t-gray-500",
  blue:  "border-blue-100 border-t-blue-500",
};

export default function Spinner({
  size = "md",
  color = "teal",
  label,
  fullPage = false,
  className = "",
}) {
  const spinner = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className={`
          rounded-full animate-spin
          ${SIZES[size]} ${COLORS[color]}
        `}
      />
      {label && (
        <p className="text-sm text-gray-400 font-medium">{label}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
