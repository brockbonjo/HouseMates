const Household = require('../models/household');

module.exports = {
    index,
    create,
    destroy,
    edit,
    update,
};

/*-------------------------------------------*/

function update(req, res) {
    Household.findOne({"_id": req.user.household}, (err, household) => {
        let item = household.shoppingList.id(req.params.id);
        item.name = req.body.name;
        item.quantity = req.body.quantity;
        if(req.body.urgent) item.urgent = true;
        else item.urgent = false;
        household.save( err => {
            if(err) console.log(err);
        });
        res.redirect('/household/shopping');
    });
}

function edit(req, res) {
    let itemId = req.params.id;
    Household.findOne({"_id": req.user.household}, (err, household) => {
        let item = household.shoppingList.id(itemId);
        res.render('household/shopping/edit', {
            user: req.user,
            household,
            title: 'Edit',
            item
        });
    });
}

function destroy(req, res) {
    Household.findOne({"_id": req.user.household}, function( err, household) {
        household.shoppingList.id(req.params.id).remove();
        household.save( function(err) {
            if(err) console.log(err);
            else res.redirect('/household/shopping');
        });
    });
}

function create(req, res) {
    if (req.body.urgent) req.body.urgent = true;
    Household.findById(req.user.household, (err, household) => {
        household.shoppingList.push(req.body);
        household.save( err => {
            if(err) console.log(err);
            res.redirect('/household/shopping');
        });
    });
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
    });
}