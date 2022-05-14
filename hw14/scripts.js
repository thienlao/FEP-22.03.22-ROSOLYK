'use strict;'

const SIZE_SMALL = {
    price: 50, 
    callories: 20
}

const SIZE_AVERAGE = {
    price: 75, 
    callories: 30
}

const SIZE_BIG = {
    price: 100, 
    callories: 40
}

const TOPPING_CHEESE = {
    price: 10, 
    callories: 20
}

const TOPPING_SALAD = {
    price: 20, 
    callories: 5
}

const TOPPING_POTATO = {
    price: 15, 
    callories: 10
}

const TOPPING_FLAVOURING = {
    price: 15, 
    callories: 0
}

const TOPPING_MAYO = {
    price: 20, 
    callories: 5
}

class Hamburger {
    constructor(size){
        this._price = size.price;
        this._callories = size.callories;
    }

    addTopping(size){
        this._price += size.price;
        this._callories += size.callories;
    }

    removeTopping(size){
        this._price -= size.price;
        this._callories -= size.callories;
    }

    getPrice(){
        return this._price
    }

    getCallories(){
        return this._callories
    }
}

const hamburger = new Hamburger(SIZE_SMALL);
// добавка из майонеза
hamburger.addTopping(TOPPING_MAYO);
hamburger.addTopping(TOPPING_POTATO);

console.log("Price with sauce: " + hamburger.getPrice());
console.log("Callories with sauce: " + hamburger.getCallories());