/**
 * AvatarGroup Component — kumpulan avatar yang overlap
 * Props:
 *  - avatars: Array<{ src?, name, color? }>
 *  - max: number — maksimal avatar yang ditampilkan
 *  - size: "sm" | "md" | "lg"
 */

import Avatar from "./Avatar";

const SIZES = {
  sm: { avatar: "sm", overlap: "-ml-2" },
  md: { avatar: "md", overlap: "-ml-3" },
  lg: { avatar: "lg", overlap: "-ml-4" },
};

const EXTRA_SIZE = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
};

export default function AvatarGroup({
  avatars = [],
  max = 4,
  size = "md",
  className = "",
}) {
  const s = SIZES[size];
  const visible = avatars.slice(0, max);
  const extra   = avatars.length - max;

  return (
    <div className={`flex items-center ${className}`}>
      {visible.map((av, idx) => (
        <div
          key={idx}
          className={`${idx > 0 ? s.overlap : ""} ring-2 ring-white rounded-full`}
        >
          <Avatar
            src={av.src}
            name={av.name}
            size={s.avatar}
            color={av.color}
          />
        </div>
      ))}

      {extra > 0 && (
        <div
          className={`
            ${s.overlap} ring-2 ring-white rounded-full
            ${EXTRA_SIZE[size]}
            bg-gray-100 text-gray-500 font-bold
            flex items-center justify-center
          `}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
