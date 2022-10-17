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
console.log(arr2);


function inner(arr) {
    let stackCounter = 0;
    let stackIndicePairs = [];
    let index = 0;

    arr.forEach(e => {
        index += 1;
        if (e == `(`) {
            stackCounter += 1;
            stackIndicePairs.push([`open`, stackCounter, index]);
        } else if (e == `)`) {
            stackIndicePairs.push([`close`, stackCounter, index]);
            stackCounter -= 1
        }
    });
    console.log(stackIndicePairs);
}

inner(arr2);









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