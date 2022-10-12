
// DOM
const content = document.querySelector('.content');
const calcText = document.createElement('input');
const ansText = document.createElement('text');



calcText.oninput = function () { equals() };


calcText.setAttribute('type', 'text');
calcText.classList.add('calcDisplay');
content.appendChild(calcText);


ansText.setAttribute('type', 'text');
ansText.classList.add('ansText');
content.appendChild(ansText);


document.addEventListener('keydown', (e) => {
    let key = e.key;
    // console.log(key);
    switch (key) {
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
        case `.`:
            console.log(key);
            num += e.key;
            break;
        case '+':
            console.log('+');
            break;
        case `-`:
            console.log('-');
            break;
        case `*`:
            console.log('*');
            break;
        case `/`:
            console.log('/');
            break;
        case `(`:
            console.log('(');
            break;
        case `)`:
            console.log(')');
            break;
        case `Delete`:
            console.log(`Delete`);
            break;
        case `Enter`:
            //function for new variable holding [num]

            num = Number(num);
            numsArray.push(num);
            num = '';
            console.log(numsArray);

        default:
            break;

    }

})

let numsArray = [];

function n() {

}




// global vars
let num = '';
let ans = new Number;




function equals() {
    formula =
        console.log('works');
}

function enter() {


}





// add

// subtract

// multiply

// divide

// equals

// clear

// additional operators?

// ico url gfx

// first display for full calculation

// second display for results

// github / connect projects?






function operate(operation, n1, n2) {

}