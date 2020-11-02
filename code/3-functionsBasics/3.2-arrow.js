'use strict';



// there's other type of functions
// they are called arrow functions and declared in the other way as classical functions are

// this function has body
// it is executed in the same way as the body of the classical function is
(value) => {
    return !!value;
}
const isTruthy2 = value => {
    return !!value;
}



// arrow function is able to has no body, it must specify the value that will be returned in such case
const isTruthy3 = (value) => !!value;
const isTruthy4 = value => !!value;


// if u wanna return an object
const returningObject = propName => ({
    [propName]: 'someValue'
});
console.log(returningObject('foo'));



// we can easily use IIFE technique for arrow functions as well
(() => {
    console.log('arrow IIFE is called');
})();
