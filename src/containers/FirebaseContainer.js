import dbConnections from '../../config.js'
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, updateDoc, deleteDoc, getFirestore } from 'firebase/firestore'
const app = initializeApp(dbConnections.firebase);
const db = getFirestore(app)
const query = collection(db, this.table)
class FirebaseContainer {
    
    constructor(table){
        this.table = table;
    }
    async save(object) {
        try {
            await addDoc(object)
        }
        catch (err) {
            console.log(err)
        }

        return object;
    }
    async getById(id) {
        const object = {}
        try {
            const docReference = doc(db, this.table, id)
            object = await getDoc(docReference).data()
        }
        catch (err) {
            console.log(err)
        }

        return object;

    }
    async getAll() {
        const data = []
        try {
            data = await getDocs(query).docs
        }
        catch (err) {
            console.log(err)
        }

        return data;
    }
    async deleteById(id) {
        try {
            const docReference = doc(db, this.table, object.id)
            deleteDoc(docReference)
        }
        catch (err) {
            console.log(err)
        }
    }
    async update(object) {
        try {
            const docReference = doc(db, this.table, object.id)
            updateDoc(docReference, { ...object })
        }
        catch (err) {
            console.log(err)
        }
    }
}
export default FirebaseContainer;