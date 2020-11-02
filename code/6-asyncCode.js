'use strict';

const fetch = require('node-fetch');



const somePhysicalData = {
    substance: {
        name: 'water',
        density: {
            value: 1000,
            units: 'kg/m3'
        },
        physicalState: 'liquid',
        derivatives: [
            {
                name: 'ice',
                physicalState: 'solid',
            },
            {
                name: 'vapor',
                physicalState: 'gas'
            }
        ]
    }
};
const { substance: { derivatives, name } } = somePhysicalData;
const allStates = [name, ...derivatives.map(({ name }) => name)];
// etc...



const getDensityApiUrl = substance => `http://localhost:8000/density?substance=${substance}`;
const someStorageUrl = 'http://localhost:8000/some-storage';
// function requestData(url) {
//     let data;
//     let err;
//     // ... requesting data
//     // ... assigning data
//     if (err) {
//         throw err;
//     }
//     return data;
// }

// // 7600 km between USA and Ukraine, so (7600 * 2) / 300000 ~= 50ms
// const iceDensity = requestData(getDensityApiUrl('ice')); // will take at least 50ms       // }
// console.log(iceDensity);                                                                   // }
// const vaporDensity = requestData(getDensityApiUrl('vapor')); // will take at least 50ms     // } will take at least 100ms!!
// console.log(vaporDensity);                                                                // }



// function sendData(url, data, callback) {
//     let err;
//     let statusCode;
//     // sending data
//     if (err) {
//         callback(null, err);
//     }
//     callback({ statusCode });
// }

// let success = false;
// // CALLBACK HELLLLL
// requestData(getDensityApiUrl('ice'), (iceDensity, err) => {
//     if (err) {
//         throw err;
//     }
//     somePhysicalData.substance.derivatives.forEach(derivative => {
//         if (derivative.name === 'ice') {
//             derivative.density = iceDensity;
//         }
//     });
//     requestData(getDensityApiUrl('vapor'), (vaporDensity, err) => {
//         if (err) {
//             throw err;
//         }
//         somePhysicalData.substance.derivatives.forEach(derivative => {
//             if (derivative.name === 'vapor') {
//                 derivative.density = vaporDensity;
//             }
//         });
//         sendData(someStorageUrl, data, (data, err) => {
//             if (err) {
//                 throw err;
//             }
            
//             const { statusCode } = data;
//             success = statusCode >= 200 && statusCode < 300;
//             console.log('success in the callback chain:', success);
//         });
//     })
// });
// console.log('success out of callback chain:', success);



// let success = false;
// fetch(getDensityApiUrl('ice'))
//     .then(response => response.json())
//     .then(iceDensity => {
//         somePhysicalData.substance.derivatives.forEach(derivative => {
//             if (derivative.name === 'ice') {
//                 derivative.density = iceDensity;
//             }
//         });
//     })
//     .then(() => fetch(getDensityApiUrl('vapor')))
//     .then(response => response.json())
//     .then(vaporDensity => {
//         somePhysicalData.substance.derivatives.forEach(derivative => {
//             if (derivative.name === 'vapor') {
//                 derivative.density = vaporDensity;
//             }
//         });
//     })
//     .then(() => fetch('https://data-storage.io'))
//     .then(response => response.json())
//     .then(({ statusCode }) => {
//         success = statusCode >= 200 && statusCode < 300;
//     })
//     .then(() => { 
//         console.log('success in the last promise:', success);
//     });
// console.log('success out of promises chain:', success);



// let success = false;
// fetch(getDensityApiUrl('ice'))
//     .then(response => response.ok 
//         ? response.json()
//         : Promise.reject(`Failed to fetch density: ${response.status} ${response.statusText}`)
//     )
//     .then(iceDensity => {
//         somePhysicalData.substance.derivatives.forEach(derivative => {
//             if (derivative.name === 'ice') {
//                 derivative.density = iceDensity;
//             }
//         });
//     })
//     .catch(err => {
//         console.error(err);
//     });




function fetchData(
    url, 
    { method = 'GET',  data, errorMessage, onError } = { method: 'GET' }
) {
    return fetch(url, ...(method === 'GET' ? [] : [{
        body: JSON.stringify(data),
        method: 'POST'
    }]))
        .then(response => response.ok 
            ? response.json()
            : Promise.reject(errorMessage || `Failed to fetch data: ${response.status} ${response.statusText}`)
        )
        .catch(onError);
}
function fetchDensityData(substance) {
    return fetchData(getDensityApiUrl(substance), { 
        errorMessage: `Failed to fetch density of ${substance}`
    });
}



