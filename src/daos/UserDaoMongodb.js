import MongoDbContainer from "../containers/MongoDbContainer.js";

class UserDaoMongodb extends MongoDbContainer {
    constructor() {
        super('User')
    }
    async disconnect(){

    }
}
export default UserDaoMongodb;