/**
 * Tooltip Component
 * Props:
 *  - content: string | React node — isi tooltip
 *  - position: "top" | "bottom" | "left" | "right"
 *  - children: React node — elemen yang di-hover
 */

const POSITIONS = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full top-1/2 -translate-y-1/2 mr-2",
  right:  "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROWS = {
  top:    "top-full left-1/2 -translate-x-1/2 border-t-gray-800 border-x-transparent border-b-transparent border-4",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 border-x-transparent border-t-transparent border-4",
  left:   "left-full top-1/2 -translate-y-1/2 border-l-gray-800 border-y-transparent border-r-transparent border-4",
  right:  "right-full top-1/2 -translate-y-1/2 border-r-gray-800 border-y-transparent border-l-transparent border-4",
};

export default function Tooltip({
  content,
  position = "top",
  children,
  className = "",
}) {
  return (
    <div className={`relative inline-flex group ${className}`}>
      {children}

      {/* Tooltip bubble */}
      <div
        className={`
          absolute z-50 pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          ${POSITIONS[position]}
        `}
      >
        <div className="relative bg-gray-800 text-white text-xs font-medium
          px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          {content}
          {/* Arrow */}
          <span className={`absolute border ${ARROWS[position]}`} />
        </div>
      </div>
    </div>
  );
}
