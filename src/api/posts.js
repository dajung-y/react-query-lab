export async function getPosts() {
  const response = await fetch("/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function createPost(post) {
  const response = await fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create Post");
  }

  return response.json();
}
