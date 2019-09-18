const mongoose = require('mongoose')

const { connection } = require('./connect')

connection()

const { usersSchema, shopSchema } = require('./schema')

const userModel = mongoose.model('users', usersSchema)

const shopModel = mongoose.model('shops', shopSchema)

const Db = {
    users: {
        add(data) {
            return new Promise((resolve, reject) => {
                userModel.find({}, (error, docs) => { // 第一个参数为error的回调函数我们称之为 错误优先的回调函数
                    const flag = docs.some(item => item.username === data.username)
                        // console.log('data', data)
                    if (flag) {
                        resolve({
                            status: 0,
                            info: "用户名重复!"
                        })

                    } else {
                        // 数据库没有这个数据
                        const userEntity = new userModel()
                        userEntity.username = data.username
                        userEntity.password = data.password
                        userEntity.email = data.email
                        userEntity.time = data.time
                        console.log(userEntity.time)
                        userEntity.save(error => {
                            if (!error) {
                                resolve({
                                    status: 1,
                                    info: '用户名注册成功!'
                                })
                            } else {
                                resolve({
                                    status: 2,
                                    info: '用户名注册失败!'
                                })
                            }
                        })
                    }
                })
            })
        },
        remove(data) { // 删
            return new Promise((resolve, reject) => {
                userModel.find({ username: data.username, password: data.password }, (error, docs) => {
                    if (docs.length === 0) {
                        resolve({
                            status: 0,
                            info: '数据库不存在这个数据'
                        })
                    } else {
                        // 必须得到id才能使用remove方法
                        var id = docs[0]._id
                        userModel.findById(id, (error, doc) => {
                            doc.remove(error => {
                                if (error) {
                                    resolve({
                                        status: 1,
                                        info: '删除失败'
                                    })
                                } else {
                                    resolve({
                                        status: 2,
                                        info: '删除成功'
                                    })
                                }
                            })
                        })
                    }
                })

            })
        },
        modify(data) { // 改
            return new Promise((resolve, reject) => {
                userModel.find({ username: data.username }, (error, docs) => {
                    if (docs.length === 0) {
                        resolve({
                            status: 0,
                            info: '数据库不存在这个数据'
                        })
                    } else {
                        // 必须得到id才能使用remove方法
                        var id = docs[0]._id
                        userModel.findById(id, (error, doc) => {
                            doc.password = data.password
                            doc.save(error => {
                                if (error) {
                                    resolve({
                                        status: 1,
                                        info: '修改失败'
                                    })
                                } else {
                                    resolve({
                                        status: 2,
                                        info: '修改成功'
                                    })
                                }
                            })
                        })
                    }
                })
            })
        },
        query(data) { // 登录
            return new Promise((resolve, reject) => {
                if (data) {
                    userModel.find({ username: data.username, password: data.password }, (error, doc) => {
                        if (error) {
                            resolve({
                                status: 0,
                                info: error
                            })
                        } else {
                            if (doc.length === 0) {
                                resolve({
                                    status: 1,
                                    info: '用户名或密码错误！'
                                })
                            } else {
                                resolve({
                                    status: 2,
                                    info: '登录成功！',
                                    data: doc
                                })
                            }
                        }
                    })
                } else {
                    userModel.find({}, (error, doc) => {
                        if (error) {
                            resolve({
                                status: 0,
                                info: error
                            })
                        } else {
                            if (doc.length === 0) {
                                resolve({
                                    status: 1,
                                    info: '查询出错！'
                                })
                            } else {
                                resolve({
                                    status: 2,
                                    info: '查询成功！',
                                    data: doc
                                })
                            }
                        }
                    })
                }

            })
        }
    },
    shopDB: {
        add(data) {
            return new Promise((resolve, reject) => {

                shopModel.find({}, (error, doc) => {
                    if (!error) {

                        const flag = doc.some(item => {
                            return item.shop_name == data.shop_name && item.shop_address == data.shop_address
                        })

                        if (flag) {
                            resolve({
                                status: 1,
                                info: '此店铺已存在'
                            })
                        } else {
                            let shop = new shopModel(data)
                            shop.save((error) => {
                                if (error) {
                                    resolve({
                                        status: 3,
                                        info: error
                                    })
                                } else {
                                    resolve({
                                        status: 2,
                                        info: '店铺添加成功'
                                    })
                                }
                            })
                        }

                    }
                })
            })
        },
        delete(data) {
            return new Promise((resolve, reject) => {
                data && shopModel.findById(data._id, (error, doc) => {
                    if (error) {
                        resolve({
                            status: 1,
                            info: error
                        })
                    } else {
                        doc.remove(err => {
                            if (!err) {

                                shopModel.find({}, (erro, docs) => {
                                    resolve({
                                        status: 2,
                                        info: '删除成功',
                                        data: docs
                                    })
                                })
                            }
                        })
                    }
                })
            })
        },
        modify(data) {
            return new Promise((resolve, reject) => {
                shopModel.findById(data._id, (error, doc) => {
                    if (error) {
                        resolve({
                            status: 1,
                            info: error,
                            msg: '修改失败了'
                        })
                    } else {
                        // 找到了这个_id对应的数据
                        var arr = Object.keys(data)
                        arr.map(item => {
                            if (item != '_id') {
                                doc[item] = data[item]
                                return
                            }
                        })
                        doc.save();

                        setTimeout(() => {
                            shopModel.find({}, (erro, docs) => {
                                resolve({
                                    status: 2,
                                    info: '修改成功',
                                    data: docs
                                })
                            })
                        }, 0)

                    }
                })
            })
        },
        query() {
            return new Promise((resolve, reject) => {
                shopModel.find({}, (error, doc) => {
                    if (error) {
                        resolve({
                            status: 1,
                            info: error
                        })
                    } else {
                        resolve({
                            status: 2,
                            info: '获取数据成功',
                            data: doc
                        })
                    }
                })
            })
        }

    }
}


module.exports = {
    users: Db.users,
    shopDB: Db.shopDB
}