function hello(name: string | null | undefined) {
  if (!name) return "hello!";
  return `hello, ${name}!`;
}

const result = hello("Shandy");
const resultNull = hello(null);
const resultUndefined = hello(undefined);

console.log(result);
console.log(resultNull);
console.log(resultUndefined);
