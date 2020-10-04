const form = document.getElementById('form');
const energyInput = document.getElementById('energyInput');
const getEnergyButton = document.getElementById('getEnergyButton');
const messagesDivElement = document.querySelector('.messages');

function CleanerRobot(initialEnergy = 0 /* Изначальный заряд батареи */) {
    this.getEnergy = getEnergy;
    this.setEnergy = setEnergy;

    const MAX_ENERGY_CAPACITY = 100; /* Максимальная ёмкость батареи. */
    let energy = null;

    this.setEnergy(initialEnergy);

    function createMessage ( type, message ) {
        const p = document.createElement("p");   // Create a <p> element
        p.innerHTML = message;                            // Insert text
        p.classList.add(type);                            // add className for element
        messagesDivElement.appendChild(p);                // Append success message to messages
    }

    function getEnergy() {
        createMessage('text-success', `Текущий заряд батареи: ${energy}`);
        return energy;
    }

    function setEnergy (newEnergy) {
        if(newEnergy < 0){
            createMessage('text-danger', `New energy level can not be less than 0.`);
            throw new Error('New energy level can not be less than 0.');
        }
        if(newEnergy>MAX_ENERGY_CAPACITY){
            createMessage('text-danger', `New energy level can not be more than 100`);
            throw new Error('New energy level can not be more than 100.');
        }
        else{
            energy = newEnergy
        }
    }
}

const cleanerRobot = new CleanerRobot(22);

// Ниже необходимо написать логику работы с DOM

function getCleanerRobotEnergy() {
    cleanerRobot.getEnergy()
}
function onSubmit(event) {
    event.preventDefault();
    cleanerRobot.setEnergy(energyInput.value);
}

form.addEventListener('submit', onSubmit);
getEnergyButton.addEventListener('click', getCleanerRobotEnergy);

/* Текущий заряд батареи: 22 */
/* Информацию необходимо вывести в p элемент с классом text-success */
console.log(`Текущий заряд батареи: ${cleanerRobot.getEnergy()}`);

/* Этот код необходимо вызвать при сабмите формы */
cleanerRobot.setEnergy(55);


/* Текущий заряд батареи: 55 */
/* Информацию необходимо вывести в p элемент с классом text-success */
console.log(`Текущий заряд батареи: ${cleanerRobot.getEnergy()}`);

try {
    new CleanerRobot(-1);
} catch (error) {
    /* Error: New energy level can not be less than 0. */
    /* Информацию необходимо вывести в p элемент с классом text-danger */
    console.log(`${error.name}: ${error.message}`);
}

try {
    cleanerRobot.setEnergy(-22)
} catch (error) {
    /* Error: New energy level can not be less than 0. */
    /* Информацию необходимо вывести в p элемент с классом text-danger */
    console.log(`${error.name}: ${error.message}`);
}

try {
    cleanerRobot.setEnergy(101);
} catch (error) {
    /* Error: New energy level can not be more than 100. */
    /* Информацию необходимо вывести в p элемент с классом text-danger */
    console.log(`${error.name}: ${error.message}`);
}
