import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { getPosts } from "../api/posts";
import { useEffect, useState } from "react";
import Guide from "../components/Guide";
import Layout from "../components/Layout";
import ExperimentHeader from "../components/ExperimentHeader";

export default function StaleTimeExperiment() {
  const zeroQueryKey = ["posts", "stale-0"];
  const fiveQueryKey = ["posts", "stale-5"];
  const [now, setNow] = useState(Date.now);

  // staleTime = 0
  const {
    data: staleTimeZero,
    isLoading: zeroLoading,
    isFetching: zeroFetching,
    isStale: zeroStale,
    dataUpdatedAt: zeroUpdatedAt,
  } = useQuery({
    queryKey: zeroQueryKey,
    queryFn: getPosts,
    staleTime: 0,
  });

  console.log(staleTimeZero);

  // staleTime = 5000
  const {
    data: staleTimeFive,
    isLoading: fiveLoading,
    isFetching: fiveFetching,
    isStale: fiveStale,
    dataUpdatedAt: fiveUpdatedAt,
  } = useQuery({
    queryKey: fiveQueryKey,
    queryFn: getPosts,
    staleTime: 5000,
  });

  // stale 상태 출력 함수
  function getStatus(isStale) {
    return (
      <span
        className={`p-1 rounded-md ${isStale ? "bg-orange-100 text-orange-500" : "bg-green-100 text-green-500"}`}>
        {isStale ? "🟠 Stale" : "🟢 Fresh"}
      </span>
    );
  }
  // 시간 포맷 함수
  function formatDate(timestamp) {
    if (!timestamp) return "-";

    return new Date(timestamp).toLocaleTimeString();
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  });

  function getLeftTime(updatedAt, staleTime) {
    if (!updatedAt) return "-";

    const remaining = updatedAt + staleTime - now;

    return Math.max(Math.floor(remaining / 1000), 0);
  }

  return (
    <>
      <Header />
      <Layout>
        <ExperimentHeader
          title={`staleTime Experiment`}
          description={`Fresh Stale 상태 변화 확인`}
        />

        {/* report */}
        <section className="grid grid-cols-2 gap-2 text-gray-900 font-mono">
          {/* staleTime: 0 */}
          <div className="px-6 py-4 bg-indigo-50">
            <h2 className="mb-4 text-xl font-semibold">staleTime: 0ms</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Query Key</span>
                <span>{JSON.stringify(zeroQueryKey)}</span>
              </div>
              <div className="flex justify-between">
                <span>Data Stale</span>
                <span>{getStatus(zeroStale)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fresh Time Left</span>
                <span>{getLeftTime(zeroUpdatedAt, 0)}s</span>
              </div>
              <div className="flex justify-between">
                <span>Fetching</span>
                <span>{JSON.stringify(zeroFetching)}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated At</span>
                <span>{formatDate(zeroUpdatedAt)}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-2">Posts</h3>
                {staleTimeZero?.map((post) => (
                  <div
                    key={post.id}
                    className="px-4 py-2 rounded-lg bg-indigo-200">
                    {post.title}
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">특징</h3>
                <ul className="text-sm space-y-2">
                  <li>데이터를 받은 직후 부터 stale 상태로 간주합니다.</li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
          {/* staleTime: 5 */}
          <div className="px-6 py-4 bg-indigo-100">
            <h2 className="mb-4 text-xl font-semibold">staleTime: 5</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Query Key</span>
                <span>{JSON.stringify(fiveQueryKey)}</span>
              </div>
              <div className="flex justify-between">
                <span>Data Stale</span>
                <span>{getStatus(fiveStale)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fresh Time Left</span>
                <span>{getLeftTime(fiveUpdatedAt, 5000)}s</span>
              </div>
              <div className="flex justify-between">
                <span>Fetching</span>
                <span>{JSON.stringify(fiveFetching)}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated At</span>
                <span>{formatDate(fiveUpdatedAt)}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-2">Posts</h3>
                {staleTimeFive?.map((post) => (
                  <div key={post.id} className="px-4 py-2 rounded-lg bg-white">
                    {post.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Guide title={`staleTime Experiment Guide`}>
          <ol className="space-y-2">
            <li>staleTime: 0 의 Data Stale을 확인합니다.</li>
            <li>staleTime: 5 의 Data Stale과 Fresh Time Left를 확인합니다.</li>
            <li>
              staleTime: 5 의 Fresh Time Left가 0이 되기 전 DashBoard로
              이동합니다.
            </li>
            <li>
              다시 staleTime 페이지로 돌아와 두 개의 Updated At 을 비교합니다.
            </li>
          </ol>
        </Guide>
        <Guide title={`staleTime Features`}>
          <ol className="space-y-2">
            <li>
              staleTime은 데이터가 stale 상태로 간주되는 기간을 지정합니다.
            </li>
            <li>
              Fresh 상태에서는 캐시 데이터를 사용하여 네트워크 요청을 최소화하고
              사용자 경험을 개선할 수 있습니다.
            </li>
          </ol>
        </Guide>
      </Layout>
    </>
  );
}
