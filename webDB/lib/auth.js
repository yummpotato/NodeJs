// 202132118_박혜정

var db = require('./db');
var sanitizeHtml = require('sanitize-html');

module.exports = {
    login: (req, res) => {
        db.query('SELECT * FROM boardtype', (err, results) => {
            var context = {
                menu: 'menuForCustomer.ejs',
                who: '손님',
                body: 'login.ejs',
                logined: 'NO',
                boardtypes: results
            };
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    login_process: (req, res) => {
        var post = req.body;

        db.query('select count(*) as num from personA where loginid = ? and password = ?', [post.id, post.pwd], (error, results) => {
            if (results[0].num === 1) {
                db.query('select name,class from personA where loginid = ? and password = ? ', [post.id, post.pwd], (error, result) => {
                    req.session.is_logined = true;
                    req.session.loginid = post.id; // 세션에 loginid 저장
                    req.session.password = post.pwd;
                    req.session.name = result[0].name
                    req.session.class = result[0].class
                    res.redirect('/shop/all');
                })
            } else {
                req.session.is_loginid = false;
                req.session.name = '손님';
                req.session.class = '99';
                res.redirect('/shop/all');
            }
        })


    },
    logout_process: (req, res) => {
        req.session.destroy((err) => {
            res.redirect('/auth/login');
        })
    },
    join: (req, res) => {
        db.query('SELECT * FROM boardtype', (err, results) => {
            var context = {
                menu: 'menuForCustomer.ejs',
                who: '손님',
                body: 'join.ejs',
                logined: 'NO',
                boardtypes: results
            };
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    join_process: (req, res) => {
        var post = req.body;
        sanitizedLoginId = sanitizeHtml(post.loginid)
        sanitizedPassword = sanitizeHtml(post.password)
        sanitizedName = sanitizeHtml(post.name)
        sanitizedAddress = sanitizeHtml(post.address)
        sanitizedPhone = sanitizeHtml(post.tel)
        sanitizedBirth = sanitizeHtml(post.birth)
        sanitizedClass = sanitizeHtml(post.class)
        sanitizedPoint = sanitizeHtml(post.point)

        db.query(`INSERT INTO personA (loginid, password, name, address, tel, birth, class, point) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [sanitizedLoginId, sanitizedPassword, sanitizedName, sanitizedAddress, sanitizedPhone, sanitizedBirth, sanitizedClass, sanitizedPoint], (error, result) => {
                if (error) {
                    throw error;
                }

                res.redirect('/auth/login');
                res.end();
            }
        );
    }
}