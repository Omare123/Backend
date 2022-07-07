// const express = require('express')
// const Usuario = require('./src/models/Usuario') 
// const Container = require('./src/models/Container') 
// const app = express();
// const libros = [{nombre: 'Cien años de soledad', autor: 'Gabriel García Márquez'}, {nombre: '1984', autor: 'George Orwell'}, {nombre: 'Mujercitas', autor: ' Louisa May Alcott'},]
// const mascotas = ['Banana', 'Buda', 'Chupeta', 'Trompo'] //Nombre reales de mascotas que he tenido xD
// app.get('/', (req, res) => {
//   const user = new Usuario('Omar', 'Rojas', libros, mascotas)
//   user.addBook('Rafaela', 'Mariana Furiasse');
//   user.addMascota('Miguito')
//   res.send(`Nombre completo: ${user.getFullName()} | Cantidad de mascotas: ${user.countMascotas()} | Nombre de libros: ${user.getBookNames()}`)

// });

// app.get('/segunda', (req, res) => {
//   const file = new Container("Archivo");
//   const allCalls = async () => {
//     const callOne = await file.save({title: 'titulo', price: 123, thumbnail: 'url de foto'})
//     const callTwo = await file.getById(2)
//     const callThree = await file.getAll()
//     await file.deleteById(4)
//     //await file.deleteAll()
//     res.send(`callOne: ${callOne} 
//       callTwo: {${callTwo?.id}, ${callTwo?.title}, ${callTwo?.price} ${callTwo?.thumbnail}}
//       callThree: [${callThree.map(obj => {return `{${obj['id']} ${obj['title']} ${obj['price']} ${obj['thumbnail']}}`} )}]`)
//   }
//   allCalls()
// });

// app.get('/productos', (req, res) => {
//   const file = new Container("Archivo");
//   const allCalls = async () => {
//     const products = await file.getAll()
//     res.send(`[${products.map(obj => {return `{${obj['id']} ${obj['title']} ${obj['price']} ${obj['thumbnail']}}`} )}]`)
//   }
//   allCalls()
// });

// app.get('/productosRandom', (req, res) => {
//   const file = new Container("Archivo");
//   const allCalls = async () => {
//     const random = await file.getRandom()
//     res.send(`random: {${random?.id}, ${random?.title}, ${random?.price} ${random?.thumbnail}}`)
//   }
//   allCalls()
// });

// app.listen(8000, () => {
//   console.log('Example app listening on port 8000!')
// });