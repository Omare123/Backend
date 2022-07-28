import 'dotenv/config'
const dbConnections = {
    mongoDb: `mongodb+srv://${process.env.MONGO}.@cluster0.1czmmlp.mongodb.net/?retryWrites=true&w=majority`
}
export default dbConnections;