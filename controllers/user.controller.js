const {ApiError} = require("../errors");
const {NOT_FOUND, BAD_REQUEST, CREATE, NO_CONTENT} = require("../constants/statusCode.enum");
const User = require("../database/User")
const {userService} = require("../services");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError('user not found', NOT_FOUND)
            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteUserById(userId);

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.updateUserById(userId, req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
}
