const expressJWT = require('express-jwt')
const secret = require('../utils/secret')

//token验证
const varifyToken = () => {
    return expressJWT({
        secret: secret.private_key,
        algorithms: ['HS256'], // 要加才能对
        //requestProperty: 'auth',//自定义获取的信息位置，默认验证通过req.user获取token信息
        credentialsRequired: false, //是否允许无token请求
        getToken: function fromHeaderOrQuerystring(req){
            let authorization = req.body.authorization || req.query.authorization || req.headers.authorization || null
            const token = authorization.replace('Bearer ', '')
            return token
        }
    }).unless({
        path: ['/login'] //除了这个地址，其他的URL都需要验证
    });
}

// 失败处理--放到最后一个app.use()
const errorToken = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { 
        //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        let obj = {};
        obj.code = 401;
        obj.data='无效的访问,Authorization不能为空或无效的token!'
        obj.msgCode = 'ERROR';
        res.send(obj); //返回失败信息
      }
};

module.exports = {
    varifyToken,
    errorToken
}