// ЗАДАЧА. Представлен счет в банке (дан интерфейс). Написать прокси к счету, который будет защищать счет от не санкионированных пополнений.
// Это значит, класс счета должен поменять поведения метода getBalance таким образом, чтобы один экземпляр класса мог один раз пополнять счет

// interface BankAccount
// {
//     deposit(amount);
//     getBalance();
// }

class BankAccount {
    transactions = []; // список транзакций
    
    // вносим депозит, храним с списке транзакций
    deposit(amount) {
        this.transactions.push(amount);
    }

    // рассчитываем баланс по накопленным транзакциям
    getBalance() {
        const sum = this.transactions.reduce((acc, curr) => acc + curr, 0);
        console.log(this.transactions, sum);
        return sum;
    }
}

// РЕШЕНИЯ
class BankAccountProxy extends BankAccount { /**/}
// РЕШЕНИЯ

const cost = 30;
const cost2 = 50;

const bankAccount = new BankAccountProxy();
// const bankAccount = new BankAccount();
bankAccount.deposit(cost);

console.log(bankAccount.getBalance()); // result == cost

bankAccount.deposit(cost2);
bankAccount.deposit(cost2);
/// ....

console.log(bankAccount.getBalance()); // result != cost + cost2
