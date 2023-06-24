import flatpickr from 'flatpickr';
import '/node_modules/flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';


const btnStart = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const datepicker = flatpickr('#datetime-picker', options);
let targetDate;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatTime(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener("click", startTimer);

function startTimer() {
  if (datepicker.selectedDates.length > 0) {
    targetDate = new Date(datepicker.selectedDates[0]);
    updateTimer();
    clearInterval(intervalId); // Остановка предыдущего интервала (если существует)
    intervalId = setInterval(updateTimer, 1000);
    
  } else {
    Notiflix.Notify.warning('Please choose a date');
    
  }
}

function updateTimer() {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;
 
  if (timeDifference > 0) {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    dataDays.textContent = formatTime(days);
    dataHours.textContent = formatTime(hours);
    dataMinutes.textContent = formatTime(minutes);
    dataSeconds.textContent = formatTime(seconds);
    btnStart.disabled = false;
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
    btnStart.disabled = true;
  }
}



