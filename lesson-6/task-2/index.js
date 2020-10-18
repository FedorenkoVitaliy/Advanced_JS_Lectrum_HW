/*
# Задача 2

Создайте функцию `send` которая будет оберткой для функции `get` которая поддерживает только `callback` технологию.

**Обратите внимание**:

1. Функция `send` должна возвращать промис;
2. Использование `async & await` **запрещено**.
3. Использование посторонних библиотек **запрещено**.
*/

const list = document.getElementById('list');
const message = document.getElementById('message');

// До рефакторинга
const url = 'https://jsonplaceholder.typicode.com/users';
// const url = 'https://httpstat.us/400'; // адрес для проверки ошибки
// get(url, (error, result) => {
// 	if (error) {
// 		throw error;
// 	}
// 	console.log(result);
// });

// РЕЩЕНИЕ
const send = (url) => new Promise((resolve, reject) => {
	get(url, (error, result) => {
		error?
			reject( error):
			resolve(result);
	})
})

// РЕЩЕНИЕ

send(url)
    .then(data => {
		let liHTML = '';

		list.innerHTML = null;
		message.innerHTML = null;

		data.forEach(({ name, email }) => {
			liHTML += `<li class="list-group-item list-group-item-action">
					<h2>${name}</h2>
					<p>Написать письмо: <a href="mailto:${email}">${email}</a></p>
				</li>
			`;
		});

		list.insertAdjacentHTML('afterbegin', liHTML);
    })
    .catch(error => {
		message.innerHTML = null;
		list.innerHTML = null;

		const msgHTML = `<div class="alert alert-danger" role="alert">
			<p>${error.message}</p>
		</div>`;

		message.insertAdjacentHTML('afterbegin', msgHTML);
    });

