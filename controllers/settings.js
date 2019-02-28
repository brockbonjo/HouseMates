const Household = require('../models/household');

module.exports = {
    index,
};

/*-----------------------------------*/

function index(req, res) {
    Household.findById(req.user.household)
    .populate('members')
    .then( hh => {
        res.render('household/settings/index', {
            user: req.user,
            household: hh,
            title: 'Settings'
        });
    }).catch( err => {
        res.render('error', {err});
    });
}