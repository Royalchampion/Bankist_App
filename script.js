'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach((value, key) => {
    const type = value < 0 ? `withdrawal` : `deposit`;

    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${
      key + 1
    } ${type}</div>
                    <div class="movements__value">${value}</div></div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${interest} €`;
};
// calcDisplaySummary(account1);

const nameAccount = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word[0];
      })
      .join('');
  });
};
nameAccount(accounts);
// console.log(accounts);

const showBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  });
  labelBalance.textContent = `${acc.balance} EUR`;
};
// showBalance(account1.movements);

const updateUI = function (acc) {
  // Display Balance
  showBalance(currentAccount);

  // Display Summary
  calcDisplaySummary(currentAccount);

  // Display Movements
  displayMovements(currentAccount.movements);
};

let currentAccount;
// Event Handler
btnLogin.addEventListener('click', function (e) {
  // Prevent data from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
    // console.log('LOGIN');
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferAmountTo = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(transferAmountTo, amount);
  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    transferAmountTo &&
    currentAccount.balance >= amount &&
    transferAmountTo?.userName !== currentAccount.userName
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    transferAmountTo.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});
/*
const userNameHack = function (user) {
  const userName = user
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word[0];
    })
    .join('');
  return userName;
};
console.log(userNameHack('Steven Thomas Williams'));
*/
// const user = 'Steven Thomas Williams';

// console.log(userName);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log('----------------For-of loop---------------');
for (let [index, movement] of movements.entries()) {
  if (movement < 0) {
    console.log(
      `Movement ${index + 1} : You withdrew the amount of ${Math.abs(movement)}`
    );
  } else {
    console.log(
      `Movement ${index + 1} : You deposited the amount of ${movement}`
    );
  }
}

console.log('-------------For-each loop----------------');
movements.forEach((element, index, array) => {
  if (element < 0) {
    console.log(
      `Movement ${index + 1} : You withdrew the amount of ${Math.abs(element)}`
    );
  } else {
    console.log(
      `Movement ${index + 1} : You deposited the amount of ${element}`
    );
  }
});
/////////////////////////////////////////////////


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key} : ${value}`);
});

const set = new Set(['USD', 'INR', 'EUR', 'USD', 'INR']);
console.log(set);
set.forEach((value, _, set) => {
  console.log(`${value} : ${value}`);
});
*/

////////////////////////////////////////////////////

// Problem-Solving Framework
// 1. Crate a function checkDogs with two input arrays showing Julia's and Kate's data.
// 2. Since, some of Julia's array data contain the records of cats, You have to create a shallow copy of that array and remove the cats' data from that copied array.
// 3. Create a joined array from both Julia's and Kate's data.
// 4. For the remaining data remained inside the joined array, log the output.
// 5. Run the function for both the datasets.
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopied = dogsJulia.slice(1, -2);
  const joinedData = [...dogsJuliaCopied, ...dogsKate];
  console.log(joinedData);
  joinedData.forEach((age, index) => {
    if (age < 3) {
      console.log(`Dog number ${index + 1} is still a puppy.`);
    } else {
      console.log(`Dog number ${index + 1} is an adult.`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const dogsJulia = [3, 5, 2, 12, 7];
// const data = dogsJulia.slice(1, -2);
// console.log(data);

const eurToUSD = 1.1;
const convertToUSD = account1.movements.map(function (movement) {
  return movement * eurToUSD;
});

console.log(account1.movements);
console.log(convertToUSD);
// convertToUSD();

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (movement) {
  return movement > 0;
});
console.log(movements);
console.log(deposits);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function (acc, value, index, arr) {
  console.log(`${index} : ${acc}`);
  return acc + value;
}, 0);
console.log(balance);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function (acc, value, index, arr) {
  console.log(`${index} : ${acc}  ${value}`);
  return acc + value;
}, 0);
console.log(balance);
const calcAverageHumanAge = array => {
  const humanAge = array
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(dogAge => dogAge >= 18)
    .reduce((acc, dogAge, i, arr) => acc + dogAge / arr.length, 0);
  return humanAge;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
*/

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calc = function (ages) {
  const humanAge = ages.map(function (age) {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });
  console.log(humanAge);
  const humanLifeSpan = humanAge.filter(function (age) {
    return age >= 18;
  });
  console.log(humanLifeSpan);
  const avgHumanAge =
    humanLifeSpan.reduce(function (acc, age) {
      return acc + age;
    }, 0) / humanLifeSpan.length;
  return avgHumanAge;
};

console.log(calc([5, 2, 4, 1, 15, 8, 3]));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUSD = 1.1;

console.log(movements);

const totalDepositsUSD = movements
  .filter(mov => mov < 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * euroToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
*/
