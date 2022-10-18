ops = [
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
    {
        name: "divide",
        math: function add(x, y) { return x / y; },
        symb: `/`,
    },
];





/* stacks

1. count opening braces, add 1 to some stack counter for each
2. create new array between indices where stack counter same
3. section of larger of larger EQ has *math* done on it

4/3/2.5? add (splice?) array back into larger eq AND remove external braces
 AND account for 'assumed' operators in their place

5. repeat until stack count is 0

6. return a Number

*/

//test eq arrays
let arr1 = [`(`, 55, `+`, 45, `-`, 85, `-`, 12, `*`, 6, `)`];
let arr2 = [`(`, 55, `+`, 45, `-`, `(`, 85, `-`, 12, `)`, `*`, 6, `)`];
let arr3 = [`(`, 55, `+`, 45, `(`, 9, `-`, 7, `(`, 85, `-`, 17, `)`, `*`, 6, `)`, `)`];
let arr4 = [`(`, 55, `+`, 45, `)`, 9, `-`, 7, `(`, 85, `-`, 17, `)`]


//itialize vars
let stackIndicePairs = []; // [ [io, index, stack_n] ,[...]
let ind = [];
let blockAns = 0;
let blockLength = 0;
let currentStack = 0;
let check = true;


//first pass
let ARR = Array.from(arr4);
doMath(ARR);


function logVars() {
    console.log(arr4);
    console.log(stackIndicePairs);
    console.log(ind);
    console.log(blockLength);
}

function clearVars() {
    stackIndicePairs = [];
    ind = [];
    blockAns = 0;
    blockLength = 0;
    currentStack = 0;

}

//fn's req for calc
function doMath(arr) {
    clearVars();
    stack(arr);
    indexFromStack(stackIndicePairs);
    mathOnIndex(arr, ind);
    reQuation(arr, ind, blockLength, blockAns);
}


//array of arrays for stacks []
function stack(arr) {
    let open = 0;
    let close = 0;


    for (i = 0; i < arr.length; i++) {
        if (arr[i] == `(`) {
            open++;
            stackIndicePairs.push([`open`, i, open]);
        } else if (arr[i] == `)`) {
            close++;
            stackIndicePairs.push([`close`, i, close]);
        }
    }

}

//array index  pair of current stack []
function indexFromStack(stacksArr) {

    stacksArr.forEach(e => {
        if (e[2] > currentStack) {
            currentStack = e[2];
        }
        if (currentStack == e[2]) {
            if (e[0] == `open`) {

                ind.splice(0, 1, (e[1]));
            }
            if (e[0] == `close`) {

                ind.splice(1, 1, (e[1]));
            }
        }
    });



}

function mathOnIndex(eqArr, indArr) {
    let blockArr = [];
    blockLength = 0;
    for (i = indArr[0]; i < indArr[1] - 1; i++) {
        blockArr.push(eqArr[i + 1]);
        blockLength++;
    }
    eqOps(blockArr);
}

//check math symbols
function eqOps(arr) {
    arr.forEach(e => {
        for (i = 0; i < ops.length; i++) {
            if (ops[i].symb == e) {
                arrMath(arr, ops[i].math, ops[i].symb);
            }
        }
    });
}

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

    blockAns = arr;

}



function reQuation(arr, index, length, ans) {
    console.log(`index`, index, `length`, length, `ans`, ans);

    let removeOpen = (replace) => { arr.splice(index[0], replace); }
    let removeClose = (replace) => { arr.splice(index[0] + length - 1, 1, replace) }

    arr.splice(index[0] + 1, length, ans[0]);



    console.log(`left:`, typeof (arr[index[0] - 1]));
    console.log(`right:`, typeof (arr[index[0] + length]));

    switch (typeof arr[index[0] + length]) {
        case `string`:
            removeClose(1)
            break;
        case `number`:
            removeClose(`*`);
            break;
        case `undefined`:
            removeClose(1);
        default:
            break;
    }

    switch (typeof arr[index[0] - 1]) {
        case `string`:
            removeOpen(1);
            break;
        case `number`:
            console.log(`before`, arr)
            arr.splice(index[0], 1, `*`);
            console.log(arr);
            break;
        case `undefined`:
            removeOpen(1);
        default:
            break;
    }


    if (check) {
        check = false;
        if (arr.includes(`()`)) {
            console.log(`works`);
        }
        doMath(arr);
    }



}