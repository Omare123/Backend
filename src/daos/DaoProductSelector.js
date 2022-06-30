const dbSelection = process.env.DB_NAME || "MongoDb";

const getDao = () => {
    if(dbSelection == "Memory"){
        return './ProductsDaoMemory.js'
    }
    if(dbSelection == "MongoDb") {
        return './ProductsDaoMongoDb.js'
    }
    if(dbSelection == "Firebase") {
        return './ProductsDaoFirebase.js'
    }
    if(dbSelection == "File") {
        return './ProductsDaoFile.js' 
    }

}
export default getDao();
// const CartContent = await import(`./CartsDao${dbSelection}`)