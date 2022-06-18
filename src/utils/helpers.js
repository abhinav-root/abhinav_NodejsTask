import multer from 'multer';
import path from 'path';

const __dirname = path.resolve('');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/public/images/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, getFileName(req, file));
    },
});

export const getFileName = (req, file) =>
    `${req.body.email}_${file.originalname}`;

export const upload = multer({ storage: storage });
