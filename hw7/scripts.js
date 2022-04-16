'use strict';

const calc = createCalculator(10);
function createCalculator(n){
    let result = n;
    return {
        add: (b) => (n += b),
        sub: (b) => (n -= b),
        mult: (b) => (n *= b),
        div: (b) => (n /= b),
        set: (b) => (n = b),
        get: () => n,
    };   
}
console.log(calc.add(5)); /// 15
console.log(calc.mult(10)); // 150
console.log(calc.sub(40)); // 110
console.log(calc.div(10)); // 11
console.log(calc.set(100)); //
