/**
 * Dropdown Component
 * Props:
 *  - trigger: React node — elemen pemicu dropdown
 *  - items: Array<{ label, icon?, onClick?, divider?, disabled? }>
 *  - align: "left" | "right"
 *  - width: string — Tailwind width class (default "w-48")
 */

import { useState, useRef, useEffect } from "react";

export default function Dropdown({
  trigger,
  items = [],
  align = "right",
  width = "w-48",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div
          className={`
            absolute z-50 mt-2 ${width} bg-white rounded-xl shadow-lg
            border border-gray-100 py-1 overflow-hidden
            ${align === "right" ? "right-0" : "left-0"}
            animate-[fadeInScale_0.15s_ease]
          `}
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return <div key={idx} className="my-1 border-t border-gray-100" />;
            }
            return (
              <button
                key={idx}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    setOpen(false);
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
                  transition-colors
                  ${item.disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#1A7C6E] cursor-pointer"
                  }
                  ${item.danger ? "!text-red-500 hover:!bg-red-50 hover:!text-red-600" : ""}
                `}
              >
                {item.icon && (
                  <span className="text-base shrink-0">{item.icon}</span>
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(-4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
