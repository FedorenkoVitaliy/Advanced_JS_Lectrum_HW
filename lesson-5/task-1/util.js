const getWorker = ({ name, age, country, salary }) => `
<li>
    <div class="card p-4">
        <div class="d-flex align-items-center">
            <div class="image">
                <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155">
            </div>
            <div class="ml-3 w-100">
                <h4 class="mb-0 mt-0">${name}</h4> 
                <hr/>
                <p>Возраст: <b>${age}</b></p>
                <p>Страна: <b>${country}</b></p>
                <p>Зарплата: <b>${salary}</b></p>
            </div>
        </div>
    </div>
</li>
`;