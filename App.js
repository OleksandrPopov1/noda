const express = require('express');
const users = require('./database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json('123');
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('wrong id');
        return;
    }

    const user = users[userId];

    if (!user) {
        res.status(404).json('user not found');
    }

    res.json(user);
});

app.post('/users', (req, res) => {
    const {age, name} = req.body;

    if (Number.isNaN(+age) || +age <= 0) {
        res.status(400).json('wrong age');
        return;
    }

    users.push({name, age});

    res.status(201).json('OK');
});

app.listen(5000, () => {
    console.log(1);
});
