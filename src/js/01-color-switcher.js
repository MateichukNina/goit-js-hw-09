const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
const body = document.querySelector(".background");
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

btnStart.addEventListener("click", onClickStart);

btnStart.disabled = false;

function onClickStart() {
    timerId = setInterval(() => {
        const randomColor = getRandomHexColor();
        body.style.backgroundColor = randomColor;
    }, 1000);
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
    btnStart.disabled = true;
}

btnStop.addEventListener("click", onClickStop);

function onClickStop(){
    clearInterval(timerId);
    btnStart.disabled = false;
}