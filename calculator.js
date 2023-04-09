const people = document.querySelector('#people');
const peopleError = document.querySelector('.people-error');
const tipItems = document.querySelectorAll('.input-tip-item:not(.input-tip-item-custom)');
const inputs = document.querySelectorAll('input:not(.input-tip-item-custom)');
const customTip = document.querySelector('.input-tip-item-custom');
const resetBtn = document.querySelector('.reset');

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

// Check if tip has been selected/inputted
function checkSelectedTip() {
    let selected = false;
    tipItems.forEach(item => {
        if(item.getAttribute('data-tip') === "true") {
            selected = true;
        }
    })
    
    if(!selected && customTip.value === "") {
        return false;
    } else {
        return true;
    }
}

// Check if all input fields are filled
// Activate reset button if all filled
function setButtonStatus() {
    if(checkSelectedTip() && checkAllFilled()) {
        resetBtn.setAttribute('data-disabled', 'false');
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
