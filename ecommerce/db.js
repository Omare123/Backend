// const Knex = require('knex').default
// const options = {
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: ' codehouse'
// }
// const knex = Knex({
//     client: 'mysql2',
//     connection: options
// })

// knex.schema.createTable('products', (table) => {
//     table.increments('id');
//     table.string('name', 20);
//     table.integer('price');
//     table.string('url');
// }).then(() => {
//     console.log('Tabla creada')
// }).catch((err) => {
//     console.log('error', err)
// }).finally(() => knex.destroy())

// knex.schema.createTable('chat', (table) => {
//     table.string('mail', 20);
//     table.integer('message');
// }).then(() => {
//     console.log('Tabla creada')
// }).catch((err) => {
//     console.log('error', err)
// }).finally(() => knex.destroy())