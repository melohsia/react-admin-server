const jwt  = require('jsonwebtoken')
const secret = require('./secret')
module.exports = {
     //生成token
     generateToken: (data) => {
        const token = jwt.sign(
            data,
            secret.private_key,
            { expiresIn: 1000*10 }
        )
        return token
    },
    // 校验token
    // verifyToken: (token) => {
    //     return new Promise((resolve, reject) => {
    //         let result = jwt.verify(token, screct.private_key) || {}
    //         console.log('result', result)
    //         let {exp = 0} = result, current = Math.floor(Date.now() / 1000)
    //         if (current <= exp) {
    //             resolve(result || {})
    //         }else{
    //             reject('Token失效')
    //         }
    //     })
    // }
}