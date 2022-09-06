import express from 'express';
const router = express.Router();
import { upload } from '../helpers/uploader.js';
import ProductService from '../services/productService.js';
const productService = new ProductService();

router.get('/:id?', (req, res) => {
  if (req.params.id === undefined)
    res.json(await productService.getAll())
  else
    res.json(await productService.getProduct(req.params.id))
})

router.post('/', upload.single("uploaded_file"), (req, res) => {
  req.body.image = req.file.filename;
  res.json(await productService.newProduct(req.body))
})

router.put('/:id', (req, res) => {
  res.json(await productService.updateProduct(req.body))
})

router.delete('/:id', (req, res) => {
  res.json(await productService.deleteProduct(req.params.id))
})
export default router;