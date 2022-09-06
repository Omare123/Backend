import CartDao from '../src/daos/CartDaoMongodb.js'
import UserDao from '../src/daos/UserDaoMongodb.js'
import ProductDao from '../src/daos/ProductDaoMongodb.js'
import { mailer } from '../helpers/mailer.js';
import { whatsapper } from '../helpers/whatsapper.js';

const cartDao = new CartDao();
const productDao = new ProductDao();
const userDao = new UserDao();

class CartService {
    constructor() {
    }

    getCart = async (username) => {
        return await cartDao.getByparameter(username, "username")
    }

    newCart = async (username, productId) => {
        const product = await productDao.getByparameter(productId, "_id");
        const addedProduct = {
            product: product,
            count: 1
        }
        cart = {
            username: username,
            items: [addedProduct]
        }
        return await cartDao.save(cart)
    }

    add = async (username, productId) => {
        let cart = await cartDao.getByparameter(username, "username")
        if (!cart) {
          return await this.newCart(username, productId)
        }
        const index = cart.items.findIndex(item => item.product._id == productId)
        if (index !== -1)
          cart.items[index].count += 1;
        else {
          const product = await productDao.getByparameter(productId, "_id");
          const addedProduct = {
            product: product,
            count: 1
          }
          cart.items.push({ ...addedProduct })
        }
        return await cartDao.update(cart);
    }

    buy = async (username) => {
        const cart = await cartDao.getByparameter(username, "username");
        const user = await userDao.getByparameter(username, "username");
        whatsapper({ body: `Hola ${user.name}! tu pedido fue recibido y lo estamos procesando`, toNumber: user.phone })
        mailer({ template: "buyMail", context: cart, subject: `Nuevo pedido de ${user.name}`, to: user.username })
        await cartDao.deleteById(cart._id)
    }
}

export default CartService;