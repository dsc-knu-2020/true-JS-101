'use strict';



const dormitory = new Array(9).fill(null); // what if .fill([])



function makeRandomDecision(valueA, valueB) {
    const random0Or1 = Math.round(Math.random());
    return random0Or1 ? valueA : valueB;
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

const createRoomResidentData = () => ({
    name: `${makeRandomDecision('M', 'D')}asha`,
    grade: getRandomInt(1, 4)
});

for (let i = 0; i < dormitory.length; i++) {
    const roomsCount = getRandomInt(6, 10);

    const rooms = new Array(roomsCount)
        .fill(null)
        .map(() => {
            const residentsCount = getRandomInt(2, 4);

            const residents = new Array(residentsCount)
                .fill(null)
                .map(() => createRoomResidentData());

            return {
                residentsCount: residents.length,
                residents
            };
        });

    dormitory[i] = rooms;
}



let indexOfTheMostPopulatedFloor = 0; // max number of rooms
let maxNumberOfRoomsOnTheFloor = 0;

dormitory.forEach((floor, index) => {
    if (floor.length > maxNumberOfRoomsOnTheFloor) {
        maxNumberOfRoomsOnTheFloor = floor.length;
        indexOfTheMostPopulatedFloor = index;
    } 
});

console.log(indexOfTheMostPopulatedFloor);



const numberOfFloorsWithMoreThan7Rooms = dormitory.filter(floor => floor.length > 7).length;
console.log(numberOfFloorsWithMoreThan7Rooms);



let indexOfFloorWith7Mashas = dormitory.find((floor, index) => {
    const numbersOfMashas = floor.map(
        room => room.residents.filter(({ name }) => name === 'Masha').length
    );

    let totalMashasCount = 0;
    numbersOfMashas.forEach(numberOfMashas => totalMashasCount += numberOfMashas);

    if (totalMashasCount === 7) {
        return index;
    }
});
console.log(indexOfFloorWith7Mashas);

let indexOfFloorWith7Mashas = dormitory.findIndex(floor => {
    const numbersOfMashas = floor.map(
        room => room.residents.filter(({ name }) => name === 'Masha').length
    );
    
    let totalMashasCount = 0;
    numbersOfMashas.forEach(numberOfMashas => totalMashasCount += numberOfMashas);
        
    return totalMashasCount === 7;
});
console.log(indexOfFloorWith7Mashas);



const totalRooms = dormitory.reduce(
    (acc, floor) => acc + floor.length, // reducer callback
    0 // initial value
);
console.log(totalRooms);




const residentNames = dormitory.reduce(
    // reducer callback
    (residentNames, floor) => {
        const floorResidentNames = floor.reduce(
            // reducer callback
            (floorResidentNamesAcc, room) => {
                const roomResidentNames = room.residents.map(({ name }) => name);
                return [...floorResidentNamesAcc, ...roomResidentNames];
            },
            [] // initialValue
        );
        
        return [...residentNames, ...floorResidentNames];
    },
    [] // initial value
);
console.log(residentNames);






/*
Bonus task: compute difference between numbet of Mashas and Dashas over all dorm

const signedDifferenceBetweenMashasAndDashasCount = dormitory.reduce(
    (totalAcc, floor) => {
        const perFloorDifference = floor.reduce(
            (perFloorAcc, room) => {
                const perRoomDifference = room.residents.reduce(
                    (perRoomAcc, { name }) => {
                        return name === 'Masha' ? perRoomAcc + 1 : perRoomAcc - 1;
                    },
                    0 // initial per room value
                );

                return perFloorAcc + perRoomDifference;
            },
            0  // initial per floor value
        );
        
        return totalAcc + perFloorDifference;
    },
    0 // initial total
);
const differenceBetweenMashasAndDashasCount = Math.abs(signedDifferenceBetweenMashasAndDashasCount);

console.log(differenceBetweenMashasAndDashasCount);
*/