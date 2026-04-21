interface Student {
  id: string;
  name: string;
}

class Student {
  constructor(
    public id: string,
    public name: string,
  ) {}
}

// limit template to certain type
// only accept extended type
// extend could be by type, interface and class
function print<T extends Student>(val: T): void {
  console.log(val);
}

function echo<T extends string | number>(val: T): void {
  console.log(val);
}

function say<T extends Student>(val: T): void {
  console.log(val);
}

print({ id: "2305848", name: "Shandy" });
echo("hello, world!");
say(new Student("2305848", "Shandy"));
