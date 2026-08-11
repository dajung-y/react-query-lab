# React Query Lab

React Query 주요 기능을 직접 실험하고 Query 상태와 데이터 변화를 화면에서 확인할 수 있도록 만든 실험형 프로젝트입니다.

Cache, staleTime, Mutation을 각각의 Experiment 페이지로 구성하여 기능별 동작을 확인하고 실험 결과를 문서로 정리했습니다.

## Experiment Purpose

React Query의 주요 기능이 어떤 상황에서 동작하고 서버 상태를 어떻게 관리하는지 직접 확인하는 것을 목표로 했습니다.

기존 useEffect 방식과 React Query의 데이터 패칭을 비교하고 Cache의 데이터 재사용, staleTime에 따른 Fresh/Stale 상태 변화, Mutation을 통한 데이터 변경과 Query 갱신 과정을 직접 실행했습니다.

## Experiments

| Feature   | Description                                           |
| --------- | ----------------------------------------------------- |
| Cache     | `useEffect` 방식과 React Query의 Cache 동작 비교      |
| staleTime | Fresh / Stale 상태 변화 및 staleTime에 따른 차이 확인 |
| Mutation  | 데이터 변경, Mutation 상태 및 Query 갱신 확인         |

### Cache

`useEffect`로 직접 데이터를 요청하는 방식과 React Query를 비교합니다.

- Network Request Count 비교
- Query Key 확인
- Cache HIT/MISS 확인
- 페이지 재방문시 Cache 재사용 확인

### staleTime

`staleTime`을 다르게 설정하고 데이터 상태 변화를 확인합니다.

- `staleTime: 0`
- `staleTime: 5000`
- Fresh/Stale 상태
- Fresh Time Left
- `isFetching`
- `dataUpdatedAt`

### Mutation

게시글 추가를 통해 `useMutation`의 동작을 확인합니다.

- 게시글 추가
- Mutation 상태 변화
- Response 확인
- `invalidateQueries`
- 변경된 Posts 데이터 확인

---

## Tech Stack

- React
- React Query
- React Router
- Tailwind CSS
- Vite
- MSW

---

## Architecture

```text
Component
    ↓
React Query
    ↓
API Function
    ↓
   MSW
    ↓
Mock Data
```

Experiment별 페이지에서 React Query의 기능을 독립적으로 확인할 수 있도록 구성했습니다.

자세한 구조는 [Architecture](./docs/architecture.md)에서 확인할 수 있습니다.

---

## Documents

각 실험의 개념과 실험 결과를 별도의 문서로 정리했습니다.

- [Cache](./docs/cache.md)
- [staleTime](./docs/staleTime.md)
- [Mutation](./docs/mutation.md)
- [Architecture](./docs/architecture.md)

---

## Getting Started

```
npm install
npm run dev
```

개발 서버를 실행한 후 Experiment 페이지에서 React Query 각각 기능의 동작을 확인할 수 있습니다.
