const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            console.log('Only jpg & png files are supported');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2MB limit
    }
});

module.exports = upload;
