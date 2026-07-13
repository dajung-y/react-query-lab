let vanillaCount = 0;
let queryCount = 0;

export function increaseVanillaCount() {
  vanillaCount++;
}

export function increaseQueryCount() {
  queryCount++;
}

export function getRequestCount() {
  return {
    vanillaCount,
    queryCount,
  };
}
