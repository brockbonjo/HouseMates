const User = require('../models/user');
const Household = require('../models/household');
const nodemailer = require('nodemailer');

module.exports = {
    index,
    destroy,
    new: newInvite,
    sendInvite,
    edit,
    update,
};

/*--------------------------------*/

function update(req, res) {
    let updateMember = {};
    if(req.body.name) updateMember.name = req.body.name;
    if(req.file) updateMember.profilePic = req.file.url;
    console.log(req.file);
    User.findByIdAndUpdate(req.params.id, updateMember, {new: true})
    .then( (u) => {
        console.log(u);
        res.redirect('/household/members');
    }).catch( err => {
        res.render('error', {err});
    });
}

function edit(req, res) {
    let p1 = User.findById(req.params.id);
    let p2 = Household.findById(req.user.household).populate('members');
    Promise.all([p1,p2])
    .then( response => {
        res.render('household/members/edit',{
            user: req.user,
            household: response[1],
            title: 'Edit',
            userEdit: response[0],
        });
    }).catch ( err => {
        res.render('error', {err});
    });
}

function sendInvite(req, res) {
    let email = req.body.email;
    console.log(email);
    Household.findById(req.user.household)
    .then( hh => {
        hh.generateInvite();
        return hh.save();
    }).then( ( hh ) => {
        let transporter = nodemailer.createTransport({
            name: 'house_mates@yahoo.com',
            service: 'Yahoo',
            auth: {
                user: `${process.env.YAHOO_USER}`,
                pass: `${process.env.YAHOO_PASS}`
            }
        });
        let mailOptions = {
            from: '<house_mates@yahoo.com>',
            to: email,
            subject: 'Invitation to houseMates',
            text: `Hi join housemates with this code: ${hh.accessCode}`,
            html: `<h1>Invitation to houseMates!</h1>
            <p>${req.user.name} wants you to join his household!<p>
            <h3>go to <a href="house--mates.herokuapp.com">houseMates</a> and enter this invite code!</h3>
            <h1>${hh.accessCode}</h1>
            <br>
            <br>
            <p>your houseMates team <3 </p>`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) console.log(err);
            console.log(`email sent to ${email}`);
        });
        res.redirect('/household/members');
    }).catch( err => {
        res.render('error', {err});
    });
}

function newInvite(req, res) {
    Household.findById(req.user.household)
    .then( hh => {
        res.render('household/members/new', {
            user: req.user,
            household: hh,
            title: 'Invite'
        });
    }).catch( err => {
        res.render('error', {err});
    });
    
}

function destroy(req, res) {
    let user = req.params.id;
    User.findById(user)
    .then( user => {
        user.household = undefined;
        return user.save()
    }).then( (u) => {
        return Household.findOneAndUpdate({_id: req.user.household},
            {$pull: {members: user}});
    }).then( (hh) => {
        if(user == req.user._id) res.redirect('/');
        else res.redirect('/household/members');
    }).catch(err => {
        res.render('error', {err});
    })
}

function index(req, res) {
    Household.findById(req.user.household)
    .populate('members')
    .then( hh => {
        res.render('household/members/index',{
            user: req.user,
            household: hh || 'new household',
            title: 'Members'
        });
    }).catch( err => {
        res.render('error', {err});
    });
}