import { MongoClient, ObjectId } from 'mongodb'

class MongoDbContainer {
    constructor(table, db) {
        this.table = table;
        this.db = new MongoClient(db);
    }

    async save(object) {
        try {
            await this.db.connect();
            await this.db.db("comercio").collection(this.table).insertOne(object)
        }
        catch (err) {
            throw new Error("Error saving in database")
        }

        return object;
    }
    async getByparameter(value, name = '_id') {
        let object = {}
        try {
            await this.db.connect();
            let filter = {}
            filter[`${name}`] = name !== "_id" ? value : ObjectId(value);
            filter["active"] = true;
            object = await this.db.db("comercio").collection(this.table).find(filter).toArray()
        }
        catch (err) {
            return new Error("Error getting the data")
        }

        return object[0];

    }
    async getAll(filter = {}) {
        let data = []
        try {
            await this.db.connect();
            data = await this.db.db("comercio").collection(this.table).find({...filter, active: true}).toArray()
        }
        catch (err) {
            throw new Error("Error getting the data")
        }

        return data;
    }
    async deleteById(id) {
        try {
            await this.db.connect();
            return await this.db.db("comercio").collection(this.table).updateOne({ "_id": ObjectId(id) }, { "$set": { active: false } })
        }
        catch (err) {
            throw new Error("Error deleting the data")
        }
    }
    async update(object) {
        console.log("mongo", object)
        try {
            await this.db.connect();
            return await this.db.db("comercio").collection(this.table).updateOne({ "_id": ObjectId(object._id) }, { "$set": { ...object } })
        }
        catch (err) {
            throw new Error("Error updating the data")
        }
    }
}
export default MongoDbContainer;