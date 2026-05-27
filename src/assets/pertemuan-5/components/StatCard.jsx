  /**
 * StatCard Component — kartu statistik dengan icon, angka, dan trend
 * Props:
 *  - title: string
 *  - value: string | number
 *  - icon: React node
 *  - iconBg: string — Tailwind class warna bg icon (default teal)
 *  - iconColor: string — Tailwind class warna icon
 *  - trend: number — persentase perubahan (positif/negatif)
 *  - trendLabel: string — label di samping trend
 *  - footer: React node
 */

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function StatCard({
  title,
  value,
  icon,
  iconBg = "bg-[#E8F8F6]",
  iconColor = "text-[#1A7C6E]",
  trend,
  trendLabel,
  footer,
  className = "",
}) {
  const isPositive = trend >= 0;

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100
        p-6 flex items-center gap-5
        hover:shadow-md transition-shadow
        ${className}
      `}
    >
      {/* Icon */}
      <div
        className={`
          w-14 h-14 rounded-full flex items-center justify-center
          text-xl shrink-0 ${iconBg} ${iconColor}
        `}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 truncate">
          {title}
        </p>
        <h3 className="text-2xl font-black text-gray-800 leading-tight">
          {value}
        </h3>

        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            <span
              className={`flex items-center gap-0.5 text-xs font-bold ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
              {Math.abs(trend)}%
            </span>
            {trendLabel && (
              <span className="text-xs text-gray-400">{trendLabel}</span>
            )}
          </div>
        )}

        {footer && <div className="mt-1">{footer}</div>}
      </div>
    </div>
  );
}
