//-- DOM --
const content = document.querySelector(`.content`);

const layout = [
  { section: `device`, parent: `content` },
  { section: `topbar`, parent: `device` },
  { section: `time`, parent: `topbar` },
  { section: `statusbar`, parent: `topbar` },
  { section: `display`, parent: `device` },
  { section: `ans`, parent: `display` },
  { section: `eq`, parent: `display` },
  { section: `inputcont`, parent: `device` },
  { section: `fnbar`, parent: `inputcont` },
  { section: `btncont`, parent: `inputcont` },
  { section: `numkeycont`, parent: `btncont` },
  { section: `dashbottom`, parent: `device` },
  { section: `dashtop`, parent: `display` },
];

const ckeybar = [`xy`, `√x`, `e`, `π`, `?`];
const ckeys = [
  `AC`,
  `(`,
  `)`,
  `÷`,
  `7`,
  `8`,
  `9`,
  `×`,
  `4`,
  `5`,
  `6`,
  `-`,
  `1`,
  `2`,
  `3`,
  `+`,
  `0`,
  `.`,
  `⌫`,
  `=`,
];

const qs = (s) => document.querySelector(s);

function crdom(name, parent, cn, text) {
  let newdiv = document.createElement("div");
  newdiv.classList.add(name);
  if (cn) {
    newdiv.classList.add(cn);
  }
  qs(`.${parent}`).append(newdiv);
  newdiv.textContent = text;
}

//create divs based on layout
layout.forEach((e) => crdom(e.section, e.parent, null, null));
ckeybar.forEach((k) => crdom(k, `fnbar`, `fkey`, k));
ckeys.forEach((k) => crdom(k, `numkeycont`, `btn`, k));
qs(`.xy`).innerHTML = `x<sup>y</sup>`;
qs(`.statusbar`).innerHTML = `<img src="statusicons.png"></img>`;

//clock
let t = () => new Date();
let rn = () => {
  let minutes = t().getMinutes();
  let hours = t().getHours();
  let HH, MM, AM_PM;
  minutes <= 9 ? (MM = `0${minutes}`) : (MM = minutes);
  hours < 12 ? (AM_PM = `AM`) : (AM_PM = `PM`);
  hours >= 13 ? (HH = hours - 12) : (HH = hours);
  return `${HH}:${MM} ${AM_PM}`;
};

let rntime = () => (qs(`.time`).textContent = `${rn()} `);

rntime();
updateTime();

//update every minute
function updateTime() {
  setInterval(function () {
    rntime();
    updateTime();
  }, 60000);
}

//user input
let eq = ``;
let allkeys = Array.from(ckeys);
allkeys.push(`^`, `/`, `*`, `(`, `)`);
let eqr = [];
let runeq = false;
let ans = qs(`.ans`).textContent;

document.addEventListener("keydown", (e) => {
  inputkeys(e.key);
});

qs(`.inputcont`).addEventListener(`click`, function (e) {
  inputkeys(e.target.textContent);
});

function inputkeys(k) {
  let fixk = [`⌫`, `AC`, `=`, `÷`, `×`];
  let kto = [`Delete`, ``, `Enter`, `/`, `*`];

  if (k == `e` || k == `π`) {
    eq = eq + k;
  }
  if (k == `xy`) {
    eq = eq + `^`;
  }
  if (qs(`.ans`).textContent != ``) {
    reset();
  }
  if (k == `AC`) {
    reset();
  }
  if (fixk.includes(k)) {
    k = kto[fixk.indexOf(k)];
  }
  if (allkeys.includes(k)) {
    eq = eq + k;
  }
  if (k == `Delete` || k == `Backspace`) {
    eq = eq.slice(0, eq.length - 1);
  }
  if (k == `Enter`) {
    eqprep(eq);
    runEquation(eqr);
    eqr = [];
    arrn = [];
    eq = "";
  }
  //sqrt
  if (k == `√x`) {
    eq = `(${eq})^0.5`;
    eqprep(eq);
    runEquation(eqr);
  }
  qs(`.eq`).textContent = eq;
}

function eqprep(str) {
  let opsregex = /([-e+*^/()π])/;
  eqr = eq.split(opsregex);
  let notempty = (e) => {
    return e != ``;
  };
  eqr = eqr.filter(notempty);
  return eqr;
}

