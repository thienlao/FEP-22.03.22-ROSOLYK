let userPick = prompt('What do you want? + - / *');

let firstValue = prompt ('Input first number.');

if (isNaN (firstValue)){
    alert('You input not a number try again.');
} else {
    alert('You  input number.');
}

let secondValue = prompt ('Input second number.');

if (isNaN (secondValue)){
    alert('');
} else {
    alert('You input number.');
}

if (userPick === '+'){
    alert(+firstValue + +secondValue)
}

let resultPlus = +firstValue + +secondValue;


if (userPick === '-'){
    alert(+firstValue - +secondValue)
}

let resultMinus = firstValue - secondValue;


if (userPick === '*'){
    alert(+firstValue * +secondValue)
}

let resultGeneration = firstValue * secondValue;


if (userPick === '/'){
    alert(+firstValue / +secondValue)
}

let resultDivide = firstValue / secondValue;

switch (userPick){
    case '+': 
    alert (`${firstValue} ${userPick} ${secondValue} = ${resultPlus}`); 
    break;
    case '-': 
    alert (`${firstValue} ${userPick} ${secondValue} = ${resultMinus}`);
    break;
    case '*': 
    alert (`${firstValue} ${userPick} ${secondValue} = ${resultGeneration}`);
    break;
    case '/': 
    alert (`${firstValue} ${userPick} ${secondValue} = ${resultDivide}`);
    break;
}

