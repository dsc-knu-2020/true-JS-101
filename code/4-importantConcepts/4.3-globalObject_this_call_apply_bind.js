// https://habr.com/ru/post/464163/

'use strict';



console.log('globalThis:', globalThis); // global object

function logThis() {
    console.log('this in function:', this);
}
logThis();



const Ivan = {
    name: 'Ivan',
    surname: 'Ivanov',
    print(...args) {
        console.log('args: ', ...args);
        console.log(`Here's Ivan.`);
        console.log(`His name is ${this.name}`);
        console.log(`His surname is ${this.surname}`);
    }
};
Ivan.print();

// function doesn't remember where it was created, only where it is called
const Petro = {
    name: 'Petro',
    surname: 'Earhart',
    print: Ivan.print
};
Petro.print();

const { print } = Ivan;
// here it is called without any context
print();



// explicit 'this' specifying
print.call(Ivan, 'Petro');
print.apply(Ivan, ['Petro']);

const printWithBindedThis = print.bind(Ivan);
printWithBindedThis();



function createThisLogger() {
    return function() {
        console.log('this in inner classical function:', this);
    };
}
const bindedCreateThisLogger = createThisLogger.bind('this');

const logThis = bindedCreateThisLogger();
logThis();

// vs

function createThisLogger() {
    return () => {
        console.log('this in inner arrow fn:', this);
    };
}
const bindedCreateThisLogger = createThisLogger.bind('this');

const logThis = bindedCreateThisLogger();
logThis();



// There're a bit more rules... Check here: https://habr.com/ru/post/464163/
