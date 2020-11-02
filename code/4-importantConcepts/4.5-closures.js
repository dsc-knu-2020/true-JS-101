'use strict';



function closure() {
    let a = 1;

    function plus() {
        a++;
        return a;
    }
    function minus() {
        a--;
        return a;
    }
    function get() {
        return a;
    }

    return { // ES6 object props shorthandings
        plus,
        minus,
        get
    };
}
const { get, minus, plus } = closure();

console.log(get());

console.log(minus());
console.log(get());

console.log(minus());
console.log(minus());
console.log(plus());
console.log(get());

// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). 
// In other words, a closure gives you access to an outer function’s scope from an inner function. 
// In JavaScript, closures are created every time a function is created, at function creation time.

function createAccountBalanceManager() {
    let counter = 0;

    function setBalance(value) {
        counter = value;
    }
    function getBalance() {
        return counter;
    }
    function chargeBalance(value) {
        counter += value;
    }
    function withdrawFromBalance(value) {
        counter -= value;
    }

    const manager = {
        getBalance,
        setBalance,
        chargeBalance,
        withdrawFromBalance
    };
    return manager;
}


const accountManager = createAccountBalanceManager();

console.log('\nAccount manager exercising:\n');
console.log(accountManager.getBalance());

accountManager.setBalance(3);
console.log(accountManager.getBalance());

accountManager.chargeBalance(33);
console.log(accountManager.getBalance());

accountManager.withdrawFromBalance(31);
console.log(accountManager.getBalance());

accountManager.setBalance(-3);
console.log(accountManager.getBalance());

accountManager.chargeBalance(-33);
console.log(accountManager.getBalance());

accountManager.withdrawFromBalance(333);
console.log(accountManager.getBalance());




function createSafeAccountBalanceManager() {
    let counter = 0;
    
    function setBalance(value) {
        if (Number.isSafeInteger(value) && value >= 0) {
            counter = value;
            return counter;
        } else {
            console.log('Failed to assign balance with this amount:', value);
        }
    }
    function getBalance() {
        return Number(counter); // enables counter's immutability   
    }
    function chargeBalance(value) {
        if (Number.isSafeInteger(value) && value >= 0) {
            counter += value;
            return counter;
        } else {
            console.log('Failed to charge balance with this amount:', value);
        }
    }
    function withdrawFromBalance(value) {
        if (Number.isSafeInteger(value) && value >= 0 && (counter - value) >= 0) {
            counter -= value;
            return counter;
        } else {
            console.log('Failed to withdraw this amount from balance:', value);
        }
    }
    
    const manager = {
        getBalance,
        setBalance,
        chargeBalance,
        withdrawFromBalance
    };
    return manager;
}



const safeAccountManager = createSafeAccountBalanceManager();
console.log('\nSafe account manager exercising:\n');

console.log(safeAccountManager.getBalance());

safeAccountManager.setBalance(-3);
safeAccountManager.setBalance(3);
console.log(safeAccountManager.getBalance());

safeAccountManager.chargeBalance(33);
console.log(safeAccountManager.getBalance());

safeAccountManager.withdrawFromBalance(333);
safeAccountManager.withdrawFromBalance(31);
console.log(safeAccountManager.getBalance());



function pieIngredientsGetterFactory(specificIngredients) {
    const coreIngredients = ['eggs', 'flour', 'water', 'salt', 'sugar'];
    let ingredients = Array.from(coreIngredients);

    // let's imagine that here some complicated logic is done

    return function(optionalIngredients) {
        // since hard logic is done above, in the closing function, 
        // there's no need to repeat it in each of this function's "instances"

        if (specificIngredients) {
            ingredients = ingredients.concat(specificIngredients);
        }
        if (optionalIngredients) {
            ingredients = ingredients.concat(optionalIngredients);
        }

        return ingredients;
    }
}

const getSimplePieIngredients = pieIngredientsGetterFactory();
const getApplePieIngredients = pieIngredientsGetterFactory(['apple']);
const getPotatoPieIngredients = pieIngredientsGetterFactory(['potato', 'mushrooms', 'fried onion']);

console.log('Simple pie ingredients:', getSimplePieIngredients());
console.log('Apple pie ingredients:', getApplePieIngredients());
console.log('Potato pie ingredients:', getPotatoPieIngredients());

console.log('Apple pie ingredients including optional ones:', getApplePieIngredients('cinnamon', 'vanilla sugar'));






