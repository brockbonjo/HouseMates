const Household = require('../models/household');

module.exports = {
    index,
    create,
    destroy,
    edit,
    update,
    show,
};

/*----------------------------------------------------*/

function show(req, res) {
    Household.findOne({"_id": req.user.household})
    .then( h => {
        let chore = h.chores.id(req.params.id);
        console.log(chore);
        res.render('household/tasks/show', {
            user: req.user,
            household: h,
            title: 'Task',
            thisTask: chore,
        });
    }).catch( err => {
        res.render('error', {err:err});
    })
}

function update(req, res) {
    Household.findOne({"_id": req.user.household}, (err, household) => {
        let chore = household.chores.id(req.params.id);
        chore.name = req.body.name;
        chore.description = req.body.description;
        chore.deadline = req.body.deadline;
        household.save( err => {
            if(err) console.log(err);
        });
        res.redirect('/household/tasks');
    });
}

function edit(req, res) {
    let itemId = req.params.id;
    Household.findOne({"_id": req.user.household}, (err, household) => {
        let chore = household.chores.id(itemId);
        let date = `${chore.deadline.getFullYear()}-${chore.deadline.getMonth()}-${chore.deadline.getDate()}`;
        res.render('household/tasks/edit', {
            user: req.user,
            household,
            title: 'Edit',
            chore,
            date
        });
    });
}

function destroy(req, res) {
    Household.findOne({"_id": req.user.household}, (err, household) => {
        household.chores.id(req.params.id).remove();
        household.save( err => {
            if(err) console.log(err);
            else res.redirect('/household/tasks');
        });
    });
}

function create(req, res) {
    req.body.author = req.user.name;
    Household.findById(req.user.household, (err, household) => {
        household.chores.push(req.body);
        household.save( err => {
            if(err) console.log(err);
            res.redirect('/household/tasks');
        });
    });
}

function index(req, res) {
    req.user.populate({path: 'household'}, function(err, user) {
        user.household.populate({path: 'members'}, function(err, hh) {
            if(err) console.log(err);
            res.render('household/tasks/index',{
                user,
                title: 'My Tasks', 
                household: hh,
            });
        });
    });
}