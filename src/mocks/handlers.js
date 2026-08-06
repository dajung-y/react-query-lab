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
  // GET
  http.get("/posts", () => {
    return HttpResponse.json(posts);
  }),
  // POST
  http.post("/posts", async ({ request }) => {
    const body = await request.json();

    const newPost = {
      id: posts.length + 1,
      title: body.title,
    };

    posts.push(newPost);

    console.log(`Posts: ${posts}`);

    return HttpResponse.json(newPost);
  }),
];
