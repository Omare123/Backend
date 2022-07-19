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
            console.log(err)
        }

        return object;
    }
    async getByparameter(value, name = 'id') {
        const object = {}
        try {
            await mongo.connect();
            let filter = {}
            filter[`${name}`] = value;
            object = await mongo.db("comercio").collection(this.table).find(filter)
        }
        catch (err) {
            console.log(err)
        }

        return object;

    }
    async getAll() {
        let data = []
        try {
            await mongo.connect();
            data = await mongo.db("comercio").collection(this.table).find({}).toArray()
        }
        catch (err) {
            console.log("ERROR")
            // console.log(err)
        }

        return data;
    }
    async deleteById(id) {
        try {
            await mongo.connect();
            await mongo.db("comercio").collection(this.table).deleteOne({_id: id})
        }
        catch (err) {
            console.log(err)
        }
    }
    async update(object) {
        try {
            await mongo.connect();
            data = await mongo.db("comercio").collection(this.table).updateOne({_id: object.id}, {...object})
        }
        catch (err) {
            console.log(err)
        }
    }
}
export default MongoDbContainer;