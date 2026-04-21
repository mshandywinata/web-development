// Given the data below, define a type
// alias for representing users.

type User = {
  name: string;
  age: number;
  occupation?: string;
  address?: string;
};

let users: User[] = [
  {
    name: "John Smith",
    age: 30,
    occupation: "Software engineer",
  },
  {
    name: "Kate Müller",
    age: 28,
  },
];

// Birds fly. Fish swim. A Pet can be a Bird or Fish.
// Use type aliases to represent these

type Bird = {
  fly: () => "fly";
};

type Fish = {
  swim: () => "swim";
};

type Pet = Bird | Fish;

// Define a type for representing the days of week.
// Valid values are “Monday”, “Tuesday”, etc.

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

// Simplify the following code snippets:
// let user = getUser();
// console.log(user && user.address ? user.address.street : undefined);
//
// let x = foo !== null && foo !== undefined ? foo : bar();

let user = getUser();
console.log(user?.address?.street);

let x = foo ?? bar();

// What is the problem in this piece of code?
// let value: unknown = 'a';
// console.log(value.toUpperCase());

// type is unknown and we have to utilize type narrowing
let value: unknown = "a";
if (typeof value === "string") console.log(value.toUpperCase());
