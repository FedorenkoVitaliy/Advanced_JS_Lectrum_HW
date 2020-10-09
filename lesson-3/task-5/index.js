/**
 * Задача 6.
 *
 * Реализуйте класс Student , который наследует от класса User.
 *
 * Класс User должен обладать следующими свойствами:
 * - firstName — имя;
 * - lastName — фамилия;
 * - getName() — метод, который возвращает имя и фамилию пользователя.
 *
 * Класс Student должен обладать следующими свойствами:
 * - year — год поступления в вуз;
 * - getCourse() - метод, который возвращает текущий курс студента (от 1 до 5).
 *
 * Курс, на котором учится студент вычисляется так: нужно от текущего года отнять год поступления в вуз.
 * Текущий год получите самостоятельно.
 *
 * Условия:
 * - Реализация решения — это синтаксис современных классов JavaScript;
 * - В реализации работы метода getCourse обязательно использовать конструктор Date.
 */

// РЕШЕНИЕ
class User {
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getName = () => `${this.firstName} ${this.lastName}`;

}

class Student extends User {
  constructor(name, year){
    super(...name.split(' '));
    this.year = year;
  }
  getCourse = () => new Date().getFullYear() - this.year;
}
// РЕШЕНИЕ

const form = document.getElementById('studentForm');
const text = document.getElementById('text');

form.onsubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get('fullname');
  const year = formData.get('year');

  const student = new Student(name, year);

  text.innerHTML = `Студент ${student.getName()} учится на ${student.getCourse()} курсе.`;
};
