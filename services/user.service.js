const {User} = require('../database');

module.exports = {
    getAllUsers(filter = {}) {
        return User.find(filter);
    },
    createUser(userObject) {
        return User.create(userObject);
    },
    getOneByParams(filter) {
        return User.findOne(filter);
    },
    getOneById(id) {
        return User.findById(id).select(['+cars']).populate('cars');
    },
    updateUserById(userId, newUserObject) {
        return User.updateOne({_id: userId}, newUserObject, {new: true});
    },
    deleteUserById(userId) {
        return User.deleteOne({_id: userId});
    }
}
