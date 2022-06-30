import FileContainer from "../containers/FileContainer.js";

class CartsDaoFile extends FileContainer {
    constructor() {
        super('Cart')
    }
    async disconnect(){

    }
}
export default CartsDaoFile;