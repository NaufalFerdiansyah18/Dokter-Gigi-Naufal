/**
 * ProgressBar Component
 * Props:
 *  - value: number — 0 sampai 100
 *  - label: string
 *  - showValue: boolean
 *  - color: "teal" | "blue" | "green" | "yellow" | "red" | "purple"
 *  - size: "sm" | "md" | "lg"
 *  - animated: boolean — animasi stripe
 */

const COLORS = {
  teal:   "bg-[#1A7C6E]",
  blue:   "bg-blue-500",
  green:  "bg-green-500",
  yellow: "bg-yellow-400",
  red:    "bg-red-500",
  purple: "bg-purple-500",
};

const SIZES = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export default function ProgressBar({
  value = 0,
  label,
  showValue = true,
  color = "teal",
  size = "md",
  animated = false,
  className = "",
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm font-semibold text-gray-700">{label}</span>
          )}
          {showValue && (
            <span className="text-xs font-bold text-gray-500">{clamped}%</span>
          )}
        </div>
      )}

      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${SIZES[size]}`}>
        <div
          className={`
            h-full rounded-full transition-all duration-500 ease-out
            ${COLORS[color]}
            ${animated ? "bg-[length:20px_20px] animate-[progress-stripe_1s_linear_infinite]" : ""}
          `}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
