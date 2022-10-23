import { mailer } from '../helpers/mailer.js';
import { whatsapper } from '../helpers/whatsapper.js';
import { cartDTO, addedProductDTO } from '../helpers/DTOS.js'

class CartService {
  constructor({ cartDao, productDao, userDao }) {
    this.cartDao = cartDao;
    this.productDao = productDao;
    this.userDao = userDao;
  }

  getCart = async (username) => {
    return await this.cartDao.getByparameter(username, "username")
  }

  newCart = async (username, productId) => {
    const product = await this.productDao.getByparameter(productId, "_id");
    if(!product)
      throw Error("Not found")
    const addedProduct = addedProductDTO(product, 1)
    console.log(product, addedProduct)
    const cart = cartDTO(username, [addedProduct], true)
    return await this.cartDao.save(cart)
  }

  add = async (username, productId) => {
    try{
      let cart = await this.cartDao.getByparameter(username, "username")
      if (!cart) 
        return await this.newCart(username, productId)
      
      const index = cart.items.findIndex(item => item.product._id == productId)
      if (index !== -1)
        cart.items[index].count += 1;
      else {
        const product = await this.productDao.getByparameter(productId, "_id");
        const addedProduct = addedProductDTO(product, 1)
        cart.items.push({ ...addedProduct })
      }
      return await this.cartDao.update(cart);
    }
    catch(error)
    {
      return error
    }
  }

  buy = async (username) => {
    const cart = await this.cartDao.getByparameter(username, "username");
    const user = await this.userDao.getByparameter(username, "username");
    whatsapper({ body: `Hola ${user.name}! tu pedido fue recibido y lo estamos procesando`, toNumber: user.phone })
    mailer("buyMail",cart,`Nuevo pedido de ${user.name}`,user.username )
    await this.cartDao.deleteById(cart._id)
  }
}

export default CartService;