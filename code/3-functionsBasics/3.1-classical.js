'use strict';



// function is the special type of the object, the distinguishing feature - it is callable
function funcName(arg1, arg2) {
    // body
    const sum = arg1 + arg2;
    // ...

    // optional return statement
    return sum;
}



// we can use function to create object following the same exact logic all the time
function createObject(propName, propValue) {
    const obj = {
        [propName]: propValue
    };

    return obj;
}
function inlinedCreateObject(propName, propValue) {
    return {
        [propName]: propValue
    };
}



// // we can pass functions to functions as params - they are called callbacks in such cases
// // this is possible cause function is a special type of object in JS (coooool, right)
function logData(data, logFunction, callback) {
    console.log(data);

    if (logFunction) {
        logFunction(data);
    }

    if (callback) {
        callback(data);
    }
}
logData();


// functional expression - again, since function is object, we can create it ans store it in some variable
const functionalExpression = function () {
    console.log('Function that is functional expression is called');
};
functionalExpression();

const namedFunctionalExpression = function named() {
    console.log('Function that is named functional expression is called');
};
namedFunctionalExpression();



// one of the differences between function declaration and functional expression is that
// we can declare functions in any place of the file, and use it in any place too
funcThatDefinedBelow('arg');
function funcThatDefinedBelow(arg) {
    console.log(arg);
}



// since we can create functions on the go, we can also execute it on the go
// this technique is called Immediately Invoking Functional Expression - IIFE, it is widely used
(function IIFE() {
    console.log(`IIFE stands for 'Immediately Invoking Functional Expression'`);
})();
