const Household = require('../models/household');

module.exports = {
    index,
    create,
    additem,
};

function additem(req, res) {
    Household.findById(req.user.household, (err, household) => {
        household.shoppingList.items.push(req.body);
        household.save( err => {
            if(err) console.log(err);
            res.redirect('/household/shopping');
        })
    });
}

function create(req, res) {
    let newList = req.body;
    newList.items = [];
    req.user.populate({path: 'household'}, function(err, user) {
        user.household.shoppingList = newList;
        user.household.save(function(err) {
            if(err) console.log(err);
            res.redirect('/household/shopping');
        })
    })

}

function index(req, res) {
    req.user.populate({path: 'household'}, function(err, user) {
        user.household.populate({path: 'members'}, function(err, hh) {
            if(err) console.log(err);
            res.render('household/shopping/index', {
                user,
                title: 'My Shopping', 
                household: hh
            });
        });
        // res.render('household/shopping/index', {
        //     user,
        //     title: 'My Shopping',
        //     household: user.household,
        // });
    });
}