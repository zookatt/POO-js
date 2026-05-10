/*
1. Clase Account (Clase base)
--------------------------------------------------------

🔹 Propiedades:
- owner: titular de la cuenta
- balance: saldo de la cuenta (por defecto 0)
- #password: contraseña de la cuenta (privada, usando encapsulamiento real)

🔹 Métodos:
- deposit(amount): añade dinero al saldo
- withdraw(amount): retira dinero del saldo (con validaciones)
- getter balance: devuelve el saldo actual
- setter password: verifica que la contraseña tenga al menos 6 caracteres
*/

class Account {
  #password;

  constructor(owner, balance = 0) {
    this.owner = owner;
    this._balance = balance;
    this.#password = "123456";
  }
  deposit(amount) {
    if (amount <= 0) return;
    this._balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) return;
    if (amount > this.balance) return;
    this._balance -= amount;
  }

  get balance() {
    return this._balance;
  }

  set password(newPassword) {
    if (newPassword.length < 6) {
      console.log("Password is too short");
      return;
    }
    this.#password = newPassword;
  }
}

/*
2. SavingsAccount (Cuenta Ahorro)
----------------------------------

🔹 Hereda de: Account

🔹 Propiedad adicional:
- interestRate: tasa de interés

🔹 Método extra:
- applyInterest(): aplica la tasa de interés al saldo
*/

class SavingsAccount extends Account {
  constructor(owner, balance = 0, interestRate) {
    super(owner, balance);
    this.interestRate = interestRate;
  }

  applyInterest() {
    this._balance += this._balance * this.interestRate;
  }
}

/*
3. CurrentAccount (Cuenta Corriente)
----------------------------------

🔹 Hereda de: Account

🔹 Propiedad adicional:
- overdraftLimit: límite de sobregiro

🔹 Sobrescritura de método:
- withdraw(): permite saldo negativo hasta el límite de sobregiro
*/

class CurrentAccount extends Account {
  constructor(owner, balance = 0, overdraftLimit) {
    super(owner, balance);
    this.overdraftLimit = overdraftLimit;
  }

  withdraw(amount) {
    if (amount <= 0) return;
    if (amount > this.balance + this.overdraftLimit) return;
    this._balance -= amount;
  }
}

/*
4. Clase Bank
--------------

🔹 Propiedad:
- accounts: lista de cuentas registradas en el banco

🔹 Métodos:
- addAccount(account): agrega una cuenta a la lista
- findAccountByOwner(name): busca una cuenta por el nombre del titular
- transfer(from, to, amount): transfiere saldo entre cuentas

🔹 Método estático:
- static bankInfo(): devuelve un nombre ficticio del banco y año de fundación
*/

class Bank {
  constructor(accounts = []) {
    this.accounts = accounts;
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  findAccountByOwner(name) {
    return this.accounts.find((account) => account.owner === name);
  }

  transfer(from, to, amount) {
    const fromAccount = this.findAccountByOwner(from);
    const toAccount = this.findAccountByOwner(to);

    if (!fromAccount || !toAccount) return;
    if (amount <= 0) return;

    const initialBalance = fromAccount.balance;
    fromAccount.withdraw(amount);
    if (fromAccount.balance === initialBalance) return;
    toAccount.deposit(amount);
  }

  static bankInfo() {
    return "Maze Bank, fundado en 1998";
  }
}
