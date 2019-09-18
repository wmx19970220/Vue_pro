const express = require('express')

const router = express.Router()

const path = require('path')

const { shopDB } = require('../db')

const multer = require('multer')

const arr = []

var storage = multer.diskStorage({
    destination: function(req, file, cb) { // destination表示我们将前端传来的文件存储在哪一个文件夹
        cb(null, path.join(__dirname, '../public/upload')) // upload对应的就是我们后端的public/upload目录
    },
    filename: function(req, file, cb) {
        var filename = file.fieldname + '-' + Date.now() + file.originalname.slice(file.originalname.indexOf('.'))
        arr.push(filename)
        req.arr = arr
        cb(null, filename)
    }
})

var upload = multer({ storage: storage })
    /* -------------- 将前端发来的文件存储在后端文件夹中 -- end ------------------------ */

router.route('/shop')
    .post(upload.any(), async(req, res, next) => {

        arr[0] && (req.body.shop_logo = req.arr[0]);
        arr[1] && (req.body.shop_business_permits = req.arr[1]);
        arr[2] && (req.body.shop_licence = req.arr[2]);
        const result = await shopDB.add(req.body)
        res.render('shop', {
            data: JSON.stringify({
                status: result.status,
                info: result.info
            })
        })
        arr.length = 0
    })
    .get(async(req, res, next) => {
        const result = await shopDB.query()
        res.render('shop', {
            data: JSON.stringify({
                status: result.status,
                info: result.info,
                data: result.data
            })
        })
    })
    .delete(async(req, res, next) => {
        const result = await shopDB.delete({...req.query })
        res.render('shop', {
            data: JSON.stringify({
                status: result.status,
                info: result.info,
                data: result.data
            })
        })
    })
    .put(async(req, res, next) => {

        const result = await shopDB.modify({...req.query })
        console.log(result.data)
        res.render('shop', {
            data: JSON.stringify({
                status: result.status,
                info: result.info,
                data: result.data
            })
        })
    })

module.exports = router