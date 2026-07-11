import Card from "../components/Card";

export default function DashBoard() {
  // Experiments
  const experiments = [
    {
      title: "Cache",
      description: "React Query의 캐싱 동작 방식과 데이터 재사용 확인",
      path: "/cache",
    },
    {
      title: "StaleTime",
      description: "Fresh와 Stale 상태 변화 확인",
      path: "/stale-time",
    },
    {
      title: "Mutation",
      description: "데이터 변경 후 Query 갱신 과정 확인",
      path: "/mutation",
    },
  ];

  return (
    <div className="min-h-screen mt-4 mb-4">
      {/* Header */}
      <div className="text-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-gray-900">React Query Lab</h1>
        <p className="mt-4 text-lg text-gray-900">
          React Query의 주요 기능을 실험하고 동작 방식을 시각화하는 프로젝트
          입니다
        </p>
      </div>
      {/* Cards */}
      <div className="p-4 grid gap-4 grid-cols-3">
        {experiments.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            description={item.description}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}
