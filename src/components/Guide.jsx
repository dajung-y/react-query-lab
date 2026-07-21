export default function Guide({ title, children }) {
  return (
    <section className="my-8 rounded-lg bg-gray-200 px-6 py-4">
      <h1 className="mb-4 text-lg text-gray-900 font-mono font-semibold">
        {title}
      </h1>
      <div className="text-sm text-gray-900 font-mono">{children}</div>
    </section>
  );
}
