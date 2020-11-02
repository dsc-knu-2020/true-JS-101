'use strict';



// Number

function isNumberish(testValue) {
    return !Number.isNaN(Number(testValue));
}

console.log(isNumberish(42));
console.log(isNumberish('42'));
console.log(isNumberish('not numberish string'));
console.log(isNumberish({}));



// Math

function makeRandomDecision(valueA, valueB) {
    const random0Or1 = Math.round(Math.random());
    return random0Or1 ? valueA : valueB;
}

for (let i = 0; i < 10; i++) {
    console.log(makeRandomDecision('to be', 'not to be'));
}



// String

const singers = ['Madonna', 'Red Hot Chili Peppers', 'Breaking Benjamin'];
const userInput = 'Red hot chili peppers';

let isMatch = false;
for (const singer of singers) {
    if (userInput === singer) {
        isMatch = true;
    }
}
console.log(isMatch);

const singers = ['Madonna', 'Red Hot Chili Peppers', 'Breaking Benjamin'];
const userInput = 'Red hot chili peppers';

let isMatch = false;
for (const singer of singers) {
    if (userInput.toLowerCase() === singer.toLowerCase()) {
        isMatch = true;
    }
}
console.log(isMatch);



const punctuation = [',', '!', '?', ':', ';', '.'];
let userInput = `Hey, u wanna some coffee, aren't u?`;

let doesIncludePunctuation = false;
for (const sign of punctuation) {
    if (userInput.includes(sign)) {
        doesIncludePunctuation = true;
        return;
    }
}
console.log(doesIncludePunctuation);



for (const sign of punctuation) {
    userInput = userInput.replace(sign, '');
}
console.log(userInput);

const words = userInput.split(' ');
console.log(words);



// console object is also a built-in
