// Calculator variables
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

// DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Update display function
function updateDisplay() {
    display.textContent = currentInput;
}

// Append number function
function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Choose operation function
function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    shouldResetScreen = true;
}

// Calculate function
function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                computation = 'Error';
            } else {
                computation = prev / current;
            }
            break;
        default:
            return;
    }
    
    currentInput = computation.toString();
    operation = null;
    previousInput = '';
    shouldResetScreen = true;
}

// Clear function
function clear() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// Decimal point function
function appendDecimal() {
    if (shouldResetScreen) {
        currentInput = '0.';
        shouldResetScreen = false;
        return;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        // Add jump effect to equals button only
        if (value === '=') {
            // Add the jumping animation class
            display.classList.add('jumping');
            
            // Remove the class after animation completes
            setTimeout(() => {
                display.classList.remove('jumping');
            }, 500);
            
            calculate();
        } else if (value === 'C') {
            clear();
        } else if (['+', '-', '*', '/'].includes(value)) {
            chooseOperation(value);
        } else if (value === '.') {
            appendDecimal();
        } else {
            appendNumber(value);
        }
        
        updateDisplay();
    });
});

// Handle keyboard input
document.addEventListener('keydown', event => {
    const key = event.key;
    
    // Add jump effect when pressing '=' key
    if (key === '=') {
        // Add the jumping animation class
        display.classList.add('jumping');
        
        // Remove the class after animation completes
        setTimeout(() => {
            display.classList.remove('jumping');
        }, 500);
    }
    
    // Handle other keys
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (['+', '-', '*', '/'].includes(key)) {
        chooseOperation(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clear();
    }
});

// Initialize display
updateDisplay();