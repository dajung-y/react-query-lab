# React Query Cache Experiment

## Cache

### 1. Cache란

Cache는 한 번 가져온 데이터를 저장해두고 같은 데이터가 필요할 때 다시 사용할 수 있도록 하는 방식이다.

저장된 데이터를 재사용하면 불필요한 네트워크 요청을 줄이고 더 빠르게 필요한 데이터를 보여줄 수 있다.

---

### 2. React Query에서의 Cache

React Query는 `useQuery`로 가져온 데이터를 Query Key를 기준으로 Cache에 저장하고 관리한다.

처음 데이터를 요청하면 API 응답이 Cache에 저장되고 이후에 같은 Query Key를 사용하는 Query에서는 저장된 데이터를 재사용하게 된다.

이번 실험에서는 `["posts"]`를 Query Key로 사용해 Cache 동작을 확인했다.

---

### 3. 실험

React Query의 Cache가 실제로 네트워크 요청을 줄이는지 확인하기 위해 두 가지 방식을 비교해 진행했다.

**useEffect**

`useEffect`에서 `getPosts()`를 직접 호출했다.

페이지를 이동했다가 다시 돌아오면 컴포넌트가 다시 마운트되면서 API 요청이 다시 발생한다.

**React Query**

`useQuery`를 사용하고 `["posts"]`를 Query Key로 지정했다.

Cache에 데이터가 존재하는지 확인하기 위해 `queryClient.getQueryData()`를 사용하고 화면에 `HIT/MISS`로 표시했다.

두 방식의 실제 API 요청 횟수를 확인하기 위해 Network Request Count를 상단에 표시했다.

---

### 4. 실험 결과

| 방식        | 첫 페이지 진입 | 페이지 재방문 |
| ----------- | -------------- | ------------- |
| useEffect   | API 요청       | API 요청      |
| React Query | API 요청       | Cache 사용    |

Network 탭과 화면의 Network Request Count를 함께 확인하면서 React Query가 Cache를 사용하는 것을 확인했다.

React Query

첫 진입

-> API 요청

-> 응답 데이터를 Cache에 저장

페이지 이동

-> Cache 페이지 재방문

-> 기존 Cache 데이터 확인

-> 데이터 재사용

---

### 5. 알게 된 내용

- React Query는 **Query Key**를 기준으로 데이터를 Cache에 저장하고 관리한다.
- Cache에 데이터가 존재하면 기존 데이터를 재사용한다.
- `Cache HIT`는 해당 Query Key의 데이터가 Cache에 존재함을 의미한다.
- Cache가 존재하는 것과 데이터가 최신인지의 여부는 다른 개념이다.
- `staleTime`에 따라 Cache 데이터의 Fresh/Stale 상태가 달라질 수 있다.

이번 실험에서는 Cache의 기본 동작을 확인했다. 다음 실험에서는 `staleTime`을 변경하면서 Fresh/Stale 상태와 재요청 시점을 확인하겠다.
