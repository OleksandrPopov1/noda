const {Schema, model} = require('mongoose');

const carSchema = new Schema({
    year: {type: Number, require: true},
    model: {type: String, trim: true, require: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('car', carSchema);