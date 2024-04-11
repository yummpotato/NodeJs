// 202132118_박혜정

var db = require('./db');
var sanitizeHtml = require('sanitize-html');
var time = require('./template');

function authIsOwner(req, res) {
    if (req.session.is_logined) {
        return true;
    } else {
        return false;
    }
}

function getMerchandiseData(merId) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].mer_id === merId) {
            return products[i];
        }
    }
    return {};
}

module.exports = {
    purchase: (req, res) => {
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00' || req.session.class === '01') {
                db.query('select * from boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA', (err3, products) => {
                        db.query('SELECT purchase.*, merchandiseA.* FROM purchase INNER JOIN merchandiseA ON purchase.mer_id = merchandiseA.mer_id', (err2, result) => {

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'purchase.ejs',
                                logined: 'YES',
                                boardtypes: results,
                                products: products,
                                purchase: result,
                                merchandiseData: result,
                                manager: true
                            }

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (req.session.class == '02') {
                db.query('select * from boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA', (err3, products) => {
                        db.query('SELECT purchase.*, merchandiseA.* FROM purchase INNER JOIN merchandiseA ON purchase.mer_id = merchandiseA.mer_id WHERE purchase.loginid = ?', [req.session.loginid], (err2, result) => {

                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: req.session.name,
                                body: 'purchase.ejs',
                                logined: 'YES',
                                boardtypes: results,
                                products: products,
                                purchase: result,
                                merchandiseData: result,
                                manager: false
                            }

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            }
        }
    },

    purchase_process: (req, res) => {
        var post = req.body;
        var sanitizedQty = sanitizeHtml(post.qty);
        db.query('SELECT * FROM merchandiseA WHERE mer_id = ?', [req.session.merId], (err, results) => {
            var total = parseInt(sanitizedQty, 10) * parseInt(results[0].price, 10);

            db.query('INSERT INTO purchase (loginid, mer_id, date, price, point, qty, total, payYN, cancel, refund) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [req.session.loginid, parseInt(req.session.merId, 10), time.dateOfEightDigit(), results[0].price, 10, parseInt(sanitizedQty, 10), total, 'Y', 'N', 'N'], (err2, result) => {
                    if (err2) {
                        throw err2;
                    }

                    res.redirect('/purchase');
                    res.end();
                })
        })
    },

    purchase_delete_process: (req, res) => {
        var purchaseId = req.params.purchaseId;
        db.query('DELETE FROM purchase WHERE purchase_id = ?', [purchaseId], (err, result) => {
            if (err) {
                return err;
            }

            res.redirect('/purchase');
            res.end();
        })
    },

    detail: (req, res) => {
        var mer_id = req.params.merId;
        req.session.merId = mer_id;

        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00' || req.session.class === '01') {
                db.query('select * from boardtype', (err, results) => {
                    db.query('select * from merchandiseA where mer_id = ?', [mer_id], (err2, result) => {
                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'merchandiseDetail.ejs',
                            logined: 'YES',
                            boardtypes: results,
                            product: result,
                            perchase: true
                        }

                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class == '02') {
                db.query('select * from boardtype', (err, results) => {
                    db.query('select * from merchandiseA where mer_id = ?', [mer_id], (err2, result) => {
                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: req.session.name,
                            body: 'merchandiseDetail.ejs',
                            logined: 'YES',
                            boardtypes: results,
                            product: result,
                            perchase: true
                        }

                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            }
        }
    },

    cancel_process: (req, res) => {
        var purchaseId = req.params.purchaseId;
        db.query('UPDATE purchase SET cancel=? WHERE purchase_id=?', ['Y', purchaseId], (err, results) => {
            if (err) {
                throw err;
            }

            res.redirect('/purchase');
            res.end();
        })
    },

    cart: (req, res) => {
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00' || req.session.class === '01') {
                db.query('select * from boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA', (err3, products) => {
                        db.query('SELECT * FROM cart', (err2, result) => {
                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'cart.ejs',
                                logined: 'YES',
                                boardtypes: results,
                                products: products,
                                cart: result,
                                merchandiseData: result,
                                manager: true
                            }

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (req.session.class === '02') {
                db.query('select * from boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA', (err3, products) => {
                        db.query('SELECT * FROM cart WHERE loginid = ?', [req.session.loginid], (err2, result) => {
                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: req.session.name,
                                body: 'cart.ejs',
                                logined: 'YES',
                                boardtypes: results,
                                products: products,
                                cart: result,
                                merchandiseData: result,
                                manager: false
                            }

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            }
        }
    },

    cart_process: (req, res) => {
        var merId = req.params.merId;
        req.session.merchandiseId = merId;
        db.query('INSERT INTO cart (loginid, mer_id, date) VALUES (?, ?, ?)',
            [req.session.loginid, parseInt(merId, 10), time.dateOfEightDigit()], (err2, result) => {
                if (err2) {
                    throw err2;
                }

                res.redirect('/purchase/cart');
                res.end();
            })
    },

    // cart_purchase_process: (req, res) => {
    //     var post = req.body;

    //     async function processPurchase() {
    //         for (let i = 0; i < post.qty.length; i++) {

    //             try {
    //                 const result = await new Promise((resolve, reject) => {
    //                     db.query('SELECT cart.*, merchandiseA.image, merchandiseA.price, merchandiseA.name FROM cart INNER JOIN merchandiseA ON cart.mer_id = merchandiseA.mer_id', (err, result) => {
    //                         if (err) reject(err);
    //                         resolve(result);
    //                     });
    //                 });

    //                 var total = result[0].price * post.qty[i];

    //                 if (post.qty[i] != '') {
    //                     await new Promise((resolve, reject) => {
    //                         db.query('INSERT INTO purchase (loginid, mer_id, date, price, point, qty, total, payYN, cancel, refund) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    //                             [req.session.loginid, result[i].mer_id, time.dateOfEightDigit(), result[i].price, 10, post.qty[i], total, 'Y', 'N', 'N'], (err, results) => {
    //                                 console.log(results);
    //                                 if (err) reject(err);
    //                                 resolve();
    //                             });
    //                     });

    //                     // 카트에서 해당 상품 삭제
    //                     await new Promise((resolve, reject) => {
    //                         db.query('DELETE FROM cart WHERE cart_id = ?', [result[i].cart_id], (err, deleteResult) => {
    //                             if (err) reject(err);
    //                             resolve();
    //                         });
    //                     });
    //                 }

    //             } catch (err) {
    //                 throw err;
    //             }
    //         }

    //         res.redirect('/purchase');
    //         res.end();
    //     }
    //     processPurchase();
    // },
    cart_purchase_process: async (req, res) => {
        var post = req.body;
    
        async function processPurchase() {
            try {
                const results = await new Promise((resolve, reject) => {
                    db.query('SELECT cart.*, merchandiseA.image, merchandiseA.price, merchandiseA.name, merchandiseA.mer_id FROM cart INNER JOIN merchandiseA ON cart.mer_id = merchandiseA.mer_id', (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                });
    
                const purchasePromises = results.map(async (result, i) => {
                    if (post.qty[i] != '') {
                        var total = result.price * post.qty[i];
                        await new Promise((resolve, reject) => {
                            db.query('INSERT INTO purchase (loginid, mer_id, date, price, point, qty, total, payYN, cancel, refund) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                [req.session.loginid, result.mer_id, time.dateOfEightDigit(), result.price, 10, post.qty[i], total, 'Y', 'N', 'N'], (err, results) => {
                                    if (err) reject(err);
                                    resolve();
                                });
                        });
    
                        // 카트에서 해당 상품 삭제
                        await new Promise((resolve, reject) => {
                            db.query('DELETE FROM cart WHERE cart_id = ?', [result.cart_id], (err, deleteResult) => {
                                if (err) reject(err);
                                resolve();
                            });
                        });
                    }
                });
    
                await Promise.all(purchasePromises);
            } catch (err) {
                console.error(err);
                // 오류 처리: 클라이언트에게 오류 응답 등을 수행하거나 다른 적절한 조치를 취합니다.
                res.status(500).send("Internal Server Error");
                return;
            }
    
            res.redirect('/purchase');
            res.end();
        }
    
        processPurchase();
    },

    cart_delete_process: (req, res) => {
        var cartId = req.params.cartId;
        db.query('DELETE FROM cart WHERE cart_id = ?', [cartId], (err, result) => {
            if (err) {
                return err;
            }

            res.redirect('/purchase/cart');
            res.end();
        })
    },

    purchase_update_process: (req, res) => {
        var purchaseId = req.params.purchaseId;
        db.query('UPDATE purchase SET date = ? WHERE purchase_id = ?', [time.dateOfEightDigit(), purchaseId], (err, result) => {
            if (err) {
                return err;
            }

            res.redirect('/purchase');
            res.end();
        })
    },

    cart_update_process: (req, res) => {
        var purchaseId = req.params.purchaseId;
        db.query('UPDATE cart SET date = ? WHERE cart_id = ?', [time.dateOfEightDigit(), purchaseId], (err, result) => {
            if (err) {
                return err;
            }

            res.redirect('/purchase');
            res.end();
        })
    },

    cart_manager: (req, res) => {
        db.query('select * from boardtype', (err, results) => {
            db.query('SELECT * FROM merchandiseA', (err3, products) => {
                db.query('SELECT purchase.*, merchandiseA.* FROM purchase INNER JOIN merchandiseA ON purchase.mer_id = merchandiseA.mer_id', (err2, result) => {

                    var context = {
                        menu: 'menuForManager.ejs',
                        who: req.session.name,
                        body: 'cartCU.ejs',
                        logined: 'YES',
                        boardtypes: results,
                        products: products
                    }

                    res.render('home', context, (err, html) => {
                        res.end(html);
                    })
                })
            })
        })
    }
}