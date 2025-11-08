import { Link, useLocation } from "react-router-dom";

interface BreadCrumbItem {
  label: string;
  path?: string;
}

export function BreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbMap: { [key: string]: string } = {
    main: "Главная",
    projects: "Проекты",
    project: "Проект",
  };

  const breadcrumbs: BreadCrumbItem[] = [{ label: "Главная", path: "/" }];

  pathnames.forEach((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join("/")}`;
    const label = breadcrumbMap[value] || value;

    if (index === pathnames.length - 1) {
      breadcrumbs.push({ label });
    } else {
      breadcrumbs.push({ label, path });
    }
  });

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.label} className="flex items-center space-x-2">
              {index > 0 && <span className="text-gray-500">/</span>}
              {breadcrumb.path ? (
                <Link
                  to={breadcrumb.path}
                  className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="text-white font-medium">
                  {breadcrumb.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
