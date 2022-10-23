
import multer from 'multer';
import path from "path";
import axios from "axios"
const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: function (req, file, cb) {
      if(!file)
          cb("error")
      if(process.env.PROD === "true"){
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
      }
      else {
        sendToServer(file).then(resp => cb(null, resp.data)).catch(error => cb(error))
      }
    }
  })

const sendToServer = async(file) => {
  console.log(`${process.env.BASE_URL}api/upload/`)
  return await axios.post(`${process.env.BASE_URL}api/upload/`, {"uploaded_file": file})
}
export const upload = multer({
    storage: storage
  })