let success = false;
fetchDensityData('ice')
    .then(iceDensity => {
        somePhysicalData.substance.derivatives.forEach(derivative => {
            if (derivative.name === 'ice') {
                const [value, units] = iceDensity.split(' ');
                derivative.density = {
                    value,
                    units
                };
            }
        });
    })
    .then(() => fetchDensityData('vapor'))
    .then(vaporDensity => {
        somePhysicalData.substance.derivatives.forEach(derivative => {
            if (derivative.name === 'vapor') {
                const [value, units] = vaporDensity.split(' ');
                derivative.density = {
                    value,
                    units
                };
            }
        });
    })
    .then(() => fetchData(someStorageUrl, { method: 'POST', data: somePhysicalData }))
    .then(({ statusCode }) => {
        success = statusCode >= 200 && statusCode < 300;
    })
    .then(() => {
        console.log(somePhysicalData);
    });












// const calcFactorialSync = numString => {
//     const num = BigInt(numString);

//     let result = 1n;
//     for (let i = 2n; i <= num; i += 1n) {
//         result *= i;
//         result %= 1000000007n;
//     }

//     return result;
// }
// console.log('23456789! =', calcFactorialSync(23456789));
// console.log('2345678! =', calcFactorialSync(2345678));
// console.log('23456788! =', calcFactorialSync(23456788));
// console.log('234567! =', calcFactorialSync(234567));
// console.log('23456787! =', calcFactorialSync(23456787));



// const calcFactorial = num => new Promise((resolve, reject) => {
//     try {
//         num = BigInt(num);
        
//         let result = 1n;
//         for (let i = 2n; i <= num; i += 1n) {
//             result *= i;
//             result %= 1000000007n;
//         }
        
//         resolve(result);
//     } catch (e) {
//         reject(`Error occurred while calculating factorial: ${e}`);
//     }
// });
// calcFactorial(23456789)
//     .then(res => console.log('23456789! =', res));
// calcFactorial(2345678)
//     .then(res => console.log('2345678! =', res));
// calcFactorial(23456788)
//     .then(res => console.log('23456788! =', res));
// calcFactorial(234567)
//     .then(res => console.log('234567! =', res));
// calcFactorial(23456787)
//    .then(res => console.log('23456787! =', res));



// const calcFactorialAsync = num => 
// function doHttpCall() {
//     // http call
// }

// let responseData = null;

// const { data } = doHttpCall();
// responseData = data;

// responseData.forEach(item => doSmth(item)); // but here responseData is not what we want to get



// const dataFromGoogle = fetch('https://google.com');
// console.log(dataFromGoogle); // data is probably not ready here, but we want to access it



// // we need to wait for the data
// function handleGoogleResponse(data) {
//     console.log(data);
//     // do smth else with data
// }
// fetch('https://google.com').then(handleGoogleResponse); // we pass the function to `then`



// const promise = new Promise((resolve, reject) => {
//     fetch('https://www.wix.com').then(dataFromWixCom => {
//         responseData = dataFromWixCom;
//         resolve();
//     });
// });

// promise.then(() => console.log(responseData));



// const promise = new Promise((resolve, reject) => {
//     fetch('https://www.wix.com')
//         .then(resolve)
//         .catch(reject);
// });

// promise
//     .then(response => {
//         responseData = response;
//         console.log(response);
//         // do smth else with response
//     })
//     .catch(error => {
//         console.log(error);
//         // do smth else with error
//     });




// // we want to print `a` that is equal to 3 after 5 seconds past and then to decrement it

// let a = 2;
// a++;

// setTimeout(() => console.log(a), 5000); // 2

// a--; // but decrement operation will be committed now and here 
// // and hence when we'll try to access `a` in `setTimeout`, we'll get it equal to 2
// // it is because `a--` is a synchronous operation, and setTimeout - is not

// console.log(a); // 2 


// // we need to wait for setTimeout's finish if we want THEN to decrement a
// const delay = ms => new Promise(resolve => {
//     setTimeout(resolve, ms);
// });

// a = 3;
// delay(5000)
//     .then(() => console.log(a)) // 3
//     .then(() => {
//         a--;
//         console.log(a); // 2
//     });