function reset() {
  eq = "";
  qs(`.ans`).textContent = ``;
  eqr = [];
  ARR = [];
  arrn = [];
}

// --- math ---
const operations = [
  {
    symb: `^`,
    math: function exp(x, y) {
      return x ** y;
    },
    order: 1,
  },
  {
    symb: `/`,
    math: function divide(x, y) {
      return x / y;
    },
    order: 2,
  },
  {
    symb: `*`,
    math: function times(x, y) {
      return x * y;
    },
    order: 3,
  },
  {
    symb: `+`,
    math: function add(x, y) {
      return x + y;
    },
    order: 4,
  },
  {
    symb: `-`,
    math: function subtract(x, y) {
      return x - y;
    },
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

//itialize vars
let stacksArr = []; // [`open/close, index (original pos in equation), stack number]
let stackpair = [];
let blockLength = 0;
let block = [];
let result = new Number();
let opAns = new Number();
let orderlevel = 1;
let arrn = [];

const synerror = (er) => (qs(`.ans`).textContent = `syntax error: ${er}`);

//go
function runEquation(arr) {
  let ARR = [];
  //make everything numbers that can be
  arr.forEach((e) => {
    if (!isNaN(Number(e))) {
      ARR.push(Number(e));
    } else {
      ARR.push(e);
    }
  });

  for (let i = 0; i < ARR.length; i++) {
    //double negative
    if (ARR[i] == `-` && ARR[i - 1] == `-`) {
      ARR.splice(i - 1, 2, `+`);
    }
    //adding a negative
    if (ARR[i] == `-` && ARR[i - 1] == `+`) {
      ARR.splice(i - 1, 2, `-`);
    }
    //no empty braces
    if (ARR[i] == ")" && ARR[i - 1] == `(`) {
      console.log(`empty`);
      synerror(`empty ()`);
      return;
    }

    //e, pi,
    let epie = (epi, mth) => {
      if (ARR[i] == epi) {
        ARR.splice(i, 1, `(`, mth, `)`);
      }
    };
    epie(`e`, Math.E);
    epie(`π`, Math.PI);
  }
  //don't start or end on symbols
  let notsymb = [`*`, `^`, `/`, `+`, `.`];

  if (notsymb.includes(ARR[ARR.length - 1])) {
    synerror(ARR[ARR.length - 1]);
    return;
  } else if (notsymb.includes(ARR[0])) {
    synerror(ARR[0]);
    return;
  }

  //first number negative
  if (ARR[0] == `-` && typeof ARR[1] == `number`) {
    ARR[1] = ARR[1] * -1;
    ARR.shift();
  }

  //add brackets outer brackets
  ARR.unshift(`(`);
  ARR.push(")");

  parseEq(ARR);
}

function parseEq(arr) {
  clearVars();
  stack(arr); //sets up stacks
  prepareStack(arr, stackpair); // current stack only array
  // pass to parseblock -> pass to order -> result = var completed math ops for block
  reup(arr, result);
}

//reset
function clearVars() {
  stacksArr = []; // [`open/close, index (original pos in equation), stack number]
  stackpair = [];
  block = [];
  blockLength = 0;
  result = 0;
  opAns = 0;
  orderlevel = 1;
}

// stacksArr[`open or close`, index, stacknum]
// stackpair matching [open, close] for current level
function stack(arr) {
  let cstack = 0;
  for (let i = 0; i < arr.length; i++) {
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

  stacksArr.forEach((e) => {
    if (e[0] == `open`) {
      if (e[2] > h) {
        h = e[2];
      }
    }
  });

  stacksArr.forEach((e) => {
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

  for (let i = 0; i < op.length; i++) {
    if (op[i] > x1 && op[i] < x2) {
      x1 = op[i];
    }
  }
  stackpair = [x1, x2];
  console.log(`stackpair`, stackpair);
  console.log(`stacksarr`, stacksArr);
}

//block[] = new array for stack only
function prepareStack(arr, currentpair) {
  block = [];
  currentpair = stackpair;
  blockLength = 0;

  // [o,c] indices, find length between for original arr
  for (let i = currentpair[0]; i < currentpair[1] - 1; i++) {
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
  let testChars = [`+`, `*`, `/`, `^`];
  let rbrace = 0;
  let lbrace = 0;

  for (let i = 0; i < str.length; i++) {
    //double operators
    let tc = (x) => testChars.includes(str.charAt(x));
    if ((tc(i) && tc(i - 1)) || (tc(i) && tc(i + 1))) {
      error = true;
    }
    //brace & operators
    if (str.charAt(i) == `(` && tc(i + 1)) {
      error = true;
    }
    if (str.charAt(i) == `)` && tc(str.charAt(i - 1))) {
      error = true;
    }
    if (str.charAt(i) == `)`) {
      rbrace++;
    }
    if (str.charAt(i) == `(`) {
      lbrace++;
    }
  }

  //empty braces, uneven brace number
  if (str.includes(`()`) || rbrace != lbrace) {
    error = true;
  }

  //equation passed/failed valid check
  if (error == false) {
    order(arr);
  } else {
    return 0;
  }
}

//operator hierarchy
function order(arr) {
  let osymb = operations[orderlevel - 1].symb;

  for (let i = 0; i < arr.length; i++) {
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
  operations.forEach((e) => {
    if (operator == e.symb && e.order == hierarchy) {
      opAns = e.math(x, y);
      arr.splice(index, 3, opAns);
    }
  });
}

//reup times
let last = true;
let finalans;
function reup(arr, result) {
  console.log(
    `arr`,
    arr,
    `result`,
    result,
    `stackpairs`,
    stackpair[0],
    stackpair[1]
  );

  let start = stackpair[0];
  let end = stackpair[1];
  let length = end - start;

  console.log(`len`, length);

  //splice result into array
  arr.splice(start + 1, length - 1, result);
  end = start + 2;

  console.log(`length arr`, arr.length, `start`, start, `end`, end);

  let arrstart = arr[start];
  let outleft = arr[start - 1];
  let arrend = arr[end];
  let outright = arr[end + 1];

  // (braces)(together)
  // do * separately from removal of braces, not at same time
  // * first then brace removal
  if (arrstart == `(`) {
    if (outleft == `)` || typeof outleft == `number`) {
      arr.splice(start, 0, `*`);
      start = start + 1;
      end = end + 1;
    }
  }
  if (arrend == `)`) {
    if (outright == `(` || typeof outright == `number`) {
      arr.splice(end + 1, 0, `*`);
    }
  }
  arr.splice(end, 1);
  arr.splice(start, 1);
  console.log(arr);
  let err = false;

  let c = 0;
  let o = 0;

  arr.forEach((e) => {
    if (e == `)`) {
      c++;
    } else if (e == `(`) {
      o++;
    }

    let dec = 0;
    for (i in e) {
      if (e[i] == `.`) {
        dec++;
      }
    }
    console.log(dec);
    if (dec > 1) {
      err = true;
      synerror(`decimals`);
      return;
    }
  });

  if (c != o) {
    console.log(`uneven braces`);
    synerror(`brackets`);
    err = true;
    return;
  }

  if (arr[0] == `(` && arr[arr.length - 1] == `)`) {
    if (arr.length == 3) {
      qs(`.ans`).textContent = ndecimal(arr[1]);
    } else if (arr.length == 1) {
      qs(`.ans`).textContent = ndecimal(arr[0]);
      return;
    } else {
      console.log(`shfit popp`, arr);
      arr.shift();
      arr.pop();
      console.log(`shfit popp`, arr);
      runEquation(arr);
    }
  } else if (err == false) {
    ndecimal(arr[0]);
    qs(`.ans`).textContent = ndecimal(arr[0]);
  }
}

//round decimals (max of 4)
function ndecimal(x) {
  if (Number.isInteger(x)) {
    console.log(`integer`, x);
    return x;
  } else {
    let newx = x.toString().split(`.`);
    let remainder = ``;
    if (newx[1].length > 4) {
      for (let i = 0; i < 4; i++) {
        remainder = remainder + newx[1][i];
      }
      return `${newx[0]}.${remainder}`;
    } else {
      return x;
    }
  }
}
