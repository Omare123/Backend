import MongoDbContainer from "../containers/MongoDbContainer.js";

class ChatDaoMongodb extends MongoDbContainer {
    constructor() {
        super('Chat')
    }
    async disconnect(){

    }
}
export default ChatDaoMongodb;