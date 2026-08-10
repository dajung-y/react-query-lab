# React Query staleTime Experiment

## staleTime

### 1. staleTime이란

`staleTime`은 React Query에서 데이터를 **Fresh 상태로 유지할 시간**을 설정하는 옵션이다.

설정한 시간이 지나면 데이터는 stale 상태가 되고 이후 Query가 다시 실행되는 조건에 따라 데이터를 다시 가져올 수 있다.

`staleTime`은 Cache를 삭제하는 시간이 아니라 Cache 데이터를 얼마나 최신 데이터로 간주할 것인지 결정하는 시간이다.

---

### 2. React Query에서의 staleTime

React Query는 Query 데이터를 Fresh 또는 Stale 상태로 관리한다.

```
useQuery({
  queryKey: ["posts"],
  queryFn: getPosts,
  staleTime: 5000,
});
```

위와 같이 설정하면 데이터를 가져온 뒤 5초 동안은 Fresh 상태로 유지되며 5초가 지나면 Stale 상태가 된다.

이번 실험에서는 `staleTime`을 다르게 설정한 두 개의 Query를 만들어 상태 변화를 비교했다.

---

### 3. 실험

`staleTime: 0`과 `staleTime: 5000`을 설정하고 각각 데이터의 상태가 어떻게 달라지는지 확인했다.

**staleTime: 0**

데이터를 받은 직후부터 Stale 상태로 표시되는 것을 확인했다.

**staleTime: 5000**

데이터를 받은 후 5초 동안 Fresh 상태를 유지하다 시간이 지나면 Stale 상태로 변경되는 것을 확인했다.

실험 화면에서는 다음 값을 함께 표시했다.

- Qurey Key
- Data Stale
- Fresh Time Left
- Fetching
- Updated At
- Posts

`dataUpdatedAt`을 이용해 데이터가 마지막으로 업데이트 된 시간을 확인하고 현재 시간과 비교해 데이터가 Fresh 상태로 남은 시간을 화면에 표시했다.

---

### 4. 실험 결과

| staleTime | 데이터 상태                  |
| --------- | ---------------------------- |
| 0ms       | 데이터를 받은 직후 stale     |
| 5000ms    | 5초 동안 Fresh -> 이후 Stale |

`staleTime: 5000`에서는 시간이 지나면서 `Fresh Time Left`가 감소하고 0s가 되면 `Data Stale` 상태가 `Stale`로 변경되는 것을 확인했다.

`isFetching`에서는 Stale 상태에서 실제로 데이터를 다시 가져오는 시점을 확인할 수 있도록 했다.

---

### 5. 알게 된 내용

- `staleTime`은 데이터가 **Fresh 상태로 유지되는 시간**을 설정한다.
- `staleTime: 0`이면 데이터를 받은 직후부터 Stale 상태로 간주된다.
- `staleTime`이 길수록 같은 데이터를 Fresh 상태로 더 오래 사용할 수 있다.
- `staleTime`은 Cache를 삭제하는 시간이 아니라 데이터의 최신 상태를 판단하는 기준이다.

이번 실험을 통해 Cache에 데이터가 존재하는 것과 그 데이터가 Fresh한 상태인 것은 다른 개념이라는 것을 확인했다.
