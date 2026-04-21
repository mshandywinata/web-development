interface Response<T> {
  status: number | null;
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Response<T> {
  return { status: null, data: null, error: null };
}

interface Student {
  id: number;
}

interface Lecturer {
  subject: string[];
}

const student = fetch<Student>("/materials");
console.log(student.data);

const lecturer = fetch<Lecturer>("/subjects");
console.log(lecturer.data);
