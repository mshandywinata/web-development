// making class that accept variety of value type
// leads to redundant duplicationa
// set as generic to accept variety of type

class Response<T, U> {
  constructor(
    public status: T,
    public message: U,
  ) {}
}

let success = new Response<number, string>(
  200,
  "Successfully retrieved user data.",
);

console.log(success);
