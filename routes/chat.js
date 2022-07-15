import express from 'express';
const router = express.Router();
import ChatService from '../src/daos/ChatDaoMongodb.js'
const service = new ChatService();
import postSchema from '../src/schemas/postSchema.js'
import norm from "normalizr";

router.get('/:id?', (req, res) => {
  if (req.params.id === undefined)
    service.getAll().then(response => {
      if (response.length > 0) {
        const denormalized = response.map(({entities, result}) => {
          return norm.denormalize(result[0], postSchema, entities)
        })
        res.json(denormalized)
      }
    })
  else
    service.getById(req.params.id).then(response => {
      if (response) {
        const denormalized = norm.denormalize(response.result, postSchema, response.entities)
        res.json(denormalized)
      }
    })
})

router.post('/', (req, res) => {
  const normalizado = norm.normalize(req.body, [postSchema]);
  service.save(normalizado).then(response => {
    res.json(response)
  })
})

router.put('/:id', (req, res) => {
  service.update(req.body).then(response => {
    res.json(response)
  })
})

router.delete('/:id', (req, res) => {
  service.deleteById(req.params.id).then(response => {
    res.json(response)
  })
})
export default router;