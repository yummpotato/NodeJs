// 202132118_박혜정

const express = require('express');
var router = express.Router()

var person = require('../lib/person');

router.get('/view/:vu',(req, res)=>{
    const vu = req.params.vu;

    if (vu === 'v') {
        person.viewV(req, res);
    } else {
        person.viewU(req, res);
    } 
}); 

router.get('/create',(req,res)=>{
    person.create(req,res);
})

router.post('/create_process',(req,res)=>{
    person.create_process(req,res);
})

router.get('/update/:loginId',(req,res)=>{
    person.update(req,res);
})
router.post('/update_process',(req,res)=>{
    person.update_process(req,res);
})
router.get('/delete/:loginId',(req,res)=>{
    person.delete_process(req,res);
})

module.exports = router;
