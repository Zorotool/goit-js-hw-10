
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Получаем ссылку на форму (чтобы повесить слушателя)
const formRef = document.querySelector('.form');

// Создаю промис внутри Фн (не забыть про return). Фн принимает: номер промиса (position) и задержку (delay) (шаблон из задания).
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      }
      reject({ position, delay })
    }, delay);
  });
};
  
// Функция-колбек вызываемая при событии submit (не забыть preventDefault)
function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const dataForm = new FormData(form);
  const finalData = {};
  for (const [key, value] of dataForm.entries()) {
    finalData[key] = Number(value);
  }
  // очищаем форму
  form.reset();
  // в цикле for вызываем функцию создающую промис
  for (let position = 1; position <= finalData.amount; position += 1){
    createPromise(position, finalData.delay).then(onSuccess).catch(onError);
    finalData.delay = finalData.delay + finalData.step;
  };
};

// Функция вызываемая методом catch, когда промис возвращает reject
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

// Функция вызываемая методом then, когда промис возвращает resolve
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

// submit слушателm на форму 
formRef.addEventListener('submit', onSubmit);