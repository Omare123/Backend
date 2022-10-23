import express from 'express';
const router = express.Router();
import {container} from '../../dependencies.js'
const cartController = container.resolve('cartController');

router.get('/', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")
  res.json(await cartController.getCart(req.session.name))
})

router.get('/buy', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")
  try {
    await cartController.buy(req.session.name)
    res.sendStatus(200)
  }
  catch (err) {
    res.sendStatus(400)
  }

})

router.post('/add', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")
  try {
    res.json(await cartController.add(req.session.name, req.body.product));
  }
  catch (err) {
    res.redirect("/index.html")
  }

})


export default router;