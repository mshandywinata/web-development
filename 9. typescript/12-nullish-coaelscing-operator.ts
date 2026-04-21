const quantity: number | null = null;
type Cake = {
  quantity: number;
};
const cake: Cake = {
  // this could be 0 which is still valid number
  // quantity: quantity || 30,
  // so in js we checked for nullish such as
  // quantity: quantity ? quantity : 30,
  // for shorthand implementation we use
  quantity: quantity ?? 30,
};

console.log(cake.quantity);
