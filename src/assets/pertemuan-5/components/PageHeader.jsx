export default function PageHeader({ title = "Dashboard", breadcrumb = "Dashboard", children }) {
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : ["Dashboard", breadcrumb];

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <span className="text-3xl font-semibold">{title}</span>
        <div className="flex items-center space-x-2 mt-2 text-gray-500 text-sm">
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center space-x-2">
              {i > 0 && <span className="mx-1">/</span>}
              <span className={i === crumbs.length - 1 ? "text-gray-800 font-semibold" : ""}>
                {crumb}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
