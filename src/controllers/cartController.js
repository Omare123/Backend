
class CartController {
  constructor({ cartService }) {
    this.cartService = cartService;
  } 
  getCart = async (username) => {
    return await this.cartService.getCart(username)
  }
  buy = async (username) => {
    await this.cartService.buy(username)
  }

  add = async (username, product) => {
    await this.cartService.add(username, product)
  }
}

export default CartController;