//DOM
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
  7,
  8,
  9,
  `×`,
  4,
  5,
  6,
  `-`,
  1,
  2,
  3,
  `+`,
  0,
  `.`,
  `⌫`,
  `=`,
];

const qs = (s) => document.querySelector(s);

function crdom(name, parent, cn, text) {
  let newdiv = document.createElement("div");
  newdiv.classList.add(name);
  if (cn) newdiv.classList.add(cn);
  qs(`.${parent}`).append(newdiv);
  newdiv.textContent = text;
}

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

function updateTime() {
  setInterval(function () {
    rntime();
    updateTime();
  }, 60000);
}

// -- input --
let eq = ``;
let ops = [`^`, `/`, `*`, `+`, `-`, `=`];
document.addEventListener("keydown", (e) => {
  qs(`.eq`).textContent = eq;
  if (!isNaN(Number(e.key)) || ops.includes(e.key)) {
    eq = eq + e.key;
  }
  if (e.key == `Delete` || e.key == `Backspace`) {
    eq = eq.slice(0, eq.length - 1);
  }
  if (e.key == `Enter`) {
    console.log(eq);
  }
});
