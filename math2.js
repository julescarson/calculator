
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

ops2 = {
    exp: function exp(x, y) { return x ** y; },
    divide: function divide(x, y) { return x / y; },
    times: function times(x, y) { return x * y; },
    add: function add(x, y) { return x + y; },
    subtract: function subtract(x, y) { return x - y; },
}

//test
const test = true;

let arr1 = [55, `+`, 45, `-`, 85, `-`, 12, `*`, 6];
let arr2 = [55, `+`, 45, `-`, 12];
let arr3 = [45, `*`, 1, `-`, 7];
let arr4 = [9, `/`, 3]
let arr5 = [8, `^`, 2]
let arr6 = [2, `^`, 2, `*`, 3]
let arr7 = [100, `-`, 72];

let _result = new Number;
let ARR = Array.from(arr1);
let opAns = new Number;
let opcounter = new Number;
let orderlevel = 1;

order(ARR);
function order(arr) {
    if (test) {
        console.log(orderlevel, arr)
    }

    for (i = 0; i < arr.length; i++) {
        let value1 = Number([arr[i - 1]]);
        let value2 = Number([arr[i + 1]]);
        let op = arr[i];

        operate(arr, i - 1, value1, value2, op, orderlevel);
    }

    while (orderlevel < 5) {
        while (arr.includes(operations[orderlevel - 1].symb)) {
            order(arr);
        }
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

function operate(arr, index, x, y, operator, hierarchy) {
    operations.forEach(e => {
        if (operator == e.symb && e.order == hierarchy) {
            opAns = e.math(x, y);
            arr.splice(index, 3, opAns);
        }
    });
}

