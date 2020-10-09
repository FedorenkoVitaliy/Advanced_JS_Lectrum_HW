/**
 * Задача 4.
 *
 * Реализуйте класс Stringer, который будет иметь следующие методы (каждый принимает строку в качестве аргумента):
 *
 * - reverse(string) — возвращает строку в перевернутом виде;
 * - uppercaseFirst(string) — возвращает строку, сделав ее первую букву заглавной;
 * - uppercaseAll(string) — делает заглавной первую букву каждого слова строки и возвращает её.
 *
 * Условия:
 * - Реализация решения — это синтаксис современных классов JavaScript.
 */
// РЕШЕНИЕ
class Stringer {
    reverse = str => str.split('').reverse().join('');
    uppercaseFirst = str => str.slice(0,1).toUpperCase() + str.slice(1);
    uppercaseAll = str => str.split(' ').reduce((acc, string) => acc + this.uppercaseFirst(string) + ' ', '')
}
// РЕШЕНИЕ

const stringer = new Stringer();

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const text = document.getElementById('text');
const textInput = document.getElementById('textInput');

btn1.onclick = () => {
    const { value } = textInput;

    text.innerHTML = stringer.reverse(value); // !gninrom doog
}

btn2.onclick = () => {
    const { value } = textInput;

    text.innerHTML = stringer.uppercaseFirst(value); // Good morning!
}

btn3.onclick = () => {
    const { value } = textInput;

    text.innerHTML = stringer.uppercaseAll(value); // Good Morning!
}
