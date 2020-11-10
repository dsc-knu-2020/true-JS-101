const express = require('express');

const app = express();

const densityMap = {
    water: '1000 kg/m3',
    ice: '0.9167 g/cm3',
    vapor: '0.597 kg/m3',
    copper: '7.874 g/cm3',
    plumbum: '11340 kg/m3',
    iron: '7.874 g/cm3'
};

app.get('/density', ({ query }, res) => {
    const density = densityMap[query.substance];

    if (density) {
        res.status(200).json(density);
    } else {
        res.sendStatus(404);
    }
});

app.post('/some-storage', (_, res) => {
    res.status(200).json('ok');
});

app.listen(8000);