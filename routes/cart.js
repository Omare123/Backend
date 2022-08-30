import express from 'express';
const router = express.Router();
import CartService from '../src/daos/CartDaoMongodb.js'
import ProductService from '../src/daos/ProductDaoMongodb.js'
const cartService = new CartService();
const productService = new ProductService();

router.get('/:id', async (req, res) => {
  const response = cartService.getByparameter(req.params.id)
  res.json(response)
})

router.post('/add', async (req, res) => {
  try {
    let cart = await cartService.getByparameter(req.session.name, "username")
    if (!cart) {
      const product = await productService.getByparameter(req.body.product, "_id");
      const addedProduct = {
        product: product,
        count: 1
      }
      cart = {
        username: req.session.name,
        items: [addedProduct]
      }
      res.json(await cartService.save(cart))
    }
    const index = cart.items.findIndex(item => item.product._id == req.body.product)
    console.log(index)
    if (index !== -1)
      cart.items[index].count += 1;
    else {
      const product = await productService.getByparameter(req.body.product, "_id");
      const addedProduct = {
        product: product,
        count: 1
      }
      cart.items.push({...addedProduct})
    }
    res.json(await cartService.update(cart))
  }
  catch (err) {
    console.log(err)
  }

})


export default router;