/*
Bonus tasks

1) https://dmitripavlutin.com/simple-but-tricky-javascript-interview-questions/#5-the-classic-question-tricky-closure

2) Safe account manager with history

function createLogManager(hooks) {
    const log = [];
    
    return {
        addRecord(data) {
            log.push({ 
                ...data,
                date: new Date().toLocaleString('uk-UA') 
            });
            hooks.afterRecordAdded();
        },
        getLog() {
            return Array.from(log);
        }
    }
}

function createSafeAccountBalanceManagerWithHistory() {
    const OPERATION_TYPES = {
        GET: 'GET',
        SET: 'SET',
        CHARGE: 'CHARGE',
        WITHDRAW: 'WITHDRAW',
        HISTORY_REQUESTED: 'HISTORY',
    };
    
    let balance = 0;
    let history = '';    

    const logManager = createLogManager({
        afterRecordAdded: () => updateHistory()
    });
    
    function getBalance() {
        logManager.addRecord({
            isSucceed: true,
            operation: OPERATION_TYPES.GET,
            result: balance
        });
        return balance;
    }
    function setBalance(value) {
        if (Number.isSafeInteger(value) && value >= 0) {
            balance = value;
            logManager.addRecord({
                isSucceed: true,
                operation: OPERATION_TYPES.SET,
                value,
                result: balance
            });
            
            return balance;
        } else {
            logManager.addRecord({
                isSucceed: false,
                operation: OPERATION_TYPES.SET,
                value
            });
            throw new Error(`Failed to assign balance with this amount: ${value}`);
        }
    }
    function chargeBalance(value) {
        if (Number.isSafeInteger(value) && value >= 0) {
            balance += value;
            logManager.addRecord({
                isSucceed: true,
                operation: OPERATION_TYPES.CHARGE,
                value,
                result: balance
            });
            
            return balance;
        } else {
            logManager.addRecord({
                isSucceed: false,
                operation: OPERATION_TYPES.CHARGE,
                value,
            });
            throw new Error(`Failed to charge balance with this amount: ${value}`);
        }
    }
    function withdrawFromBalance(value) {
        if (Number.isSafeInteger(value) && value >= 0 && (balance - value) >= 0) {
            balance -= value;
            logManager.addRecord({
                isSucceed: true,
                operation: OPERATION_TYPES.WITHDRAW,
                value,
                result: balance
            });
            
            return balance;
        } else {
            logManager.addRecord({
                isSucceed: false,
                operation: OPERATION_TYPES.WITHDRAW,
                value,
            });
            throw new Error(`Failed to withdraw this amount from balance: ${value}`);
        }
    }

    function updateHistory() {
        const log = logManager.getLog();
        const [lastLogEntry] = log.slice(-1);
        
        if (log.length > 1) {
            history += '\n\n';
        }
        history += `Operation #${log.length}:\n${lastLogEntry.date}, `;
        
        if (lastLogEntry.isSucceed) {
            if (lastLogEntry.operation === OPERATION_TYPES.GET) {
                history += `balance was requested, balance: ${lastLogEntry.result}`;
            } else if (lastLogEntry.operation === OPERATION_TYPES.SET) {
                history += `balance was overwrited, result: ${lastLogEntry.result}`;
            } else if (lastLogEntry.operation === OPERATION_TYPES.CHARGE) {
                history += `balance was charged with ${lastLogEntry.value}, result: ${lastLogEntry.result}`;
            } else if (lastLogEntry.operation === OPERATION_TYPES.WITHDRAW) {
                history += `${lastLogEntry.value} was withdrawed from balance, balance: ${lastLogEntry.result}`;
            } else {
                history += `history was requested, balance: ${lastLogEntry.result}`;
            }
        } else {
            if (lastLogEntry.operation === OPERATION_TYPES.SET) {
                history += `attempt to overwrite balance with ${lastLogEntry.value} was failed`;
            } else if (lastLogEntry.operation === OPERATION_TYPES.CHARGE) {
                history += `attempt to charge balance with ${lastLogEntry.value} was failed`;
            } else {
                history += `attempt to withdraw ${lastLogEntry.value} from balance was failed`;
            } 
        }
    }
    function getHistory() {
        logManager.addRecord({
            isSucceed: true,
            operation: OPERATION_TYPES.HISTORY_REQUESTED,
            result: balance
        });
        return history;
    }
    
    return {
        getBalance,
        setBalance,
        chargeBalance,
        withdrawFromBalance,
        getHistory
    };;
}

const safeAccountManagerWithHistory = createSafeAccountBalanceManagerWithHistory();

console.log('\nSafe account manager with history exercising:\n');
console.log(safeAccountManagerWithHistory.getBalance());

try {
    console.log(safeAccountManagerWithHistory.setBalance(-3));
} catch(e) {
    console.log(e.message);
}
try {
    console.log(safeAccountManagerWithHistory.setBalance(3));
} catch(e) {
    console.log(e.message);
}
console.log(safeAccountManagerWithHistory.getBalance());

try {
    console.log(safeAccountManagerWithHistory.chargeBalance(-33));
} catch(e) {
    console.log(e.message);
}
try {
    console.log(safeAccountManagerWithHistory.chargeBalance(33));
} catch(e) {
    console.log(e.message);
}
console.log(safeAccountManagerWithHistory.getBalance());


try {
    console.log(safeAccountManagerWithHistory.withdrawFromBalance(333));
} catch(e) {
    console.log(e.message);
}
try {
    console.log(safeAccountManagerWithHistory.withdrawFromBalance(31));
} catch(e) {
    console.log(e.message);
}
console.log(safeAccountManagerWithHistory.getBalance());

console.log(`\nHistory:\n`);
console.log(safeAccountManagerWithHistory.getHistory());

*/