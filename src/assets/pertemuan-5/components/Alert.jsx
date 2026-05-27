/**
 * Alert Component
 * Props:
 *  - variant: "success" | "warning" | "danger" | "info" | "teal"
 *  - title: string
 *  - icon: React node (opsional, default sesuai variant)
 *  - dismissible: boolean
 *  - onDismiss: () => void
 */

import { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
  FaTimes,
  FaTooth,
} from "react-icons/fa";

const VARIANTS = {
  success: {
    wrapper: "bg-green-50 border-green-200 text-green-800",
    icon:    <FaCheckCircle className="text-green-500 text-base shrink-0" />,
  },
  warning: {
    wrapper: "bg-yellow-50 border-yellow-200 text-yellow-800",
    icon:    <FaExclamationTriangle className="text-yellow-500 text-base shrink-0" />,
  },
  danger: {
    wrapper: "bg-red-50 border-red-200 text-red-800",
    icon:    <FaTimesCircle className="text-red-500 text-base shrink-0" />,
  },
  info: {
    wrapper: "bg-blue-50 border-blue-200 text-blue-800",
    icon:    <FaInfoCircle className="text-blue-500 text-base shrink-0" />,
  },
  teal: {
    wrapper: "bg-[#E8F8F6] border-[#c5ede9] text-[#1A7C6E]",
    icon:    <FaTooth className="text-[#1A7C6E] text-base shrink-0" />,
  },
};

export default function Alert({
  variant = "info",
  title,
  children,
  icon,
  dismissible = false,
  onDismiss,
  className = "",
}) {
  const [visible, setVisible] = useState(true);
  const v = VARIANTS[variant];

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 px-4 py-3.5 rounded-xl border
        ${v.wrapper} ${className}
      `}
    >
      {icon ?? v.icon}

      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-bold text-sm mb-0.5">{title}</p>
        )}
        {children && (
          <p className="text-sm leading-relaxed opacity-90">{children}</p>
        )}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Tutup"
        >
          <FaTimes className="text-sm" />
        </button>
      )}
    </div>
  );
}
