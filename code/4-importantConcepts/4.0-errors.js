'use strict';



// error is the special type of object in JS, the distinguishing feature - it is throwable 
const err = new Error('error message');
try {
  throw err;
} catch (e) {
  console.log(e);
}



const importantError = new Error('important error');
importantError.isImportant = true;

try {
  try {
    throw importantError;
  } catch (e) {
    // since error is an object, we can set custom fields to it
    if (e.isImportant) {
      // also, we can rethrow errors as many times as we want
      e.importantField = 'value';
      throw e;
    } else {
      console.log('Well, maybe this particular error is not very important');
      console.log(e);
    }
  }
} catch(e) {
  console.log('Looks like this error is really important');
  console.log(e);
}
