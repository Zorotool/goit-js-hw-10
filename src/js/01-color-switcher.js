// Получаю ссылки на объекты
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

//Создаю переменную для таймера
let timerId = null;

//Функция вызываемая при клике на кнопку Start
const onStartButton = (evt)  => {
    onButtonOff()
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.background = `${color}`;
    }, 1000);
}

//Функция вызываемая при клике на кнопку Stop
const onStopButton = (evt) => {
    clearInterval(timerId);
    onButtonOff()
}
//Функция определения цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//Функция смены статуса кнопок disable (true <=> false)
function onButtonOff () {
    if (!startBtn.disabled) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
    } else {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

// Слушатели
startBtn.addEventListener('click', onStartButton);
stopBtn.addEventListener('click', onStopButton);
