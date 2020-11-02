'use strict';



console.log({});
console.log({
  'interaction': 'click on button'
});
console.log({ 
  interaction: 'click on button', // trailing comma
});
console.log({ 
  'some user input': 'usernameOfAuthor'
});
console.log({
  1: 'value of prop with number as a key'
});

console.log({
  users: {
    1: {
      username: 'junkkerrigan',
      email: 'paavlenko.andrew@gmail.com',
      currentSession: {
        startTime: '23:15:12',
        browser: 'Safari 59',
      }
    },
    2: {
      username: 'oleksiim',
      email: 'lexa.drakon@gmail.com',
      currentSession: {
        startTime: '03:15:12',
        browser: 'Opera 1',
      }
    } 
  } 
});

console.log(typeof {
  users: {
    1: {
      username: 'junkkerrigan',
      email: 'paavlenko.andrew@gmail.com',
      currentSession: {
        startTime: '23:15:12',
        browser: 'Safari 59',
      }
    },
    2: {
      username: 'oleksiim',
      email: 'lexa.drakon@gmail.com',
      currentSession: {
        startTime: '03:15:12',
        browser: 'Opera 1',
      }
    } 
  } 
});
