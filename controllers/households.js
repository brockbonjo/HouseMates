const Household = require('../models/household');
const User = require('../models/user');
const Message = require('../models/message');

module.exports = {
    index,
    new: newHH,
    create,
    join, 
    update,
    destroy,
    leave,
}

function leave(req, res) {
    let id = req.user.household;
    let user = req.user;
    Household.findOneAndUpdate({"_id": id},
        {$pull: {members: req.user._id}})
    .then( () => {
        return req.user.update(
            {$unset: {household:1}});
    }).then( response => {
        res.redirect('/household/new');
    }).catch(err => {
        res.render('error', {err});
    });
}

function destroy(req, res) {
    Household.findOneAndDelete({"_id": req.user.household})
    .then(hh => {
        let p1 = Message.deleteMany(
            {"_id": {$in: hh.messages}},
            {multi: true}
        );
        let p2 =  User.updateMany(
            {"_id": {$in: hh.members}},
            {$unset: {household:1}},
            {multi: true}
        );
        return Promise.all([p1,p2]);
    }).then (x => {
        res.redirect('/');
    }).catch ( err => {
        res.render('error', {err});
    });
}

function update(req, res) {
    Household.findByIdAndUpdate(req.user.household, {name: req.body.name})
    .then( () => {
        // req.user.household.remove();
        res.redirect('/household/settings');
    }).catch ( err => {
        res.render('error', {err});
    });
}

function join(req, res) {
    let invite = req.body.code;
    Household.findOne({'accessCode': invite}, function(err, household) {
        if(err) {
            console.log(err);
            res.redirect('/');
        } else {
            if(household) {
                req.user.setHousehold(household._id);
                req.user.save( err => {
                if (err) console.log(err);
                });
                household.members.push(req.user._id);
                household.save( err => {
                 if(err) console.log(err);
                })
                res.redirect('/household');
            } else {
                res.redirect('/household/new');
            } 
        }
    });
}

function create(req, res, next) {
    req.body;
    req.body.members = [];
    req.body.members.push(req.user._id);
    let myHH = new Household(req.body);
    myHH.generateInvite();
    myHH.save( function(err, hh) {
        if(err) console.log(err);
        req.user.setHousehold(hh._id);
        req.user.save(err => {
            console.log(err);
        });
        res.redirect('/household');
    }); 
}

function newHH(req, res, next) {
    res.render('household/new',{
        user: req.user,
        title: 'Welcome!'
    });
}

function index(req, res, next) {
    if(req.user.household) {
        Household.findById(req.user.household)
        .populate('members')
        .exec(function(err, h) {
        if(err) {
            console.log(err);
            res.redirect('/');
        }
        res.render('household/index', {
            user: req.user,
            household: h,
            title: h.name || 'Welcome!'
        });
    });
    } else {
        res.render('household/index', {
            user: req.user,
            household: null,
            title: 'Join or Create'
        });
    }
}