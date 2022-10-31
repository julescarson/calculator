const content = document.querySelector(`.content`);

let layout = [
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

//create divs
layout.forEach((e) => {
    let newdiv = document.createElement("div");
    newdiv.classList.add(e.section);
    content.append(newdiv);
});

//reorder divs
layout.forEach((e) => {
    let section = document.querySelector(`.${e.section}`);
    let parent = document.querySelector(`.${e.parent}`);
    parent.appendChild(section);
});

//selectable
const qs = (s) => document.querySelector(s);

//ckeys
let ckeys = [
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

let ckeybar = [`xy`, `√x`, `e`, `π`, `?`];
ckeybar.forEach((e) => {
    let ndiv = document.createElement("div");
    qs(`.fnbar`).append(ndiv);
    ndiv.classList.add(`${e}`);
    ndiv.classList.add(`fkeys`);
    ndiv.textContent = e;
});

qs(`.xy`).innerHTML = `x<sup>y</sup>`;

ckeys.forEach((e) => {
    let ndiv = document.createElement("div");
    qs(`.numkeycont`).append(ndiv);
    ndiv.classList.add(`btn`);
    ndiv.textContent = e;
});

//statusbar
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

qs(`.ans`).textContent = "42";
qs(`.eq`).textContent = "(9x85/85/9+41^1-0)";
