import MongoDbContainer from "../containers/MongoDbContainer.js";

class ChatDaoMongodb extends MongoDbContainer {
    constructor() {
        super('Cart')
    }
    async disconnect(){

    }
}
export default ChatDaoMongodb;