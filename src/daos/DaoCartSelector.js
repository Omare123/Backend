const dbSelection = process.env.DB_NAME || "MongoDb";

const getDao = () => {
    if(dbSelection == "Memory"){
        return './CartsDaoMemory.js'
    }
    if(dbSelection == "MongoDb") {
        return './CartsDaoMongoDb.js'
    }
    if(dbSelection == "Firebase") {
        return './CartsDaoFirebase.js'
    }
    if(dbSelection == "File") {
        return './CartsDaoFile.js' 
    }

}
export default getDao();