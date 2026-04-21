// accept either one of the worlds
function getKmToCm(n: number | string): number {
  if (typeof n === "string") n = parseInt(n);
  return n * 1_000;
}

const result = getKmToCm("50km");
console.log(result);
