# React Query Cache Experiment

## 목적

- React Query Cache 동작의 이해
- Vanilla(useEffect)와 비교

## 구현

- useEffect + fetch
- useQuery
- staleTime : Infinity
- Cache HIT/MISS 표시
- Network Request Count 표시

## 실험 결과

### Vanilla

- 컴포넌트가 mount될 때마다 API 요청
- Cache 없음

### React Query

- Query Cache 저장
- 동일 Query Key이면 Cache 재사용
- 불필요한 API 요청 감소

## 배운점

- Query Key가 Cache의 기준이다.
- QueryClient로 Cache를 직접 확인할 수 있다.
