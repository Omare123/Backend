import express from 'express';
const router = express.Router();
import CartService from '../services/cartService.js';
import { mailer } from '../helpers/mailer.js';
import { whatsapper } from '../helpers/whatsapper.js';

const cartService = new CartService();


router.get('/', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")
  res.json(await cartService.getCart(req.session.name))
})

router.get('/buy', async (req, res) => {
  if (!req.session.name)
    res.redirect("/login.html")
  try {
    await cartService.buy(req.session.name)
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
    res.json(await cartService.add(req.session.name, req.body.product));
  }
  catch (err) {
    console.log(err)
  }

})


export default router;