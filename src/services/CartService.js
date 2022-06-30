const { carts } = await import("../daos/DaoSelector.js");
class CartService {
    constructor(){
        this.CartService = carts;
    }

    save (object) {
        this.CartService.save(object)
    }
    // getAll (object) {
    //     this.CartService.save(object)
    // }
}
export default CartService;