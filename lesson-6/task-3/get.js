const get = (url, cb) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        cb(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
      } else {
        cb(null, JSON.parse(xhr.response));
      }
    };

    xhr.onerror = () => {
        cb(new Error('Запрос не удался'));
    };
}
