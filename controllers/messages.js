const Household = require('../models/household');
const User = require('../models/user');
const Message = require('../models/message');

module.exports = {
    index,
    create,
    distroy,
};


function distroy(req, res) {
    Message.findByIdAndDelete(req.params.id)
    .then( ()=> {
        return Household.findOneAndUpdate({_id: req.user.household},
            {$pull: {messages: req.params.id}});
    }).then( () => {
        res.redirect('/household/messages');
    });
}

function create(req, res) {
    req.body.author = req.user.firstName;
    let newMsg = new Message(req.body);
    newMsg.save()
    .then( msg => {
        return Household.findById(req.user.household)
        .then( hh => {
            hh.messages.push(msg);
            return hh.save();
        });
    }).then ( () => {
        res.redirect('/household/messages');
    })
}

function index(req, res) {
    Household.findOne({"_id": req.user.household})
    .populate('messages')
    .then( household => {
        res.render('household/messages/index', {
            user: req.user,
            household,
            title: 'My Messages',
            messages: household.messages,
        });
    }).catch( err=> {
        console.log(err);
    });
}