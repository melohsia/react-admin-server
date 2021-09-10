var fs = require('fs')

const upload = async (req, res) => {
    const { hash, index } = req.body
    const  file  = req.files[0]
    const filename = `${file.destination}/${hash}-${index}`
    fs.rename(req.files[0].path, filename, (err) => {
        if(err){
            res.send({
                code: -1,
                message: 'error'
            })
        }else{ 
            res.send({
                code: 200,
                message: filename
            })
        }
    })
}

const mergeFiles = async (req, res) => {
    const { total, hash, name } = req.body
    let ext = name.split('.')[1]
    const saveDir = 'public/files/'
    const chunkDir = 'public/temp/'
    const savePath = saveDir + `${hash}.${ext}`
    console.log('savePath', savePath)
    // 创建文件
    fs.writeFileSync(savePath, '');
    // 读取所有的chunks 文件名存放在数组中
    const chunks = fs.readdirSync(chunkDir);
    // 检查切片数量是否正确
    if(chunks.length !== Number(total) || chunks.length === 0) return res.send({ code: -1, msg: '切片文件数量不符合' });
    for (let i = 0; i < Number(total); i++) {
        // 追加写入到文件中
        console.log('切片', chunkDir + hash + '-' + i)
        fs.appendFileSync(savePath, fs.readFileSync(chunkDir + hash + '-' + i));
        // 删除本次使用的chunk
        fs.unlinkSync(chunkDir + hash + '-' + i);
    }
    res.send({
        code: 200,
        data:{
            path: savePath
        }
    })
}

const getFileList = (req, res) => {
    
    fs.readdir('E:/project/react-admin-server/public/files', (err, files) => {
        if(err){
            console.log('err', err)
        }else{
            let data = []
            files && files.map((file) => {
                let fileObj = {
                    uid: file.split('@')[0],
                    name: file.split('@')[1],
                    status: 'done',
                    url: `http://localhost:3001/files/${file}`,
                }
                data.push(fileObj)
            })
            res.send({
                code: 200,
                data
            })
        }
    })
    
}

const deleteFileByUid = (req, res) => {
    const { uid } = req.query
    fs.readdir('E:/project/react-admin-server/public/files', (err, files) => {
        if(err){
            console.log('err', err)
        }else{
            files && files.map((file) => {
                if(file.startsWith(uid)){
                    fs.unlink('E:/project/react-admin-server/public/files/' + file, (err) => {
                        if(err){
                            console.log('err', err)
                        }else{
                            res.send({
                                code: 200,
                                message: 'SUCCESS'
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports = {
    upload,
    getFileList,
    deleteFileByUid,
    mergeFiles
}