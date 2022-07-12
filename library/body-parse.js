const toObject = require('json-stream-to-object')

function bodyParser(req) {
    return new Promise((resolve, reject) => {
        toObject(req, function (err, obj) {
            if (err) reject(err);
            resolve(obj);
          })
    })


}


module.exports = {
    bodyParser
}