// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Оголошення змінних
let userSelectedDate = null;
let intervalId = null;

const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// Налаштування flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

// Ініціалізація flatpickr
flatpickr('#datetime-picker', options);

// Додаємо слухача на кнопку "Start"
startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startButton.disabled = true;
    document.querySelector('#datetime-picker').disabled = true;

    intervalId = setInterval(() => {
      const now = new Date();
      const timeRemaining = userSelectedDate - now;

      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        iziToast.success({
          message: 'Countdown finished!',
          position: 'topRight',
        });
        document.querySelector('#datetime-picker').disabled = false;
      } else {
        updateTimer(convertMs(timeRemaining));
      }
    }, 1000);
  }
});

// Функція для оновлення таймера
function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Функція для конвертації часу
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Додаємо 0 до чисел, менших ніж 10

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
