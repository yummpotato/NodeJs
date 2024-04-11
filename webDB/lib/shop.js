// 202132118_박혜정

var db = require('./db');
var sanitizeHtml = require('sanitize-html');

function authIsOwner(req, res) {
    if (req.session.is_logined) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    home: (req, res) => {
        var category = req.params.category;
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {
                if (category == 'all') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select address, ROUND(( count(*) / ( select count(*) from personA)) * 100, 2) as rate from personA group by address;`
                    db.query(sql1 + sql2, (error, results) => {
                        var context = {
                            menu: 'menuForMIS.ejs',
                            body: 'customerAnal.ejs',
                            who: req.session.name,
                            logined: 'YES',
                            boardtypes: results[0],
                            percentage: results[1]
                        }
                        console.log(context);

                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                } else if (category == '0001') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['의류'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0002') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['식품'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0003') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['가전'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0004') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['도서'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0005') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['스포츠'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0006') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['자동차'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0007') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['생활용품'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0008') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['완구'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                }
            } else if (req.session.class === '01') {
                if (category == 'all') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA', (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0001') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['의류'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0002') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['식품'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0003') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['가전'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0004') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['도서'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0005') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['스포츠'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0006') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['자동차'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0007') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['생활용품'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                } else if (category == '0008') {
                    var sql1 = `select * from boardtype;`
                    var sql2 = `select * from codeA where main_id = '0000';`
                    db.query(sql1 + sql2, (error, subIds) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['완구'], (error, products) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });

                            var context = {
                                menu: 'menuForManager.ejs',
                                who: req.session.name,
                                body: 'merchandise.ejs',
                                logined: 'YES',
                                products: productData,
                                boardtypes: subIds[0],
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                }
            } else if (req.session.class === '02') {
                if (category == 'all') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA', (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                } else if (category == '0001') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['의류'], (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                } else if (category == '0002') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['식품'], (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                } else if (category == '0003') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['가전'], (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                } else if (category == '0004') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['도서'], (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                } else if (category == '0005') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['스포츠'], (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                } else if (category == '0006') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['자동차'], (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                } else if (category == '0007') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['생활용품'], (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                } else if (category == '0008') {
                    db.query('SELECT * FROM boardtype', (err, results) => {
                        db.query('SELECT * FROM merchandiseA where category = ?', ['완구'], (error, products) => {
                            db.query('SELECT * FROM board', (error, result) => {
                                const productData = [];

                                products.forEach((product) => {
                                    const image = product.image;
                                    const name = product.name;
                                    const price = product.price;
                                    const brand = product.brand;
                                    const mer_id = product.mer_id;

                                    productData.push({ image, name, price, brand, mer_id });
                                });


                                var context = {
                                    menu: 'menuForCustomer.ejs',
                                    who: req.session.name,
                                    body: 'merchandise.ejs',
                                    logined: 'YES',
                                    products: productData,
                                    boardtypes: results,
                                    upde: true,
                                    edit: null
                                };

                                res.render('home', context, (err, html) => {
                                    res.end(html);
                                })
                            })
                        })
                    })
                }
            }
        } else {
            if (category == 'all') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA', (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (category == '0001') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA where category = ?', ['의류'], (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (category == '0002') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA where category = ?', ['식품'], (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (category == '0003') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA where category = ?', ['가전'], (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (category == '0004') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA where category = ?', ['도서'], (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (category == '0005') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA where category = ?', ['스포츠'], (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (category == '0006') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA where category = ?', ['자동차'], (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (category == '0007') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA where category = ?', ['생활용품'], (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            } else if (category == '0008') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA where category = ?', ['완구'], (error, products) => {
                        db.query('SELECT * FROM board', (error, result) => {
                            const productData = [];

                            products.forEach((product) => {
                                const image = product.image;
                                const name = product.name;
                                const price = product.price;
                                const brand = product.brand;
                                const mer_id = product.mer_id;

                                productData.push({ image, name, price, brand, mer_id });
                            });


                            var context = {
                                menu: 'menuForCustomer.ejs',
                                who: '손님',
                                body: 'merchandise.ejs',
                                logined: 'NO',
                                products: productData,
                                boardtypes: results,
                                upde: true,
                                edit: null
                            };

                            res.render('home', context, (err, html) => {
                                res.end(html);
                            })
                        })
                    })
                })
            }
        }
    },

    search: (req, res) => {
        var post = req.query;
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00' || req.session.class === '01') {
                db.query('select * from boardtype', (err, results) => {
                    if (err) {
                        throw err;
                    }
                    var sql2 = `select * from merchandiseA where name like '%${post.searchInput}%' or brand like '%${post.searchInput}%' or supplier like '%${post.searchInput}%';`
                    db.query(sql2, (err2, result) => {
                        if (err2) {
                            throw err2;
                        }
                        const productData = [];

                        result.forEach((product) => {
                            const image = product.image;
                            const name = product.name;
                            const price = product.price;
                            const brand = product.brand;
                            const mer_id = product.mer_id;

                            productData.push({ image, name, price, brand, mer_id });
                        });

                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'merchandise.ejs',
                            logined: 'YES',
                            products: productData,
                            boardtypes: results,
                            upde: true,
                            edit: null
                        }

                        res.render('home', context, (err, html) => {
                            // 쿼리스트링을 감추는 코드
                            const updatedUrl = '/shop/search';  // 원하는 URL로 대체 가능
                            res.write('<script>history.pushState({}, "", "' + updatedUrl + '");</script>');
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class === '02') {
                db.query('select * from boardtype', (err, results) => {
                    if (err) {
                        throw err;
                    }
                    var sql2 = `select * from merchandiseA where name like '%${post.searchInput}%' or brand like '%${post.searchInput}%' or supplier like '%${post.searchInput}%';`
                    db.query(sql2, (err2, result) => {
                        if (err2) {
                            throw err2;
                        }
                        const productData = [];

                        result.forEach((product) => {
                            const image = product.image;
                            const name = product.name;
                            const price = product.price;
                            const brand = product.brand;
                            const mer_id = product.mer_id;

                            productData.push({ image, name, price, brand, mer_id });
                        });

                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: req.session.name,
                            body: 'merchandise.ejs',
                            logined: 'YES',
                            products: productData,
                            boardtypes: results,
                            upde: true,
                            edit: null
                        }

                        res.render('home', context, (err, html) => {
                            // 쿼리스트링을 감추는 코드
                            const updatedUrl = '/shop/search';  // 원하는 URL로 대체 가능
                            res.write('<script>history.pushState({}, "", "' + updatedUrl + '");</script>');
                            res.end(html);
                        })
                    })
                })
            }
        } else {
            db.query('select * from boardtype', (err, results) => {
                if (err) {
                    throw err;
                }
                var sql2 = `select * from merchandiseA where name like '%${post.searchInput}%' or brand like '%${post.searchInput}%' or supplier like '%${post.searchInput}%';`
                db.query(sql2, (err2, result) => {
                    if (err2) {
                        throw err2;
                    }
                    const productData = [];

                    result.forEach((product) => {
                        const image = product.image;
                        const name = product.name;
                        const price = product.price;
                        const brand = product.brand;
                        const mer_id = product.mer_id;

                        productData.push({ image, name, price, brand, mer_id });
                    });

                    var context = {
                        menu: 'menuForCustomer.ejs',
                        who: '손님',
                        body: 'merchandise.ejs',
                        logined: 'NO',
                        products: productData,
                        boardtypes: results,
                        upde: true,
                        edit: null
                    }

                    res.render('home', context, (err, html) => {
                        // 쿼리스트링을 감추는 코드
                        const updatedUrl = '/shop/search';  // 원하는 URL로 대체 가능
                        res.write('<script>history.pushState({}, "", "' + updatedUrl + '");</script>');
                        res.end(html);
                    })
                })
            })
        }
    },

    detail: (req, res) => {
        var merId = req.params.merId;
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00' || req.session.class === '01') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA WHERE mer_id = ?', [merId], (err2, result) => {
                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'merchandiseDetail.ejs',
                            logined: 'YES',
                            boardtypes: results,
                            product: result,
                            perchase: false
                        }

                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            } else if (req.session.class === '02') {
                db.query('SELECT * FROM boardtype', (err, results) => {
                    db.query('SELECT * FROM merchandiseA WHERE mer_id = ?', [merId], (err2, result) => {
                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: req.session.name,
                            body: 'merchandiseDetail.ejs',
                            logined: 'YES',
                            boardtypes: results,
                            product: result,
                            perchase: false
                        }

                        res.render('home', context, (err, html) => {
                            res.end(html);
                        })
                    })
                })
            }
        }
    },

    customeranal: (req, res) => {
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {
                var sql1 = `select * from boardtype;`
                var sql2 = `select address, ROUND(( count(*) / ( select count(*) from personA)) * 100, 2) as rate from personA group by address;`
                db.query(sql1 + sql2, (error, results) => {
                    var context = {
                        menu: 'menuForMIS.ejs',
                        body: 'customerAnal.ejs',
                        who: req.session.name,
                        logined: 'YES',
                        boardtypes: results[0],
                        percentage: results[1]
                    }
                    console.log(context);

                    res.render('home', context, (err, html) => {
                        res.end(html);
                    })
                })
            }
        } else {
            var sql1 = `select * from boardtype;`
            var sql2 = `select address, ROUND(( count(*) / ( select count(*) from personA)) * 100, 2) as rate from personA group by address;`
            db.query(sql1 + sql2, (error, results) => {
                var context = {
                    menu: 'menuForCustomer.ejs',
                    body: 'merchandise.ejs',
                    who: '손님',
                    logined: 'NO',
                    boardtypes: results[0],
                    merchandise: results[1],
                    vu: 'v'
                }

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })
        }
    },

    merchandiseanal: (req, res) => {
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {
                var sql1 = `select * from boardtype;`
                var sql2 = `select category, ROUND(( count(*) / ( select count(*) from merchandiseA)) * 100, 2) as rate from merchandiseA group by category;`
                db.query(sql1 + sql2, (error, results) => {
                    var context = {
                        menu: 'menuForMIS.ejs',
                        body: 'merchandiseAnal.ejs',
                        who: req.session.name,
                        logined: 'YES',
                        boardtypes: results[0],
                        percentage: results[1]
                    }
                    console.log(context);

                    res.render('home', context, (err, html) => {
                        res.end(html);
                    })
                })
            }
        } else {
            var sql1 = `select * from boardtype;`
            var sql2 = `select category, ROUND(( count(*) / ( select count(*) from merchandiseA)) * 100, 2) as rate from merchandiseA group by category;`
            db.query(sql1 + sql2, (error, results) => {
                var context = {
                    menu: 'menuForCustomer.ejs',
                    body: 'merchandise.ejs',
                    who: '손님',
                    logined: 'NO',
                    boardtypes: results[0],
                    merchandise: results[1],
                    vu: 'v'
                }

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })
        }
    },

    boardanal: (req, res) => {
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {
                var sql1 = `select * from boardtype;`
                // var sql2 = `select type_id, ROUND(( count(*) / ( select count(*) from board)) * 100, 2) as rate from board group by type_id;`
                var sql2 = `SELECT bt.title, ROUND((COUNT(*) / (SELECT COUNT(*) FROM board)) * 100, 2) AS rate
                FROM board b
                JOIN boardtype bt ON b.type_id = bt.type_id
                GROUP BY bt.title;`
                db.query(sql1 + sql2, (error, results) => {
                    var context = {
                        menu: 'menuForMIS.ejs',
                        body: 'boardAnal.ejs',
                        who: req.session.name,
                        logined: 'YES',
                        boardtypes: results[0],
                        percentage: results[1]
                    }
                    console.log(context);

                    res.render('home', context, (err, html) => {
                        res.end(html);
                    })
                })
            }
        } else {
            var sql1 = `select * from boardtype;`
            var sql2 = `select type_id, ROUND(( count(*) / ( select count(*) from board)) * 100, 2) as rate from board group by type_id;`
            db.query(sql1 + sql2, (error, results) => {
                var context = {
                    menu: 'menuForCustomer.ejs',
                    body: 'merchandise.ejs',
                    who: '손님',
                    logined: 'NO',
                    boardtypes: results[0],
                    merchandise: results[1],
                    vu: 'v'
                }

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })
        }
    }
}