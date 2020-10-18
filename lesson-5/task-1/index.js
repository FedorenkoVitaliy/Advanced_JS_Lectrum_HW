/*
# Задача 1

Доработать класс `DB` который будет имплементировать `CRUD` модель.
В качестве структуры данных использовать `Map`.

Метод `create`:
    - принимает объект и валидирует его, в случае невалидности объекта – генерирует ошибку.
    - возвращает `id` при создании пользователя генерирует уникальный `id`, который является ключом для объекта пользователя в структуре `Map`
Метод `read`:
    - принимает идентификатор пользователь
    - если такого пользователя нет возвращать `null`
    - если есть — возвращать объект пользователя с полем `id` внутри объекта.
    - если в метод `read` передать не строку, или не передать параметр вообще — генерировать ошибку.
Метод `readAll`:
    - возвращает массив пользователей
    - генерировать ошибку если в метод `readAll` передан параметр
Метод `update`:
    - обновляет пользователя
    - принимает 2 обязательных параметра
    - генерирует ошибку если передан несуществующий `id`
    - генерирует ошибку если передан `id` с типом не строка
    - генерирует ошибку если второй параметр не валидный
Метод `remove`:
    - удаляет пользователя
    - Генерировать ошибку если передан в метод `delete` несуществующий или невалидный `id`

Обратите внимание!
    - Вам может потребоваться дописать код в событиях onsubmit и onclick для того что бы обрабатывать и выводить сообщения об ошибках
*/

// РЕШЕНИЕ
class DB {
    #id;
    #persons;
    constructor(){
        this.#id = 0
        this.#persons = new Map()
    }

    create(person) {
        const { name, age, country, salary } = person;
        if(name && age && country && salary){
            const id = String(this.#id++);
            this.#persons.set(id, person);
            return id;
        }
        else{
            return new Error('Все поля являються обязательными');
        }
    }
    read (uid) {
        if(!this.#persons.has(uid)){
            return new Error('Юзера с таким id не существует');
        }
        return this.#persons.get(uid);
    }
    readAll () {
        return ([...this.#persons.values()]);
    }
    update (id, newPersonData) {
        const response = this.read(id);
        const isError = response instanceof Error;
        if(isError){
            return response;
        }
        const updatedPerson = {
            ...response,
            ...newPersonData
        }
        this.#persons.set(id, updatedPerson)
        return updatedPerson;
    }
    remove (uid) {
        return this.#persons.delete(uid);
    }
}
// РЕШЕНИЕ

// const person = {
//   name: "Pitter", // обязательное поле с типом string
//   age: 21, // обязательное поле с типом number
//   country: "ua", // обязательное поле с типом string
//   salary: 500 // обязательное поле с типом number
// };

// const id = db.create(person);
// const customer = db.read(id);
// const customers = db.readAll(); // массив пользователей
// db.update(id, { age: 22 }); // id
// db.remove(id); // true

// ПРОВЕРКА
const db = new DB();

const regForm = document.getElementById('regForm');
const updateForm = document.getElementById('updateForm');
const searchForm = document.getElementById('searchForm');
const removeForm = document.getElementById('removeForm');
const alertP = document.getElementById('alert');
const readAllBtn = document.getElementById('readAll');
const list = document.getElementById('list');


regForm.onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const age = formData.get('age');
    const country = formData.get('country');
    const salary = formData.get('salary');

    const person = {
        name,
        age,
        country,
        salary
    };

    const response = db.create(person);
    const isError = response instanceof Error;
    isError?
      alertP.innerHTML = response.message:
      alertP.innerHTML = `Сотрудник ${name} успешно добавлен. Идентификатор сотрудника ${response}.`;
}

searchForm.onsubmit = (event) => {
    event.preventDefault();
    list.innerHTML = null;

    const formData = new FormData(event.target);
    const uid = formData.get('uid');

    const response = db.read(uid);
    const isError = response instanceof Error;
    if(isError){
        alertP.innerHTML = response.message;
    }
    else{
        const worker = getWorker(response);
        list.insertAdjacentHTML('afterbegin', worker);
    }
}

updateForm.onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const uid = formData.get('uid');
    const name = formData.get('name');
    const salary = formData.get('salary');

    const response = db.update(uid, { name, salary });
    const isError = response instanceof Error;
    isError?
        alertP.innerHTML = response.message:
        alertP.innerHTML = `Данные сотрудника ${uid} успешно обновлены.`;
}

removeForm.onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const uid = formData.get('uid');
    const response = db.remove(uid);

    if (response) {
        alertP.innerHTML = `Сотрудник с идентификатором ${uid} успешно удалён.`;

        return;
    }

    alertP.innerHTML = `При удалении сотрудника с идентификатором '${uid}' произошла ошибка.`;
}

readAllBtn.onclick = () => {
    const customers = db.readAll();
    list.innerHTML = null;
    let customersHTML = '';

    customers.forEach((customer) => {
        customersHTML += getWorker(customer);
    });

    list.insertAdjacentHTML('afterbegin', customersHTML);
}
