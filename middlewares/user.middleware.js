const {ApiError} = require("../errors");
const {userService} = require("../services");
const {BAD_REQUEST, NOT_FOUND, CONFLICT} = require("../constants/statusCode.enum");

module.exports = {
    checkIsUserBodyValid: (req, res, next) => {
        try {
            const {age, name} = req.body;

            if (Number.isNaN(+age) || +age <= 0) {
                return next(new ApiError('wrong age', BAD_REQUEST));
            }

            if (name.length < 2) {
                return next(new ApiError('wrong name', BAD_REQUEST));
            }

            next();
        } catch (e) {
            next(e);
        }

    },
    checkIsUserEmailUniq: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;

            const userByEmail = await userService.getOneByParams({email});

            if (userByEmail && userByEmail._id.toString() !== userId) {
                return next(new ApiError('User alrady exist', CONFLICT));
            }

            next();
        } catch (e) {
            next(e);
        }

    },
    isUserPresent: (from='params') => async (req, res, next) => {
        try {
            const {userId} = req[from];

            const user = await userService.getOneById(userId);

            if (!user) {
                return next(new ApiError('User not found', NOT_FOUND));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }

    }
}
