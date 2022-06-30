import fs from 'fs'
import {fileURLToPath} from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const dir = path.join(__dirname, '../../Files/')

class FileContainer {
    constructor(table){
        this.table = `${dir}\\${table}.txt`;
    }
    async save(object) {
        try {
            const data = await fs.promises.readFile(this.table, 'utf8')
            let content = data ? [...JSON.parse(data)] : [];
            content = [...content, object]
            fs.writeFile(this.table, JSON.stringify(content), function (err) {
                if (err) throw err;
            })
        }
        catch (err) {
            console.log(err)
        }

        return object;
    }
    async getById(id) {
        let object = {}
        try {
            const data = await fs.promises.readFile(this.table, 'utf8')
            object = data ? [...JSON.parse(data)][id] : [];
        }
        catch (err) {
            console.log(err)
        }

        return object;

    }
    async getAll() {
        const data = await fs.promises.readFile(this.table, 'utf8')
        return data ? [...JSON.parse(data)] : [];
    }
    async deleteById() {
        fs.unlink(this.table, function (err) {
            if (err) throw err;
            console.log('File is deleted successfully.');
        });
    }
    async deleteProductById(id) {
        try {
            const data = await fs.promises.readFile(this.table, 'utf8')
            
            let list = data ? [...JSON.parse(data)] : [];
            let newList = list.filter(object => object.id !== id)
            fs.writeFile(this.table, JSON.stringify(newList), function (err) {
                if (err) throw err;
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    async update(object) {
        try {
            const data = await fs.promises.readFile(this.table, 'utf8')
            let list = data ? [...JSON.parse(data)] : [];
            let objectToUpdate = list[object.id]
            if (objectToUpdate) {
                objectToUpdate =
                    fs.writeFile(this.table, JSON.stringify(newList), function (err) {
                        if (err) throw err;
                    })
            }
            else
                throw ('error: Producto no encontrado')
        }
        catch (err) {
            console.log(err)
        }
    }
    
    async deleteAll() {
        await fs.promises.writeFile(this.table, '')
    }

}
export default FileContainer;