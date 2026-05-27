/**
 * Avatar Component
 * Props:
 *  - src: string — URL gambar
 *  - name: string — fallback initials jika src tidak ada
 *  - size: "xs" | "sm" | "md" | "lg" | "xl"
 *  - status: "online" | "offline" | "busy" | null
 *  - shape: "circle" | "square"
 *  - color: warna bg fallback (opsional, default teal)
 */

const SIZES = {
  xs: { wrapper: "w-6 h-6 text-[10px]", dot: "w-1.5 h-1.5 border" },
  sm: { wrapper: "w-8 h-8 text-xs",     dot: "w-2 h-2 border" },
  md: { wrapper: "w-10 h-10 text-sm",   dot: "w-2.5 h-2.5 border-2" },
  lg: { wrapper: "w-14 h-14 text-base", dot: "w-3 h-3 border-2" },
  xl: { wrapper: "w-20 h-20 text-xl",   dot: "w-3.5 h-3.5 border-2" },
};

const STATUS_COLORS = {
  online:  "bg-green-400",
  offline: "bg-gray-400",
  busy:    "bg-red-400",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Avatar({
  src,
  name = "",
  size = "md",
  status = null,
  shape = "circle",
  color = "bg-[#E8F8F6] text-[#1A7C6E]",
  className = "",
}) {
  const s = SIZES[size];
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-xl";

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${s.wrapper} ${shapeClass} object-cover border-2 border-white`}
        />
      ) : (
        <div
          className={`${s.wrapper} ${shapeClass} ${color} flex items-center justify-center font-bold border-2 border-white`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`
            absolute bottom-0 right-0 ${s.dot} rounded-full border-white
            ${STATUS_COLORS[status]}
          `}
        />
      )}
    </div>
  );
}
