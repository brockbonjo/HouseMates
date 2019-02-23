module.exports = {
    codeGenerator: generateRandomId,
    isLoggedIn,
}

function generateRandomId(n) {
    let allChars=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                    '1','2','3','4','5','6','7','8','9','0'];


    let passArr = [];
    for(let i = 0; i < n; i++) {
        let ranNo = Math.floor(Math.random() * 63);
        passArr.push(allChars[ranNo]);
    }
    return passArr.join('');
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated() ) {
      return next();
    }
    res.redirect('/');
  }

