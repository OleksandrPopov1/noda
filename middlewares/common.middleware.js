const {isObjectIdOrHexString} = require("mongoose");

const {ApiError} = require("../errors");
const {BAD_REQUEST} = require("../constants/statusCode.enum");

module.exports = {
    checkIsIdValid: (fieldName, from = 'params') => (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req[from][fieldName])) {
                return next(new ApiError('Not valid ID', BAD_REQUEST));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
