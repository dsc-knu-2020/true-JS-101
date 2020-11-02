'use strict';



// Objects

const name = 'almond';
const weight = 200;
const discoveryInfo = {
    year: -200,
    country: 'Ancient Rome'
};

const almondInfo = {
    name: name,
    weight: weight,
    discoveryInfo: discoveryInfo,
    print: function() {
        console.log('name:', almondInfo.name, 'weight:', almondInfo.weight, 'discoveryInfo:', almondInfo.discoveryInfo);
    }
};

almondInfo.print();
console.log(almondInfo);

// vs

// shorthanding - the way to shorten objects declaration
const shorthandedAlmondInfo = {
    name,
    weight,
    discoveryInfo,
    print() {
        console.log('name:', almondInfo.name, 'weight:', almondInfo.weight, 'discoveryInfo:', almondInfo.discoveryInfo);
    }
};

almondInfo.print();
console.log(shorthandedAlmondInfo);



const bandInfo = {
    name: 'Чиж и Ко',
    genre: 'rock',
    lastAlbum: {
        name: 'Нечего терять',
        year: 1999,
        tracklist: [
            "Нечего терять",
            "Еду, еду…",
            "Рождён, чтобы бежать",
            "Урал-Байкер блюз",
            "На двоих",
            "Пригородный блюз (автор Майк Науменко)",
            "Зверёк",
            "Дорожная № 2",
            "Я подобно собаке…",
            "Расстели мне поле (автор Дмитрий Некрасов)",
            "Пароль",
            "Пригородный блюз (ремикс от группы Русский размер)",
            "Я подобно собаке (альтернативная гитарная версия)",
            "Урал-Байкер блюз (альтернативная версия)"
        ]
    },
};

const name = bandInfo.name; 
const genre = bandInfo.genre;
const tracklist = bandInfo.lastAlbum.tracklist;
console.log(name, genre, tracklist);

// vs

// destructuring - the way to shorten retrieving fields from objects 
// and also keep its namings consistent and readable
const { name, genre, lastAlbum: { tracklist } } = bandInfo;
console.log(name, genre, tracklist);



const { name: bandName, lastAlbum: { name: lastAlbumName } } = bandInfo;
console.log(bandName, lastAlbumName);



// Arrays



const marks = [12, 6, 8];

const mark0 = marks[0];
const mark1 = marks[1];
const mark2 = marks[2];
console.log(mark0, mark1, mark2);

// vs

const [mark0, mark1, mark2] = marks;
console.log(mark0, mark1, mark2);



const [, mark1, , mark3] = marks;
console.log(mark1, mark3);



// Function params



function isBandInfoComplete(bandInfo) {
    const { name, genre, lastAlbum } = bandInfo;
    return name && genre && lastAlbum;
}

// vs

function isBandInfoComplete({ name, genre, lastAlbum }) {
    return name && genre && lastAlbum;
}



const DRINKS = {
    COFFEE: 'coffee',
    TEA: 'tea'
};

const SIZES = {
    SMALL: 'small',
    REGULAR: 'regular',
    BIG: 'big',
    EXTRA_BIG: 'extra big'
};

const FORMATS = {
    TO_GO: 'to go',
    HERE: 'here'
};

const defaultDrinkSetup = {
    drinkName: DRINKS.COFFEE,
    size: SIZES.REGULAR, 
    format: FORMATS.HERE
};

function processOrder(data) {
    if (!data) {
        data = defaultDrinkSetup;
    }
    
    let { drinkName, size, format } = data;

    if (!drinkName) {
        drinkName = DRINKS.COFFEE;
    }
    if (!size) {
        size = SIZES.REGULAR;
    }
    if (!format) {
        format = FORMATS.HERE;
    }

    return `Hey, please take your ${size} ${drinkName} ${format}!`;
}

console.log(processOrder({
    format: FORMATS.TO_GO 
}));
console.log(processOrder({
    drinkName: DRINKS.TEA,
    size: SIZES.EXTRA_BIG,
    format: FORMATS.TO_GO,
}));
console.log(processOrder({}));
console.log(processOrder());



function processOrder({ drinkName = DRINKS.COFFEE, size = SIZES.REGULAR, format = FORMATS.HERE } = defaultDrinkSetup) {
    return `Hey, please take your ${size} ${drinkName} ${format}!`;
}
    
console.log(processOrder({
    format: FORMATS.TO_GO 
}));

console.log(processOrder({
    drinkName: DRINKS.TEA,
    size: SIZES.EXTRA_BIG,
    format: FORMATS.TO_GO,
}));
    
console.log(processOrder({}));
console.log(processOrder());
