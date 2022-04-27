const express = require('express')
const Usuario = require('./src/models/Usuario') 
const app = express();
const libros = [{nombre: 'Cien años de soledad', autor: 'Gabriel García Márquez'}, {nombre: '1984', autor: 'George Orwell'}, {nombre: 'Mujercitas', autor: ' Louisa May Alcott'},]
const mascotas = ['Banana', 'Buda', 'Chupeta', 'Trompo'] //Nombre reales de mascotas que he tenido xD
app.get('/', (req, res) => {
  const user = new Usuario('Omar', 'Rojas', libros, mascotas)
  user.addBook('Rafaela', 'Mariana Furiasse');
  user.addMascota('Miguito')
  res.send(`Nombre completo: ${user.getFullName()} | Cantidad de mascotas: ${user.countMascotas()} | Nombre de libros: ${user.getBookNames()}`)

});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});