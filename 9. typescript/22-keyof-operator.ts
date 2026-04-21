interface Student {
  id: string;
  name: string;
}

class Class<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }

  // keyof T if T is Student
  // 'id' | 'name'
  find(prop: keyof T, val: unknown): T | undefined {
    return this._objects.find((obj) => obj[prop] === val);
  }
}

const swe = new Class<Student>();
swe.add({ id: "2305848", name: "Muhamad Shandy Winata" });

// valid key would be accepted
swe.find("id", "44444");
// otherwise rejected
swe.find("invalidKey", "foo");
