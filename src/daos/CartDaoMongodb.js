import MongoDbContainer from "../containers/MongoDbContainer.js";

class CartDaoMongodb extends MongoDbContainer {
    constructor({db}) {
        super('Cart', db)
    }
    async disconnect(){

    }
}
export default CartDaoMongodb;