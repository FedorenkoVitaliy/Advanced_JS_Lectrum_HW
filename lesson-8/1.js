// ЗАДАЧА
// Напишем модуль, который будет хранить в себе счетчик и иметь 2 публичных метода getCounter и increaseCounter.

// ПРИМЕЧАНИЯ
// Счетчик нужно хранить в инкапсулированном (защищенном) пространстве имен без доступа к внутреннему интерфейсу

// ПРИМЕР
const counterModule = (() => {
    let counter = 0;
    let instance;

    const increaseCounter = () => counter++;
    const getCounter = () => counter;
    const createInstance = () => ({
      increaseCounter: increaseCounter,
      getCounter: getCounter,
    })
    return {
      getInstance: () => instance || ( instance = createInstance())
    }
})()

const counterFirst = counterModule.getInstance();
console.log(counterFirst.getCounter()); // 0

const counterTwo = counterModule.getInstance();
counterTwo.increaseCounter();

const counterThree = counterModule.getInstance();
console.log(counterThree.getCounter()); // 1
