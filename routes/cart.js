const express = require('express');
const router = express.Router();
const Cart = require('../src/models/Cart')


router.post('/', (req, res) => {
  const cart = new Cart()
  res.json(cart.id)
})

router.delete('/:id', (req, res) => {
  try {
    const cart = new Cart(req.params.id);
    cart.deleteById().then(reponse => {
      res.json("Borrado")
    })
  }
  catch (err) {
    res.json("No existe ese carrito :(")
  }
})

router.get('/:id/productos', (req, res) => {
  try {
    const cart = new Cart(req.params.id);
    cart.getAll().then(reponse => {
      res.json(reponse)
    })
  }
  catch (err) {
    res.json("No existe ese carrito :(")
  }
})

router.post('/:id/productos', (req, res) => {
  try {
    const cart = new Cart(req.params.id);
    cart.save(req.body).then(reponse => {
      res.json(reponse)
    })
  }
  catch (err) {
    res.json("No existe ese carrito :(")
  }
})

router.delete('/:id/productos/:id_prod', (req, res) => {
  try {
    const cart = new Cart(req.params.id);
    cart.deleteProductById(req.params.id_prod).then(reponse => {
      res.json("Borrado")
    })
  }
  catch (err) {
    res.json("No existe ese carrito :(")
  }
})


module.exports = router;