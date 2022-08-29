import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from "path";
import ProductService from '../src/daos/ProductDaoMongodb.js'
const service = new ProductService();

const storage = multer.diskStorage({
  destination: "static/uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage
})

router.get('/:id?', (req, res) => {
  if (req.params.id === undefined)
    service.getAll().then(reponse => {
      res.json(reponse)
    })
  else
    service.getByparameter(req.params.id).then(reponse => {
      res.json(reponse)
    })
})

router.post('/', upload.single("uploaded_file"), (req, res) => {
  req.body.image = req.file.filename;
  service.save(req.body).then(reponse => {
    res.json(reponse)
  })
})

router.put('/:id', (req, res) => {
  service.update(req.body).then(reponse => {
    res.json(reponse)
  })
})

router.delete('/:id', (req, res) => {
  service.deleteById(req.params.id).then(reponse => {
    res.json(reponse)
  })
})
export default router;