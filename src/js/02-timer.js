// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Получаю ссылки на объекты
const btnStart = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes');
const spanSeconds = document.querySelector('[data-seconds]');

//Cоздаю переменные:
// время окончания - текущее время = дельта времени (равна
//  времени до конца таймера)

let msSelected = null; //время окончания выбрано пользователем
let idInterval  = null; // таймер (каждую сек - 1 сек от дельты)

btnStart.disabled = true; //кнопка не активна пока не выбрана дата в БУДУЩЕМ


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) { 
        msSelected = selectedDates[0].getTime();
        if (msSelected < new Date()) { //Проверка = выбранная дата меньше текущей ? Алерт : активация кнопки Старт
            Notify.failure('Please choose a date in the future.')
            return;
        }
        btnStart.classList.add('btn');
        btnStart.disabled = false;
    },
};

//Инициализация flatpickr
flatpickr("#datetime-picker", options);

let object = {}; //Хранилище для времени

const onCountTime = () => {
    idInterval = setInterval(() => {
        const diff = msSelected - new Date().getTime(); // разница между выбранной датой и текущей
        if (diff <= 0) {                                // разница <= 0 ? отключаем таймер =>
            clearTimeout(idInterval);
            return;
        };
    object = convertMs(diff);                           // => : конвертируем разницу в объект
    onChangeContent(addLeadingZero(object));            
    }, 1000)
}

function addLeadingZero(values) {
    const newValues = { ...values };
    const keys = Object.keys(newValues)
    for (const key of keys) {
        newValues[key] = String(newValues[key]).padStart(2, 0) // Добавляем недостающие нули (из видео Репеты)
    } 
    return newValues;
}


function onChangeContent({ days, hours, minutes, seconds }) {
    spanDays.textContent = days;
    spanHours.textContent = hours;
    spanMinutes.textContent = minutes;
    spanSeconds.textContent = seconds;
}

//Из задания: ms - разница между конечной и текущей датой в миллисекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener("click", onCountTime); 