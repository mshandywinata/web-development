type Student = {
  enrolledAt: Date;
};

function setEnroll(id: number): Student | null {
  return id === 0 ? null : { enrolledAt: new Date() };
}

// alternative of nullable condition
// optional property access
const student = setEnroll(0);
console.log(student?.enrolledAt.getFullYear());

// optional element access
const nums: number[] = [];
console.log(nums[0]);

// optional call
const foo: any = null;
foo?.("hello");
