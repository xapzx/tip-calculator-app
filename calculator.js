const people = document.querySelector('#people');
const peopleError = document.querySelector('.people-error');
const tipItems = document.querySelectorAll('.input-tip-item:not(.input-tip-item-custom)');

function validatePeople() {
    if(people.value === "0") {
        people.classList.add('error');
        peopleError.style.display = "block";
    } else {
        people.classList.remove('error');
        peopleError.style.display = "none";
    }
}

function setSelectedTip(selected) {
    tipItems.forEach(tip => {
        if(selected === tip) {
            tip.setAttribute('data-tip', "true");
        } else {
            tip.setAttribute('data-tip', "false");
        }
    });
}

tipItems.forEach(tip => {
    tip.addEventListener('click', () => {
        setSelectedTip(tip);
    });
});

people.addEventListener('keyup', validatePeople);
