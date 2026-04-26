// Selecting DOM elements
const priceInput = document.getElementById('price');
const litersInput = document.getElementById('liters');
const calcButton = document.getElementById('calc-btn');
const outputDisplay = document.getElementById('total-output');

// Calculation Logic
function calculateTotal() {
    // Parsing values from inputs
    const currentPrice = parseFloat(priceInput.value);
    const currentLiters = parseFloat(litersInput.value);

    // Simple math check
    if (!isNaN(currentPrice) && !isNaN(currentLiters)) {
        const result = currentPrice * currentLiters;
        
        // Updating the display with formatted currency
        outputDisplay.innerText = `Total Cost: £${result.toFixed(2)}`;
    } else {
        outputDisplay.innerText = "Error: Invalid Input";
    }
}

// Event Listeners
calcButton.addEventListener('click', calculateTotal);