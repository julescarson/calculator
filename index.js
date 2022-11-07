//-- DOM --
const content = document.querySelector(`.content`);

const layout = [
  { section: `q`, parent: `content` },
  { section: `overlay`, parent: `content` },
  { section: `info`, parent: `overlay` },
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

const ckeybar = [`xy`, `√x`, `e`, `π`];
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

function crdom(name, parent, cn, text, cn2) {
  let newdiv = document.createElement("div");
  newdiv.classList.add(name);
  if (cn) {
    newdiv.classList.add(cn);
  }
  if (cn2) {
    newdiv.classList.add(cn2);
  }
  qs(`.${parent}`).append(newdiv);
  newdiv.textContent = text;
}

//create divs based on layout
layout.forEach((e) => crdom(e.section, e.parent, null, null));
ckeybar.forEach((k, index) => crdom(k, `fnbar`, `fkey`, k, `f${index}`));
ckeys.forEach((k, index) => crdom(k, `numkeycont`, `btn`, k, `k${index}`));
qs(`.xy`).innerHTML = `x<sup>y</sup>`;
qs(`.statusbar`).innerHTML = `<img src="statusicons.png"></img>`;

// -- i button --
let isactive = false;
const showinfo = () => (qs(`.info`).textContent = "test");
const hideinfo = () => (qs(`.info`).textContent = "");
qs(`.q`).textContent = "i";
qs(`.q`).classList.add(`qoff`);
qs(`.overlay`).style.display = "none";
qs(`.info`).style.display = "none";

//overlay content
for (let i = 0; i < 3; i++) {
  crdom(`p${i}`, `info`, `p${i}`);
}
//github
qs(
  ".p0"
).innerHTML = `<p><img src="gh.png">&nbsp<i>github.com/metamoniker</i></img></p>`;

qs(`.p0`).onclick = () => {
  window.location.assign("https://github.com/metamoniker/calculator");
};
//info
qs(`.p1`).innerHTML = `<p><i>behind the scenes...</i></p>`;
// qs(`.p2`).innerHTML = `<p>✔ parse equation
// <br>✔ find bracket pairs (stack)
// <br>✔ assign priority to stack
// <br>✔ do math in current stack
// <br>✔ make simplified equation
// <br>✔ re-parse until 0 stacks
// <br>✔ display the final answer
// <br><br>✔ Make it pretty!</p>`;

// qs(
//   `.p2`
// ).innerHTML = `<p>▸ paired brackets create (stack)<br>▸ solved indpendently<br>▸ substituted into equation<br>▸ equation re-parsed <br>▸ repeat until no stacks left<br>
// ✔ final answer displayed!<br><br>... css to make it pretty!</p>`;

qs(
  `.p2`
).innerHTML = `<p>Parts of the equation within a pair of brackets (stacks) are treated as independent equations, solved, and substituted into the original equation. Repeat until no stacks left and final answer displayed.<br><br>... css to make it pretty!</p>`;

function overlay(io) {
  if (io) {
    qs(`.overlay`).style.display = "none";
    qs(`.q`).classList.add(`qoff`);
    qs(`.q`).classList.remove(`qon`);
    qs(`.device`).style.display = "unset";
    qs(`.info`).style.display = "none";
  } else if (!io) {
    qs(`.overlay`).style.display = "unset";
    qs(`.info`).style.display = "unset";
    qs(`.q`).classList.add(`qon`);
    qs(`.q`).classList.remove(`qoff`);
    qs(`.device`).style.display = "none";
  }
  isactive = !isactive;
}

//on/off
qs(`.q`).addEventListener(`click`, function (e) {
  console.log({ isactive });
  overlay(isactive);
});

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
  highlightKey(e.key);
});

let fixk = [`⌫`, `AC`, `=`, `÷`, `×`];
let kto = [`Delete`, ``, `Enter`, `/`, `*`];

