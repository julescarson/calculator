
// DOM
const content = document.querySelector('.content');
const calcText = document.createElement('input');
const ansText = document.createElement('text');



calcText.oninput = function () { equals() };


calcText.setAttribute('type', 'text');
calcText.classList.add('calcDisplay');
content.appendChild(calcText);


ansText.setAttribute('type', 'text');
ansText.classList.add('ansText');
content.appendChild(ansText);



let acceptableKeys = [`9`, `8`, `7`, `6`, `5`, `4`, `3`, `2`, `1`, `0`, `.`, `/`, `*`, `-`, `+`, `Enter`, `Delete`, `(`, ')'];
let operators = [`/`, `*`, `+`];
let equationString = ``;
let equationArray = [];




let enterKey = true;

document.addEventListener('keydown', (e) => {


    if (acceptableKeys.includes(e.key)) {


        switch (e.key) {
            case `9`:
            case `8`:
            case `7`:
            case `6`:
            case `5`:
            case `4`:
            case `3`:
            case `2`:
            case `1`:
            case `0`:
                keyToStr(e.key);
                showEq();
                break;

            case '+':
            case `*`:
            case `/`:
                if (!operators.includes(lastKey())) {
                    keyToStr(` ${e.key} `);
                    showEq();
                }
                break;

            case `-`:

                break;

            case `(`:
            case `)`:
                keyToStr(` ${e.key} `);
                showEq();
                break;

            case `.`:
                break;
            case `Delete`:
            case `Backspace`:
                break;
            case `Enter`:
                if (!operators.includes(lastKey())) {
                    showEq();
                    console.log(equationString);
                    equationArray = equationString.split(` `);

                    //drop remaining ` ` spaces
                    dropSpaces(equationArray);
                    doMath(equationArray);


                }



                //fn call to do the math

                break;
            default:
                break;

        }



    }


});



function newEquation() {

}


let bL = findOpIndex(`(`, equationArray);
let bR = findOpIndex(`)`, equationArray);
let e = findOpIndex(`^`, equationArray);
let d = findOpIndex(`/`, equationArray);
let m = findOpIndex(`*`, equationArray);
let a = findOpIndex(`+`, equationArray);
let s = findOpIndex(`-`, equationArray);


//find indices where passed operator occurs
function findOpIndex(op, arr) {
    let opIndices = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == op) {
            opIndices.push(i);
        }
    }
    return opIndices;
}







function doMath(arr) {


}


function keyToStr(k) {
    equationString += k;
}

function showEq() {
    ansText.textContent = equationString;
}
function lastKey() {
    return equationString[(equationString.length - 2)];
}

function dropSpaces(arr) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == ``) {
            console.log(i);
        }
    }
}

// BEDMAS






// add
function plus(x, y) {
    return x + y;
}

// subtract
function minus(x, y) {
    return x - y;
}

// multiply
function times(x, y) {
    return x * y;
}

// divide
function divide(x, y) {
    return x / y;
}



// equals

// clear

// additional operators?

// ico url gfx

// first display for full calculation

// second display for results

// github / connect projects?






function operate(operation, n1, n2) {

}