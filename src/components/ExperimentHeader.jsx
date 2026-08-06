export default function ExperimentHeader({ title, description }) {
  return (
    <section className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </section>
  );
}
