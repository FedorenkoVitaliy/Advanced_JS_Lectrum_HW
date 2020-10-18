
/*
# Задача 3

Создайте класс `Users` который при создании своего экземпляра принимает один параметр с типом строка. Этот параметр будет служить API эндпоинтом.

У класса `Users` должен быть один метод `send` который должен возвращать промис.

Метод `send` один параметр который должен быть по типу `number` и который потом будет использоваться как значение для `GET` path-параметра.
Например если передать 1 то url будет выглядеть таким образом → https://jsonplaceholder.typicode.com/users/1

**Обратите внимание**:

1. Метод `send` должен возвращать промис.
2. Использование `async & await` внутри класса **запрещено**.
3. Использовать функцию для отправки запросов get которая находится в файле get.js
4. Использование посторонних библиотек **запрещено**
5. Если сервер ответил статус кодом `200` промис **должен** возвращать выбранного пользователя.
6. В том случае если сервер ответил статус кодом не `200` промис **должен** генерировать ошибку с текстом `Произошла ошибка, статус код: ${statusCode}`
7. Генерировать ошибку если `url` по типу не строка.
8. Генерировать ошибку если методу `send` передать по типу не число.
*/

const url = 'https://jsonplaceholder.typicode.com/users';
//const url = 'https://httpstat.us/400'; // адрес для проверки ошибки

const list = document.getElementById('list');
const message = document.getElementById('message');
const userForm = document.getElementById('userForm');

// РЕЩЕНИЕ
class Users {
	constructor(url) {
		this.endpoint = url;
	}
	send(param){
		return new Promise((resolve, reject) => {
			typeof param !== 'number' && reject( new Error(`TypeError: param must be a number`));
			typeof this.endpoint !== 'string' && reject( new Error(`TypeError: url must be a string`));

			const path = `${this.endpoint}/${param}`;
			get(path, (error, result) => {
				error?
					reject( new Error(`Произошла ошибка, статус код: ${error}`)):
					resolve( result );
			})
		})
	}
}
// РЕЩЕНИЕ

const users = new Users(url);

userForm.onsubmit = async (event) => {
	event.preventDefault();
	list.innerHTML = null;
	message.innerHTML = null;

	const formData = new FormData(event.target);
	const uid = formData.get('uid');

	try {
		if (!uid) {
			throw new Error('Не указан идентификатор пользователя!');
		}

		const { name, email } = await users.send(Number(uid));
		const liHTML = `<li class="list-group-item list-group-item-action">
				<h2>${name}</h2>
				<p>Написать письмо: <a href="mailto:${email}">${email}</a></p>
			</li>
		`;

		list.insertAdjacentHTML('afterbegin', liHTML);
	} catch (error) {
		const msgHTML = `<div class="alert alert-danger" role="alert">
			<p>${error.message}</p>
		</div>`;

		message.insertAdjacentHTML('afterbegin', msgHTML);
	}
}

