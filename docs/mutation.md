# React Query Mutation Experiment

## Mutation

### 1. Mutation이란

Mutation은 **서버의 데이터를 변경하는 작업을 처리**할 때 사용하는 기능이다.

데이터 조회에 사용되는 `useQuery`와 다르게 `useMatation`은 게시글 추가, 수정, 삭제와 같은 데이터 변경 작업에 사용한다.

---

### 2. React Query에서의 Mutation

React Query에서는 `useMutation`을 사용해 데이터 변경 요청을 관리할 수 있다.

```
const mutation = useMutation({
  mutationFn: createPost,
});
```

`mutation.mutate()`를 호출하면 `mutationFn`에 전달한 함수를 실행하고 요청의 상태와 결과를 React Query에서 관리한다.

이번 실험에서는 게시글 추가 기능을 만들어 `useMutation`의 동작과 상태 변화를 확인했다.

---

### 3. 실험

게시글 제목을 입력하고 `추가하기`버튼을 누르면 `mutation.mutate()`를 실행하도록 구현했다.

```
mutation.mutate({
  title,
});
```

게시글이 추가되면 NSW에서 관리하고 있는 `posts`데이터에 새로운 게시글이 추가되도록 했다.

Mutation의 상태를 화면에 표시해서 요청 과정에서 상태가 어떻게 변하는지 확인했다.

idle

->

pending

->

success/error

화면에서는 다음 값들을 확인할 수 있도록 했다.

- Status
- isPending
- isSuccess
- isError
- Reponse
- Posts

---

### 4. 실험 결과

게시글 제목을 입력하고 추가하면 Mutation 상태가 변경되는 것을 확인했다.

게시글 입력

-> 추가하기

-> pending

-> 서버 요청

-> success

-> Response 확인

-> Posts 목록 업데이트

성공한 경우 서버에서 반환된 게시글 데이터를 Response에서 확인할 수 있도록 했다.

Mutaion이 성공한 후에는 `invalidateQueries`를 사용해 기존 `posts` Query를 갱신하도록 했다.

이를 통해 새로운 게시글이 Posts 목록에 반영되는 것을 확인했다.

---

### 5. 알게 된 내용

- `useMutaion`은 서버 데이터의 **변경 작업**을 관리할 때 사용한다.
- `mutation.mutate()`를 호출하면 등록한 `mutationFn`이 실행된다.
- Mutation은 `idle`, `pending`, `success`, `error` 등 의 상태를 제공한다.
- `mutation.data`를 통해 성공한 요청의 Response 데이터를 확인할 수 있다.
- Mutation이 성공한 후 `invalidateQueries`를 사용하면 관련 Query를 다시 가져와 변경된 데이터를 반영할 수 있다.

이번 실험을 통해 데이터 조회는 `useQuery` 데이터 변경은 `useMutation`으로 관리하는 것을 확인했다.
