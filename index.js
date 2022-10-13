
// DOM
const content = document.querySelector('.content');
const calcText = document.createElement('div');
const ansText = document.createElement('text');



// calcText.oninput = function () { equals() };



calcText.classList.add('calcDisplay');
content.appendChild(calcText);


ansText.setAttribute('type', 'text');
ansText.classList.add('ansText');
calcText.appendChild(ansText);



let acceptableKeys = [`9`, `8`, `7`, `6`, `5`, `4`, `3`, `2`, `1`, `0`, `.`, `/`, `*`, `-`, `+`, `Enter`, `Delete`, `(`, ')'];
let operators = [`/`, `*`, `+`, '-'];
let brackets = ['(', `)`];
let equationString = ``;
let equationArray = [];




//acceptable keys as object, include arrays inside




let enterKey = true;
let allowDecimal = true;

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
                if (!operators.includes(lastKey(2))) {
                    keyToStr(` ${e.key} `);
                    showEq();
                    allowDecimal = true;
                }
                break;

            case `-`:
                if (lastKey(5) != `-`) {
                    keyToStr(` ${e.key} `);
                    showEq();
                    allowDecimal = true;
                }
                break;

            case `(`:
            case `)`:
                keyToStr(` ${e.key} `);
                showEq();
                break;

            case `.`:
                if (allowDecimal) {
                    keyToStr(e.key);
                    allowDecimal = false;

                }


                //check decimal in prev 


                console.log(equationString);


                showEq();
                break;
            case `Delete`:
            case `Backspace`:
                break;
            case `Enter`:
                if (!operators.includes(lastKey(2))) {
                    showEq();
                    equationArray = equationString.split(` `);
                    dropSpaces(equationArray);
                    arrToNums(equationArray);
                    console.log(equationArray);

                    //brackets
                    newBL = Array.from(bL());
                    newBR = Array.from(bR());
                    b(newBL, newBR);
                }

                break;
            default:
                break;

        }

    }


});

//keypress related
function keyToStr(k) { equationString += k; }
function showEq() { ansText.textContent = equationString; }
function lastKey(n) { return equationString[(equationString.length - n)]; }




// arrays of operator indices

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

//drop spaces
function dropSpaces(arr) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == ``) {
            console.log(i);
            arr.splice(i, 1);
        }
    }
    return arr;
}

//typecast numbers
function arrToNums(arr) {
    for (i = 0; i < arr.length; i++) {
        if (!operators.includes(arr[i]) && !brackets.includes(arr[i])) {
            arr[i] = Number(arr[i]);
        }
    }
    return arr;
}





// *************** MATH ****************** //

// brackets

let newBL = [];
let newBR = [];


const bL = () => findOpIndex(`(`, equationArray);
const bR = () => findOpIndex(`)`, equationArray);

function b(l, r) {
    let innerCalc = [];




    //inner brackets
    for (i = equationArray.lastIndexOf('(') + 1; i < equationArray.indexOf(')'); i++) {
        let temp = []
        //console.log(i);
        //check for operators     
        let a = plus(equationArray[i - 1], equationArray[i + 1]);
        switch (equationArray[i]) {

            case `^`:
                break;
            case `/`:
                //console.log(`${equationArray[i - 1]} ${equationArray[i]} ${equationArray[i + 1]}`)

                break;
            case `*`:
                break;
            case `-`:
                break;
            case `+`:

                console.log(a);
                return a;
                break;

            default:
                break;
        }
        console.log(`a ${a}`);



    }

    //for (i=equationArray[l.length]; i < equationArray[r.length]; i++)




    // for (i = l.length; i < r[0]; i++) {
    //     console.log(i);
    //     innerCalc.push(equationsArray[i]);
    // }
    // console.log(innerCalc);
    return innerCalc;
}









// exponents

// division
function divide(x, y) {
    return x / y;
}

// multiplication
function times(x, y) {
    return x * y;
}

// addition
function plus(x, y) {
    return x + y;
}

// subtraction
function subtract(x, y) {
    return x - y;
}











// equals

// clear

// additional operators? pi, sin, cos, tan, exp, ln, root, e, 

// ico url gfx

// first display for full calculation

// second display for results

// github / connect projects?





