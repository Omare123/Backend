import express from 'express';
const router = express.Router();
import CartService from '../src/daos/CartDaoMongodb.js'
import UserService from '../src/daos/UserDaoMongodb.js'
import ProductService from '../src/daos/ProductDaoMongodb.js'
import { mailer } from '../helpers/mailer.js';
import { whatsapper } from '../helpers/whatsapper.js';

const cartService = new CartService();
const productService = new ProductService();
const userService = new UserService();


router.get('/', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")
  res.json(await cartService.getByparameter(req.session.name, "username"))
})

router.get('/buy', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")

  try {
    const cart = await cartService.getByparameter(req.session.name, "username");
    const user = await userService.getByparameter(req.session.name, "username");
    whatsapper({ body: `Hola ${user.name}! tu pedido fue recibido y lo estamos procesando`, toNumber: user.phone })
    mailer({ template: "buyMail", context: cart, subject: `Nuevo pedido de ${user.name}`, to: user.username })
    await cartService.deleteById(cart._id)
    res.sendStatus(200)
  }
  catch (err) {
    console.log(err)
  }

})

router.post('/add', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")
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
    if (index !== -1)
      cart.items[index].count += 1;
    else {
      const product = await productService.getByparameter(req.body.product, "_id");
      const addedProduct = {
        product: product,
        count: 1
      }
      cart.items.push({ ...addedProduct })
    }
    res.json(await cartService.update(cart));
  }
  catch (err) {
    console.log(err)
  }

})


export default router;