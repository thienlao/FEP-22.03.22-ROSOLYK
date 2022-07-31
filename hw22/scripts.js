const calc = require('./calculator');

console.log(calc.set(10));
console.log(calc.add(4));

const Calculator = require('./calculator/Calculator');

const calc = new Calculator();