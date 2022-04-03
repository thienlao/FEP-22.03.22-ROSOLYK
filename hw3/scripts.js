let userPick = getOperator();

let firstValue = getFirstNumber();

let secondValue = getSecondNumber();

let result = calculate (firstValue, secondValue, userPick);

showResult();

function getOperator(){
    let val;
    do {
        val = prompt('What do you want? + - / *');
    } while (!verifyOperator(val));
    return +val;
}


function verifyOperator(){
    let pickOperator = '+ - / *';
    if (pickOperator != '+' &&
        pickOperator != '-' &&
        pickOperator === '/' && 
        pickOperator === '*'||
        pickOperator === null){
            alert('You input not an operator. Try again')
        return false;
    } else{
        return true;

    }
}

function getFirstNumber(){
    let n;
    do {
        n = prompt('Input first number');
    } while (!verifyNumber(n));
    return +val;
}

function getSecondNumber(){
    let n;
    do {
        n = prompt('Input first number');
    } while (!verifyNumber(n));
    return +val;
}

function verifyNumber(val){
    if (isNaN(val)){
        alert('This is not a number! Try again');
        return false;
    } else {
        
        return true;
    }
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
    alert(`Answer is: ${firstValue} ${userPick} ${secondValue} = ${result}`);
}