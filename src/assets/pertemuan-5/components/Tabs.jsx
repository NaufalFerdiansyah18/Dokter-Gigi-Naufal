/**
 * Tabs Component
 * Props:
 *  - tabs: Array<{ key, label, icon?, badge? }>
 *  - activeKey: string
 *  - onChange: (key) => void
 *  - variant: "underline" | "pill"
 */

export default function Tabs({
  tabs = [],
  activeKey,
  onChange,
  variant = "underline",
  className = "",
}) {
  if (variant === "pill") {
    return (
      <div
        className={`flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit ${className}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange?.(tab.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
              transition-all duration-200
              ${activeKey === tab.key
                ? "bg-white text-[#1A7C6E] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={`
                  text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${activeKey === tab.key
                    ? "bg-[#E8F8F6] text-[#1A7C6E]"
                    : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Underline variant
  return (
    <div className={`flex items-center border-b border-gray-200 gap-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange?.(tab.key)}
          className={`
            flex items-center gap-2 px-4 py-3 text-sm font-semibold
            border-b-2 -mb-px transition-all duration-200
            ${activeKey === tab.key
              ? "border-[#1A7C6E] text-[#1A7C6E]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }
          `}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
          {tab.badge !== undefined && (
            <span
              className={`
                text-[10px] font-bold px-1.5 py-0.5 rounded-full
                ${activeKey === tab.key
                  ? "bg-[#E8F8F6] text-[#1A7C6E]"
                  : "bg-gray-100 text-gray-500"
                }
              `}
            >
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
