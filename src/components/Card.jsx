import { Link } from "react-router-dom";

export default function Card({ title, description, path, children }) {
  return (
    <Link
      to={path}
      className="
        text-center
        p-4
        rounded-2xl
        bg-indigo-100
        hover:bg-indigo-300
        shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-4 text-gray-900">{description}</p>
      {children}
    </Link>
  );
}
