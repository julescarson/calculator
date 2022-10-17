
// DOM
const content = document.querySelector('.content');
const calcText = document.createElement('div');
const ansText = document.createElement('text');

calcText.classList.add('calcDisplay');
content.appendChild(calcText);

ansText.setAttribute('type', 'text');
ansText.classList.add('ansText');
calcText.appendChild(ansText);


//acceptable calculator buttons
const calcBtn = {
    numKeys: [`9`, `8`, `7`, `6`, `5`, `4`, `3`, `2`, `1`, `0`],
    operations: [`/`, `*`, `+`, '-'],
    brackets: ['(', `)`],
    functions: [`Enter`, `Delete`, `Backspace`],
    get allKeys() {
        return this.numKeys + this.operations + this.brackets + this.functions;
    },
}

let equationString = ``;
let equationArray = [];
let enterKey = true;
let allowDecimal = true;



document.addEventListener('keydown', (e) => {

    if (calcBtn.allKeys.includes(e.key)) {
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
                //multiply against closing brace
                if (lastKey(2) == ')') {
                    keyToStr(` * `);
                }
                keyToStr(e.key);
                showEq();
                break;

            case '+':
            case `*`:
            case `/`:
                //not after (, not first, not twice in a row
                if ((lastKey(2) != '(') && (equationString.length >= 1) && (!calcBtn.operations.includes(lastKey(2)))) {
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
                } else if (lastKey(2) == `-`) {

                }
                break;

            case `(`:
                //insert * multiplying braces         
                if (lastKey(2) == `)` || calcBtn.numKeys.includes(lastKey(2))) {
                    keyToStr(` * `);
                }
                keyToStr(` ${e.key} `);
                showEq();
                break;

            case `)`:
                //no empty braces, don't start on closed
                if (equationString.length >= 1 && lastKey(2) != '(') {
                    keyToStr(` ${e.key} `);
                    showEq();
                }
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
                //remove fn?
                console.log('backspace');
                equationString = removeLast(equationString);
                showEq();

                break;

            case `Enter`:
                if (!calcBtn.operations.includes(lastKey(2))) {
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
//syntax error display
//clear button!!



//keypress related
function keyToStr(k) { equationString += k; }
function showEq() { ansText.textContent = equationString; }
function lastKey(n) { return equationString[(equationString.length - n)]; }

//add second argument ?
function removeLast(str) {
    let temp = str.split('');
    temp.splice(temp.length - 1, 1);
    return temp.join('');
}





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
        if (!calcBtn.operations.includes(arr[i]) && !calcBtn.brackets.includes(arr[i])) {
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
                return plus(equationArray[i - 1], equationArray[i + 1]);
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





