const {ApiError} = require("../errors");
const {carService} = require("../services");
const {BAD_REQUEST, NOT_FOUND, CONFLICT} = require("../constants/statusCode.enum");

module.exports = {
    checkIsCarBodyValid: (req, res, next) => {
        try {

            // if (Number.isNaN(+age) || +age <= 0) {
            //     return next(new ApiError('wrong age', BAD_REQUEST));
            // }
            //
            // if (name.length < 2) {
            //     return next(new ApiError('wrong name', BAD_REQUEST));
            // }

            next();
        } catch (e) {
            next(e);
        }

    },
    isCarPresent: async (req, res, next) => {
        try {
            const {carId} = req.params;

            const car = await carService.getOneById(carId);

            if (!car) {
                return next(new ApiError('car not found', NOT_FOUND));
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }

    }
}
