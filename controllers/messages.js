const Household = require('../models/household');
const Message = require('../models/message');

module.exports = {
    index,
    create,
    distroy,
};

/*---------------------------------------*/

function distroy(req, res) {
    Message.findByIdAndDelete(req.params.id)
    .then( ()=> {
        return Household.findOneAndUpdate({_id: req.user.household},
            {$pull: {messages: req.params.id}});
    }).then( () => {
        res.redirect('/household/messages');
    }).catch( err => {
        res.render('error', {err});
    });
}

function create(req, res) {
    let newMsg = new Message({
        author: req.user.firstName,
        title: req.body.title,
        content: req.body.content,
    });
    if(req.file) {
        newMsg.picture = req.file.url;
    }
    newMsg.save()
    .then( msg => {
        return Household.findById(req.user.household)
        .then ( hh => {
            hh.messages.push(msg);
            return hh.save();
        });
    }).then( () => {
        res.redirect('/household/messages');
    }).catch ( err => {
        res.render('error', {err});
    });
}

function index(req, res) {
    Household.findOne({"_id": req.user.household})
    .populate('messages')
    .populate('members')
    .then( household => {
        res.render('household/messages/index', {
            user: req.user,
            household,
            title: 'My Messages',
            messages: household.messages,
        });
    }).catch( err=> {
        res.render('error', {err});
    });
}