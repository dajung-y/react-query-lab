# Architecture

## Routing

React Router를 이용하여 React Query 주요 기능을 각각의 Experiment 페이지로 분리했습니다.

```text
/
├── Cache
├── staleTime
└── Mutation
```

각 페이지에서 하나의 React Query 기능을 집중적으로 실험할 수 있도록 구성했습니다.

---

## Data Flow

API 요청은 별도의 API 함수로 분리하고 React Query를 통해 서버 상태를 관리합니다.

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

Mutaion의 경우 데이터 변경이 성공하면 `invalidateQueries`를 사용해 관련 Query를 갱신하도록 구성했습니다.

```text
  User Input
      ↓
 useMutation
      ↓
  createPost
      ↓
     MSW
      ↓
invalidateQueries
      ↓
 useQuery 재요청
      ↓
 Updated Posts
```

---

## Component Structure

Experiment 페이지에서 공통으로 사용하는 UI는 컴포넌트로 분리했습니다.

```text
src/
├── components/
│ ├── Guide
│ └── Header
│
├── pages/
│ ├── CacheExperiment
│ ├── StaleTimeExperiment
│ └── MutationExperiment
│
└── api/
    ├── posts
    └── requestCounter
```

### Header

각 Experiment 페이지에서 공통으로 사용하는 상단 네비게이션입니다.

### Guide

각 실험에서 어떤 순서로 동작을 확인할 수 있는지 안내하는 공통 컴포넌트입니다.

### Experiment Pages

각 페이지에서 하나의 React Query 기능을 독립적으로 실험합니다.

- `CacheExperiment`: Query Cache와 데이터 재사용 확인
- `StaleTimeExperiment`: Fresh/Stale 상태 변화 확인
- `MutationExperiment`: Mutation 상태와 데이터 변경 확인

---

## Mock API

실제 백엔드 서버 대신 MSW를 사용해 API 요청을 Mocking했습니다.

이를 통해 별도의 백엔드 환경 없이 React Query 동작에 집중할 수 있도록 구성했습니다.

게시글 데이터는 Mock API를 통해 조회하고 Mutation 실험에서는 새로운 게시글을 추가할 수 있도록 구성했습니다.
