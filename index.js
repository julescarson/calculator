
// DOM
const content = document.querySelector('.content');
const calcText = document.createElement('div');
const ansText = document.createElement('text');

calcText.classList.add('calcDisplay');
content.appendChild(calcText);

ansText.setAttribute('type', 'text');
ansText.classList.add('ansText');
calcText.appendChild(ansText);


//buttons obj
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
let brackets = false;



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
                //not 3 in a row
                if (lastKey(5) != `-`) {
                    keyToStr(` ${e.key} `);
                    showEq();
                    allowDecimal = true;
                }

                break;

            case `(`:
                //insert * multiplying braces         
                if (lastKey(2) == `)` || calcBtn.numKeys.includes(lastKey(2))) {
                    keyToStr(` * `);
                }
                keyToStr(` ${e.key} `);
                showEq();
                brackets = true;
                break;

            case `)`:
                //no empty braces, don't start on closed
                if (equationString.length >= 1 && lastKey(2) != '(') {
                    keyToStr(` ${e.key} `);
                    showEq();
                }
                break;

            case `.`:
                //check for decimals already
                if (allowDecimal) {
                    keyToStr(e.key);
                    allowDecimal = false;
                }
                console.log(equationString);
                showEq();
                break;

            case `Delete`:
            case `Backspace`:
                console.log('backspace');
                equationString = removeLast(equationString);
                showEq();

                break;

            case `Enter`:
                //last not '(', last not operator, same number opening closes braces
                if ((lastKey(2) != `(`) && (!calcBtn.operations.includes(lastKey(2)))) {
                    showEq();

                    //cleaning up array we will use to calculate
                    equationArray = equationString.split(` `);
                    dropSpaces(equationArray);
                    arrToNums(equationArray);
                    doubleNegative(equationArray);
                    console.log(equationArray);



                    // while array conatains brackets -> brackets() call


                    // do math on no bracket array
                }

                break;
            default:
                break;

        }

    }


});
//error messages?
//clear button!!



//onkeypress related
function keyToStr(k) { equationString += k; }
function showEq() { ansText.textContent = equationString; }
function lastKey(n) { return equationString[(equationString.length - n)]; }

//backspace/delete key
function removeLast(str) {
    let temp = str.split('');
    temp.splice(temp.length - 1, 1);
    return temp.join('');
}

//double negative
function doubleNegative(arr) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == `-` && arr[i + 1] == `-`) {
            //@index, n remove, replace value
            arr.splice(i, 2, `+`)
        }
    }
    return arr;
}

//drop spaces
function dropSpaces(arr) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == ``) {
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

/// while (arr contains brackets, loop through, remove inner)








function mathOrder(arr) {

    //brace indices arrays
    let opened = [];
    let closed = [];

    for (i = 0; i < arr.length; i++) {
        if (arr[i] == ')') {
            closed.push(i);
        } else if (arr[i] == '(') {
            opened.push(i);
        }
    }

    let close = closed[0];
    let open = new Number;

    for (i = 0; i < closed.length; i++) {
        if (opened[i] > closed[0]) {
            open = opened[i - 1];
        } else {
            open = arr.lastIndexOf(`(`) + 1;
        }
    }

    //test
    console.log(opened);
    console.log(closed);
    console.log(`opened: ${open} closed: ${close}`);




    //iterate from inner most to next closing brace
    for (i = open; i < close; i++) {






        // switch (arr[i]) {
        //     case `^`:
        //         break;
        //     case `/`:
        //         break;
        //     case `*`:
        //         break;
        //     case `-`:
        //         break;

        //     case `+`:                

        //         break;

        //     default:
        //         break;

        // }
    }

    console.log(arr);

}

// }





// clear

// additional operators? pi, sin, cos, tan, exp, ln, root, e, 

// ico url gfx

// first display for full calculation

// second display for results

// github / connect projects?

