// if we not sure about the type
// unknown is recommended rather than any

class Student {
  constructor(
    public id: string,
    public name: string,
  ) {}
}

function enroll(student: unknown) {
  // narrowing instance
  if (student instanceof Student) return "Student instance";
  return "not Student instance";
}

const result = enroll(new Student("2305848", "Muhamad Shandy Winata"));
console.log(result);
