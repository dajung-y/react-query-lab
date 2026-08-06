import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getPosts } from "../api/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRequestCount,
  increaseQueryCount,
  increaseVanillaCount,
} from "../api/requestCounter";
import Guide from "../components/Guide";
import Layout from "../components/Layout";
import ExperimentHeader from "../components/ExperimentHeader";

export default function CacheExperiment() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requsetCount, setRequestCount] = useState({
    vanillaCount: 0,
    queryCount: 0,
  });

  const queryClient = useQueryClient();
  const cache = queryClient.getQueryData(["posts"]);
  const postsQueryKey = ["posts"];
  // Vailla
  async function fetchPosts() {
    setLoading(true);
    increaseVanillaCount();
    setRequestCount(getRequestCount());

    try {
      const data = await getPosts();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // react query
  const {
    data: queryPosts,
    isLoading: queryLoading,
    isSuccess,
  } = useQuery({
    queryKey: postsQueryKey,
    queryFn: async () => {
      increaseQueryCount();
      setRequestCount(getRequestCount());
      return getPosts();
    },
    staleTime: Infinity,
  });

  return (
    <>
      <Header />
      <Layout>
        <ExperimentHeader
          title={`Cache Experiment`}
          description={`React Query Cache 동작 비교`}
        />
        {/* report */}
        <section className="grid grid-cols-2 gap-2 text-gray-900 font-mono">
          {/* Vanilla */}
          <div className="px-6 py-4 bg-gray-200">
            <h2 className="mb-4 text-xl font-mono">Vanilla</h2>
            {/* api 정보 */}
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Network Request Count</span>
                <span>{requsetCount.vanillaCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span>{loading ? "Loading..." : "Success"}</span>
              </div>
              <div className="flex justify-between">
                <span>Cache</span>
                <span>NONE</span>
              </div>
            </div>
            {/* posts */}
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-semibold mb-2">Posts</h3>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="px-4 py-2 rounded-lg bg-indigo-200">
                  {post.title}
                </div>
              ))}
            </div>
            {/* description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">특징</h3>
              <ul className="text-sm space-y-2">
                <li>컴포넌트가 마운트 될 때마다 API를 요청합니다.</li>
                <li>별도의 캐시를 사용하지 않습니다.</li>
              </ul>
            </div>
          </div>

          {/* React Query */}
          <div className="px-6 py-4 bg-gray-50">
            <h2 className="mb-4 text-xl font-mono">React Query</h2>
            {/* api 정보*/}
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Network Request Count</span>
                <span>{requsetCount.queryCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span>{queryLoading ? "Loading..." : "Success"}</span>
              </div>
              <div className="flex justify-between">
                <span>Cache</span>
                <span className={cache ? "text-green-600" : "text-red-600"}>
                  {cache ? "HIT" : "MISS"}
                </span>
              </div>
            </div>
            {/* posts */}
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-semibold mb-2">Posts</h3>
              <div className="flex justify-between">
                <span>Query key</span>
                <span>{JSON.stringify(postsQueryKey)}</span>
              </div>
              {queryPosts?.map((post) => (
                <div
                  key={post.id}
                  className="px-4 py-2 rounded-lg bg-indigo-200">
                  {post.title}
                </div>
              ))}
            </div>
            {/* description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">특징</h3>
              <ul className="text-sm space-y-2">
                <li>Query Key를 기준으로 데이터를 캐싱합니다.</li>
                <li>
                  Cache 데이터가 존재하면 재사용하여 불필요한 요청을 줄입니다.
                </li>
                <li>staleTime을 기준으로 데이터의 최신 상태를 관리합니다.</li>
              </ul>
            </div>
          </div>
        </section>
        <Guide title={`Cache Experiment Guied`}>
          <ol className="space-y-2">
            <li>Cache 페이지에서 초기값을 확인합니다.</li>
            <li>Dashboard로 이동합니다.</li>
            <li>다시 Cache 페이지로 이동합니다.</li>
            <li>Network Request Count와 Cache 상태를 확인합니다.</li>
          </ol>
        </Guide>
      </Layout>
    </>
  );
}
