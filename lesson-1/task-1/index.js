//Get elements from DOM
const form = document.getElementById('form');
const energyInput = document.getElementById('energyInput');
const squareInput = document.getElementById('squareInput');
const resultOutput = document.getElementById('resultOutput');

function CleanerRobot(
    initialEnergy = 0 /* Изначальный заряд батареи робота */,
    cleaningSquare /* Площадь для уборки в метрах. */,
) {
    let energy = initialEnergy;
    let timerId = 0;
    const ENERGY_CONSUMPTION = 1; /* Расход энергии: 1% батареи на 1 час работы. */
    const CLEANING_SPEED = 10; /* Скорость уборки: 10 квадратных метров в час. */
    const getCleaningTime = () => cleaningSquare / CLEANING_SPEED;
    const setRemainingEnergy = (time) => energy = energy - (ENERGY_CONSUMPTION * time);
    const onReady = () => {
        resultOutput.innerHTML = `Уборка завершена. Осталось заряда батареи: ${energy}.`;
    }

    this.clean = () => {
        const cleaningTime = getCleaningTime();
        setRemainingEnergy(cleaningTime);
        resultOutput.innerHTML = `Начинаю процесс уборки. Время уборки: ${cleaningTime} часов.`;
        /* Для удобства время уборки сокращено до формата 1 час = 1 секунда */
        timerId = setTimeout(onReady, cleaningTime * 1000);
    };

    this.stop = () => {
        clearTimeout(timerId);
        resultOutput.innerHTML =`Спустя 1 секунду: Уборка завершена досрочно. Осталось заряда батареи: ${energy}`;
    }
}

const INITIAL_ENERGY = energyInput.value;
const INITIAL_SQUARE = squareInput.value;
const cleanerRobot = new CleanerRobot(INITIAL_ENERGY, INITIAL_SQUARE);

function onSubmit(event) {
    event.preventDefault();
    cleanerRobot.clean(); /* Начинаю процесс уборки. Время уборки: 4.5 часов. */
    setTimeout(() => {
        cleanerRobot.stop(); /* Спустя 1 секунду: Уборка завершена досрочно. Осталось заряда батареи: 45.5. */
    }, 1000);
}

form.addEventListener('submit', onSubmit);

