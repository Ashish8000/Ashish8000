// Faulty Calculator
// This calculator has a 10% chance of returning incorrect results.
// It randomly decides whether to use the faulty calculation or the correct one.
// The faulty calculator has the following errors:
// 1. Addition returns subtraction.
// 2. Subtraction returns division.
// 3. Multiplication returns addition.
// 4. Division returns exponentiation.
// The correct calculator works as expected.
// The user is prompted to enter two numbers and an operator.
// The result is displayed in the console and an alert.
// The user can test the faulty calculator by running this code multiple times. 
// The code is written in JavaScript.
console.log("Welcome to the Faulty Calculator!");

let prob = Math.random();
console.log("Probability: " + prob);


let n1 = prompt("Enter first number:");
let num1 = parseFloat(n1);
let n2 = prompt("Enter second number:");
let num2 = parseFloat(n2);

let operator = prompt("Enter operator (+, -, *, /):");
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