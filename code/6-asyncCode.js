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
    .then(() => fetch(someStorageUrl, { method: 'POST' }))
    .then(({ status }) => {
        success = status >= 200 && status < 300;
    })
    .then(() => { 
        console.log('success in the last promise:', success);
    });
console.log('success out of promises chain:', success);



success = false;
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
    { method = 'GET',  data, errorMessage, onError, parseJSON = true } = { method: 'GET' }
) {
    return fetch(url, ...(method === 'GET' ? [] : [{
        body: JSON.stringify(data),
        method: 'POST'
    }]))
        .then(response => response.ok 
            ? parseJSON
                ? response.json()
                : response
            : Promise.reject(errorMessage || `Failed to fetch data: ${response.status} ${response.statusText}`)
        )
        .catch(onError);
}
function fetchDensityData(substance) {
    return fetchData(getDensityApiUrl(substance), { 
        errorMessage: `Failed to fetch density of ${substance}`
    });
}



success = false;
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

        return fetchData(someStorageUrl, { method: 'POST', data: somePhysicalData, parseJSON: false });
    })
    .then(({ status }) => {
        success = status >= 200 && status < 300;
    })



// we want to print `a` that is equal to 3 after 5 seconds past and then to decrement it
let a = 2;
a++;

setTimeout(() => console.log('a after 3 sec:', a), 3000); // 2

a--; // but decrement operation will be committed now and here 
// and hence when we'll try to access `a` in `setTimeout`, we'll get it equal to 2
// it is because `a--` is a synchronous operation, and setTimeout - is not

console.log('a after decrementation:', a); // 2 



// we need to wait for setTimeout's finish if we want THEN to decrement a
const delay = ms => new Promise(resolve => {
    setTimeout(resolve, ms);
});

delay(5000)
    .then(() => console.log('a after 5 sec:', a)) // 2
    .then(() => {
        a--;
        console.log('a after 5 sec and decrementation:', a); // 1
    });
