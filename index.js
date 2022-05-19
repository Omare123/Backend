const express = require('express');
const Container = require('./src/models/Container') 
const app = express();
const products = express.Router()

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', products);

products.post('/', (req, res)=> {
  const file = new Container("Archivo");
  const allCalls = async () => {
    const callOne = await file.save({title: req.body.name , price: req.body.price , thumbnail: req.body.image})
    res.send(callOne)
  }
  allCalls()
});

products.get('/:id', (req, res)=> {
  const id = req.params.id;
  console.log("ID", id)
  const file = new Container("Archivo");
  const allCalls = async () => {
    const callOne = await file.getById(id)
    res.send(callOne)
  }
  allCalls()
});
products.get('/', (req, res)=> {
  const file = new Container("Archivo");
  const allCalls = async () => {
    const callOne = await file.getAll()
    res.send(callOne)
  }
  allCalls()
});

products.delete('/', (req, res)=> {
  const id = req.params.id;
  console.log("ID", id)
  const file = new Container("Archivo");
  const allCalls = async () => {
    const callOne = await file.deleteById(id)
    res.send(callOne)
  }
  allCalls()
});

app.listen(8080, () => {
  console.log('Escuchando');
});