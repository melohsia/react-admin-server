const dbconfig = require('../utils/dbcongig')
const token = require('../utils/token')

const loginAuth = (req, res) => {
    const {username, password} = req.body
    const sql = `SELECT * FROM user where username = ? and password = ?`
    const sqlArr = [username, password]
    const callBack = (err, data) => {
        if(err){
            console.log('数据库连接失败')
            return
        }else{
            if(!data.length){
                res.send({
                    code: 401,
                    data:'无效的访问,Authorization不能为空或无效的token！',
                    msgCode: 'ERROR'
                })
                return
            }
            let result = {}
            const created = Date.parse(new Date())
            result.user = username
            result.access_token = token.generateToken({username, password})
            result.exp = created + 10*1000
            res.send({
                code: 200,
                data: result,
                msgCode: "SUCCESS"
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

const getUser = (req, res) => {
    const sql = `SELECT * FROM user`
    const sqlArr = []
    const callBack = (err, data) => {
        if(err){
            console.log('数据库连接失败')
            return
        }else{
            if(!data.length){
                res.send({code: 'B00000'})
                return
            }
            res.send({
                code: 201,
                data,
                msgCode: "SUCCESS"
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports={
    loginAuth,
    getUser
}