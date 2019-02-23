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

function getFirstName() {    
    let outName = '';
    for(let char of this.name) {
        if(char !== ' ') outName+=char;
        else break;
    }
    return outName;
}


module.exports = mongoose.model('User', userSchema);