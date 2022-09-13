import MongoDbContainer from "../containers/MongoDbContainer.js";

class ProductDaoMongodb extends MongoDbContainer {
    constructor({db}) {
        super('Product', db)
    }
    async disconnect(){

    }
}
export default ProductDaoMongodb;