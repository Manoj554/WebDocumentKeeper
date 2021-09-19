const multer = require('multer');
const path = require('path');
const util = require('util');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let fileName = req.body.fileName;
        let ext = path.extname(file.originalname);

        if (fileName) {
            let laselement = fileName.slice(-1);

            if(laselement === ' '){
                fileName = fileName.substring(0,fileName.lastIndexOf(' '));
            }
            fileName = fileName.split(' ').join('-');
            return cb(null, fileName + ext);
        }
        let fname = file.originalname.split(' ').join('-');

        cb(null,fname);
    }
})

const upload = multer({
    storage: storage,
    limits:  {
        fileSize: 1024 * 1024 * 2
    }

}).single('documentFile');

const promify = util.promisify(upload);

module.exports = promify;