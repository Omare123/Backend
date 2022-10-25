
import multer from 'multer';
import path from "path";
import axios from "axios"
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
      if(!file)
          cb("error")
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

const sendToServer = async(file) => {
  //how to send to the server??
  console.log(file)
  return await axios.post(`${process.env.BASE_URL}api/upload/`, {"uploaded_file": file})
}
export const upload = multer({
    storage: storage
  })