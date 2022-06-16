const Knex = require('knex').default;
const options = {
    client: 'sqlite3',
    connection: {
        filename: './ecomerce/ecommerce.sqlite'
    }
}
class Container {
    constructor(options, table) {
        this.knex = Knex(options);
        this.table = table;
    }
    async save(object) {
        try {
            await this.knex(this.table).insert(object)
        }
        catch (err) {
            console.log(err)
        }
    }
    async getById(id) {
        try {
            return await this.knex(this.table).select('*').where({id: id})
        }
        catch (err) {
            console.log(err)
        }

    }
    async getAll() {
        return await this.knex(this.table).select('*').where({id: id})
    }
    async deleteById(id) {
        try {
            this.knex(this.table).where({id: id}).del()
        }
        catch (err) {
            console.log(err)
        }
    }
    async update(object) {
        try {
            this.knex(this.table).where({id: object.id}).update(object)
        }
        catch (err) {
            console.log(err)
        }
    }


}
module.exports = Container