import dbConnections from '../../config.js'
import {MongoClient} from 'mongodb'
const mongo = new MongoClient(dbConnections.mongoDb);


class MongoDbContainer {
    constructor(table){
        this.table = table;
    }
    
    async save(object) {
        try {
            await mongo.connect();
            await mongo.db("comercio").collection(this.table).insertOne(object)
        }
        catch (err) {
            throw new Error("Error saving in database")
        }

        return object;
    }
    async getByparameter(value, name = 'id') {
        let object = {}
        try {
            await mongo.connect();
            let filter = {}
            filter[`${name}`] = value;
            object = await mongo.db("comercio").collection(this.table).find(filter).toArray()
        }
        catch (err) {
            throw new Error("Error getting the data")
        }

        return object[0];

    }
    async getAll() {
        let data = []
        try {
            await mongo.connect();
            data = await mongo.db("comercio").collection(this.table).find({}).toArray()
        }
        catch (err) {
            throw new Error("Error getting the data")
        }

        return data;
    }
    async deleteById(id) {
        try {
            await mongo.connect();
            await mongo.db("comercio").collection(this.table).deleteOne({_id: id})
        }
        catch (err) {
            throw new Error("Error deleting the data")
        }
    }
    async update(object) {
        try {
            await mongo.connect();
            data = await mongo.db("comercio").collection(this.table).updateOne({_id: object.id}, {...object})
        }
        catch (err) {
            throw new Error("Error updating the data")
        }
    }
}
export default MongoDbContainer;