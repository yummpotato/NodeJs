// 202132118_박혜정

var db = require('./db');
var sanitizeHtml = require('sanitize-html');

var updateLoginId = '';

module.exports = {
    viewV: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000;`
        db.query(sql1 + sql2, (error, subIds) => {
            db.query('SELECT * FROM personA', (error, users) => {
                const userData = [];

                users.forEach((user) => {
                    const loginid = user.loginid;
                    const password = user.password;
                    const name = user.name;
                    const address = user.address;
                    const tel = user.tel;
                    const birth = user.birth;
                    const classA = user.class;
                    const point = user.point;

                    userData.push({ loginid, password, name, address, tel, birth, classA, point });
                });

                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'person.ejs',
                    logined: 'YES',
                    users: userData,
                    upde: true,
                    edit: null,
                    boardtypes: subIds[0]
                };

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })
        })
    },

    viewU: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000;`
        db.query(sql1 + sql2, (error, subIds) => {
            db.query('SELECT * FROM personA', (error, users) => {
                const userData = [];

                users.forEach((user) => {
                    const loginid = user.loginid;
                    const password = user.password;
                    const name = user.name;
                    const address = user.address;
                    const tel = user.tel;
                    const birth = user.birth;
                    const classA = user.class;
                    const point = user.point;

                    userData.push({ loginid, password, name, address, tel, birth, classA, point });
                });

                var tag = '';
                for (var i = 0; i < users.length; i++) {
                    tag += `<tr><td>${users[i].loginid}</td>
                        <td>${users[i].password}</td>
                        <td>${users[i].name}</td>
                        <td>${users[i].address}</td>
                        <td>${users[i].tel}</td>
                        <td>${users[i].birth}</td>
                        <td>${users[i].class}</td>
                        <td>${users[i].point}</td>
                        <td><a href="/person/update/${users[i].loginid}">수정</td>
                        <td><a href="/person/delete/${users[i].loginid}" 
                        onclick='if(confirm("정말로 삭제하시겠습니까?")==false) {return false}'>삭제</td></tr>`;
                }

                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'person.ejs',
                    logined: 'YES',
                    users: userData,
                    upde: false,
                    edit: tag,
                    boardtypes: subIds[0]
                };

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })
        })
    },

    create: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000;`
        db.query(sql1 + sql2, (error, subIds) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: 'personCU.ejs',
                logined: 'YES',
                insert: true,
                boardtypes: subIds[0]
            };

            res.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },

    create_process: (req, res) => {
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

                res.redirect('/person/view/u');
                res.end();
            }
        );
    },

    update: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000;`
        db.query(sql1 + sql2, (error, subIds) => {
            updateLoginId = req.params.loginId;
            db.query('SELECT * FROM personA WHERE loginid=?', [updateLoginId], (err, results) => {
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'personCU.ejs',
                    logined: 'YES',
                    insert: false,
                    boardtypes: subIds[0],
                    person: results
                };

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })
        })
    },

    update_process: (req, res) => {
        var post = req.body;
        loginId = updateLoginId;
        sanitizedPassword = sanitizeHtml(post.password)
        sanitizedName = sanitizeHtml(post.name)
        sanitizedAddress = sanitizeHtml(post.address)
        sanitizedPhone = sanitizeHtml(post.tel)
        sanitizedBirth = sanitizeHtml(post.birth)
        sanitizedClass = sanitizeHtml(post.class)
        sanitizedPoint = sanitizeHtml(post.point)

        db.query('UPDATE personA SET password=?, name=?, address=?, tel=?, birth=?, class=?, point=? WHERE loginid=?',
            [sanitizedPassword, sanitizedName, sanitizedAddress, sanitizedPhone, sanitizedBirth, sanitizedClass, sanitizedPoint, loginId], (error, result) => {
                if (error) {
                    throw error;
                }
                res.redirect('/person/view/u');
                res.end();
            }
        );
    },

    delete_process: (req, res) => {
        var loginId = req.params.loginId;

        db.query('DELETE FROM personA WHERE loginid=?', [loginId], (error, result) => {
            if (error) {
                throw error;
            }

            res.writeHead(302, { Location: '/person/view/u' });
            res.end();
        });
    }
}