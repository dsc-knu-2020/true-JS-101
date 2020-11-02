// https://habr.com/ru/post/464163/

'use strict';



console.log(globalThis); // global object

function logThis() {
    console.log(this);
}
logThis();



const Ivan = {
    name: 'Ivan',
    surname: 'Ivanov',
    print() {
        console.log(`Here's Ivan.`);
        console.log(`His name is ${this.name}`);
        console.log(`His surname is ${this.surname}`);
    }
};
IvanIvanov.print();

// function doesn't remember where it was created, only where it is called
const Petro = {
    name: 'Petro',
    surname: 'Earhart',
    print: Ivan.print
};
Petro.print();

const { print } = IvanIvanov;
// here it is called without any context
print();



// explicit 'this' specifying
print.call(IvanIvanov, 'Petro');
print.apply(IvanIvanov, ['Petro']);

const printWithBindedThis = print.bind(IvanIvanov);
printWithBindedThis();



function createThisLogger() {
    return function() {
        console.log(this);
    };
}
const bindedCreateThisLogger = createThisLogger.bind('this');

const logThis = bindedCreateThisLogger();
logThis();

// vs

function createThisLogger() {
    return () => {
        console.log(this);
    };
}
const bindedCreateThisLogger = createThisLogger.bind('this');

const logThis = bindedCreateThisLogger();
logThis();



// There're a bit more rules... Check here: https://habr.com/ru/post/464163/
