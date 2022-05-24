const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp/')
    },
    filename: (req, file, cb) => {
        cb(null, `temp-${Date.now()}.png`)
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const mimetypes = ['image/png', 'image/jpeg', 'image/jpg']
        if (mimetypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type'))
        }
    }
})

module.exports = upload
