class Animal {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    return `Hello, my name is ${this.name}`;
  }
}

class Duck extends Animal {
  constructor(name) {
    super(name);
  }
  quack() {
    return 'Quack';
  }
}

var genericAnimal = new Animal('Dave');

console.log(genericAnimal.sayName())

var duck = new Duck('Donald');

console.log(duck.sayName());
console.log(duck.quack());
