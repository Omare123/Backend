import MongoDbContainer from "../containers/MongoDbContainer.js";

class ProductDaoMongodb extends MongoDbContainer {
    constructor() {
        super('Product')
    }
    async disconnect(){

    }
}
export default ProductDaoMongodb;