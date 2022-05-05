const fs = require('fs')
class Container {
    constructor(name) {
        this.name = `${name}.txt`;
    }
    async save(object) {
        let id;
        try {
            const data = await fs.promises.readFile(this.name, 'utf8')
            let content = data ? [...JSON.parse(data)] : [];
            object['id'] = id = content.length ? content[content.length - 1]['id'] + 1 : 0;
            content = [...content, object]
            fs.writeFile(this.name, JSON.stringify(content), function (err) {
                if (err) throw err;
            })
        }
        catch (err) {
            console.log(err)
        }
        
        return id;
    }
    async getById(id) {
        let object = {}
        try {
            const data = await fs.promises.readFile(this.name, 'utf8')
            object = data ? [...JSON.parse(data)][id] : [];
        }
        catch (err) {
            console.log(err)
        }
        
        return object;

    }
    async getAll() {
        const data = await fs.promises.readFile(this.name, 'utf8')
            return data ? [...JSON.parse(data)] : [];
    }
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.name, 'utf8')
            let list = data ? [...JSON.parse(data)] : [];
            let newList = list.filter(object => object.id !== id)
            fs.writeFile(this.name, JSON.stringify(newList), function (err) {
                if (err) throw err;
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    async deleteAll() {
        await fs.promises.writeFile(this.name, '')
    }

}
module.exports = Container