import express from 'express';
const router = express.Router();
import dependencies from '../../dependencies.js'
const container = dependencies();
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
    console.log(err)
  }

})

router.post('/add', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")
  try {
    res.json(await cartController.add(req.session.name, req.body.product));
  }
  catch (err) {
    console.log(err)
  }

})


export default router;