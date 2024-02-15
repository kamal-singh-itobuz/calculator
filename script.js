const result = document.querySelector(".result");
const allKeys = document.querySelector(".all-keys");

const operators = new Set(["+", "-", "x", "/"]);
const numbers = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "00",]);

function precedence(op) {
    if (op === '+') return 0;
    else if (op === '-') return 1;
    else if (op === 'x') return 2;
    else if (op === '/') return 3;
}

function calculate(a, op, b) {
    if (op === '+') return a + b;
    else if (op === '-') return b - a;
    else if (op === 'x') return a * b;
    else if (op === '/') return b / a;
}

function evalArr(arr) {
    let operandStack = [];
    let operatorStack = [];
    arr.forEach(ele => {
        if (!operators.has(ele)) operandStack.push(ele);
        else {
            if (!operatorStack.length) operatorStack.push(ele);
            else if (operatorStack.length) {
                if (precedence(ele) >= precedence(operatorStack[operatorStack.length - 1])) operatorStack.push(ele);
                else {
                    while (operatorStack.length && precedence(ele) < precedence(operatorStack[operatorStack.length - 1])) {
                        let a = operandStack.pop();
                        let b = operandStack.pop();
                        let op = operatorStack.pop();
                        operandStack.push(calculate(a, op, b));
                    }
                    operatorStack.push(ele);
                }
            }

        }
    });
    while (operatorStack.length) {
        let a = operandStack.pop();
        let b = operandStack.pop();
        let op = operatorStack.pop();
        operandStack.push(calculate(a, op, b));
    }
    return operandStack.pop();
}

function evaluate(str) {
    let arr = [];
    let num = "";
    for (let i = 0; i < str.length; i++) {
        if (i !== 0 && operators.has(str[i])) {
            arr.push(Number(num));
            arr.push(str[i]);
            num = "";
        } else num += str[i];
    }
    arr.push(Number(num));
    return evalArr(arr);
}

function canAddPoint(str) {
    for (let i = str.length - 1; i >= 0; i--) {
        if (operators.has(str[i])) return false;
        else if (str[i] === ".") return true;
    }
}

let input = "";
allKeys.addEventListener("click", (e) => {
    input = result.value;
    if (e.target.className === "delete-img") {
        if (result.value === "undefined") {
            input = "";
            result.value = "";
        }
        else {
            result.value = result.value.slice(0, -1);
            input = result.value;
        }
    }
    else if (e.target.value === "C") {
        input = "";
        result.value = "";
    }
    else if (numbers.has(e.target.value)) {
        if (input[input.length - 1] === ".") {
            input += e.target.value;
            result.value = input;
            return;
        }
        if (e.target.value === "00" && (input === "" || input === "0" || !numbers.has(input[input.length - 1]))) return;
        else if (e.target.value === "0") {
            if (input === "0") return;
            if (input[input.length - 1] === "0" && (input.length > 1 && !numbers.has(input[input.length - 2]))) return;
        }
        else if (input === "0" || input[input.length - 1] === "0" && (input.length > 1 && !numbers.has(input[input.length - 2]))) input = input.slice(0, -1);
        input += e.target.value;
        result.value = input;
    }
    else if (!input.length && e.target.value === "-") {
        input += e.target.value;
        result.value = input;
    }
    else if (input.length && operators.has(e.target.value) && !operators.has(input[input.length - 1])) {
        input += e.target.value;
        result.value = input;
    }
    else if (e.target.value === "." && !canAddPoint(input)) {
        input += e.target.value;
        result.value = input;
    }
    else if (e.target.value === "=") {
        if (!numbers.has(input[input.length - 1])) return;
        input = evaluate(input);
        result.value = input;
    }
});
