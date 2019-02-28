const Household = require('../models/household');

module.exports = {
    index,
    create,
    distroy,
    removeOne,
};

/*---------------------------------------*/

function removeOne(req, res) {
    Household.findById(req.user.household)
    .then( hh => {
        hh.spendings.id(req.params.id).remove();
        hh.save()
    }).then( hh => {
        res.redirect('/household/spendings');
    }).catch( err => {
        res.render('error', {err});
    });
}

function distroy(req, res) {
    Household.findById(req.user.household)
    .then ( hh => {
        hh.spendings = [];
        return hh.save()
    }).then ( hh => {
        res.redirect('/household/spendings');
    }).catch(err => {
        res.render('error', {err});
    });
}

function create(req, res) {
    Household.findById(req.user.household)
    .then ( hh => {
        hh.spendings.push(req.body);
        return hh.save()  
    }).then ( (hh) => {
        res.redirect('/household/spendings');
    }).catch ( err => {
        res.render('error', {err});
    });
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
    }).catch( err => {
        res.render('error', {err});
    });
}