const express = require('express');
const router = express.Router();
const Productos  = require('../src/models/Productos') 

const file = new Productos("Archivo")

router.get('/:id?', (req, res) => {
    if(req.params.id === undefined)
        file.getAll().then(reponse => {
            res.json(reponse)
        })
    else
        file.getById(req.params.id).then(reponse => {
            res.json(reponse)
        })
  })

  router.post('/', (req, res) => {
    file.save(req.body).then(reponse => {
        res.json(reponse)
    })
  })

  router.put('/:id', (req, res) => {
    file.update(req.body).then(reponse => {
      res.json(reponse)
    })
  })

  router.delete('/:id', (req, res) => {
    file.deleteById(req.params.id).then(reponse => {
      res.json(reponse)
    })
  })
module.exports = router;