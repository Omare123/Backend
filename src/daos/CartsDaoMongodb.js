import MongoDbContainer from "../containers/MongoDbContainer.js";

class CartsDaoMongodb extends MongoDbContainer {
    constructor() {
        super('Cart')
    }
    async disconnect(){

    }
}
export default CartsDaoMongodb;