'use strict';



const bandInfo = {
    name: 'Чиж и Ко',
    genre: 'rock',
    lastAlbum: {
        name: 'Нечего терять',
        year: 1999,
        tracklist: [
            "Нечего терять",
            "Еду, еду…",
            "Рождён, чтобы бежать",
            "Урал-Байкер блюз",
            "На двоих",
            "Пригородный блюз (автор Майк Науменко)",
            "Зверёк",
            "Дорожная № 2",
            "Я подобно собаке…",
            "Расстели мне поле (автор Дмитрий Некрасов)",
            "Пароль",
            "Пригородный блюз (ремикс от группы Русский размер)",
            "Я подобно собаке (альтернативная гитарная версия)",
            "Урал-Байкер блюз (альтернативная версия)"
        ]
    },
};


// rest operator - u gain reusability
const { name, genre, ...otherInfo } = bandInfo;
console.log(name, genre, otherInfo);



const infoAboutOccupation = {
    occupation: 'tailor'
};
const infoAboutFamily = {
    family: {
        size: 3,
        members: [
            {
                relation: 'mother',
                name: 'Brunhilda Earhart',
                isAlive: false
            },
            {
                relation: 'brother',
                name: 'Brunhild Earhart',
                isAlive: true
            },
            {
                relation: 'daughter',
                name: 'Amelia Earhart',
                isAlive: null
            },
        ]
    }
};
const infoAboutHobbies = {};

// #1
const completeInfo = Object.assign({}, infoAboutOccupation, infoAboutFamily, infoAboutHobbies);
console.log(completeInfo);

// #2
const completeInfo = {
    name: 'Someone Earhart',
    age: 76,
    // spreading - idk, just cool
    // other syntax, more declarative
    ...infoAboutOccupation,
    ...infoAboutFamily,
    ...infoAboutHobbies,
};
console.log(completeInfo);



const falsyValue = null;
const truthyValue = 2;

const objectThatContainsPropsOnlyIfTheyAreTruthy =  {};
if (falsyValue) {
    objectThatContainsPropsOnlyIfTheyAreTruthy.falsyValue = falsyValue;
}
if (truthyValue) {
    objectThatContainsPropsOnlyIfTheyAreTruthy.truthyValue = truthyValue;
}
console.log(objectThatContainsPropsOnlyIfTheyAreTruthy);

// vs 

const objectThatContainsPropsOnlyIfTheyAreTruthy =  {
    // this is extremely cool feature u can use because spreading exists
    ...(falsyValue ? { falsyValue } : {}),
    ...(truthyValue ? { truthyValue } : {}),
};
console.log(objectThatContainsPropsOnlyIfTheyAreTruthy);



// Array



const marks = [12, 6, 8, 9, 5, 12, 12, 11];

const [mark0, mark1, ...otherMarks] = marks;
console.log(mark0, mark1, otherMarks);



const famousFilms2017 = ['mother!', 'Baby Driver'];
const famousFilms2018 = ['Green Book', 'The House That Jack Built'];
const famousFilms2019 = ['Joker', 'Parasite'];

const famousFilmsOfLast3Years = ['Wonder Woman', 'It'].concat(famousFilms2017).concat(famousFilms2018).concat(famousFilms2019);
console.log(famousFilmsOfLast3Years);

// vs

const famousFilmsOfLast3Years = ['Wonder Woman', 'It', ...famousFilms2017, ...famousFilms2018, ...famousFilms2019];
console.log(famousFilmsOfLast3Years);



// Function params



function isBeverage(beverageName) {
    const brewableBeverageNamesList = ['tea', 'coffee', 'chicory', 'spiced wine'];

    for (const item of brewableBeverageNamesList) {
        if (item === beverageName) {
            return true;
        }
    }

    return false;
}

function checkAndBrew(beverageName) {
    if (isBeverage(beverageName)) {
        return {
            name: beverageName,
            eta: 10, // ETA === Estimation Time Arrival
            price: 20,
            discount: 10
        };
    } else {
        throw new Error(`Sorry, but we cannot brew this ${beverageName} for you: it's just impossible;)`)
    }    
}    

function brewBeverages(beverageName1, beverageName2) {
    const beveragesList = [beverageName1, beverageName2];
    let handledOrders = [];

    for (const beverage of beveragesList) {
        let orderResult;

        try {
            orderResult = {
                success: true,
                ...checkAndBrew(beverage)
            };
        } catch ({ message }) {
            orderResult = {
                success: false, 
                reason: message
            };
        }
        
        handledOrders = [...handledOrders, orderResult];
    }
    
    return handledOrders;
}

brewBeverages('tea', 'beer');
brewBeverages('milkshake', 'lemon juice');
brewBeverages('coffee'); // bOORING.. and inconvenient


// yea, rest operator is usable even with functions
function brewBeverages(...beveragesList) {
    console.log(beveragesList);
    let handledOrders = [];

    for (const beverage of beveragesList) {
        let orderResult;

        try {
            orderResult = {
                success: true,
                ...checkAndBrew(beverage)
            };
        } catch ({ message }) {
            orderResult = {
                success: false, 
                reason: message
            };
        }
        
        handledOrders = [...handledOrders, orderResult];
    }
    
    return handledOrders;
}
brewBeverages('tea', 'beer', 'milkshake', 'lemon juice', 'coffee');



// ... and rest operator too! 
// I'm like an ice-cream now...
function matchValue(condition, defaultValue, ...args) {
    for (const arg of args) {
        if (condition(arg)) {
            return arg;
        }
    }
    
    return defaultValue;
}
matchValue(
    checkedItem => checkedItem % 3 === 1, // condition
    0, // default value
    2, 4, 6, 8 // values to check
);



function matchValue(condition, defaultValue, ...args) {
    for (const arg of args) {
        if (condition(arg)) {
            return arg;
        }
    }
    
    return defaultValue;
}
const numbersToCheck = [2, 4, 6, 8];

matchValue(
    checkedItem => checkedItem % 3 === 1,
    0,
    ...numbersToCheck // .. YES, AND FOR PARAMS
);
