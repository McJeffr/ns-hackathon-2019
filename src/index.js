const express = require('express');

const app = express();
const router = express.Router();

let store = {};

app.use(express.json());

router.get('/incident', (req, res) => {
    res.json(store);
});

router.get('/incident/:trainNr', (req, res) => {
    const trainNumber = req.params.trainNr;
    res.json(store[trainNumber] ? store[trainNumber] : {});
});

router.post('/incident/:trainNr', (req, res) => {
    const trainNumber = req.params.trainNr;

    if (!store[trainNumber]) {
        store[trainNumber] = [];
    }

    let event = {...req.body, timestamp: Date.now()};
    store[trainNumber] = [...store[trainNumber], event];

    res.json(store[trainNumber]);
});

router.delete('/incident/:trainNr', (req, res) => {
    delete store[req.params.trainNr];

    res.sendStatus(200);
});

app.use('/', router);
app.listen(8080);
