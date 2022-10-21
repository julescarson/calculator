//bedmas
operations = [
    {
        name: "exp",
        math: function exp(x, y) { return x ** y; },
        symb: `^`,
        order: 1,
    },
    {
        name: `division`,
        math: function divide(x, y) { return x / y; },
        symb: `/`,
        order: 2,
    },
    {
        name: `multiplication`,
        math: function times(x, y) { return x * y; },
        symb: `*`,
        order: 3,
    },
    {
        name: `addition`,
        math: function add(x, y) { return x + y; },
        symb: `+`,
        order: 4,
    },
    {
        name: `subtraction`,
        math: function subtract(x, y) { return x - y; },
        symb: `-`,
        order: 5,
    },

];

/* ---------------------- STACKS ----------------------------
1. braces counter, +1 for opening, -1 for closing
2. evaluate between indices where stacks same level
3. section has *math* done on it
4. splice back into larger eq AND remove braces
5. account for '*' operators if brace beside Number
5. repeat until stack count is 0 ~ or single index array ~
6. return a Number
------------------------------------------------------------*/

// TESTING 
const testing = true;
const test_recreateEq = false;
const test_once = true;
const test = true;



//eq array examples
let arr1 = [`(`, 55, `+`, 45, `-`, 85, `-`, 12, `*`, 6, `)`];
let arr2 = [`(`, 55, `+`, 45, `-`, `(`, 85, `-`, 12, `)`, `*`, 6, `)`];
let arr3 = [`(`, 55, `+`, 45, `(`, 9, `-`, 7, `(`, 85, `-`, 17, `)`, `*`, 6, `)`, `)`];
let arr4 = [`(`, 55, `+`, 45, `)`, 9, `-`, 7, `(`, 85, `-`, 17, `)`]
let arr5 = ['(', 55, '+', 45, ')', 9, '-', 7, '*', 68]

//itialize vars
let stacksArr = []; // [`open/close, index (original pos in equation), stack number]
//let cstacks = []
let pairs = [];
let blockAns = 0;
let blockLength = 0;
let currentStack = 0;
let check = true;

//vars
let result = new Number;
let opAns = new Number;
let opcounter = new Number;
let orderlevel = 1;

//first pass
let ARR = Array.from(arr3);
if (testing) {
    console.table(ARR);
}

//attempt
parseEq(ARR);

//reset
function clearVars() {
    stacksArr = [];
    blockAns = 0;
    blockLength = 0;
    currentStack = 0;

}

//fn's req'd - validation should go here
function parseEq(arr) {
    stack(arr);
    prepareStack(arr, pairs);
    order()
}

//creates stackPairs[`open/close`, index, stacknum]
function stack(arr) {
    let cstack = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == `(`) {
            cstack++;
            stacksArr.push([`open`, i, cstack]);
        } else if (arr[i] == `)`) {
            stacksArr.push([`close`, i, cstack]);
            cstack--;
        }
    }
    indexPair(stacksArr);
}

//pairs [open, close] @ stack level
function indexPair(arr) {
    let opens = [];
    let closes = [];
    let highest = new Number;

    arr.forEach(e => {
        if (e[2] > highest) {
            highest = e[2];
        }
    });

    for (i = 0; i < arr.length; i++) {
        if (arr[i][2] == highest) {
            if (arr[i][0] == `open`) {
                opens.push(arr[i][1]);
            }
            if (arr[i][0] == `close`) {
                closes.push(arr[i][1]);
            }
        }
    }
    //[open,close] pair array    
    //opening smaller than closing    
    //no same open values (close logic covered in this case)
    opens.forEach((o) => {
        closes.forEach((c) => {
            if (o < c) {
                if (pairs[0] != o[0]) {
                    pairs.push(o, c);
                }
                pairs.push([o, c]);
            }
        });
    });
}

//block[] = new array for stack only 
function prepareStack(arr, pair) {
    let block = [];
    let currentPair = pair[0]; //in case more than 1 @ same stack level
    blockLength = 0;

    // [o,c] indices, find length between for original arr
    // push in between values to new separate stack 
    for (i = pair[0][0]; i < pair[0][1] - 1; i++) {
        block.push(arr[i + 1]);
        blockLength++;
    }
    console.log(block);
    parseBlock(block);
}

//validity check -> calculate or throw error
function parseBlock(arr) {
    let error = false;
    let checker = arr;
    let str = checker.join(``);
    let testChars = [`+`, `*`, `/`, `^`]
    let rbrace = 0;
    let lbrace = 0;

    if (testing) {
        console.log(
            `str:`, str,
            `block:`, arr,
        );
    }


    for (i = 0; i < str.length; i++) {
        //double operators
        if ((testChars.includes(str.charAt(i)) && testChars.includes(str.charAt(i - 1))) ||
            (testChars.includes(str.charAt(i)) && testChars.includes(str.charAt(i + 1)))) {
            error = true;
            return error;
        }
        //brace & operators
        if (str.charAt(i) == `(` && testChars.includes(str.charAt(i + 1))) {
            error = true;
            return error;
        }
        if (str.charAt(i) == `)` && testChars.includes(str.charAt(i - 1))) {
            error = true;
            return error;
        }
        if (str.charAt(i) == `)`) { rbrace++; }
        if (str.charAt(i) == `(`) { lbrace++; }

    }

    //empty braces, uneven brace number
    if (str.includes(`()`) || rbrace != lbrace) {
        error = true;
        return error;
    }

    //equation passed/failed valid check
    if (error === false) {
        order(arr);
    } else {
        return 0;
    }
}

//operator hierarchy
function order(arr) {
    let osymb = operations[orderlevel - 1].symb;

    if (test) {
        console.log(`orderlevel`, orderlevel,
            `arr (block)`, arr)
    }

    for (i = 0; i < arr.length; i++) {

        let value1 = Number([arr[i - 1]]);
        let value2 = Number([arr[i + 1]]);
        let op = arr[i];
        operate(arr, i - 1, value1, value2, op, orderlevel);
    }
    //order symbol loop
    while (arr.includes(osymb)) {
        console.log('includes', osymb);
        order(arr);
    }
    //order level loop
    while (orderlevel < 5) {
        orderlevel++;
        order(arr);
    }
    result = arr[0];
}

//do math
function operate(arr, index, x, y, operator, hierarchy) {
    operations.forEach(e => {
        if (operator == e.symb && e.order == hierarchy) {
            opAns = e.math(x, y);
            arr.splice(index, 3, opAns);
        }
    });
}

//update eq after doing math on a block
//old args : arr, index, length, ans 
function recreateEq(arr, bresult, length, ans) {
    let openPos = index[0];
    let closePos = index[1];

    //splice(start, deletecount, replace1,2,3,....)
    let replaceClose = (replace) => { arr.splice(closePos, 1, replace); }
    let removeClose = () => { arr.splice(closePos, 1) }

    let replaceOpen = (replace) => { arr.splice(openPos, 1, replace); }
    let removeOpen = () => { arr.splice(openPos, 1); }

    //close
    switch (typeof arr[closePos + 1]) {
        case `string`:
            removeClose();
            break;
        case `number`:
            replaceClose(`*`);
            break;
        case `undefined`:
            removeClose();
        default:
            break;
    }

    //open
    switch (typeof arr[openPos - 1]) {
        case `string`:
            removeOpen();
            break;
        case `number`:
            replaceOpen(`*`);
            break;
        case `undefined`:
            removeOpen();
        default:
            break;
    }
    //splice in answer     
    arr.splice(openPos, 1, ans);

}


//---- end

//         arr.splice(2, 1);
//         arr.splice(0, 1);