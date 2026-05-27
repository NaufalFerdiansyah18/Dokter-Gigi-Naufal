/**
 * Input Component
 * Props:
 *  - label: string
 *  - placeholder: string
 *  - type: string (default "text")
 *  - leftIcon, rightIcon: React node
 *  - error: string — pesan error
 *  - hint: string — pesan bantuan
 *  - disabled: boolean
 *  - fullWidth: boolean
 */

export default function Input({
  label,
  placeholder,
  type = "text",
  leftIcon,
  rightIcon,
  error,
  hint,
  disabled = false,
  fullWidth = true,
  className = "",
  id,
  ...props
}) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-gray-400 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full border rounded-xl px-4 py-2.5 text-sm text-gray-700
            placeholder:text-gray-300 outline-none transition-all
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${error
              ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200"
              : "border-gray-200 focus:border-[#1A7C6E] focus:ring-1 focus:ring-[#1A7C6E]/20"
            }
            ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"}
          `}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 text-gray-400 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
      {!error && hint && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
    </div>
  );
}
