import express from 'express';
const router = express.Router();
import { upload } from '../helpers/uploader.js';
import dependencies from '../../dependencies.js'
const container = dependencies();
const productController = container.resolve('productController');

router.get('/:id?', async (req, res) => {
  res.json(await productController.getProduct(req.params.id))
})

router.post('/', upload.single("uploaded_file"), async (req, res) => {
  res.json(await productController.newProduct(req.body, req.file.filename))
})

router.put('/:id', async (req, res) => {
  res.json(await productController.updateProduct(req.body))
})

router.delete('/:id', async (req, res) => {
  res.json(await productController.deleteProduct(req.params.id))
})
export default router;