'use strict';



const num = 4;
const num2 = 4;
const bool1 = true;
const bool2 = false;
const str1 = 'string';
const str2 = 'string';



// all the general arithmetic operations
console.log('num1 ** num2 =', num ** num2); // -, *, /, %, **
console.log('num1 / 0 =', num / 0);



// comparison operations
console.log('num1 > num2:', num > num2); // >=, <, <=
console.log('num1 === num2:', num === num2);



// boolean algebra
console.log('bool1 && bool2 =', bool1 && bool2); // ||
console.log('!bool1 =', !bool1);



// operations with strings
console.log('str1 + str2 =', str1 + str2);
console.log('str1 === str2:', str1 === str2);



// objects are not primitives, they are passed via reference
const obj = {};
const theSameObject = obj;
console.log(obj === theSameObject);

const obj = {};
const theSameObject = {};
console.log(obj === theSameObject);
