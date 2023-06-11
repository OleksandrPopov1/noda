const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(process.cwd(), 'database', 'users.json');

const reader = async () => {
    try {
        const buffer = await fs.readFile(pathToFile);
        const data = buffer.toString();

        const users = data ? JSON.parse(data) : [];

        return users.sort((a, b) => a.id - b.id);
    } catch (e) {
        console.log(e);
    }
}

const writer = async (user) => {
    try {
        await fs.writeFile(pathToFile, JSON.stringify(user));
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getUsers: () => {
        return reader();
    },
    insertUser: async (user) => {
        const users = await reader();

        user.id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push(user);

        await writer(users);

        return user;
    },
    getUserBuId: async (id) => {
        const users = await reader();
        return users.find((user) => user.id === id);
    },
    deleteUserById: async (id) => {
        const users = await reader();

        const index = users.findIndex((user) => user.id === id);

        if (index < 0) return;

        const user = users[index];
        users.splice(index, 1);

        await writer(users);
        return user;
    },
    updateUserById: async (id, data) => {
        const users = await reader();

        const index = users.findIndex((user) => user.id === id);

        if (index < 0) return;

        users[index] = {...users[index], ...data};
        await writer(users);

        return users[index];

    }
}
