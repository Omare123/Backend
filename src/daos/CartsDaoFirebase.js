import FirebaseContainer from "../containers/FirebaseContainer.js";

class CartsDaoFirebase extends FirebaseContainer {
    constructor() {
        super('Cart')
    }
    async disconnect(){

    }
}
export default CartsDaoFirebase;