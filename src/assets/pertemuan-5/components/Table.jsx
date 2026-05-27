/**
 * Table Component
 * Props:
 *  - columns: Array<{ key, label, align?: "left"|"center"|"right", render?: (value, row) => ReactNode }>
 *  - data: Array<object>
 *  - loading: boolean
 *  - emptyText: string
 *  - striped: boolean
 *  - hoverable: boolean
 */

const ALIGN = {
  left:   "text-left",
  center: "text-center",
  right:  "text-right",
};

function SkeletonRow({ cols }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-100 rounded-full animate-pulse" />
        </td>
      ))}
    </tr>
  );
}

export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyText = "Tidak ada data.",
  striped = false,
  hoverable = true,
  className = "",
}) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>
      <table className="w-full text-sm text-left">
        {/* Head */}
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`
                  px-6 py-3 text-[11px] font-bold text-gray-400
                  uppercase tracking-widest
                  ${ALIGN[col.align ?? "left"]}
                `}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-50">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} cols={columns.length} />
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-gray-400 text-sm"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row.id ?? rowIdx}
                className={`
                  transition-colors
                  ${hoverable ? "hover:bg-gray-50/60" : ""}
                  ${striped && rowIdx % 2 !== 0 ? "bg-gray-50/30" : ""}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 text-gray-700 ${ALIGN[col.align ?? "left"]}`}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : row[col.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
