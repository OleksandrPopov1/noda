const fileService = require("../services/file.service");
const {statusCodes} = require('../constants');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await fileService.getUsers();
        res.json(users);
    },
    createUser: async (req, res) => {
        const user = await fileService.insertUser(req.body);
        res.status(statusCodes.CREATE).json(user);
    },
    getUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(statusCodes.BAD_REQUEST).json('wrong id');
            return;
        }

        const user = await fileService.getUserBuId(+userId);

        if (!user) {
            res.status(statusCodes.NOT_FOUND).json('user not found');
        }

        res.json(user);
    },
    deleteUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(statusCodes.BAD_REQUEST).json('wrong id');
            return;
        }

        const user = await fileService.deleteUserById(+userId);

        if (!user) {
            res.status(statusCodes.NOT_FOUND).json('user not found');
            return;
        }

        res.sendStatus(statusCodes.NO_CONTENT);
    },
    updateUserById: async (req, res) => {
        const {userId} = req.params;
        const {age, name} = req.body;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(statusCodes.BAD_REQUEST).json('wrong id');
            return;
        }

        const userObject = {};
        if (age) userObject.age = age;
        if (name) userObject.name = name;

        const user = await fileService.updateUserById(+userId, userObject);

        if (!user) {
            res.status(statusCodes.NOT_FOUND).json('user not found');
            return;
        }

        res.status(statusCodes.CREATE).json(user);
    }
}
