import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const nav = [
    {
      title: "Cache",
      path: "/cache",
    },
    {
      title: "staleTime",
      path: "/stale-time",
    },
    {
      title: "Mutation",
      path: "/mutation",
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* header */}
      <div className="mx-auto max-w-6xl items-center justify-between px-4 pb-4">
        <Link
          to={"/"}
          className="
            inline-block
            py-4
            text-xl
            font-bold
            text-indigo-900
          ">
          React Query Lab
        </Link>
        {/* nav bar */}
        <nav className="flex gap-4">
          {nav.map((item) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `border-b text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-indigo-800 text-indigo-800"
                    : "border-transparent text-gray-600 hover:text-indigo-800"
                }`
              }>
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
