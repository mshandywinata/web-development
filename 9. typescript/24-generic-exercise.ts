// Convert the function below to a generic function:
// function echo(arg) { return arg; }

function echo<T>(arg: T): T {
  return arg;
}

// When compiling the following piece of code, we get an error saying ‘Property name
// does not exist on type T’. How can we solve this problem?

// compiler doesnt know if name is the property member of the obj (param)
// so we have to specify or explicitly defined the property with its type
// by using extends keyword after the template T

function printName<T extends { name: string }>(obj: T) {
  console.log(obj.name);
}

// An Entity should have a unique identifier. The type of identifier, however, is dependent
// on the use case. In some cases, the ID might be a number, in other cases, it might be a
// string, GUID, etc. Represent the entity using a generic class.

class Entity<T> {
  constructor(public id: T) {}
}

// Given the following interface, what does keyof User return?

interface User {
  userId: number;
  username: string;
}

// it would return 'userId' | 'username'
