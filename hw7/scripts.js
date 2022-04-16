'use strict';

// const calc = createCalculator(10);
// function createCalculator(calc){
    
// };

// calc.sum(5); /// 15
// calc.mult(10); // 150
// calc.sub(40); // 110
// calc.div(10); // 11
// calc.set(100); //

function createCalculator(n){
    return function(a){
        return function(b){
            return f(a, b);
        };
    };
}

function sum(a,b) {
    return a + b;
}

let 