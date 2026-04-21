// only telling the compiler that it should return certain type as we know
// const date = document.getElementById("date") as HTMLInputElement;
const date = <HTMLInputElement>document.getElementById("date");
console.log(date.value);
