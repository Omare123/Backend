import router from 'koa-router' 
import { upload } from '../helpers/uploader.js';
import {container} from '../../dependencies.js'
const productController = container.resolve('productController');


const productRouter = router({prefix: '/api/product'})

productRouter.get('/:id?', async ({request, response}) => {
  response.json(await productController.getProduct(request.params.id))
})

productRouter.post('/', upload.single("uploaded_file"), async ({request, response}) => {
  response.json(await productController.newProduct(request.body, request.file.filename))
})

productRouter.put('/:id', async ({request, response}) => {
  response.json(await productController.updateProduct(request.body))
})

productRouter.delete('/:id', async ({request, response}) => {
  response.json(await productController.deleteProduct(request.params.id))
})
export default productRouter;