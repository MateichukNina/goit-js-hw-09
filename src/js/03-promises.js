 import Notiflix from "notiflix";

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

form.addEventListener("submit", onSubmit);

//  function createPromise(position, delay) {
//    return new Promise((resolve, reject) => {
//      const shouldResolve = Math.random() > 0.3;
 
//      setTimeout(() => {
//        if (shouldResolve) {
//          resolve({ position, delay });
//        } else {
//          reject({ position, delay });
//        }
//      }, 1000);
//    });
//  }
 
//  function onSubmit(event) {
//    event.preventDefault();
 
//    const amount = parseInt(amountInput.value);
//    const initialDelay = parseInt(delayInput.value);
//    const step = parseInt(stepInput.value);
//    let currentDelay = initialDelay;
//    for (let i = 0; i < amount; i++) {
//      const position = i + 1;
//     //  const currentDelay = initialDelay + (i * step);
//       setTimeout(() => {
//      createPromise(position, currentDelay)
//        .then(({ position, delay }) => {
//          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${currentDelay}ms`);con
//        })
//        .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${currentDelay}ms`);
//        });
//    }, currentDelay)

//    currentDelay += step;
//  }};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();

  const amount = parseInt(amountInput.value);
  const firstDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + (i * step);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}