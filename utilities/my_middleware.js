function isLoggedIn(req, res, next) {
    if(req.isAuthenticated() ) {
      return next();
    }
    res.redirect('/');
}

function hasHousehold(req, res, next) {
  if(req.user.household !== undefined) {
    return next();
  }
  res.redirect('/household/new');
}

module.exports = {
    isLoggedIn,
    hasHousehold
}