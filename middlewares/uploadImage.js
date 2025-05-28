const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //callback error, destination
        callback(null, 'public/images/');
    },
    filename: (req, file, callback) => {
        // callback(err, filename)
        callback(null, Date.now() + file.originalname);
    }
});

// init multer
const upload = multer({ storage: storage });

module.exports = upload;