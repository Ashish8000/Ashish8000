let num1 = parseInt(prompt("Enter the number:"))


const fact = (n)=>{
    let ans = 1;
    for (let i = 1; i <= num1; i++) {
    ans *= i
    }
    return ans;
}

let answer = fact(num1); 
alert(`The factorial of ${num1} is ${answer}`);

