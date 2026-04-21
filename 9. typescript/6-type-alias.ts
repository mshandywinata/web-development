type Student = {
  id: number;
  name: string;
  enroll: (date: Date) => void;
};

const shandy: Student = {
  id: 2305848,
  name: "Muhamad Shandy Winata",
  enroll: (date) => {
    console.log(date);
  },
};

console.log(shandy);
