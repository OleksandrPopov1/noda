const { Schema, model } = require('mongoose');

const userSchema = new Schema({
   name: {type: String, trim: true, require: true},
   age: {type: Number, default: 18},
   email: {type: String, trim: true, lowercase: true, require: true}
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('user', userSchema);
