'use strict';



const obj = {
  nested1: {
    nested21: 42,
    nested22: 'string'
  }
};



// useful and best-practice types convertion - X-to-boolean

// || (OR): result will be the first truthy value, if there's no - the last one
console.log('null || 42:', null || 42);
console.log('null || undefined || 0 || "" || false || {} || obj:', null || undefined || 0 || "" || false || {} || obj);
console.log('0 || undefined || false:', undefined || 0 || false); // all are falsy



// && (AND): result will be the first falsy value, if there's no - the last one 
console.log('obj && {} && "string" && null && 42:', obj && {} && "string" && null && 42);
console.log('true && {} && "0" && 1:', true && {} && "0" && 1); // all are truthy



// Javascript provides its types converting system for other types too
// but it's highly unrecommended to use it as the code that use its features is very non-straightforward 
// and requires a lot of efforts to be read and to be understood
console.log('42 + "string" =', 42 + "string");
console.log('true + "string" =', true + "string");
console.log('null + "string" =', null + "string");

console.log('42 - "2" =', 42 - "2");
console.log('42 - null =', 42 - null);
console.log('42 - true =', 42 - true);

console.log('"5" + -"3":', "5" + -"3");
