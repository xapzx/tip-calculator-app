const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const peopleError = document.querySelector('.people-error');
const tipItems = document.querySelectorAll('.input-tip-item:not(.input-tip-item-custom)');
const inputs = document.querySelectorAll('.inputs input:not(.input-tip-item-custom)');
const inputsAll = document.querySelectorAll('input');
const customTip = document.querySelector('.input-tip-item-custom');
const resetBtn = document.querySelector('.reset');
const output = document.querySelectorAll('.tip-amount-output');
const tipOutput = document.querySelector('.tip-output');
const totalOutput = document.querySelector('.total-output');

// Validate Number of people input
// "0" invokes error styling
function validatePeople() {
    if(people.value === "0") {
        people.classList.add('error');
        peopleError.style.display = "block";
    } else {
        people.classList.remove('error');
        peopleError.style.display = "none";
    }
}

// Sets data attribute (data-tip) of selected tip item and removes for all others
function setSelectedTip(selected) {
    tipItems.forEach(tip => {
        if(selected === tip) {
            tip.setAttribute('data-tip', "true");
        } else {
            tip.setAttribute('data-tip', "false");
        }
    });
}

// Check if all required input fields are filled
function checkAllFilled() {
    let filled = true;

    inputs.forEach(input => {
        if(input.value === "") {
            filled = false;
        }
    })
    return filled;
}

// Check if tip has been selected
function checkSelectedTip() {
    let selected = false;
    tipItems.forEach(item => {
        if(item.getAttribute('data-tip') === "true") {
            selected = true;
        }
    })
    return selected;
}

// Check if a custom tip has been inputted
function checkCustomTip() {
    if(customTip.value === "") {
        return false;
    }
    return true;
}

// Clear all fields and output
function reset() {
    inputsAll.forEach(input => {
        input.value = "";
    });

    tipItems.forEach(item => {
        item.setAttribute('data-tip', "false");
    });

    output.forEach(content => {
        content.innerText = "$0.00";
    })

    resetBtn.setAttribute('data-disabled', 'true');
}

// Calculate tip per person
function calculateTip() {
    let totalTip = 0;
    let tip = 0;
    if(checkSelectedTip()) {
        tipItems.forEach(item => {
            if(item.getAttribute('data-tip') === "true") {
                tip = parseFloat(item.getAttribute('data-value'));
            }
        });
        totalTip = parseFloat(bill.value) * tip / parseInt(people.value);
    } else {
        tip = parseFloat(customTip.value) / 100;
        totalTip = parseFloat(bill.value) * tip / parseInt(people.value);
    }

    return totalTip.toFixed(2);
}

// Calculate total per person
function calculateTotal() {
    const total = (parseFloat(bill.value) / parseFloat(people.value)) + parseFloat(calculateTip());
    return  total.toFixed(2);
}

// Check if all input fields are filled
// Activate reset button if all filled
function setButtonStatus() {
    if((checkSelectedTip() && checkAllFilled()) || (checkCustomTip() && checkAllFilled())) {
        resetBtn.setAttribute('data-disabled', 'false');
        tipOutput.innerText = "$" + calculateTip();
        totalOutput.innerText = "$" + calculateTotal();
    } else {
        resetBtn.setAttribute('data-disabled', 'true');
    }
}

// Add event for each Tip "button"
tipItems.forEach(tip => {
    tip.addEventListener('click', () => {
        setSelectedTip(tip);
        setButtonStatus();
    });
});

// Event for people input
people.addEventListener('keyup', validatePeople);

// Check fields with each input
inputs.forEach(input => {
    input.addEventListener('keyup', setButtonStatus);
});

customTip.addEventListener('keyup', setButtonStatus);

// Reset button disabled unless all required fields are filled
resetBtn.addEventListener('click', () => {
    if(resetBtn.getAttribute('data-disabled') === "false") {
        reset();
    }
});