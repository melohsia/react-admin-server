var fs = require('fs')

const getParameter = async (req, res) => {
    const { keyword } = req.query;
    res.send({
        code: 200,
        keyword
    })
}

module.exports = {
    getParameter
}