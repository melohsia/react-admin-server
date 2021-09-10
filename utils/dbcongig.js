const mysql = require('mysql')

module.exports = {
    config:{
        host: "localhost",
        user: "root",
        password: "111111",
        database: "mydatabase"
    },
    sqlConnect:function(sql, sqlArr, callback){
        let pool = mysql.createPool(this.config)
        pool.getConnection((err, conn) => {
            if(err){
                console.log('数据库连接失败')
                return
            }
            conn.query(sql, sqlArr, callback)
            conn.release()
        })
    }
}