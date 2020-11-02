'use strict';



// if-else conditions
let a = 2;
if (a && a === 3) {
  console.log('now a is not falsy and is equal to 3');
}

a = 3;
if (a && a === 3) {
  console.log('now a is not falsy and is equal to 3');
} else {
  console.log('now a is falsy or is not equal to 3');
}



// for(;;) loop
let i;
for (i = 0; i < 4; i++) {
  console.log('i =', i);
}

for (let j = 0; j < 4; j += 2) {
  console.log('j =', j);
}

let k = 0;
for (; k < 4; k += 3) {
  console.log('k =', k);
}



// while and do-while loops
let cnt = 5;
while (cnt) {
  console.log('cnt =', cnt);
  cnt--;
} 

cnt = 0;
do {
  console.log('first and the last time');
} while (cnt); 



// for-in loop - used to iterate through object's keys
const userData = {
    name: 'Andron',
    age: '188',
    password: '********'
};
for (const key in userData) {
    console.log('key =', key);
    console.log('userData[key] =', userData[key]);
}



// for-of loop - used to iterate through array's items
const someArrayData = [42, '43', null]; // DON'T DO SO
for (const item of someArrayData) {
    console.log('item =', item);
}
