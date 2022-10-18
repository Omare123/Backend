import express from 'express';
const router = express.Router();
// import { upload } from '../helpers/uploader.js';
import {container} from '../../dependencies.js'
const productController = container.resolve('productController');
const upload = container.resolve("upload");

router.get('/:id?', async (req, res) => {
  res.json(await productController.getProduct(req.params.id))
})

router.post('/', upload.single("uploaded_file"), async (req, res) => {
  console.log("filename", req.file.filename)
  res.json(await productController.newProduct(req.body, req.file.filename))
})

router.put('/:id', async (req, res) => {
  res.json(await productController.updateProduct(req.body))
})

router.delete('/:id', async (req, res) => {
  res.json(await productController.deleteProduct(req.params.id))
})
export default router;