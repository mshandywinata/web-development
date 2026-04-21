function fizzBuzz(n: number): string[] {
  const arr: string[] = [];

  for (let i: number = 1; i <= n; i++) {
    if (i % 15 === 0) {
      arr.push("fizzBuzz");
    } else if (i % 3 === 0) {
      arr.push("fizz");
    } else if (i % 5 === 0) {
      arr.push("buzz");
    } else {
      arr.push(i.toString());
    }
  }

  return arr;
}

const result = fizzBuzz(2048);
console.log(result);
