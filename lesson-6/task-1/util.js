const message = document.getElementById('message');

const getSuccessHTML = (text) => {
    message.innerHTML = null;

    const msgHTML = `<div class="alert alert-success" role="alert">
        <p>${text}</p>
    </div>`;

    message.insertAdjacentHTML('afterbegin', msgHTML);
};

const getErrorHTML = (text) => {
    message.innerHTML = null;

    const msgHTML = `<div class="alert alert-danger" role="alert">
        <p>${text}</p>
    </div>`;

    message.insertAdjacentHTML('afterbegin', msgHTML);
};