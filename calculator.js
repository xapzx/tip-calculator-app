const people = document.querySelector('#people');
const peopleError = document.querySelector('.people-error');
const tipItems = document.querySelectorAll('.input-tip-item:not(.input-tip-item-custom)');

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

// Add event for each Tip "button"
tipItems.forEach(tip => {
    tip.addEventListener('click', () => {
        setSelectedTip(tip);
    });
});

// Event for people input
people.addEventListener('keyup', validatePeople);
