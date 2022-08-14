import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onBtnSubmit);

// Функция вызываемая при событии submit (не забыть preventDefault, порядок см. черновик)
function onBtnSubmit(evt) {
  evt.preventDefault();
// Определяю неоходимые переменные и первеодим в число для расчетов (задержку, шаг, кол-во) 
  let delay = Number(evt.currentTarget.delay.value);
  let step = Number(evt.currentTarget.step.value);
  let amount = Number(evt.currentTarget.amount.value);
  
// Цикл, кол-во циклов равно полю Эмаунт
// на каждом цикле вызывает ФН создания промиса принимая номер цикла и задержку
// При первом цикле задержка введенная пользователем, при следуюших 1-я задержка + шаг
// В зависимости от рандома выводим два сообщения Зен и Кэтч через библиотеку.
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
// ФН для промис, принимает № цикла и 1 - ю задержку (по субмиту буду их увеличивать на 1 и значение задержки соответственно)
// В зависимости от рандома выдает да/нет с инфой для конечного результата
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}