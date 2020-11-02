// consolelog descriptions added with https://repl.it/@AndrewPavlenko/Consolelog-descriptions#addConsolelogDescriptions.js

'use strict';



const userInput = {
    123: 2,
    field: 'value'
};

// console.log("userInput.123 =", userInput.123);
console.log("userInput['123'] =", userInput['123']);
console.log("userInput['field'] =", userInput['field']);
console.log("userInput.field =", userInput.field);
console.log("userInput.someNonExistentField =", userInput.someNonExistentField);



const complicatedObject = {
    nested1: {
        nested2: {
            nested3: {
                nested4: {
                    nested5: 'someDeeplyHiddenValue'
                }
            }
        }
    }
};

console.log("complicatedObject.nested1.nested2.nested3.nested4.nested5 =", complicatedObject.nested1.nested2.nested3.nested4.nested5);
console.log("complicatedObject.nested1.nested2['nested3'].nested4['nested5'] =", complicatedObject.nested1.nested2['nested3'].nested4['nested5']);
console.log("complicatedObject.nested2.nested3 =", complicatedObject.someotherfield.nested3);



const time = {};
time.hours = 12;
time.minutes = 42;
time.metadata = {};
time.metadata.timeSystem = '12-hour clock';

console.log("time =", time);
