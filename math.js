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
let arr4 = [`(`, 55, `+`, 45, `)`, 9, `-`, 7, `(`, 85, `-`, 17, `)`];
let arr5 = ['(', 55, '+', 45, ')', 9, '-', 7, '*', 68];
let arr6 = [2, `^`, `(`, 2, `*`, 3, `)`];
let arr7 = [2, `^`, 2, `*`, 3];
let arr8 = [6];
let arr9 = ['(', '(', 55, '+', 45, '-', 73, '*', 6, ')', ')'];
let arr10 = ['(', '(', 100, '*', 9, '-', 7, '(', 85, '-', 17, ')', ')'];
let badarr1 = [55, `+`, `+`, 5];
let badarr2 = [55, `(`, `)`, 5];
let badarr3 = [55, `(`, `-`, 5];

//itialize vars
let stacksArr = []; // [`open/close, index (original pos in equation), stack number]
let stackpair = [];
let blockAns = 0;
let blockLength = 0;
let currentStack = 0;
let check = true;

//vars
let result = new Number;
let opAns = new Number;
let opcounter = new Number;
let orderlevel = 1;

//prep array
let ARR = Array.from(arr4);
//encapsulate in braces
ARR.unshift(`(`);
ARR.push(')');


//attempt
parseEq(ARR);

//reset
function clearVars() {
    stacksArr = []; // [`open/close, index (original pos in equation), stack number]
    stackpair = [];
    block = [];
    blockAns = 0;
    blockLength = 0;
    currentStack = 0;
    check = true;


    //vars
    result = 0;
    opAns = 0;
    opcounter = 0;
    orderlevel = 1;
}

//fn's req'd - validation should go here
function parseEq(arr) {
    stack(arr);
    prepareStack(arr, stackpair);
    reup(ARR, result);
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


    let h = 0;
    let cl = [];
    let op = [];
    let costack = [];


    stacksArr.forEach(e => {
        if (e[0] == `open`) {
            if (e[2] > h) {
                h = e[2];
            }
        }
    });

    stacksArr.forEach(e => {
        if (e[2] == h) {
            if (e[0] == `close`) {
                cl.push(e[1]);
            } else if (e[0] == `open`) {
                op.push(e[1]);
            }
        }
    });

    let x2 = Math.min(...cl);
    let x1 = 0;

    for (i = 0; i < op.length; i++) {
        if (op[i] > x1 && op[i] < x2) {
            x1 = op[i];
        }
    }
    stackpair = [x1, x2];

}

//block[] = new array for stack only 
function prepareStack(arr, currentpair) {
    let block = [];
    currentpair = stackpair;
    blockLength = 0;

    // [o,c] indices, find length between for original arr    
    for (i = currentpair[0]; i < currentpair[1] - 1; i++) {

        block.push(arr[i + 1]);
        blockLength++;
    }
    parseBlock(block);

}

//PASES ONLY CURRENT BLOCK TO ORDER!**
//validity check -> calculate or throw error
function parseBlock(arr) {
    let error = false;
    let checker = arr;
    let str = checker.join(``);
    let testChars = [`+`, `*`, `/`, `^`]
    let rbrace = 0;
    let lbrace = 0;

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
        console.log(
            `runs`, arr);

        order(arr);
    } else {
        return 0;
    }
}

//operator hierarchy
function order(arr) {
    let osymb = operations[orderlevel - 1].symb;

    for (i = 0; i < arr.length; i++) {

        let value1 = Number([arr[i - 1]]);
        let value2 = Number([arr[i + 1]]);
        let op = arr[i];
        operate(arr, i - 1, value1, value2, op, orderlevel);
    }
    //order symbols at current hierarchy
    while (arr.includes(osymb)) {
        order(arr);
    }
    //increment order level after all previous accounted for
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



function reup(arr, result) {



    let npairs = (stacksArr.length) / 2;
    let openPos = stackpair[0];
    let closePos = stackpair[1];
    let blength = stackpair[1] - stackpair[0] - 1;

    console.log(arr, npairs);

    // //splice(start, deletecount, replace1,2,3,....)
    let replaceClose = (replace) => { arr.splice(closePos, 1, replace); }
    let removeClose = () => { arr.splice(closePos, 1) }
    let replaceOpen = (replace) => { arr.splice(openPos, 1, replace); }
    let removeOpen = () => { arr.splice(openPos, 1); }





    //close
    switch (typeof arr[closePos + 1]) {
        case `number`:
            replaceClose(`*`);
            break;
        case `string`:
        case `undefined`:
        case undefined:
            removeClose();
        default:
            break;
    }
    //insert result
    arr.splice(openPos + 1, blength, result);
    console.log(arr);

    //open
    switch (typeof arr[openPos - 1]) {
        case `number`:
            replaceOpen(`*`);
            break;
        case `string`:
        case `undefined`:
        case undefined:
            removeOpen();
        default:
            break;
    }

    console.log(arr);
    clearVars();

    if (npairs > 1) {
        parseEq(arr);
    }
    console.log(arr[0]);
}

//---- end
