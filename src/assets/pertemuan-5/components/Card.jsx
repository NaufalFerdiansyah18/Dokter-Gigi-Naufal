/**
 * Card Component
 * Props:
 *  - title: string
 *  - subtitle: string
 *  - headerAction: React node — tombol/link di kanan header
 *  - footer: React node
 *  - padding: "none" | "sm" | "md" | "lg"
 *  - shadow: "none" | "sm" | "md"
 *  - border: boolean
 *  - className: string
 */

const PADDING = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

const SHADOW = {
  none: "",
  sm:   "shadow-sm",
  md:   "shadow-md",
};

export default function Card({
  title,
  subtitle,
  headerAction,
  footer,
  children,
  padding = "md",
  shadow = "sm",
  border = true,
  className = "",
}) {
  const hasHeader = title || subtitle || headerAction;

  return (
    <div
      className={`
        bg-white rounded-2xl overflow-hidden
        ${SHADOW[shadow]}
        ${border ? "border border-gray-100" : ""}
        ${className}
      `}
    >
      {/* Header */}
      {hasHeader && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            {title && (
              <h3 className="text-base font-bold text-gray-800">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Body */}
      <div className={PADDING[padding]}>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          {footer}
        </div>
      )}
    </div>
  );
}
