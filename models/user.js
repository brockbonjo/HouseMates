const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: String,
    household: {
        type: Schema.Types.ObjectId, 
        ref: 'Household'
    },
    profilePic: String,
});
userSchema.virtual('firstName').get(function() {
    return this.name.split(' ')[0];
});

userSchema.method('setHousehold', function(val) {
    this.household = val;
});



module.exports = mongoose.model('User', userSchema);