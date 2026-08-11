import { useState } from "react";
import Header from "../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts } from "../api/posts";
import Guide from "../components/Guide";
import Layout from "../components/Layout";
import ExperimentHeader from "../components/ExperimentHeader";

export default function MutationExperiment() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const mutation = useMutation({
    mutationFn: createPost,

    onSuccess: (data) => {
      console.log("post create 성공", data);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: (error) => {
      console.error("error:", error);
    },
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  // form submit
  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    mutation.mutate({
      title,
    });

    setTitle("");
  }

  // Status 상태 뱃지
  function getStatusBadge(status) {
    const styles = {
      idle: "bg-gray-100 text-gray-500",
      pending: "bg-yellow-100 text-yellow-500",
      success: "bg-green-100 text-green-500",
      error: "bg-red-100 text-red-500",
    };

    const icons = {
      idle: "⚪️",
      pending: "🟡",
      success: "🟢",
      error: "🔴",
    };

    return (
      <span
        className={`inline-flex min-w-25 justify-center rounded-md p-1 ${styles[status]}`}>
        {icons[status]} {status}
      </span>
    );
  }

  // isPending, Success, Error 상태 뱃지
  function getBooleanBadge(value, type) {
    const styles = {
      pending: {
        true: "🟡 true",
        className: "bg-yellow-100 text-yellow-500",
      },
      success: {
        true: "🟢 true",
        className: "bg-green-100 text-green-500",
      },
      error: {
        true: "🔴 true",
        className: "bg-red-100 text-red-500",
      },
    };

    if (value) {
      return (
        <span
          className={`inline-flex min-w-25 justify-center rounded-md p-1 ${styles[type].className}`}>
          {styles[type].true}
        </span>
      );
    }

    return (
      <span className="inline-flex min-w-25 justify-center rounded-md p-1 bg-gray-100 text-gray-500">
        ⚪️ false
      </span>
    );
  }

  console.log({ mutation });

  return (
    <>
      <Header />
      <Layout>
        <ExperimentHeader
          title={`Mutation Experiment`}
          description={`React Query Mutation 동작 확인`}
        />
        {/* report */}
        <section className="space-y-4">
          {/* add post */}
          <div className="px-8 pt-6 pb-8 rounded-lg bg-indigo-50">
            <h2 className="mb-4 text-xl font-semibold font-mono">Add post</h2>
            <div className="">
              <h3 className="mb-2 text-lg font-semibold font-mono">Title</h3>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="게시글 제목을 입력하세요"
                  className="flex-1 rounded-md bg-white px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={`ml-2 px-4 py-2 rounded-md ${mutation.isPending ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500 text-white hover:bg-indigo-600"} `}>
                  추가하기
                </button>
              </form>
            </div>
          </div>
          {/* mutation status */}
          <div className="px-8 py-6 rounded-lg bg-indigo-100">
            <h2 className="mb-4 text-xl font-semibold font-mono">
              Mutation Status
            </h2>
            {/* status, pending, success, error, response */}
            <div className="space-y-2 text-md font-mono">
              <div className="flex justify-between">
                <span>Status</span>
                <span>{getStatusBadge(mutation.status)}</span>
              </div>
              <div className="flex justify-between">
                <span>isPending</span>
                <span>{getBooleanBadge(mutation.isPending, "pending")}</span>
              </div>
              <div className="flex justify-between">
                <span>Success</span>
                <span>{getBooleanBadge(mutation.isSuccess, "success")}</span>
              </div>
              <div className="flex justify-between">
                <span>Error</span>
                <span>{getBooleanBadge(mutation.isError, "error")}</span>
              </div>
              <div className="mt-6 py-6 space-y-4 border-t-2 border-gray-100">
                <p>Response</p>
                {mutation.data ? (
                  <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
                ) : (
                  <p>No response yet.</p>
                )}
              </div>
            </div>
          </div>
          {/* posts */}
          <div className="px-8 py-6 rounded-lg bg-indigo-50">
            <h2 className="mb-4 text-xl font-semibold font-mono">Posts</h2>
            <div className="mb-4 space-y-2">
              {posts?.map((post) => (
                <div
                  key={post.id}
                  className="px-4 py-2 font-mono rounded-lg bg-indigo-200 shadow">
                  {post.title}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Guide title={`Mutation Experiment Guide`}>
          <ol className="space-y-2">
            <li>입력창에 게시물 제목을 입력합니다.</li>
            <li>추가하기 버튼 또는 enter를 눌러 mutaion을 실행합니다.</li>
            <li>React Query의 mutation의 상태변화를 확인합니다.</li>
            <li>
              성공한 경우 Response 데이터를 통해 반환된 결과를 확인합니다.
            </li>
            <li>
              invalidateQueries를 통해 기존 post query를 갱신하고 추가된
              데이터를 확인합니다.
            </li>
          </ol>
        </Guide>
        <Guide title={`Mutation Features`}>
          <ul className="space-y-2">
            <li>데이터 변경 작업(Create, Update, Delete)을 관리합니다.</li>
            <li>
              요청 상태(idle, pending, success, error)를 자동으로 추적합니다.
            </li>
            <li>
              Mutation lifecycle callback을 통해 후속 작업을 처리할 수 있습니다.
            </li>
            <li>
              invalidateQueries를 사용해 Query Cache를 최신 상태로 갱신합니다.
            </li>
            <li>
              Optimistic Update를 지원하여 즉각적인 UI 업데이트가 가능합니다.
            </li>
          </ul>
        </Guide>
      </Layout>
    </>
  );
}
