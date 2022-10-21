ops = [

    {
        name: "divide",
        math: function add(x, y) { return x / y; },
        symb: `/`,
    },
    {
        name: "add",
        math: function add(x, y) { return x + y; },
        symb: `+`,
    },
    {
        name: "subtract",
        math: function add(x, y) { return x - y; },
        symb: `-`,
    },
    {
        name: "multiply",
        math: function add(x, y) { return x * y; },
        symb: `*`,
    },

];

/* ---------------------- STACKS ----------------------------
1. count braces, add 1 to right and left counters for braces
2. evaluate between indices where stack counters same level
3. section has *math* done on it
4. splice back into larger eq AND remove braces
5. account for '*' operators if brace beside Number
5. repeat until stack count is 0 ~ or single index array ~
6. return a Number
------------------------------------------------------------*/

//TESTING
let testing = true;
let test_reQuation = true;
let test_once = true;



//eq array examples
let arr1 = [`(`, 55, `+`, 45, `-`, 85, `-`, 12, `*`, 6, `)`];
let arr2 = [`(`, 55, `+`, 45, `-`, `(`, 85, `-`, 12, `)`, `*`, 6, `)`];
let arr3 = [`(`, 55, `+`, 45, `(`, 9, `-`, 7, `(`, 85, `-`, 17, `)`, `*`, 6, `)`, `)`];
let arr4 = [`(`, 55, `+`, 45, `)`, 9, `-`, 7, `(`, 85, `-`, 17, `)`]
let arr5 = ['(', 55, '+', 45, ')', 9, '-', 7, '*', 68]

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

//fn's req for calc
function doMath(arr) {
    stack(arr);
    mathOnIndex(arr, pairArr);
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
    console.table(arr);

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
    console.log(`pairs`, pairs);

}


//find alternate fn? MATH2
function mathOnIndex(arr, pair) {
    let blockArr = [];
    console.log(
        // `\narr`, arr,
        // `\narr`, stacksArr,
        // `\npairArr`, pairArr,
        // `\nblocklength`, blockLength,
        // `\nblockArr`, blockArr,

    );

    blockLength = 0;

    for (i = pair[0]; i < pair[1] - 1; i++) {
        blockArr.push(arr[i + 1]);
        blockLength++;

    }

    console.log(
        `\npairArr`, pairArr,
        `\nblocklength`, blockLength,
        `\nblockArr`, blockArr,
        `\narr`, arr
    );

    eqOps(blockArr);
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


