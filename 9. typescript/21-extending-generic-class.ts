interface Student {
  id: string;
  name: string;
}

class Class<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }
}

// direct pass the generic type param
class CompressibleClass<T> extends Class<T> {
  compress(obj: T): void {
    console.log(obj);
  }
}

// constraint the generic type param
class SearchableClass<T extends { name: string }> extends Class<T> {
  find(name: string): T | undefined {
    return this._objects.find((obj) => obj.name === name);
  }
}

// fixed the generic type param
class StudentClass extends Class<Student> {
  filterBySubject(subject: string): Student[] {
    return [];
  }
}
