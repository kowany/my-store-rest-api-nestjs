const myName = 'Héctor';
const myAge = 56;
const suma = (a: number, b: number): number => a + b;
console.log(suma(13, 43));

class Person {
  constructor(private age: number, private name: string) {}
  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const hector = new Person(56, 'Hector');
hector.getSummary();
