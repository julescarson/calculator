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

let arr1 = [`(`, 55, `+`, 45, `-`, 85, `-`, 12, `*`, 6, `)`];



/*
stacks

1. count opening braces, add 1 to some stack counter for each, remove 1 for each close

2. ONREMOVE -> create new array between indices where 
stack counter last increased and last decreased

array of arrays?

3. section of larger of larger EQ has *math* done on it

4/3/2.5? add (splice?) array back into larger eq AND remove external braces
 AND account for 'assumed' operators in their place

5. repeat until stack count is 0

6. return a Number

*/


let arr2 = [`(`, 55, `+`, 45, `-`, `(`, 85, `-`, 12, `)`, `*`, 6, `)`];
let arr3 = [`(`, 55, `+`, 45, `-`, `(`, 85, `-`, 12, `)`, `*`, 6, `)`, `)`];
console.log(arr2);

//STACK SYSTEM
// [ [io, index, stack_n] ,[...]
let stackIndicePairs = [];

function stack(arr) {
    let stackCounter = 0;
    let open = 0;
    let close = 0;

    for (i = 0; i < arr.length; i++) {

        if (arr[i] == `(`) {
            open++;
            stackCounter += 1;
            stackIndicePairs.push([`open`, i, stackCounter]);
        } else if (arr[i] == `)`) {
            close++;
            stackIndicePairs.push([`close`, i, stackCounter]);
            stackCounter -= 1
        }
    }
    //error checking 
    if (open != close) {
        console.log(`brackets uneven`)
        stackIndicePairs = [];
        return;
    }
    console.log(stackIndicePairs);


}

stack(arr2);


let ind = [];
function indexFromStack(stacksArr) {
    let currentStack = 0;
    let outerIndex = [0, 0];
    stacksArr.forEach(e => {
        if (e[2] > currentStack) {
            currentStack = e[2];
        }

        if (currentStack == e[2]) {

            if (e[0] == `open`) {
                outerIndex.splice(0, 1, (e[1]));
            }
            if (e[0] == `close`) {
                outerIndex.splice(1, 1, (e[1]));
            }

        }

    });
    ind = outerIndex;
    console.log(outerIndex);

}


indexFromStack(stackIndicePairs);

function mathOnIndex(eqArr, indArr) {
    //HOW TO MATH?
    for (i = indArr[0] + 1; i < indArr[1]; i++) {
        eqOps(eqArr);
    }

}

mathOnIndex(arr1, ind);









//pass eq array, check all values against obj operators, do math thing for each operator
function eqOps(arr) {
    arr.forEach(e => {
        for (i = 0; i < ops.length; i++) {
            if (ops[i].symb == e) {
                arrMath(arr, ops[i].math, ops[i].symb);
            }
        }
    });
}
//continue doing math things until all operators gone
while (arr1.length >= 3) {
    eqOps(arr1);
}
console.table(arr1);

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
    } else {
        //console.log(`error`);
    }

    return arr;
}

console.log(arr1);