let input1 = document.getElementById('name1');
let input2 = document.getElementById('name2');
let inputError1 = document.querySelector('.name1-error');
let inputError2 = document.querySelector('.name2-error');
let sumbitButton = document.querySelector('#submitBtn');
sumbitButton.addEventListener('click', validateForm);
let resultContainer = document.querySelector('.flames-container');
let formContainer = document.querySelector('.form-container');
let resultObject = [
    {
        key:'f',
        name:'Friends',
        img:'friends',
        text:'are',
        qoute:'A friend is one who overlooks your broken fence and admires the flowers in your garden.'
    },
    {
        key:'l',
        name:'Lovers',
        img:'lovers',
        text:'are',
        qoute:'Where the is love there is life.'
    },
    {
        key:'a',
        name:'Affectionate',
        img:'affection',
        text:'are',
        qoute:'There is no power greater than true affection.'
    },
    {
        key:'m',
        name:'Marry',
        img:'marraige',
        text:'will',
        qoute:'Life is a crazy ride. It\'s privilege to go through it with a partner.'
    },
    {
        key:'e',
        name:'Enemies',
        img:'enemy',
        text:'are',
        qoute:'A thousand known enemies are better than on unknown enemy.'
    },
    {
        key:'s',
        name:'Siblings',
        img:'siblings',
        text:'are',
        qoute:'Having lots of sibilings is like having built-in best friends.'
    }
]

var specialCharacterRegex = /[\d`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function validateForm(event) {
    let string1 = input1.value;
    let string2 = input2.value;
    if (!checkEmptyValue(string1,inputError1) || !checkEmptyValue(string2,inputError2) ) {
        return false;
    }
    if (!checkSpecialCharacter(string1, inputError1) || !checkSpecialCharacter(string2, inputError2)) {
        return false;
    }

    let flamesResult = applyFlames(string1,string2);
    let resultDetails = resultObject.filter(x=>x.key == flamesResult);

    showResultContainer(resultDetails[0], string1,string2);
}

function checkSpecialCharacter(input, element) {
    if (specialCharacterRegex.test(input)) {
        let error = document.createElement('p')
        error.innerHTML = "Name should not contain number or special characters."
        element.appendChild(error);
        return false;
    }
    return true;
}

function checkEmptyValue(string,element) {
    if (string.length <= 0) {
        if(!element.hasChildNodes()) {
            let error = document.createElement('p')
            error.innerHTML = "Please enter a name."
            element.appendChild(error);
        }
        return false;
    } else {
        if (element.hasChildNodes()) {
            element.removeChild(element.firstElementChild);
        }
    }
    return true;
}

function applyFlames(string1, string2) {
    let strAr1 = string1.replace(/\s/g, "").split("");
    let strAr2 = string2.replace(/\s/g, "").split("");
    let temp1 = [...strAr1];
    temp1.filter((x,i) => {
        if (strAr2.indexOf(x) > -1) {
            strAr2.splice(strAr2.indexOf(x),1);
            if (strAr1.indexOf(x) > -1) {
                strAr1.splice(strAr1.indexOf(x),1);
            }
        }
    });
    let finalString = [...strAr1,...strAr2];

    let inputCount = finalString.length;
    let flamesStr = ['f','l','a','m','e','s'];
    while (flamesStr.length != 1) {
        let rotatedElement = rotateArrayAndGetTheFirstElement(flamesStr, inputCount) 
        flamesStr.splice(flamesStr.indexOf(rotatedElement), 1);

    }
    return flamesStr[0];
}

function rotateArrayAndGetTheFirstElement([...arr], count) {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr[arr.length-1];
}

function showResultContainer(details,string1,string2) {
    let htmlString = `<div class="result-div">
    <p class="names"><span>${string1}</span> & <span>${string2}</span> ${details.text}</p>
    <p class="result-msg">${details.name}</p>
  </div>
  <div class="flames-img">
    <img src="./images/${details.img}.svg" alt="">
    <div class="qoute">
        <p>"${details.qoute}"</p>
    </div>
  </div><button id="backBtn" onClick="showForm()">Back</button>`;
    resultContainer.innerHTML = htmlString;
    resultContainer.classList.remove('hide');
    formContainer.classList.add('hide');
}

function showForm() {
    resultContainer.classList.add('hide');
    formContainer.classList.remove('hide');
}