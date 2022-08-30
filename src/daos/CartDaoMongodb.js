import MongoDbContainer from "../containers/MongoDbContainer.js";

class CartDaoMongodb extends MongoDbContainer {
    constructor() {
        super('Cart')
    }
    async disconnect(){

    }
}
export default CartDaoMongodb;