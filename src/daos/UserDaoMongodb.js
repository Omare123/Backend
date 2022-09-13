import MongoDbContainer from "../containers/MongoDbContainer.js";

class UserDaoMongodb extends MongoDbContainer {
    constructor({db}) {
        super('User', db)
    }
    async disconnect(){

    }
}
export default UserDaoMongodb;