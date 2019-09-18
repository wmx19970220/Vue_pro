const mongoose = require('mongoose')
const DATA_BASE_NAME = 'Vue_pro'
const connect = {
    connection() {
        mongoose.connect(`mongodb://127.0.0.1:27017/${ DATA_BASE_NAME }`, (error) => {
            if (error) {
                //数据库连接失败
                console.log('数据库连接失败')
            } else {
                console.log('数据库连接成功')
            }
        })
    }
}

module.exports = {
    connection: connect.connection
}