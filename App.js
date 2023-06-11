const express = require('express');

const fileService = require('./services/file.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json('123');
});

app.get('/users', async (req, res) => {
    const users = await fileService.getUsers();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const {age, name} = req.body;

    if (Number.isNaN(+age) || +age <= 0) {
        res.status(400).json('wrong age');
        return;
    }

    const user = await fileService.insertUser({age, name});

    res.status(201).json(user);
});

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('wrong id');
        return;
    }

    const user = await fileService.getUserBuId(+userId);

    if (!user) {
        res.status(404).json('user not found');
    }

    res.json(user);
});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('wrong id');
        return;
    }

    const user = await fileService.deleteUserById(+userId);

    if (!user) {
        res.status(404).json('user not found');
        return;
    }

    res.sendStatus(204);
});

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const {age, name} = req.body;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('wrong id');
        return;
    }

    const userObject = {};
    if (age) userObject.age = age;
    if (name) userObject.name = name;

    const user = await fileService.updateUserById(+userId, userObject);

    if (!user) {
        res.status(404).json('user not found');
        return;
    }

    res.status(201).json(user);
});


app.listen(5000, () => {
    console.log(1);
});
