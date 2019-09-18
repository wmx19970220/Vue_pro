var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

const { users } = require('../db')

router.route('/')
    .get(async(req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const { username, password } = req.query;
        if (username == undefined || password == undefined) {
            var result = await users.query()
        } else {
            var result = await users.query({ username, password })
        }
        res.render('users', {
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                data: result.data
            })
        })
    })
    .post(async(req, res, next) => {
        /* 
          注册： 
              将前端发来的数据存入数据库
              注意： 用户名重复
              成功： 返回给前端成功的信息和状态
              失败： 返回给前端失败的信息和状态

          post方法在express中是通过req.body来获取前端发来的数据的，但是
            这个req.body有时会失效，因为高版本的express生成器会自动配置一个叫做body-parser的中间件
            低版本我们得手动配置了
        */
        res.setHeader('Access-Control-Allow-Origin', '*');
        // console.log('data1', req.body)
        const { username, password, email, time } = req.body
        console.log(req.body)
        const result = await users.add({ username, password, email, time }) // 使用对象的目的是为了让里面的key无序

        res.render('users', {
            data: JSON.stringify({
                info: result.info,
                status: result.status
            })
        })
    })



module.exports = router;