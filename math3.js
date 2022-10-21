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

//TESTING
let testing = true;
let test_reQuation = false;
let test_once = true;



//array tests
let arr1 = [`(`, 55, `+`, 45, `-`, 85, `-`, 12, `*`, 6, `)`];
let arr2 = [`(`, 55, `+`, 45, `-`, `(`, 85, `-`, 12, `)`, `*`, 6, `)`];
let arr3 = [`(`, 55, `+`, 45, `(`, 9, `-`, 7, `(`, 85, `-`, 17, `)`, `*`, 6, `)`, `)`];
let arr4 = [`(`, 55, `+`, 45, `)`, 9, `-`, 7, `(`, 85, `-`, 17, `)`]
let arr5 = ['(', 55, '+', 45, ')', 9, '-', 7, '*', 68]
let arr6 = [55, `+`, 45, `-`, 85, `-`, 12, `*`, 6];
let arr7 = [55, `+`, 45, `-`, 12];
let arr8 = [45, `*`, 1, `-`, 7];
let arr9 = [9, `/`, 3];
let arr10 = [8, `^`, 2];
let arr11 = [2, `^`, 2, `*`, 3];
let arr12 = [100, `-`, 72];

//itialize vars
let stacksArr = []; // [`open/close, index (original pos in equation), stack number]
let cstacks = []

let pairArr = [];
let pairs = [];
let blockAns = 0;
let blockLength = 0;
let currentStack = 0;
let check = true;




//first pass
let ARR = Array.from(arr3); // pass to (arr) in f'ns always

if (testing) {
    console.table(ARR);
}

doMath(ARR);

//output
function logVars() {
    console.log(arr4);
    console.log(ARR);
    console.log(stacksArr);
    console.log(pairArr);
    console.log(blockLength);
}

//reset
function clearVars() {
    stacksArr = [];
    pairArr = [];
    blockAns = 0;
    blockLength = 0;
    currentStack = 0;

}

//fn's req for calc -- validation should go here
function doMath(arr) {
    stack(arr);
    prepareStack(arr, pairs);
    reQuation(arr, pairArr, blockLength, blockAns);
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

//new array for stack only
function prepareStack(arr, pair) {
    let block = [];
    let currentPair = pair[0]; //in case more than 1 @ same stack level
    blockLength = 0;

    // [o,c] indices, find length between for original arr
    // push in between values to new separate stack 
    for (i = pair[0][0]; i < pair[1] - 1; i++) {
        block.push(arr[i + 1]);
        blockLength++;
    }
    eqOps(block);
}

//MATH2 FIXES
//check math symbols (MATH2: order() 'of operations')
function eqOps(arr) {
    arr.forEach(e => {
        for (i = 0; i < ops.length; i++) {
            // console.log(ops[i].name);
            if (ops[i].symb == e) {
                arrMath(arr, ops[i].math, ops[i].symb);
            }
        }
    });
}

//OPERATE MATH2 FIXES
//make calculations
function arrMath(arr, mathfn, opsymbol) {
    for (i = 0; i <= arr.length; i++) {
        if (arr[i] == opsymbol) {
            let operate = mathfn(arr[i - 1], arr[i + 1]);
            arr.splice(i - 1, 3, operate);
        }
    }
    if (arr.length == 3) {
        arr.splice(2, 1);
        arr.splice(0, 1);
    }
    blockAns = arr[0];
}

//REWRITE MATH2
function reQuation(arr, index, length, ans) {
    let openPos = index[0];
    let closePos = index[1];


    if (test_reQuation) {
        console.log(`\nequation passed:`, arr,
        );
        console.log(
            `\nbraces start, end:`, index,
            `\nlength-brackets:`, length,
            `\nequals:`, ans
        );
        console.log(
            `\nopen:`, arr[openPos], `index`, index[0],
            `\nclose:`, arr[closePos], `index`, index[1],
            `\nvalue to left:`, (arr[openPos - 1]), `type to left:`, typeof (arr[openPos - 1]),
            `\nvalue to right:`, (arr[closePos + 1]), `type to right:`, typeof (arr[closePos + 1]),
        )
    }



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

    //end test
    if (test_reQuation) {
        console.log(`\nequation after:`, arr,
        );
        console.log(
            `\nbraces start, end:`, index,
            `\nlength-brackets:`, length,
            `\nequals:`, ans
        );
        console.log(
            `\nopen value:`, arr[openPos], `index`, index[0],
            `\nclose:`, arr[closePos], `index`, index[1],
            `\nvalue to left:`, (arr[openPos - 1]), `type to left:`, typeof (arr[openPos - 1]),
            `\nvalue to right:`, (arr[closePos + 1]), `type to right:`, typeof (arr[closePos + 1]),
        )
    }
}






//test
const test = true;



let badarr1 = [55, `+`, `+`, 5];
let badarr2 = [55, `(`, `)`, 5];
let badarr3 = [55, `(`, `-`, 5];

//equation array -> new array that we modify
let ARR = Array.from(arr4); // <---

//vars
let _result = new Number;
let opAns = new Number;
let opcounter = new Number;
let orderlevel = 1;

//run it
parseEq(ARR);

//validity check -> calculate or throw error
function parseEq(arr) {
    let error = false;
    let checker = arr;
    let str = checker.join(``);
    let testChars = [`+`, `*`, `/`, `^`]
    let rbrace = 0;
    let lbrace = 0;

    if (test) {
        console.log(
            `str:`, str
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


    if (error === false) {
        order(ARR);
    }
}

//operator hierarchy
function order(arr) {
    let osymb = operations[orderlevel - 1].symb;

    if (test) {
        console.log(orderlevel, arr)
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

    _result = arr[0];

    if (test) {
        console.log(
            `\narray`, arr,
            `\n _result`, _result,
            `\nop[ol-1].sym`, operations[orderlevel - 1].symb,
            `\nolvl`, orderlevel,
            `\ncheck reloop on olvl`, arr.includes(operations[orderlevel - 1].symb),
        );
    }
}

//do math!
function operate(arr, index, x, y, operator, hierarchy) {
    operations.forEach(e => {
        if (operator == e.symb && e.order == hierarchy) {
            opAns = e.math(x, y);
            arr.splice(index, 3, opAns);
        }
    });
}


