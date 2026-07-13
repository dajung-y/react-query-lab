import { http, HttpResponse } from "msw";

let posts = [
  {
    id: 1,
    title: "React Query 공부하기",
  },
  {
    id: 2,
    title: "Cache 이해하기",
  },
];

export const handlers = [
  // post 조회
  http.get("/posts", () => {
    return HttpResponse.json(posts);
  }),
];
