
import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
export const upload = multer({
    storage: storage
  })