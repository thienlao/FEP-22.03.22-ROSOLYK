class Calculator {
    result = 0;

    add(v) {
        return (this.result += v);
    }

    set(v) {
        this.result = v;
    }
}

module.exports = new Calculator();