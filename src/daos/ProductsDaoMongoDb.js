import MongoDbContainer from "../containers/MongoDbContainer.js";

class ProductsDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('Products')
    }
    async disconnect(){

    }
}
export default ProductsDaoMongoDb;