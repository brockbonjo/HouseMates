const User = require('../models/user');
const Household = require('../models/household');

module.exports = {
    index,
};


function index(req, res) {
    Household.findById(req.user.household)
    .then( hh => {
        res.render('household/members/index',{
            user: req.user,
            household: hh,
            title: 'Members'
        });
    })
}