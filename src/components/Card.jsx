import { Link } from "react-router-dom";

export default function Card({ number, title, description, path, children }) {
  return (
    <Link
      to={path}
      className="
        group
        flex
        min-h-60
        flex-col
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-lg
      ">
      {/* number */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-indigo-600">{number}</span>
        <span
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-gray-100
            text-gray-400
            transition-colors
            group-hover:bg-indigo-100
            group-hover:text-indigo-600
          ">
          →
        </span>
      </div>
      {/* content */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
      </div>
      <div className="mt-auto pt-8">
        <span
          className="
            text-sm
            font-semibold
            text-gray-400
            transition-colors
            group-hover:text-indigo-600
          ">
          Open experiment →
        </span>
      </div>
      {children}
    </Link>
  );
}
