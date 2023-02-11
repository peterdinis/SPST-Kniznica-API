import multer from "multer";
import { v4 } from "uuid";

const DIR = "./images/";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },

  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, v4() + "-" + fileName);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
