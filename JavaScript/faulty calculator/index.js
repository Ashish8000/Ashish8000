let n1 = prompt("Enter first number:");
let num1 = parseFloat(n1);
let n2 = prompt("Enter second number:");
let num2 = parseFloat(n2);

let operator = prompt("Enter operator (+, -, *, /):");
let prob = Math.random();

function faulty_calculate(num1, num2, operator) {

    switch (operator) {
        case '+':
            return num1 - num2;
        case '-':
           return num1 / num2;
        case '*':
            return num1 + num2;
        case '/':
            return num1 ** num2;
        default:
            return "Error: Invalid operator.";
    }
}

function calculate(num1, num2, operator) {

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
           return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return "Error: Division by zero.";
            }
            return num1 / num2;
        default:
            return "Error: Invalid operator.";
    }
}

let res;

if (prob<0.1) {
    
    res = faulty_calculate(num1, num2, operator);
    
}
else {
    res = calculate(num1, num2, operator);
}

console.log("Result: " + res);
alert("Result: " + res);