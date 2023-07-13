const {statusCodes} = require("../constants");

module.exports = {
    checkIsUserBodyValid: (req, res, next) => {
        const {age, name} = req.body;

        if (Number.isNaN(+age) || +age <= 0) {
            res.status(statusCodes.BAD_REQUEST).json('wrong age');
            return;
        }

        if (name.length < 2){
            res.status(statusCodes.BAD_REQUEST).json('wrong name');
            return;
        }

        next();
    }
}
