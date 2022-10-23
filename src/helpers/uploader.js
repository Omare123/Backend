
import multer from 'multer';
import path from "path";
import axios from "axios"
const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: function (req, file, cb) {
      if(!file)
          cb("error")
      if(process.env.PROD === "true"){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
      }
      else {
        sendToServer(file).then(resp => cb(null, resp.data)).catch(error => cb(error))
      }
    }
  })

const sendToServer = async(file) => {
  return await axios.post(`${process.env.BASE_URL}api/upload`, file)
}
export const upload = multer({
    storage: storage
  })