import express from 'express';
import products from './routes/products.js'
import carts from './routes/cart.js'
// import ProductController from './src/controllers/ProductContoller.js';
// import CartController from './src/controllers/CartController.js';

const app = express();
app.use(express.json())
app.use('/api/productos', products)
app.use('/api/carrito', carts)
app.listen(8080, () => {
  console.log('Listening on port 8080!')
});