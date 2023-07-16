import multer  from 'multer';

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original filename
    },
  });
  
export const upload = multer({ storage });