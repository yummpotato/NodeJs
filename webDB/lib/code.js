// 202132118_박혜정

var db = require('./db');
var sanitizeHtml = require('sanitize-html');

var updateMainId = '';
var updateSubId = '';

module.exports = {
    viewV: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000';`
        db.query(sql1 + sql2, (error, subIds) => {
            db.query('SELECT * FROM codeA', (error, codes) => {
                const codeData = [];

                codes.forEach((code) => {
                    const main_id = code.main_id;
                    const main_name = code.main_name;
                    const sub_id = code.sub_id;
                    const sub_name = code.sub_name;
                    const start = code.start;
                    const end = code.end;

                    codeData.push({ main_id, main_name, sub_id, sub_name, start, end });
                });

                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'code.ejs',
                    logined: 'YES',
                    codes: codeData,
                    insert: true,
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
        var sql2 = `select * from codeA where main_id = '0000';`
        db.query(sql1 + sql2, (error, subIds) => {
            db.query('SELECT * FROM codeA', (error, codes) => {
                const codeData = [];

                codes.forEach((code) => {
                    const main_id = code.main_id;
                    const main_name = code.main_name;
                    const sub_id = code.sub_id;
                    const sub_name = code.sub_name;
                    const start = code.start;
                    const end = code.end;

                    codeData.push({ main_id, main_name, sub_id, sub_name, start, end });
                });

                var tag = '';
                for (var i = 0; i < codes.length; i++) {
                    tag += `<tr>
                            <td>${codes[i].main_id}</td>
                            <td>${codes[i].main_name}</td>
                            <td>${codes[i].sub_id}</td>
                            <td>${codes[i].sub_name}</td>
                            <td>${codes[i].start}</td>
                            <td>${codes[i].end}</td>
                            <td><a href="/code/update/${codes[i].main_id}/${codes[i].sub_id}">수정</td>
                            <td><a href="/code/delete/${codes[i].main_id}/${codes[i].sub_id}" 
                            onclick='if(confirm("정말로 삭제하시겠습니까?")==false) {return false}'>삭제</td>
                        </tr>`;
                }

                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'code.ejs',
                    logined: 'YES',
                    codes: codeData,
                    insert: false,
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
        var sql2 = `select * from codeA where main_id = '0000';`
        db.query(sql1 + sql2, (error, subIds) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: 'codeCU.ejs',
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
        sanitizedMainId = sanitizeHtml(post.main_id)
        sanitizedMainName = sanitizeHtml(post.main_name)
        sanitizedSubId = sanitizeHtml(post.sub_id)
        sanitizedSubName = sanitizeHtml(post.sub_name)
        sanitizedStart = sanitizeHtml(post.start)
        sanitizedEnd = sanitizeHtml(post.end)

        db.query(`INSERT INTO codeA (main_id, sub_id, main_name, sub_name, start, end) VALUES(?, ?, ?, ?, ?, ?)`,
            [sanitizedMainId, sanitizedSubId, sanitizedMainName, sanitizedSubName, sanitizedStart, sanitizedEnd], (error, result) => {
                if (error) {
                    throw error;
                }

                res.redirect('/code/view/u');
                res.end();
            }
        );
    },

    update: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000';`
        db.query(sql1 + sql2, (error, subIds) => {
            updateMainId = req.params.main;
            updateSubId = req.params.sub;

            db.query('select * from codeA where main_id = ? AND sub_id = ?', [updateMainId, updateSubId], (err, results) => {
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'codeCU.ejs',
                    logined: 'YES',
                    insert: false,
                    boardtypes: subIds[0],
                    code: results
                };

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })

        })
    },

    update_process: (req, res) => {
        var post = req.body;
        mainId = updateMainId;
        sanitizedMainName = sanitizeHtml(post.main_name)
        subId = updateSubId;
        sanitizedSubName = sanitizeHtml(post.sub_name)
        sanitizedStart = sanitizeHtml(post.start)
        sanitizedEnd = sanitizeHtml(post.end)

        db.query('UPDATE codeA SET main_name=?, sub_name=?, start=?, end=? WHERE main_id=? AND sub_id=?',
            [sanitizedMainName, sanitizedSubName, sanitizedStart, sanitizedEnd, mainId, subId], (error, result) => {
                if (error) {
                    throw error;
                }
                res.redirect('/code/view/u');
                res.end();
            }
        );
    },

    delete_process: (req, res) => {
        var main = req.params.main;
        var sub = req.params.sub;

        db.query('DELETE FROM codeA WHERE main_id = ? AND sub_id = ?', [main, sub], (error, result) => {
            if (error) {
                throw error;
            }

            res.writeHead(302, { Location: '/code/view/u' });
            res.end();
        });
    }
}