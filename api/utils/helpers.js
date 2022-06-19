import multer from 'multer';
import path from 'path';
import fs from 'fs';

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

// check if directory exists
const uploadDirectory = __dirname + '/public/images/uploads';
export function uploadDirectoryExists() {
    if (fs.existsSync(uploadDirectory)) {
        console.log('Directory exists!');
        return true;
    } else {
        console.log('Directory not found.');
        return false;
    }
}

export function createUploadDirectory() {
    try {
        fs.mkdirSync(uploadDirectory, { recursive: true });
        console.log('Upload directory created');
    } catch (err) {
        console.log(err);
    }
}
