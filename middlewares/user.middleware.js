const {statusCodes} = require("../constants");
const {ApiError} = require("../errors");

module.exports = {
    checkIsUserBodyValid: (req, res, next) => {
        try {
            const {age, name} = req.body;

            if (Number.isNaN(+age) || +age <= 0) {
                throw new ApiError('wrong age', 400);
            }

            if (name.length < 2) {
                throw new ApiError('wrong name', 400);
            }

            next();
        } catch (e) {
            next(e);
        }

    }
}
