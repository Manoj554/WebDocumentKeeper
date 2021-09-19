const multer = require('multer');
const path = require('path');
const nanoId = require('nanoid');
const fs = require('fs');
const util = require('util');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let id = req.id;
        if(!fs.existsSync(`./uploads/${id}`)){
            fs.mkdir(path.join(__dirname, `./uploads/${id}`),(err)=>{
                if(err) console.log(err);
                else console.log("dictinory created");
            });
        }

        cb(null, path.join((__dirname), `./uploads/${id}`));
    },
    filename: function (req, file, cb) {
        let fileName = req.body.fileName;
        const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        if (fileName) {
            let laselement = fileName.slice(-1);
            if(laselement === ' '){
                fileName = fileName.substring(0,fileName.lastIndexOf(' '));
            }
            fileName = fileName.split(' ').join('-');
            return cb(null, fileName + '_' + nanoId.nanoid(5,nanoId.urlAlphabet) + ext);
        }
        let fname = file.originalname.split(' ').join('-');
        fname = fname.substr(0,fname.lastIndexOf('.'));

        cb(null,fname + '_' + nanoId.nanoid(10) + ext);
    }
})

const upload = multer({
    storage: storage,
    limits:  {
        fileSize: 1024 * 1024 * 2
    }
    
}).single('documentFile');

let promify = util.promisify(upload);

module.exports = promify;