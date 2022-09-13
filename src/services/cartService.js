import { mailer } from '../helpers/mailer.js';
import { whatsapper } from '../helpers/whatsapper.js';

class CartService {
  constructor({ cartDao, productDao }) {
    this.cartDao = cartDao;
    this.productDao = productDao;
  }

  getCart = async (username) => {
    return await this.cartDao.getByparameter(username, "username")
  }

  newCart = async (username, productId) => {
    const product = await this.productDao.getByparameter(productId, "_id");
    const addedProduct = {
      product: product,
      count: 1
    }
    cart = {
      username: username,
      items: [addedProduct]
    }
    return await this.cartDao.save(cart)
  }

  add = async (username, productId) => {
    let cart = await this.cartDao.getByparameter(username, "username")
    if (!cart) {
      return await this.newCart(username, productId)
    }
    const index = cart.items.findIndex(item => item.product._id == productId)
    if (index !== -1)
      cart.items[index].count += 1;
    else {
      const product = await this.productDao.getByparameter(productId, "_id");
      const addedProduct = {
        product: product,
        count: 1
      }
      cart.items.push({ ...addedProduct })
    }
    return await this.cartDao.update(cart);
  }

  buy = async (username) => {
    const cart = await this.cartDao.getByparameter(username, "username");
    const user = await userDao.getByparameter(username, "username");
    whatsapper({ body: `Hola ${user.name}! tu pedido fue recibido y lo estamos procesando`, toNumber: user.phone })
    mailer({ template: "buyMail", context: cart, subject: `Nuevo pedido de ${user.name}`, to: user.username })
    await this.cartDao.deleteById(cart._id)
  }
}

export default CartService;