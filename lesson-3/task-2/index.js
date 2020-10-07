/**
 * Задача 2.
 *
 * Улучшите класс Worker из предыдущей задачи.
 * Сделайте все свойства приватными, а для чтения каждого из них создайте соответствующие методы:
 *
 * - getName — возвращает конкатенацию приватных свойств firstName и lastName;
 * - getRate — возвращает значение приватного свойства rate
 * - getHours — возвращает значение приватного свойства hours
 * - getSalary — возвращает зарплату
 *
 * Условия:
 * - Реализация решения — это синтаксис современных классов JavaScript;
 * - Приватные свойства необходимо объявить с помощью официального синтаксиса (#имяСвойства).
 */

// РЕШЕНИЕ
class Worker {

}
// РЕШЕНИЕ

const workers = [];
const form = document.getElementById('regForm');
const list = document.getElementById('list');

form.onsubmit = (event) => {
    event.preventDefault();
    list.innerHTML = null;

    const formData = new FormData(event.target);
    const name = formData.get('fullname');
    const [ firstName, lastName ] = name.split(' ');
    const hours = formData.get('hours');
    const rate = formData.get('rate');

    let workersHTML = '';

    workers.unshift(new Worker(firstName, lastName, hours, rate));
    workers.forEach((worker) => {
        // ПРОВЕРОЧНЫЙ КОД
        // console.log(worker.getName()); // Джон Доу
        // console.log(worker.getRate()); // 10
        // console.log(worker.getHours()); // 31
        // console.log(worker.getSalary()); // 10 * 31 = 310

        workersHTML += getWorker({
            name: worker.getName(),
            hours: worker.getHours(),
            rate: worker.getRate(),
            salary: `${worker.getSalary()} $`
        });
    });

    list.insertAdjacentHTML('afterbegin', workersHTML);
}