//AC0,/3,x7,⌫18
function highlightKey(k) {
  console.log(k);

  switch (k) {
    case `Delete`:
      k = `AC`;
      break;
    case `Backspace`:
      k = `⌫`;
      break;
    case `*`:
      k = `×`;
      break;
    case `/`:
      k = `÷`;
      break;
    case `^`:
      k = `xy`;
      break;
    default:
      k = k;
      break;
  }

  if (ckeys.includes(k) || ckeybar.includes(k)) {
    if (k == `xy` || k == `e`) {
      qs(`.${k}`).classList.add(`active`);
      setTimeout(() => {
        qs(`.${k}`).classList.remove(`active`);
      }, 200);
    } else {
      let keyindex = ckeys.findIndex((e) => e == k);
      let thisk = qs(`.k${keyindex}`);
      thisk.classList.add(`active`);
      if (k == `=` || k == `AC`) {
        setTimeout(() => {
          thisk.classList.remove(`active`);
        }, 500);
      } else {
        setTimeout(() => {
          thisk.classList.remove(`active`);
        }, 200);
      }
    }
  }
}

qs(`.inputcont`).addEventListener(`click`, function (e) {
  inputkeys(e.target.textContent);
});

function inputkeys(k) {
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
  if (k == `Backspace`) {
    eq = eq.slice(0, eq.length - 1);
  }
  if (k == `Delete`) {
    eq = ``;
  }
  if (k == `Enter`) {
    eqprep(eq);
    runEquation(eqr);
    eqr = [];
    eq = "";
    // if (finalans) {
    //   eq = finalans.toString();
    //   console.log({ eq });
    // }
  }
  //sqrt
  if (k == `√x`) {
    if (finalans) {
      eq = finalans.toString();
      console.log({ eq });
    }
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

const synerror = (er) => {
  qs(`.ans`).style.fontSize = "1.1rem";
  qs(`.ans`).textContent = `Syntax Error : ${er}`;
  qs(`.ans`).style.justifyContent = "center";
};

const showAns = (answer) => {
  qs(`.ans`).style.fontSize = "1.5em";
  qs(`.ans`).textContent = answer;
  qs(`.ans`).style.justifyContent = "end";
};

//go
function runEquation(arr) {
  let ARR = [];

  //syntax error ) before (
  const close1 = arr.findIndex((e) => e == `)`);
  const open1 = arr.findIndex((e) => e == `(`);
  if (open1 > close1) {
    synerror(`braces`);
    return;
  }

  //make everything numbers that can be
  arr.forEach((e) => {
    if (!isNaN(Number(e))) {
      ARR.push(Number(e));
    } else {
      ARR.push(e);
    }
  });

  for (let i = 0; i < ARR.length; i++) {
    //divide by zero
    if (ARR[i] == `/` && ARR[i + 1] == 0) {
      synerror(`divide 0`);
      return;
    }
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
      synerror(`empty ()`);
      return;
    }
    //no double operators
    let nd = [`*`, "/", "+"];
    if (nd.includes(ARR[i]) && nd.includes(ARR[i - 1])) {
      synerror(`operators [ ${ARR[i - 1]} ${ARR[i]} ]`);
      return;
    }
    //no negative before operator
    if (ARR[i - 1] == "-" && nd.includes(ARR[i])) {
      synerror(`operators [ ${ARR[i - 1]} ${ARR[i]} ]`);
      return;
    }
    //operator before negative
    if (ARR[i] == `-`) {
      if (nd.includes(ARR[i - 1])) {
        if (typeof ARR[i + 1] == `number`) {
          ARR.splice(i, 0, `(`);
          ARR.push(`)`);
          ARR.splice(i + 1, 2, ARR[i + 2] * -1);
          console.log(ARR);
        }
      }
    }

    //e, pi,
    let epie = (epi, mth) => {
      i;
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

  console.log(ARR);

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

let finalans;
//reup times
function reup(arr, result) {
  let start = stackpair[0];
  let end = stackpair[1];
  let length = end - start;

  //splice result into array
  arr.splice(start + 1, length - 1, result);
  end = start + 2;

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
    if (dec > 1) {
      err = true;
      synerror(`decimals`);
      return;
    }
  });

  if (c != o) {
    synerror(`brackets`);
    err = true;
    return;
  }

  if (arr[0] == `(` && arr[arr.length - 1] == `)`) {
    if (arr.length == 3) {
      let aa = ndecimal(arr[1]);
      showAns(aa);
      finalans = aa;
    } else if (arr.length == 1) {
      let aa = ndecimal(arr[0]);
      showAns(aa);
      finalans = aa;

      return;
    } else {
      arr.shift();
      arr.pop();
      runEquation(arr);
    }
  } else if (err == false) {
    let aa = ndecimal(arr[0]);
    showAns(aa);
    finalans = aa;
  }
}

//round decimals (max of 4)
function ndecimal(x) {
  if (Number.isInteger(x)) {
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
