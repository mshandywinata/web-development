class Utils {
  static getArray<T>(val: T) {
    return [val];
  }
}

const nums: number[] = [0, 1, 1, 2, 3, 5, 8];
const result = Utils.getArray<number[]>(nums);
console.log(result);
