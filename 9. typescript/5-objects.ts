const student: {
  id: number;
  name: string;
  enroll: (date: Date) => void;
} = {
  id: 2305848,
  name: "Shandy",
  enroll: (date: Date) => {
    console.log(date);
  },
};

console.log(student);
