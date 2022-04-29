var express = require('express');
var fileUpload = require('express-fileupload')

var multer = require('multer')
var upload = multer({dest: 'public/temp'})
var router = express.Router();

var user = require('../controller/userController')
var file = require('../controller/fileController')
var search = require('../controller/searchController')

var app = express()

app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));
app.use(fileUpload())

//用户登录与信息获取
router.post('/login', user.loginAuth);
router.get('/', user.getUser);

//文件操作
router.post('/fileUpload', upload.any(), file.upload)
router.post('/mergeFiles', upload.any(), file.mergeFiles)
router.get('/fileList', file.getFileList)
router.get('/deleteFile', file.deleteFileByUid)

//XSS攻击
router.get('/search', search.getParameter)
module.exports = router;
