import express from 'express';
const router = express.Router();
import CartContent  from '../src/daos/DaoCartSelector.js'
const path = `../src/daos/${CartContent}`;
const {default: CartService} = await import(path)
const service = new CartService();

router.get('/:id?', (req, res) => {
    if(req.params.id === undefined)
    service.getAll().then(reponse => {
            res.json(reponse)
        })
    else
    service.getById(req.params.id).then(reponse => {
            res.json(reponse)
        })
  })

  router.post('/', (req, res) => {
    service.save(req.body).then(reponse => {
        res.json(reponse)
    })
  })

  router.put('/:id', (req, res) => {
    service.update(req.body).then(reponse => {
      res.json(reponse)
    })
  })

  router.delete('/:id', (req, res) => {
    service.deleteById(req.params.id).then(reponse => {
      res.json(reponse)
    })
  })
export default router;