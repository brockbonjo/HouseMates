module.exports = {
    index,
    logout
}

function logout(req, res, next) {
    req.logout();
    res.redirect('/');
}

function index(req, res, next) {
    res.render('index', {
        user: req.user,
        name: req.query.name,
        title: 'Welcome to HouseMates!'
    })
}
