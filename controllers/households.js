const Household = require('../models/household');
const User = require('../models/user');


module.exports = {
    index,
    new: newHH,
    create,
    join, 

}

function join(req, res) {
    let invite = req.body.code;
    Household.findOne({'accessCode': invite}, function(err, household) {
        if(err) {
            console.log(err);
            res.redirect('/');
        } else {
            req.user.setHousehold(household._id);
            req.user.save( err => {
                if (err) console.log(err);
            });
            household.members.push(req.user._id);
            household.save( err => {
                if(err) console.log(err);
            })
            res.redirect('/household');
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
        user: req.user
    });
}
function index(req, res, next) {
    // console.log(req);
    // console.log(req.user);
    res.render('household/index', {
        user: req.user,
        name: req.query.name
    });
}