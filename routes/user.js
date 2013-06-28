var DBM = require('../config/db');

var manualLogin = function(user, pass, callback) {
    DBM.User.findOne({username:user}, function(e, u) {
        if (u === null){
            callback('user-not-found');
        } else{
            if (u.password === pass){
                callback(null, u);
            }	else{
                callback('invalid-password');
            }
        }
    });
};

exports.login = function (req, res) {

    res.render('login', { title: 'Hello', subheading: 'Please Login To Your Account' });
};

exports.access = function (req, res) {
    manualLogin(req.param('username'), req.param('password'), function(e, o){
        if (!o){
            res.send(e, 400);
        } else {
            req.session.user = o;
            res.redirect('/admin/');
            console.log(o);
        }
    });
};

exports.test = function (req, res) {
    DBM.User.find(function(e, u) {
        res.json(u);
    });
};