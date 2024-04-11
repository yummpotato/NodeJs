// 202132118_박혜정

var db = require('./db');
var sanitizeHtml = require('sanitize-html');
var time = require('./template');
const sanitize = require('sanitize-html');
var updateTypeId = '';
var pNum = 0;
function authIsOwner(req, res) {
    if (req.session.is_logined) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    typeview: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000;`
        db.query(sql1 + sql2, (error, subIds) => {
            db.query('select * from boardtype', (error, boardtypes) => {
                if (error) {
                    throw error;
                }

                var tag = '';
                for (var i = 0; i < boardtypes.length; i++) {
                    tag += `<tr>
                            <td>${boardtypes[i].title}</td>
                            <td>${boardtypes[i].numPerPage}</td>
                            <td>${boardtypes[i].description}</td>
                            <td>${boardtypes[i].write_YN}</td>
                            <td>${boardtypes[i].re_YN}</td>
                            <td><a href="/board/type/update/${boardtypes[i].type_id}">수정</td>
                            <td><a href="/board/type/delete/${boardtypes[i].type_id}" 
                            onclick='if(confirm("정말로 삭제하시겠습니까?")==false) {return false}'>삭제</td>
                        </tr>`;
                }

                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'boardtype.ejs',
                    logined: 'YES',
                    boardtypes: subIds[0],
                    table: tag
                };

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })
        })
    },

    typecreate: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000;`
        db.query(sql1 + sql2, (error, subIds) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: 'boardtypeCU.ejs',
                logined: 'YES',
                boardtypes: subIds[0],
                cu: 'C'
            }

            res.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },

    typecreate_process: (req, res) => {
        var post = req.body;
        sanitizedTitle = sanitizeHtml(post.title)
        sanitizedDescription = sanitizeHtml(post.description)
        sanitizedwriteYN = sanitizeHtml(post.write_YN)
        sanitizedReYN = sanitizeHtml(post.re_YN)
        sanitizedNumPerPage = sanitizeHtml(post.numPerPage)

        db.query('INSERT INTO boardtype (title, description, write_YN, re_YN, numPerPage) VALUES(?, ?, ?, ?, ?)',
            [sanitizedTitle, sanitizedDescription, sanitizedwriteYN, sanitizedReYN, sanitizedNumPerPage], (error, result) => {
                if (error) {
                    throw error;
                }

                res.redirect('/board/type/view');
                res.end();
            }
        );
    },

    typeupdate: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000';`
        db.query(sql1 + sql2, (error, subIds) => {
            updateTypeId = req.params.typeId;

            db.query('select * from boardtype where type_id = ?', [updateTypeId], (err, results) => {
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'boardtypeCU.ejs',
                    logined: 'YES',
                    boardtypes: subIds[0],
                    cu: 'N',
                    boardtype: results
                }

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })
        })
    },

    typeupdate_process: (req, res) => {
        var post = req.body;
        var typeId = updateTypeId;
        sanitizedTitle = sanitizeHtml(post.title)
        sanitizedDescription = sanitizeHtml(post.description)
        sanitizedwriteYN = sanitizeHtml(post.write_YN)
        sanitizedReYN = sanitizeHtml(post.re_YN)
        sanitizedNumPerPage = sanitizeHtml(post.numPerPage)

        db.query('UPDATE boardtype SET title = ?, description = ?, write_YN = ?, re_YN = ?, numPerPage = ? WHERE type_id = ?',
            [sanitizedTitle, sanitizedDescription, sanitizedwriteYN, sanitizedReYN, sanitizedNumPerPage, typeId], (error, result) => {
                if (error) {
                    throw error;
                }

                res.redirect('/board/type/view');
                res.end();
            }
        );
    },

    typedelete_process: (req, res) => {
        var typeId = req.params.typeId;

        db.query('DELETE FROM boardtype WHERE type_id = ?', [typeId], (error, result) => {
            if (error) {
                throw error;
            }

            res.writeHead(302, { Location: '/board/type/view' });
            res.end();
        });
    },

    view: (req, res) => {
        var typeId = req.params.typeId;
        pNum = req.params.pNum;

        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {
                var sntzedTypeId = sanitizeHtml(req.params.typeId);
                var pNumber = req.params.pNum;
                var sql1 = `select * from boardtype; `
                var sql2 = `select * from boardtype where type_id = ${sntzedTypeId};`
                var sql3 = `select count(*) as total from board where type_id = ${sntzedTypeId};`

                db.query('SELECT * FROM board', (err, result) => {
                    db.query(sql1 + sql2 + sql3, (error, results) => {
                        var numPerPage = results[1][0].numPerPage;
                        var offs = (pNumber - 1) * numPerPage;
                        var totalPages = Math.ceil(results[2][0].total / numPerPage);

                        db.query(`select b.board_id as board_id, b.title as title, b.date as date, p.name as name 
                            from board b inner join personA p on b.loginid = p.loginid
                            where b.type_id = ? and b.p_id = ? ORDER BY date desc, board_id desc LIMIT ? OFFSET ?`,
                            [sntzedTypeId, 1, numPerPage, offs], (err, boards) => {
                                var context = {
                                    menu: 'menuForManager.ejs',
                                    who: req.session.name,
                                    body: 'board.ejs',
                                    boardtypes: results[0],
                                    logined: 'YES',
                                    title: results[1][0].title,
                                    boards: boards,
                                    edit: true,
                                    totalPages: totalPages,
                                    pNum: pNumber,
                                    bts: results[1][0].type_id
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                    })
                })
            } else if (req.session.class === '01') {
                var sntzedTypeId = sanitizeHtml(req.params.typeId);
                var pNumber = req.params.pNum;
                var sql1 = `select * from boardtype; `
                var sql2 = `select * from boardtype where type_id = ${sntzedTypeId};`
                var sql3 = `select count(*) as total from board where type_id = ${sntzedTypeId};`

                db.query('SELECT * FROM board', (err, result) => {
                    db.query(sql1 + sql2 + sql3, (error, results) => {
                        var numPerPage = results[1][0].numPerPage;
                        var offs = (pNumber - 1) * numPerPage;
                        var totalPages = Math.ceil(results[2][0].total / numPerPage);

                        db.query(`select b.board_id as board_id, b.title as title, b.date as date, p.name as name 
                            from board b inner join personA p on b.loginid = p.loginid
                            where b.type_id = ? and b.p_id = ? ORDER BY date desc, board_id desc LIMIT ? OFFSET ?`,
                            [sntzedTypeId, 1, numPerPage, offs], (err, boards) => {
                                var context = {
                                    menu: 'menuForManager.ejs',
                                    who: req.session.name,
                                    body: 'board.ejs',
                                    boardtypes: results[0],
                                    logined: 'YES',
                                    title: results[1][0].title,
                                    boards: boards,
                                    edit: true,
                                    totalPages: totalPages,
                                    pNum: pNumber,
                                    bts: results[1][0].type_id
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                    })
                })
            } else if (req.session.class === '02') {
                var sntzedTypeId = sanitizeHtml(req.params.typeId);
                var pNumber = req.params.pNum;
                var sql1 = `select * from boardtype; `
                var sql2 = `select * from boardtype where type_id = ${sntzedTypeId};`
                var sql3 = `select count(*) as total from board where type_id = ${sntzedTypeId};`

                db.query('SELECT * FROM board', (err, result) => {
                    db.query(sql1 + sql2 + sql3, (error, results) => {
                        var numPerPage = results[1][0].numPerPage;
                        var offs = (pNumber - 1) * numPerPage;
                        var totalPages = Math.ceil(results[2][0].total / numPerPage);

                        db.query(`select b.board_id as board_id, b.title as title, b.date as date, p.name as name 
                            from board b inner join personA p on b.loginid = p.loginid
                            where b.type_id = ? and b.p_id = ? ORDER BY date desc, board_id desc LIMIT ? OFFSET ?`,
                            [sntzedTypeId, 1, numPerPage, offs], (err, boards) => {
                                var edits = false;
                                if (results[1][0].write_YN == 'Y') {
                                    edits = true;
                                } else {
                                    edits = false;
                                }

                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'board.ejs',
                                    boardtypes: results[0],
                                    logined: 'YES',
                                    title: results[1][0].title,
                                    boards: boards,
                                    edit: edits,
                                    totalPages: totalPages,
                                    pNum: pNumber,
                                    bts: results[1][0].type_id
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                    })
                })
            }
        } else {
            var sntzedTypeId = sanitizeHtml(req.params.typeId);
            var pNumber = req.params.pNum;
            var sql1 = `select * from boardtype; `
            var sql2 = `select * from boardtype where type_id = ${sntzedTypeId};`
            var sql3 = `select count(*) as total from board where type_id = ${sntzedTypeId};`

            db.query('SELECT * FROM board', (err, result) => {
                db.query(sql1 + sql2 + sql3, (error, results) => {
                    var numPerPage = results[1][0].numPerPage;
                    var offs = (pNumber - 1) * numPerPage;
                    var totalPages = Math.ceil(results[2][0].total / numPerPage);

                    db.query(`select b.board_id as board_id, b.title as title, b.date as date, p.name as name 
                            from board b inner join personA p on b.loginid = p.loginid
                            where b.type_id = ? and b.p_id = ? ORDER BY date desc, board_id desc LIMIT ? OFFSET ?`,
                        [sntzedTypeId, 1, numPerPage, offs], (err, boards) => {
                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'board.ejs',
                                boardtypes: results[0],
                                logined: 'NO',
                                title: results[1][0].title,
                                boards: boards,
                                edit: false,
                                totalPages: totalPages,
                                pNum: pNumber,
                                bts: results[1][0].type_id
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                })
            })
        }
    },

    create: (req, res) => {
        var typeId = req.params.typeId;
        req.session.typeId = typeId;
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {

                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board', (error, result) => {

                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results[0],
                            logined: 'YES',
                            edit: "C",
                            bts: typeId,
                            loginid: result[0].loginid,
                            board: result,
                            pNum: null
                        };
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class === '01') {

                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board', (error, result) => {

                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results[0],
                            logined: 'YES',
                            edit: "C",
                            bts: typeId,
                            loginid: result[0].loginid,
                            board: result,
                            pNum: null
                        };
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class === '02') {

                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board', (error, result) => {

                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results[0],
                            logined: 'YES',
                            edit: "C",
                            bts: typeId,
                            loginid: result[0].loginid,
                            board: result,
                            pNum: null
                        };
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            }
        } else {

            db.query('SELECT * FROM boardtype', (err, results) => {
                db.query('SELECT * FROM board', (error, result) => {

                    var context = {
                        menu: 'menuForCustomer.ejs',
                        who: req.session.name,
                        body: 'boardCRU.ejs',
                        boardtypes: results[0],
                        logined: 'NO',
                        edit: "C",
                        bts: typeId,
                        loginid: result[0].loginid,
                        board: result,
                        pNum: null
                    };
                    res.render('home', context, (err, html) => {
                        res.end(html);
                    })
                })
            })
        }
    },

    create_process: (req, res) => {
        var post = req.body;
        var plainTypeId = req.session.typeId;
        var plainLoginId = req.session.loginid;
        var plainPassword = req.session.password;
        sanitizedTitle = sanitizeHtml(post.title)
        sanitizedDate = time.dateOfEightDigit()
        sanitizedContent = sanitizeHtml(post.content)

        db.query('INSERT INTO board (type_id, p_id, loginid, password, title, date, content) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [plainTypeId, 1, plainLoginId, plainPassword, sanitizedTitle, sanitizedDate, sanitizedContent], (error, result) => {
                if (error) {
                    throw error;
                }

                res.redirect(`/board/view/${plainTypeId}/${pNum}`);
                res.end();
            }
        );
    },

    detail: (req, res) => {
        var boardId = req.params.boardId;
        var pNum = req.params.pNum;

        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board WHERE board_id = ?', [boardId], (error, result) => {

                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results,
                            logined: 'YES',
                            edit: "V",
                            bts: result[0].type_id,
                            loginid: result[0].loginid,
                            board: result,
                            pNum: parseInt(pNum, 10)
                        };
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class === '01') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board WHERE board_id = ?', [boardId], (error, result) => {

                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results,
                            logined: 'YES',
                            edit: "V",
                            bts: result[0].type_id,
                            loginid: result[0].loginid,
                            board: result,
                            pNum: parseInt(pNum, 10)
                        };
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class === '02') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board WHERE board_id = ?', [boardId], (error, result) => {

                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results,
                            logined: 'YES',
                            edit: "V",
                            bts: result[0].type_id,
                            loginid: result[0].loginid,
                            board: result,
                            pNum: parseInt(pNum, 10)
                        };
                        
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            }
        } else {
            db.query('SELECT * FROM boardtype', (err, results) => {
                db.query('SELECT * FROM board WHERE board_id = ?', [boardId], (error, result) => {

                    var context = {
                        menu: 'menuForCustomer.ejs',
                        who: req.session.name,
                        body: 'boardCRU.ejs',
                        boardtypes: results,
                        logined: 'YES',
                        edit: "V",
                        bts: result[0].type_id,
                        loginid: result[0].loginid,
                        board: result,
                        pNum: parseInt(pNum, 10)
                    };
                    res.render('home', context, (err, html) => {
                        res.end(html);
                    })
                })
            })
        }
    },

    update: (req, res) => {
        var boardId = req.params.boardId;
        req.session.boardId = boardId;
        var typeId = req.params.typeId;
        req.session.typeId = typeId;
        var pNum = req.params.pNum;
        req.session.pNum = pNum;

        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {

                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board WHERE board_id = ?', [boardId], (error, result) => {

                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results[0],
                            logined: 'YES',
                            edit: "U",
                            bts: typeId,
                            loginid: result.loginid,
                            board: result,
                            pNum: parseInt(pNum, 10)
                        };
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class === '01') {

                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board WHERE board_id = ?', [boardId], (error, result) => {
                        
                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results,
                            logined: 'YES',
                            edit: "U",
                            bts: typeId,
                            loginid: result.loginid,
                            board: result,
                            pNum: parseInt(pNum, 10)
                        };
                        
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class === '02') {

                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM board WHERE board_id = ?', [boardId], (error, result) => {

                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            boardtypes: results,
                            logined: 'YES',
                            edit: "U",
                            bts: typeId,
                            loginid: result.loginid,
                            board: result,
                            pNum: parseInt(pNum, 10)
                        };
                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            }
        } else {
            db.query('SELECT * FROM boardtype', (err, results) => {
                db.query('SELECT * FROM board WHERE board_id = ?', [boardId], (error, result) => {

                    var context = {
                        menu: 'menuForCustomer.ejs',
                        who: req.session.name,
                        body: 'boardCRU.ejs',
                        boardtypes: results,
                        logined: 'NO',
                        edit: "U",
                        bts: typeId,
                        loginid: result.loginid,
                        board: result,
                        pNum: parseInt(pNum, 10)
                    };
                    res.render('home', context, (err, html) => {
                        res.end(html);
                    })
                })
            })
        }
    },

    update_process: (req, res) => {
        var post = req.body;
        sanitizedTitle = sanitizeHtml(post.title)
        sanitizedDate = time.dateOfEightDigit()
        sanitizedContent = sanitizeHtml(post.content)
        var boardId = req.session.boardId;
        var pNum = req.session.pNum;
        var typeId = req.session.typeId;
    

        db.query('UPDATE board SET title = ?, date = ?, content = ? WHERE board_id = ?', 
            [sanitizedTitle, sanitizedDate, sanitizedContent, boardId], (error, result) => {
                if (error) {
                    throw error;
                }

                res.redirect(`/board/view/${typeId}/${pNum}`);
                res.end();
            }
        );
    },

    delete_process: (req, res) => {
        var boardId = req.params.boardId;
        var typeId = req.params.typeId;
        var pNum = req.params.pNum;
        console.log(boardId);

        db.query('DELETE FROM board WHERE board_id =?', [boardId], (error, result) => {
            if (error) {
                throw error;
            }

            res.writeHead(302, { Location: `/board/view/${typeId}/${pNum}` });
            res.end();
        });
    }
}