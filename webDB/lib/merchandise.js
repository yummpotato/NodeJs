// 202132118_박혜정

var db = require('./db');
var sanitizeHtml = require('sanitize-html');

var updateMerId = '';

module.exports = {
    viewV: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000;`
        db.query(sql1 + sql2, (error, subIds) => {
            db.query('SELECT image, name, brand, price FROM merchandiseA', (error, products) => {
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
            db.query('SELECT image, name, brand, price, mer_id FROM merchandiseA', (error, products) => {
                const productData = [];

                products.forEach((product) => {
                    const image = product.image;
                    const name = product.name;
                    const price = product.price;
                    const brand = product.brand;
                    const mer_id = product.mer_id;

                    productData.push({ image, name, price, brand, mer_id });
                });

                var tag = '';
                for (var i = 0; i < products.length; i++) {
                    tag += `<tr><td><img src="${products[i].image}" style="width:100px;height:100px;"></td>
                        <td>${products[i].name}</td>
                        <td>가격: ${products[i].price}</td>
                        <td>브랜드: ${products[i].brand}</td>
                        <td><a href="/merchandise/update/${products[i].mer_id}">수정</td>
                        <td><a href="/merchandise/delete/${products[i].mer_id}" 
                        onclick='if(confirm("정말로 삭제하시겠습니까?")==false) {return false}'>삭제</td></tr>`;
                }

                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'merchandise.ejs',
                    logined: 'YES',
                    products: productData,
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
                body: 'merchandiseCU.ejs',
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
        sanitizedCategory = sanitizeHtml(post.category)
        sanitizedName = sanitizeHtml(post.name)
        sanitizedPrice = sanitizeHtml(post.price)
        sanitizedStock = sanitizeHtml(post.stock)
        sanitizedBrand = sanitizeHtml(post.brand)
        sanitizedSupplier = sanitizeHtml(post.supplier)
        sanitizedImage = sanitizeHtml(post.image)
        sanitizedSaleYn = sanitizeHtml(post.sale_yn)
        sanitizedSalePrice = sanitizeHtml(post.sale_price)

        db.query(`INSERT INTO merchandiseA (category, name, price, stock, brand, supplier, image, sale_yn, sale_price) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [sanitizedCategory, sanitizedName, sanitizedPrice, sanitizedStock, sanitizedBrand, sanitizedSupplier, sanitizedImage, sanitizedSaleYn, sanitizedSalePrice], (error, result) => {
                if (error) {
                    throw error;
                }

                res.redirect('/merchandise/view/u');
                res.end();
            }
        );
    },

    update: (req, res) => {
        var sql1 = `select * from boardtype;`
        var sql2 = `select * from codeA where main_id = '0000;`
        db.query(sql1 + sql2, (error, subIds) => {
            updateMerId = req.params.merId;

            db.query('select * from merchandiseA where mer_id = ?', [updateMerId], (err, results) => {
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'merchandiseCU.ejs',
                    logined: 'YES',
                    insert: false,
                    boardtypes: subIds[0],
                    product: results
                };

                res.render('home', context, (err, html) => {
                    res.end(html);
                })
            })

        })
    },

    update_process: (req, res) => {
        var post = req.body;
        merId = updateMerId;
        sanitizedCategory = sanitizeHtml(post.category)
        sanitizedName = sanitizeHtml(post.name)
        sanitizedPrice = sanitizeHtml(post.price)
        sanitizedStock = sanitizeHtml(post.stock)
        sanitizedBrand = sanitizeHtml(post.brand)
        sanitizedSupplier = sanitizeHtml(post.supplier)
        sanitizedImage = sanitizeHtml(post.image)
        sanitizedSaleYn = sanitizeHtml(post.sale_yn)
        sanitizedSalePrice = sanitizeHtml(post.sale_price)

        db.query('UPDATE merchandiseA SET category=?, name=?, price=?, stock=?, brand=?, supplier=?, image=?, sale_yn=?, sale_price=? WHERE mer_id=?',
            [sanitizedCategory, sanitizedName, sanitizedPrice, sanitizedStock, sanitizedBrand, sanitizedSupplier, sanitizedImage, sanitizedSaleYn, sanitizedSalePrice, merId], (error, result) => {
                if (error) {
                    throw error;
                }
                res.redirect('/merchandise/view/u');
                res.end();
            }
        );
    },

    delete_process: (req, res) => {
        var mer_id = req.params.merId;

        db.query('DELETE FROM merchandiseA WHERE mer_id=?', [mer_id], (error, result) => {
            if (error) {
                throw error;
            }

            res.writeHead(302, { Location: '/merchandise/view/u' });
            res.end();
        });
    }
}