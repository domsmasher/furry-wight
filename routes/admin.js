var DBM = require('../config/db');

exports.index = function (req, res) {
    if (req.session.user){
        res.render('admin', { title: 'Add a new recipe!', okTitle: ''});
    } else {
        res.redirect('/login/');
    }
};