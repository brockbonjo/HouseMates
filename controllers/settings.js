const Household = require('../models/household');
const User = require('../models/user');

module.exports = {
    index,
};

function index(req, res) {
    Household.findById(req.user.household)
    .then( hh => {
        res.render('household/settings/index', {
            user: req.user,
            household: hh,
            title: 'Settings'
        });
    });
}