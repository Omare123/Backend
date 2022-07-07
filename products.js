// const express = require('express');
// const Container = require('./src/models/Container') 
// const app = express();
// app.use(express.urlencoded({extended: true}));
// app.set('views', './src/views');
// app.set('view engine', 'pug') //para cambiar tipo de archivo

// app.post('/products', (req, res)=> {
//   const file = new Container("Archivo");
//   const allCalls = async () => {
//     const callOne = await file.save({title: req.body.name , price: req.body.price , thumbnail: req.body.image})
//     res.redirect('/')
//   }
//   allCalls()
// });

// app.get('/products', (req, res)=> {
//   const file = new Container("Archivo");
//   const allCalls = async () => {
//     const products = await file.getAll()
//     res.render('products', {products: products})
//   }
//   allCalls()
// });

// app.get('/', (req, res)=> {
//     const file = new Container("Archivo");
//     const allCalls = async () => {
//       const products = await file.getAll()
//       res.render('addProducts',{})
//     }
//     allCalls()
//   });
  
// app.listen(8080, () => {
//   console.log('Escuchando');
// });