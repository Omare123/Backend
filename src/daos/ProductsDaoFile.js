import FileContainer from "../containers/FileContainer.js";

class ProductsDaoFile extends FileContainer {
    constructor() {
        super('Products')
    }
    async disconnect(){

    }
}
export default ProductsDaoFile;