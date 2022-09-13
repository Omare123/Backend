
class CartController {
  constructor({ cartService }) {
    this.cartService = cartService;
  } 
  getCart = async (username) => {
    return await this.cartService.getCart(username)
  }
  buy = async () => {
    await this.cartService.buy(req.session.name)
  }

  add = async (username, product) => {
    await cartService.add(username, product)
  }
}

export default CartController;