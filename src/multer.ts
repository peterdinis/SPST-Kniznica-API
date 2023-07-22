import multer  from 'multer';
import { v4 as uuidv4 } from "uuid";

export const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
  
export const upload = multer({ storage });