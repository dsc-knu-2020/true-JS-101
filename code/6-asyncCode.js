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



const getDensityApiUrl = substance => `http://localhost:8000/density?substance=${substance}`;
const someStorageUrl = 'http://localhost:8000/some-storage';

let success = false;
fetch(getDensityApiUrl('ice'))
    .then(response => response.json())
    .then(iceDensity => {
        somePhysicalData.substance.derivatives.forEach(derivative => {
            if (derivative.name === 'ice') {
                derivative.density = iceDensity;
            }
        });
    })
    .then(() => fetch(getDensityApiUrl('vapor')))
    .then(response => response.json())
    .then(vaporDensity => {
        somePhysicalData.substance.derivatives.forEach(derivative => {
            if (derivative.name === 'vapor') {
                derivative.density = vaporDensity;
            }
        });
    })
    .then(() => fetch('https://data-storage.io'))
    .then(response => response.json())
    .then(({ statusCode }) => {
        success = statusCode >= 200 && statusCode < 300;
    })
    .then(() => { 
        console.log('success in the last promise:', success);
    });
console.log('success out of promises chain:', success);



let success = false;
fetch(getDensityApiUrl('ice'))
    .then(response => response.ok 
        ? response.json()
        : Promise.reject(`Failed to fetch density: ${response.status} ${response.statusText}`)
    )
    .then(iceDensity => {
        somePhysicalData.substance.derivatives.forEach(derivative => {
            if (derivative.name === 'ice') {
                derivative.density = iceDensity;
            }
        });
    })
    .catch(err => {
        console.error(err);
    });




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

        return fetchDensityData('vapor');
    })
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

        return fetchData(someStorageUrl, { method: 'POST', data: somePhysicalData });
    })
    .then(({ statusCode }) => {
        success = statusCode >= 200 && statusCode < 300;
    })



// we want to print `a` that is equal to 3 after 5 seconds past and then to decrement it
let a = 2;
a++;

setTimeout(() => console.log(a), 5000); // 2

a--; // but decrement operation will be committed now and here 
// and hence when we'll try to access `a` in `setTimeout`, we'll get it equal to 2
// it is because `a--` is a synchronous operation, and setTimeout - is not

console.log(a); // 2 



// we need to wait for setTimeout's finish if we want THEN to decrement a
const delay = ms => new Promise(resolve => {
    setTimeout(resolve, ms);
});

a = 3;
delay(5000)
    .then(() => console.log(a)) // 3
    .then(() => {
        a--;
        console.log(a); // 2
    });
