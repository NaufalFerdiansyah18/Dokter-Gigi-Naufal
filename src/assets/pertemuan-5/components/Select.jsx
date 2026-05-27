/**
 * Select Component
 * Props:
 *  - label: string
 *  - options: Array<{ value, label }> | Array<string>
 *  - placeholder: string
 *  - error: string
 *  - hint: string
 *  - disabled: boolean
 *  - fullWidth: boolean
 */

import { FaChevronDown } from "react-icons/fa";

export default function Select({
  label,
  options = [],
  placeholder = "Pilih...",
  error,
  hint,
  disabled = false,
  fullWidth = true,
  className = "",
  id,
  ...props
}) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          className={`
            w-full appearance-none border rounded-xl px-4 py-2.5 pr-10
            text-sm text-gray-700 outline-none transition-all
            ${error
              ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200"
              : "border-gray-200 focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E]/20"
            }
            ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white cursor-pointer"}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {normalizedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
      </div>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
