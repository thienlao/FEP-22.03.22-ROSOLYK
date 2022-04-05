let userPick = getOperator();

let value = getNumbers();

let result = calculate (userPick, value);

showResult();

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

function getNumbers(){
    let n = prompt('Input number separated by commas.')
    
    while (verifyNumbers(n)) {
        n = prompt('You cancel your input or you pressed space. Inpute your number separated by commas.')
    }
    return n.split(',');
}

function verifyNumbers(val){
    return val === '' || val === null;
}

function calculate(userPick, value){
    switch(userPick){
        case '+':
            result = 0;
            for(let i = 0; i<value.length; i++) {
                result += +value[i];
            }
            return result;
        case '-':
            result = +value[0];
            for(let i = 1; i<value.length; i++) {
                result -= +value[i];
            }
            return result;
        case '/':
            result = +value[0];
            for(let i = 1; i<value.length; i++) {
                result /= +value[i];
            }
            return result;
        case '-':
            result = +value[0];
            for(let i = 1; i < value.length; i++) {
                result += +value[i];
            }
            return result;
    }
}

function showResult(userPick, value, result){
    let expression = value[0];
    for( let i = 1; i < value.length; i++) {
        expression += `${userPick} ${value[i]}`;
    }

    alert(`${expression} = ${result}`);
}
