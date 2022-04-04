let userPick = getOperator();

let firstValue = getFirstNumber();

let secondValue = getSecondNumber();

let result = calculate (firstValue, secondValue, userPick);

showResult(firstValue, secondValue, userPick, result);

function getOperator(){
    let val = prompt('What do you want? + - / *');

    while (verifyOperator(val)) {
        val = prompt('You input not an operator. Try again.');
    }
    return val;
}


function verifyOperator(pickOperator){
    return pickOperator !== '+' && pickOperator !== '-' && pickOperator !== '/' &&  pickOperator !== '*';    
}

function getFirstNumber(){
    let n = prompt('Input first number');
    
    while (verifyNumber(n)){
        n = prompt('Input a number');
    } 
    return +n;
}

function getSecondNumber(){
    let n = prompt('Input second number');
    while (verifyNumber(n)){
        n = prompt('Input a number');
    } ;
    return +n;
}

function verifyNumber(val){
    return isNaN(val) || val === '' || val === null;
}



function calculate(firstValue, secondValue, userPick){
    switch(userPick){
        case '+':
            return firstValue + secondValue;
        case '-':
            return firstValue - secondValue;
        case '/':
            return firstValue / secondValue;
        case '*':
            return firstValue * secondValue;
    }
    return result;
}

function showResult(firstValue,secondValue,userPick,result){
    alert(`${firstValue} ${userPick} ${secondValue} = ${result}`);
}