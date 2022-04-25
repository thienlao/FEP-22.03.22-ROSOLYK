'use strict';

const firstNumberEl = document.getElementById('firstNumber');
const secondNumberEl = document.getElementById('secondNumber');
const operatorEl = document.getElementById('operator');
const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error');
const calculateBtnEl = document.getElementById('calculateBtn');


let error = null;

calculateBtnEl.addEventListener('click', onCalculateBtnClick);
firstNumberEl.addEventListener('input', onNumberInput);
secondNumberEl.addEventListener('input', onNumberInput);

function onCalculateBtnClick() {
    const firstNumber = getFirstNumber();
    const secondNumber = getSecondNumber();
    const operator = getOperator();

    clearResult();

    if (!error) {
        const result = calculate(+firstNumber, +secondNumber, operator);
        showResult(result);
    }
}

function onNumberInput() {
    const firstNumber = getFirstNumber();
    const secondNumber = getSecondNumber();
    const error = validateNumbers(firstNumber, secondNumber);

    clearResult();

    if (error) {
        showError(error);
    } else {
        clearError();
    }
}

function getFirstNumber() {
    return getNumberValue(firstNumberEl);
}

function getSecondNumber() {
    return getNumberValue(secondNumberEl);
}

function getNumberValue(el) {
    return el.value;
}

function getOperator() {
    return operatorEl.value;
}

function validateNumbers(a, b) {
    return validateNumber(a, 'first') || validateNumber(b, 'second');
}

function validateNumber(value, label) {
    if (isNaN(value)) return `Number ${label} not a number`;

    if (value === '') return `Number ${label} is agreed`;

    return null;
}

function calculate(x, y, action) {
    switch (action) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '/':
            return x / y;
        case '*':
            return x * y;
        default:
            alert('Invalid Operator');
            return null;
    }
}

function showResult(value) {
    resultEl.textContent = value;
}
function clearResult() {
    resultEl.textContent = '';
}

function showError(err) {
    errorEl.textContent = err;
    error = err;
}

function clearError() {
    errorEl.textContent = '';
    error = null;
}