const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
const percentage = document.querySelector('.percentage');
const dot = document.querySelector('.dot');
const deleteBtn = document.querySelector('.delete');
const seven = document.querySelector('.seven');
const eight = document.querySelector('.eight');
const nine = document.querySelector('.nine');
const multiply = document.querySelector('.multiply');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
const minus = document.querySelector('.minus');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const plus = document.querySelector('.plus');
const zero = document.querySelector('.zero');
const doubleZero = document.querySelector('.double-zero');
const equal = document.querySelector('.equal');
const allKeys = document.querySelector('.all-keys');

const operators = new Set(['+', '-', 'x', '/', '%']);
const numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00']);
function evaluate(str) {
    let arr = [];
    let num = "";
    for(let i=0; i<str.length; i++){
        if(operators.has(str[i])){
            arr.push(num);
            arr.push(str[i]);
            num = "";
        }
        else num += str[i];
    }
    arr.push(num);
    if(arr[1] === '+') return Number(arr[0]) + Number(arr[2]);
    if(arr[1] === '-') return Number(arr[0]) - Number(arr[2]);
    if(arr[1] === 'x') return Number(arr[0]) * Number(arr[2]);
    if(arr[1] === '/') return Number(arr[0]) / Number(arr[2]);
}
let flag = false;

allKeys.addEventListener('click', (e) => {
    let input = result.value;
    if(e.target.className === 'delete-img') input = input.slice(0, -1);
    else if(e.target.value === "C"){
        input = "";
        result.value = "";
    }
    else if(numbers.has(e.target.value)){
        input += e.target.value;
        result.value = input;
    }
    else if(operators.has(e.target.value)) {
        if(!flag) {
            input += e.target.value;
            result.value = input;
            flag = true;
        }
        else {
            result.value = evaluate(input);
            input = result.value + e.target.value;
        }
    }
//     else if(e.target.value === "+"){
//         if(!flag){
//             input += "+";
//             result.value = input;
//             flag = true;
//         }
//         else {
//             input = evaluate(input);
//             result.value = input;
//         }
//         return;
//     }
//     else if(e.target.value === "-"){
//         if(!flag){
//             input += "-";
//             result.value = input;
//             flag = true;
//         }
//         else {
//             input = evaluate(input);
//             result.value = input;
//         }
//         return;
//     }
//     else if(e.target.value === "x"){
//         if(!flag){
//             input += "x";
//             result.value = input;
//             flag = true;
//         }
//         else {
//             input = evaluate(input);
//             result.value = input;
//         }
//         return;
//     }
//     else if(e.target.value === "/"){
//         if(!flag){
//             input += "/";
//             result.value = input;
//             flag = true;
//         }
//         else {
//             input = evaluate(input);
//             result.value = input;
//         }
//         return;
//     }
//     else if(e.target.value === "%"){
//         if(!flag){
//             input += "%";
//             result.value = input;
//             flag = true;
//         }
//         else {
//             input = evaluate(input);
//             result.value = input;
//         }
//         return;
//     }
//     else if(e.target.value === "=" && flag){
//         input = evaluate(input);
//         result.value = input;
//         return;
//     }
//     result.value = input;
})