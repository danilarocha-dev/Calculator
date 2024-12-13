const display = document.getElementById('calculator-display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value) {
            currentInput += value;
            display.value = currentInput;
        } else if (action === 'clear') {
            currentInput = '';
            display.value = '0';
        } else if (action === 'calculate') {
            const result = evaluateExpression(currentInput);
            currentInput = result.toString();
            display.value = currentInput;
        } else {
            operator = value;
            currentInput += operator;
            display.value = currentInput;
        }
    });
});

function evaluateExpression(expression) {
    const numbers = expression.split(/[+-\/*]/);
    const operators = expression.match(/[+-\/*]/g);

    let result = parseFloat(numbers[0]);

    for (let i = 0; i < operators.length; i++) {
        const currentOperator = operators[i];
        const nextNumber = parseFloat(numbers[i + 1]);

        switch (currentOperator) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                result /= nextNumber;
                break;
        }
    }

    return result;
}