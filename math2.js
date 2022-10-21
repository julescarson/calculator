
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


//test
const test = true;

//array tests
let arr1 = [55, `+`, 45, `-`, 85, `-`, 12, `*`, 6];
let arr2 = [55, `+`, 45, `-`, 12];
let arr3 = [45, `*`, 1, `-`, 7];
let arr4 = [9, `/`, 3];
let arr5 = [8, `^`, 2];
let arr6 = [2, `^`, 2, `*`, 3];
let arr7 = [100, `-`, 72];

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


