const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const myUtils = require('../utilities/my_utils');


const itemSchema = new Schema({
    name: String, 
    quantity: Number,
    urgent: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});
const choreSchema = new Schema({
    name: String,
    description: String,
    deadline: Date,
}, {timestamps: true});

const spendingsSchema = new Schema({
    description: String,
    amount: Number
}, {timestamps: true});

const householdSchema = new Schema({
    name: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    shoppingList: [itemSchema],
    chores: [choreSchema],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    spendings: [spendingsSchema],
    accessCode: String
}, {timestamps: true});

householdSchema.method('generateInvite', function() {
    this.accessCode = myUtils.codeGenerator(13);
});

module.exports = mongoose.model('Household', householdSchema);
