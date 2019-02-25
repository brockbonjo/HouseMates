const Household = require('../models/household');
const User = require('../models/user');

module.exports = {
    index,
    create,
    distroy,
    removeOne,
};


function removeOne(req, res) {
    Household.findById(req.user.household)
    .then( hh => {
        hh.spendings.id(req.params.id).remove();
        hh.save()
    }).then( hh => {
        res.redirect('/household/spendings');
    });
}

function distroy(req, res) {
    Household.findById(req.user.household)
    .then ( hh => {
        hh.spendings = [];
        return hh.save()
    }).then ( hh => {
        res.redirect('/household/spendings');
    });
}

function create(req, res) {
    Household.findById(req.user.household)
    .then ( hh => {
        hh.spendings.push(req.body);
        return hh.save()  
    }).then ( (hh) => {
        res.redirect('/household/spendings');
    })
}
function index(req, res) {
    Household.findById(req.user.household)
    .populate('members')
    .then( hh => {
        res.render('household/spendings/index', {
            user: req.user,
            household: hh,
            title: 'My Spendings'
        });
    });
}

