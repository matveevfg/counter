let submitButton = document.querySelector('#submit');
let clearFields = document.querySelector('#clear-fields');
let weight = document.querySelector('#weight');
let height = document.querySelector('#height');
let age = document.querySelector('#age');

const NORMACALORIESFORMAN = ((10 * weight.value) + (6,25 * height.value) - (5 * age.value) + 5)
const NORMACALORIESFORWOMAN = ((10 * weight.value) + (6,25 * height.value) - (5 * age.value) - 161)

let radioGroup = document.querySelectorAll('.activity');
let caloryInfoBlock = document.querySelector('.counter__result');
let inputFields = Array.from(document.querySelectorAll('.input-fields'));

function checkInputs() {
    if (inputFields.some(elem => elem.value !== "")) {
        clearFields.disabled = false;
    } else {
        clearFields.disabled = true;
    }
    if (inputFields.every(elem => elem.value !== "")) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }

}

function SetCalory() {
    let activityCoefficients = 1;

    if (document.querySelector('#activity-minimal').checked = true){
        activityCoefficients = 1.2;
    } else if (document.querySelector('#activity-low').checked = true){
        activityCoefficients = 1.375;
    } else if (document.querySelector('#activity-medium').checked = true){
        activityCoefficients = 1.55;
    } else if (document.querySelector('#activity-high').checked = true){
        activityCoefficients = 1.725;
    } else if (document.querySelector('#activity-maximal').checked = true){
        activityCoefficients = 1.9;
    }

    if (document.querySelector('#gender-male').checked) {
        document.querySelector('#calories-norm').textContent = NORMACALORIESFORMAN * activityCoefficients
    } else {
        document.querySelector('#calories-norm').textContent = NORMACALORIESFORWOMAN * activityCoefficients
    }
    
    document.querySelector('#calories-minimal').textContent = Math.round(document.querySelector('#calories-norm').textContent * 0.85) 
    document.querySelector('#calories-maximal').textContent = Math.round(document.querySelector('#calories-norm').textContent * 1.15) 
}

inputFields.forEach(function(elem) {
  elem.addEventListener('input', checkInputs);
});

clearFields.addEventListener('click', function() {
    radioGroup.forEach(e => { 
        e.checked = false 
    })
    radioGroup[0].checked = true
    clearFields.disabled = true;
    submitButton.disabled = true;
    document.querySelector('#gender-male').checked = true;
    document.querySelector('#gender-female').checked = false;
    inputFields.forEach(elem => {
        elem.value = "";
    })
    caloryInfoBlock.classList.add('counter__result--hidden')
})

document.querySelector('#submit').addEventListener('click', function(evt) {
    evt.preventDefault()
    
    SetCalory()
   
    if (caloryInfoBlock.classList.contains('counter__result--hidden')) {
        caloryInfoBlock.classList.remove('counter__result--hidden')
    }
})