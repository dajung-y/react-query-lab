// import Card from "../components/Card";

// export default function DashBoard() {
//   // Experiments
//   const experiments = [
//     {
//       number: "01",
//       title: "Cache",
//       description:
//         "React Query의 캐싱 동작 방식과 데이터 재사용하는 과정을 확인합니다.",
//       path: "/cache",
//     },
//     {
//       number: "02",
//       title: "StaleTime",
//       description: "staleTime에 따른 Fresh와 Stale 상태의 변화를 확인합니다.",
//       path: "/stale-time",
//     },
//     {
//       number: "03",
//       title: "Mutation",
//       description: "데이터 변경 후 Query가 갱신되는 과정을 확인합니다.",
//       path: "/mutation",
//     },
//   ];

//   return (
//     <div className="min-h-screen px-6 py-10">
//       <div className="mx-auto max-w-6xl">
//         {/* Header */}
//         <header className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900">React Query Lab</h1>
//           <p className="mt-4 text-lg text-gray-900">
//             React Query의 주요 기능을 실험하고 동작 방식을 시각화하는 프로젝트
//             입니다
//           </p>
//         </header>
//       </div>

//       {/* Cards */}
//       <div className="p-4 grid gap-4 grid-cols-3">
//         {experiments.map((item) => (
//           <Card
//             key={item.title}
//             title={item.title}
//             description={item.description}
//             path={item.path}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import Card from "../components/Card";

export default function DashBoard() {
  const experiments = [
    {
      number: "01",
      title: "Cache",
      description:
        "React Query의 캐싱 동작 방식과 데이터를 재사용하는 과정을 확인합니다.",
      path: "/cache",
    },
    {
      number: "02",
      title: "StaleTime",
      description: "staleTime에 따른 Fresh와 Stale 상태의 변화를 비교합니다.",
      path: "/stale-time",
    },
    {
      number: "03",
      title: "Mutation",
      description: "데이터 변경 후 Query가 갱신되는 과정을 확인합니다.",
      path: "/mutation",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">React Query Lab</h1>
          <p className="mt-4 leading-7 text-gray-600">
            React Query의 주요 기능을 직접 실험하고
            <br />
            동작을 시각적으로 확인하는 실험 공간입니다.
          </p>
        </header>
        {/* experiment header */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Experiments
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              Choose an experiment
            </h2>
          </div>
          <span className="text-sm text-gray-400">
            {experiments.length} experiments
          </span>
        </div>
        {/* card */}
        <div className="grid gap-4 md:grid-cols-3">
          {experiments.map((item) => (
            <Card
              key={item.title}
              number={item.number}
              title={item.title}
              description={item.description}
              path={item.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
